import { describe, test, expect, beforeEach, beforeAll } from "vitest";
import { render } from "@testing-library/vue";
import App from "./App.vue";
import { createPinia, setActivePinia } from "pinia";
import { globalMocks } from "tests/globalMocks.ts";

describe("App component", () => {
  beforeAll(() => {
    globalMocks();
  });
  beforeEach(async () => {
    setActivePinia(createPinia());
  });
  test("Renders properly", () => {
    const { container } = render(App);
    expect(container.querySelector(".main__container")).not.toBeNull();
  });
});
