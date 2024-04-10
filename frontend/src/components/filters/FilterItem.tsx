import { Select, MenuItem, InputLabel, FormControl, IconButton, SelectChangeEvent } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

import { DateRangeSelect } from "./DateRangeSelect";
import { DayOfWeekSelect } from "./DayOfWeekSelect";
import { Filter, FilterType, filterTypes, newFilter } from "../../types/Filters";

export function FilterItem(props: FilterItemProps) {
  const { filter, setFilter, removeFilter } = props;

  const handleTypeChange = (event: SelectChangeEvent) => {
    const filterType = event.target.value as FilterType;
    if (filterType === filter.type) {
      return;
    }
    setFilter(newFilter(filterType));
  };

  const getFilterComponent = (filter: Filter) => {
    switch (filter.type) {
      case "Date Range":
        return <DateRangeSelect setFilter={setFilter} filter={filter} />;
      case "Day of Week":
        return <DayOfWeekSelect setFilter={setFilter} filter={filter} />;
      default:
        return <div>Error: Unknown Filter Type</div>;
    }
  };

  return (
    <li style={{ marginBottom: '30px' }}>
      <div style={{ display: 'flex'}}>
        <div style={{ flex: 1, marginRight: '6px' }}>
          <div>
            <FormControl fullWidth>
              <InputLabel>Filter Type</InputLabel>
              <Select
                label="Filter Type"
                value={filter.type}
                onChange={handleTypeChange}
              >
                {filterTypes.map((filterType) => <MenuItem value={filterType} key={filterType}>{filterType}</MenuItem>)}
              </Select>
            </FormControl>
          </div>
          {filter.type !== "" ? (<div style={{marginTop: '10px' }}>{getFilterComponent(filter)}</div>) : <></>}
        </div>
        <div style={{ alignItems: 'center', display: 'flex' }}>
          <IconButton aria-label="remove" onClick={removeFilter}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </li>
  );
}

export type FilterItemProps = {
  filter: Filter,
  setFilter: (filter: Filter) => void,
  removeFilter: () => void,
};
