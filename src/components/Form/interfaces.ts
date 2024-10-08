import { ChangeEventHandler } from "react";

export type InputChangeHandler = ChangeEventHandler<HTMLInputElement>;
export type CheckboxChangeHandler = (event: {
  id: string;
  value: boolean;
}) => void;
export type FormDataHandler = (form: Record<string, string>) => void;
