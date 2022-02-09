import {
  TextField,
  Autocomplete,
  styled,
  autocompleteClasses,
  Popper,
} from "@mui/material";
import { memo } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Listbox as ListboxComponent } from "./components";

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
});

export type PairSelectorProps = {
  options: ExchangePair[];
};

export const PairSelector = memo(({ options }: PairSelectorProps) => {
  const { pair: currentPair } = useParams();
  const navigate = useNavigate();

  const getValue = () =>
    options?.find((opt) => opt?.urlParam === currentPair) ?? null;

  return (
    <Autocomplete
      value={getValue()}
      sx={{ minWidth: 180 }}
      onChange={(event, newValue: ExchangePair | null) => {
        if (newValue) {
          navigate(`/orderbook/${newValue.urlParam}`);
        }
      }}
      disableListWrap
      PopperComponent={StyledPopper}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, optVal) => option.label === optVal.label}
      ListboxComponent={ListboxComponent}
      id="pair-selector"
      options={options}
      renderOption={(props, option) => [props, option.label]}
      renderInput={(params) => <TextField {...params} label="Pair" />}
    />
  );
});
