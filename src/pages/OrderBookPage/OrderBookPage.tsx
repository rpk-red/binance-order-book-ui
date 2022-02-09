import { ReactElement, useState } from "react";
import { Grid, SelectChangeEvent, Tabs, Tab } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  GroupSelector,
  PairSelector,
  OrderBookTable,
  DepthSelector,
} from "../../components";
import { useOrderBook, useExchangeInfo } from "../../hooks";
import {
  defaultExchangePair,
  TABLE_BUY_TITLE,
  TABLE_SELL_TITLE,
} from "./constants";

const enum TableEnum {
  buy = "buy",
  sell = "sell",
  both = "both",
}

const enum DecimalsEnum {
  zero = "0",
  one = "1",
  two = "2",
}

type TableType = keyof typeof TableEnum;

export const OrderBookPage = (): ReactElement => {
  const [tabValue, setValue] = useState<TableType>(TableEnum.both);
  const [decimal, setDecimal] = useState(DecimalsEnum.two);
  const [depth, setDepth] = useState<Depth>("15");

  const { pair: pairFromUrl } = useParams();

  const { pairs } = useExchangeInfo();

  const currentExchaingPair =
    pairs?.find((pair) => pair.urlParam === pairFromUrl) || defaultExchangePair;

  const { orderBook } = useOrderBook(currentExchaingPair.symbol);

  const handleDepthChange = (event: SelectChangeEvent) => {
    setDepth(event.target.value as Depth);
  };

  const handleDecimalChange = (event: SelectChangeEvent) => {
    setDecimal(event.target.value as DecimalsEnum);
  };

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: TableType
  ) => {
    setValue(newValue);
  };

  const renderOrderBookContent = () => {
    const precision = parseInt(decimal);
    const { baseAsset, quoteAsset } = currentExchaingPair;

    if (tabValue === TableEnum.both) {
      return (
        <>
          <Grid item xs={12} sm={6}>
            <OrderBookTable
              rows={orderBook.asks}
              precision={precision}
              title={TABLE_BUY_TITLE}
              baseAsset={baseAsset}
              quoteAsset={quoteAsset}
              depth={depth}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <OrderBookTable
              rows={orderBook.bids}
              precision={precision}
              title={TABLE_SELL_TITLE}
              baseAsset={baseAsset}
              quoteAsset={quoteAsset}
              depth={depth}
            />
          </Grid>
        </>
      );
    } else {
      const rows = TableEnum.buy === tabValue ? orderBook.asks : orderBook.bids;

      const title =
        TableEnum.buy === tabValue ? TABLE_BUY_TITLE : TABLE_SELL_TITLE;

      return (
        <Grid item xs={12} sm={12}>
          <OrderBookTable
            rows={rows}
            title={title}
            baseAsset={baseAsset}
            precision={precision}
            quoteAsset={quoteAsset}
            depth={depth}
          />
        </Grid>
      );
    }
  };

  return (
    <Grid
      container
      spacing={2}
      p={8}
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item xs={12}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="order book table chooser"
        >
          <Tab label="Buy" value={TableEnum.buy} />
          <Tab label="Sell" value={TableEnum.sell} />
          <Tab label="Both" value={TableEnum.both} />
        </Tabs>
      </Grid>
      <Grid item xs={5}>
        <h1>Order Book — {currentExchaingPair.label}</h1>
      </Grid>
      <Grid item xs={3}>
        <PairSelector options={pairs} />
      </Grid>
      <Grid item xs={2}>
        <DepthSelector onChange={handleDepthChange} value={depth} />
      </Grid>
      <Grid item xs={2}>
        <GroupSelector onChange={handleDecimalChange} value={decimal} />
      </Grid>
      {renderOrderBookContent()}
    </Grid>
  );
};
