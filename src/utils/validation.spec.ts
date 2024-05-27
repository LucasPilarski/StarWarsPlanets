import { validation } from "./validation.ts";
import { expect, describe, test } from "vitest";

describe("Utils validation", () => {
  test("Returns true", () => {
    expect(
      validation.validate({
        name: "",
        value: "",
        message: "",
        isValid: false,
        isDirty: false,
      }),
    ).toStrictEqual({
      isValid: true,
      message: "",
    });
  });
});
