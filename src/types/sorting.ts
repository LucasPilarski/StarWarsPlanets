export type SortDirection = "asc" | "desc";

export type SortColumn =
  | ""
  | "name"
  | "population"
  | "rotation_period"
  | "climate"
  | "gravity";

export type SortParams = {
  sortColumn: SortColumn;
  sortDirection: SortDirection;
};
