import { createContext } from "react";
import { CheckboxChangeHandler, InputChangeHandler } from "./interfaces";

interface FormContextProperties {
  formData: Record<string, string | boolean | number>;
  inputChangeHandler: InputChangeHandler;
  checkboxChangeHandler: CheckboxChangeHandler;
}

export const FormContext = createContext<FormContextProperties>({
  formData: {},
  inputChangeHandler: () => undefined,
  checkboxChangeHandler: () => undefined,
});
