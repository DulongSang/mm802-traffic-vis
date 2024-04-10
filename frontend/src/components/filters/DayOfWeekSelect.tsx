import { Button, ButtonGroup } from "@mui/material";

import { DayOfWeekFilter, daysOfWeek } from "../../types/Filters";

const DAY_ABBRS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function DayOfWeekSelect(props: DayOfWeekSelectProps) {
  const { filter, setFilter } = props;
  const { days } = filter;

  return (
    <ButtonGroup fullWidth>
      {daysOfWeek.map((day, index) => (
        <Button
          key={day}
          variant={days.includes(day) ? "contained" : "outlined"}
          onClick={() => {
            if (days.includes(day)) {
              setFilter({ ...filter, days: days.filter((d) => d !== day) });
            } else {
              setFilter({ ...filter, days: [...days, day] });
            }
          }}
        >
          {DAY_ABBRS[index]}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export type DayOfWeekSelectProps = {
  filter: DayOfWeekFilter,
  setFilter: (filter: DayOfWeekFilter) => void,
}
