import type { SelectOption } from "types/input.ts";
import type { SortDirection } from "types/sorting.ts";

export type UnknownResultsFields = "population" | "rotation_period" | "climate";

// 1 equals 1 standard G, 2 equals 2 standard G etc.
export type Gravity = "1" | "2" | "0.5";

export type Planet = {
  name: string;
  diameter: string; // Integer encoded as string
  rotation_period: string; // Integer encoded as string
  orbital_period: string; // Integer encoded as string
  gravity: Gravity; // Integer encoded as string
  population: string; // Integer encoded as string
  climate: string; // Integer encoded as string
  terrain: string; // Integer encoded as string
  surface_water: string; // Integer encoded as string
  residents: string[];
  films: string[];
  url: string;
  created: string; // ISO 8601 date format
  edited: string; // ISO 8601 date format
};

export type MappedPlanet = Planet & {
  isSelected: boolean;
  isAvailable: boolean;
  id: string;
};

export type TableHeader = SelectOption & {
  canSort: boolean;
};

export type MappedTableHeader = TableHeader & {
  sortBy: boolean;
  sortDirection: SortDirection;
};

export type Pagination = Record<"currentPage" | "lastPage" | "limit", number>;
