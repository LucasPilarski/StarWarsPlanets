import { vi } from "vitest";
import mockData from "store/mockData.ts";

export const globalMocks = () => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      data: {
        results: mockData,
        next: null,
      },
      json: () =>
        Promise.resolve({
          results: mockData,
          next: null,
        }),
    }),
  );
};
