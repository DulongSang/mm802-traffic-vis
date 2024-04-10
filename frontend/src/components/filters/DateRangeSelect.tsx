import { FormControl } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import { DateRangeFilter } from "../../types/Filters";

export function DateRangeSelect(props: DateRangeSelectProps) {
  const { filter, setFilter } = props;
  const { fromDate, toDate } = filter;

  return (
    <div style={{ display: 'flex' }}>
      <FormControl sx={{ flex: 1 }}>
        <DatePicker
          label="From"
          value={fromDate}
          onChange={(date) => {
            setFilter({ ...filter, fromDate: date });
          }}
          slotProps={{ textField: { size: 'small' } }}
        />
      </FormControl>
      <p style={{ margin: '0 10px' }}>-</p>
      <FormControl sx={{ flex: 1 }}>
        <DatePicker
          label="To"
          value={toDate}
          onChange={(date) => {
            setFilter({ ...filter, toDate: date });
          }}
          slotProps={{ textField: { size: 'small' } }}
        />
      </FormControl>
    </div>
  );
}

export type DateRangeSelectProps = {
  filter: DateRangeFilter,
  setFilter: (filter: DateRangeFilter) => void,
}
