import { Dayjs } from "dayjs";

export const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;

export type DateRangeFilter = {
    type: "Date Range",
    fromDate: Dayjs | null,
    toDate: Dayjs | null,
};

export type DayOfWeekFilter = {
    type: "Day of Week",
    days: ((typeof daysOfWeek)[number])[],
};

export type EmptyFilter = {
    type: "",
};

export type Filter = 
    | DateRangeFilter
    | DayOfWeekFilter
    | EmptyFilter;
export type FilterType = Filter["type"];

export const filterTypes: FilterType[] = ["Date Range", "Day of Week"];

export function newFilter(type: FilterType): Filter {
    switch (type) {
        case "Date Range":
            return { type, fromDate: null, toDate: null };
        case "Day of Week":
            return { type, days: [] };
        default:
            return { type };
    }
}
