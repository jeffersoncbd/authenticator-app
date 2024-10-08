import { createContext } from "react";
import { CustomChangeHandler, InputChangeHandler } from "./interfaces";

interface FormContextProperties {
  formData: Record<string, string | boolean | number>;
  inputChangeHandler: InputChangeHandler;
  customChangeHandler: CustomChangeHandler;
}

export const FormContext = createContext<FormContextProperties>({
  formData: {},
  inputChangeHandler: () => undefined,
  customChangeHandler: () => undefined,
});
