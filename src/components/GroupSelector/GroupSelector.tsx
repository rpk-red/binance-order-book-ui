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
  options: number[];
}

export const GroupSelector = ({
  onChange,
  value,
  options,
}: GroupSelectorProps) => {
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
          {options.map((option) => {
            return (
              <MenuItem key={option} value={option}>
                {option} decimals
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};
