import { ChangeEventHandler } from "react";

interface Event {
  id: string;
  value: string | boolean;
}

export type InputChangeHandler = ChangeEventHandler<HTMLInputElement>;
export type CustomChangeHandler = (event: Event) => void;
export type SubmitDataHandler = (
  form: Record<string, string | boolean>
) => void;
