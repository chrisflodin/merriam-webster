import { FormState, InputType } from "./types";

export const getFormValue = (field: InputType, form: FormState) =>
  form.inputFields.find((input) => input.type === field)?.value!;
