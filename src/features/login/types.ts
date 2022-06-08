export interface FormState {
  inputFields: InputField[];
  valid?: boolean;
  error: string | null;
}

export interface InputField {
  type: InputType;
  value?: string;
  touched?: boolean;
  valid?: boolean;
  label: string;
  placeholder: string;
  textType?: "text" | "password";
  showsValidation?: boolean;
  validator: (val: string, inputArr: InputField[]) => boolean;
}

export enum InputType {
  USERNAME = "USERNAME",
  PASSWORD = "PASSWORD",
  CONFIRM_PASSWORD = "CONFIRM_PASSWORD",
  EMAIL = "EMAIL",
  FORM = "FORM",
  ERROR = "ERROR",
}

export enum InputActionType {
  CHANGED = "CHANGED",
  RESET = "RESET",
  ERROR_THROWN = "ERROR_THROWN",
}

export interface InputAction {
  actionType: InputActionType;
  inputType: InputType;
  payload?: string;
}

export type InputReducer = (state: FormState, action: InputAction) => FormState;
