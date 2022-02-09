import { useState, useEffect, useRef } from "react";
import { logger, executeFetch } from "../utils";

const transformOrders = <T>(orders: Record<Price, Size>): T[] => {
  return Object.entries(orders)
    .sort((o) => parseFloat(o[0]))
    .reverse()
    .map(
      (item: string[]) =>
        ({
          price: item[0],
          size: item[1],
        } as unknown as T)
    );
};

const removeEmptySize = (value: Record<Price, Size>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return Object.entries(value).filter(([_, v]) => parseFloat(v) != 0);
};

interface IOrderBook {
  asks: Record<Price, Size>;
  bids: Record<Price, Size>;
  lastUpdateId: NullableNumber;
}

export function useOrderBook(symbol: string): {
  orderBook: OrderBook;
} {
  const [orderBook, setOrderBook] = useState<IOrderBook>({
    bids: {},
    asks: {},
    lastUpdateId: null,
  });

  const ws = useRef<WebSocket | null>(null);

  const orderBookUpdateFromRESTfulAPI = async () => {
    const url = `https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=1000`;

    const result = await executeFetch(url, { method: "get" });

    const asks = Object.fromEntries(result.asks);
    const bids = Object.fromEntries(result.bids);

    setOrderBook({ asks, bids, lastUpdateId: result.lastUpdateId });
  };

  const processUpdates = (data: { a: Ask[]; b: Bid[] }) => {
    const { a, b } = data;

    let asks = Object.fromEntries(a);
    let bids = Object.fromEntries(b);

    asks = Object.fromEntries(
      removeEmptySize({ ...orderBook.asks, ...asks }).slice(0, 1000)
    );

    bids = Object.fromEntries(
      removeEmptySize({ ...orderBook.bids, ...bids }).slice(0, 1000)
    );

    setOrderBook((prev) => ({ asks, bids, lastUpdateId: prev.lastUpdateId }));
  };

  useEffect(() => {
    ws.current = new WebSocket(
      `wss://stream.binance.com/ws/${symbol.toLowerCase()}@depth@1000ms`
    );
    ws.current.onopen = () => logger.info("Websocket opened");

    ws.current.onclose = () => logger.info("Websocket closed");

    const wsCurrent = ws.current;

    return () => {
      setOrderBook({ bids: {}, asks: {}, lastUpdateId: null });
      wsCurrent.close();
    };
  }, [symbol]);

  useEffect(() => {
    if (!ws.current) return;

    const onMessage = async (event: MessageEvent) => {
      const responseData = JSON.parse(event.data);
      const { U, u, b, a } = responseData;

      if (orderBook.lastUpdateId === null) {
        await orderBookUpdateFromRESTfulAPI();
      } else {
        const { lastUpdateId } = orderBook;

        if (u <= lastUpdateId) {
          return;
        }

        if (U <= lastUpdateId + 1 && u >= lastUpdateId + 1) {
          setOrderBook((prev) => ({ ...prev, lastUpdateId: u }));
          processUpdates({ a, b });
        } else if (U == lastUpdateId + 1) {
          setOrderBook((prev) => ({ ...prev, lastUpdateId: u }));
          processUpdates({ a, b });
        }
      }
    };

    ws.current.onmessage = onMessage;
  });

  const asks = transformOrders<OrderBookRow>(orderBook.asks);
  const bids = transformOrders<OrderBookRow>(orderBook.bids);

  return {
    orderBook: { asks, bids, lastUpdateId: orderBook.lastUpdateId },
  };
}
