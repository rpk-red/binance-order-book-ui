import { useState, useEffect, useMemo } from "react";
import { executeFetch } from "../utils";

type SymbolType = {
  baseAsset: string;
  baseAssetPrecision: number;
  filters: unknown[];
  icebergAllowed: boolean;
  isMarginTradingAllowed: boolean;
  isSpotTradingAllowed: boolean;
  ocoAllowed: boolean;
  orderTypes: string[];
  permissions: string[];
  quoteAsset: string;
  quoteAssetPrecision: number;
  quoteCommissionPrecision: number;
  quotePrecision: number;
  status: string;
  symbol: string;
};

export type ExchangeInfo = {
  exchangeFilters: unknown[];
  rateLimits: unknown[];
  serverTime: number;
  symbols: SymbolType[];
  timezone: string;
};

const formatPairs = (exchangeInfo: ExchangeInfo | null): ExchangePair[] => {
  if (exchangeInfo === null) return [];

  const result = exchangeInfo.symbols
    .filter((element: SymbolType) => element.status === "TRADING")
    .map((sym: SymbolType) => {
      return {
        symbol: sym.symbol,
        urlParam: `${sym.baseAsset}_${sym.quoteAsset}`,
        label: `${sym.baseAsset}/${sym.quoteAsset}`,
        baseAsset: sym.baseAsset,
        quoteAsset: sym.quoteAsset,
      };
    });
  return result;
};

export function useExchangeInfo(): {
  pairs: ExchangePair[];
} {
  const [exchangeInfo, setExchangeInfo] = useState<ExchangeInfo | null>(null);

  useEffect(() => {
    const exchangeInfoFromRESTfulAPI = async () => {
      const url = "https://api.binance.com/api/v3/exchangeInfo";

      const result = await executeFetch(url, { method: "get" });
      setExchangeInfo(result);
    };
    exchangeInfoFromRESTfulAPI();
  }, []);

  const pairs = useMemo(() => formatPairs(exchangeInfo), [exchangeInfo]);

  return {
    pairs,
  };
}
