declare type NullableString = string | null;

declare type NullableNumber = number | null;

declare type NullableBoolean = boolean | null;

declare type ExchangePair = {
  symbol: string;
  urlParam: string;
  label: string;
  quoteAsset: string;
  baseAsset: string;
  groupOptions: number[];
};

declare type Depth = "15" | "30" | "50" | "100";
declare type Price = string;
declare type Size = string;

declare type Ask = [Price, Size];
declare type Bid = [Price, Size];

declare type OrderBookRow = {
  price: Price;
  size: Size;
};

declare type OrderBook = {
  asks: OrderBookRow[];
  bids: OrderBookRow[];
  lastUpdateId: NullableNumber;
};
