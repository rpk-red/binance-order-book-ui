import { ReactElement, useEffect, useState } from "react";
import { Grid, SelectChangeEvent, Tabs, Tab, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
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
import { ERROR_PAGE } from "../../constants";

const enum TableEnum {
  buy = "buy",
  sell = "sell",
  both = "both",
}

type TableType = keyof typeof TableEnum;

export const OrderBookPage = (): ReactElement => {
  const [tabValue, setValue] = useState<TableType>(TableEnum.both);
  const [decimal, setDecimal] = useState<string>("");
  const [groupOptions, setGroupOptions] = useState<number[]>([]);
  const [depth, setDepth] = useState<Depth>("15");

  const navigate = useNavigate();
  const { pair: pairFromUrl } = useParams();

  const { pairs } = useExchangeInfo();

  const currentExchaingPair =
    pairs.find((pair) => pair.urlParam === pairFromUrl) || defaultExchangePair;

  const { orderBook } = useOrderBook(
    currentExchaingPair.symbol,
    parseInt(decimal)
  );

  const handleDepthChange = (event: SelectChangeEvent) => {
    setDepth(event.target.value as Depth);
  };

  const handleDecimalChange = (event: SelectChangeEvent) => {
    setDecimal(event.target.value as string);
  };

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: TableType
  ) => {
    setValue(newValue);
  };

  useEffect(() => {
    setGroupOptions(currentExchaingPair.groupOptions);
    setDecimal(
      currentExchaingPair.groupOptions[
        currentExchaingPair.groupOptions.length - 1
      ].toString()
    );
  }, [currentExchaingPair.groupOptions]);

  useEffect(() => {
    if (
      pairs.length != 0 &&
      !pairs.some((pair) => pair.urlParam === pairFromUrl)
    ) {
      navigate(ERROR_PAGE, { replace: true });
    }
  }, [pairs, pairFromUrl, navigate]);

  const renderOrderBookContent = () => {
    const precision = parseInt(decimal);
    const { baseAsset, quoteAsset } = currentExchaingPair;

    if (tabValue === TableEnum.both) {
      return (
        <>
          <Grid item xs={12} sm={12} md={6}>
            <OrderBookTable
              rows={orderBook.asks}
              precision={precision}
              title={TABLE_BUY_TITLE}
              baseAsset={baseAsset}
              quoteAsset={quoteAsset}
              depth={depth}
              initialState={{
                sorting: { sortModel: [{ field: "price", sort: "desc" }] },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
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

      const sort = TableEnum.buy === tabValue ? "desc" : "asc";

      return (
        <Grid item xs={12} sm={12}>
          <OrderBookTable
            initialState={{
              sorting: { sortModel: [{ field: "price", sort }] },
            }}
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
      direction="row"
      p={8}
      justifyContent="space-around"
      alignItems="start"
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
      <Grid item xs={12} sm={6} md={5}>
        <Typography
          variant="h4"
          component="h1"
          display="inline-block"
          align="center"
        >
          Order Book —
        </Typography>
        <Typography
          pl={1}
          variant="h5"
          component="h1"
          display="inline-block"
          align="center"
        >
          {currentExchaingPair.label}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <PairSelector options={pairs} />
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <DepthSelector onChange={handleDepthChange} value={depth} />
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <GroupSelector
          onChange={handleDecimalChange}
          value={decimal}
          options={groupOptions}
        />
      </Grid>
      {renderOrderBookContent()}
    </Grid>
  );
};
