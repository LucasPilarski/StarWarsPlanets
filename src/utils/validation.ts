import type { Field, FormData, ValidationRules } from "@/types";

type ValidationResponse = Pick<Field, "isValid" | "message">;

const validationMethods = {
  /**
   * @description Test description for min method
   * @param value string
   * @param length string
   */
  min: (value: string, length: number) => {
    return value.length >= length
      ? ""
      : `Field is shorter than required ${length} characters`;
  },
  required: (value: string) => {
    return value.length > 0 ? "" : "Field is required";
  },
  isEmail: (value: string) => {
    const isValid = value.match(
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    );
    return isValid === null ? "Input is not a valid email" : "";
  },
};

export const validation = {
  validate: (field: Field<string>): ValidationResponse => {
    if (!field.rules) {
      return {
        isValid: true,
        message: "",
      };
    }
    // @TODO Find a way to iterate only till the first error message is found.
    const validatedData = Object.entries(field.rules)
      .map(([key, params]) =>
        validationMethods[key as ValidationRules](
          field.value,
          params as number,
        ),
      )
      .filter((result) => result !== "");
    return {
      isValid: validatedData.length === 0,
      message: validatedData.length > 0 ? validatedData[0] : "",
    };
  },
  validateAll: (fields: FormData<string>): FormData<string> => {
    Object.entries({ ...fields }).forEach(([key, field]) => {
      fields[key] = {
        ...fields[key],
        ...validation.validate(field),
      };
    });
    return fields;
  },
};
