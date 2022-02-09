import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

export interface DepthSelectorProps {
  onChange: (event: SelectChangeEvent) => void;
  value: Depth;
}

export const DepthSelector = ({ onChange, value }: DepthSelectorProps) => {
  return (
    <Box sx={{ minWidth: 130 }}>
      <FormControl fullWidth>
        <InputLabel id="depth-selector-label">Depth</InputLabel>
        <Select
          labelId="depth-selector-label"
          id="depth-selector"
          value={value}
          label="Depth"
          onChange={onChange}
        >
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
