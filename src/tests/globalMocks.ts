import { vi } from "vitest";
import mockData from "tests/mockData.ts";

export const globalMocks = () => {
  // @ts-expect-error Not sure how to type mock for global fetch
  globalThis.fetch = vi.fn(() =>
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
