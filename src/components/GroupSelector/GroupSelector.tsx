import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

export interface GroupSelectorProps {
  onChange: (event: SelectChangeEvent) => void;
  value: string;
}

export const GroupSelector = ({ onChange, value }: GroupSelectorProps) => {
  return (
    <Box sx={{ minWidth: 130 }}>
      <FormControl fullWidth>
        <InputLabel id="group-selector-label">Group</InputLabel>
        <Select
          labelId="group-selector-label"
          id="group-selector"
          value={value}
          label="Group"
          onChange={onChange}
        >
          <MenuItem value={0}>0 decimals</MenuItem>
          <MenuItem value={1}>1 decimals</MenuItem>
          <MenuItem value={2}>2 decimals</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
