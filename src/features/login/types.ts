export interface FormState {
  inputFields: InputField[];
  valid?: boolean;
}

export interface InputState {
  touched?: boolean;
  valid?: boolean;
  value?: string;
}

export interface InputField {
  type: InputType;
  value?: string;
  touched?: boolean;
  valid?: boolean;
  label: string;
  placeholder: string;
  textType?: "text" | "password";
  validator: (val: string, inputArr: InputField[]) => boolean;
}

export enum InputType {
  USERNAME = "USERNAME",
  PASSWORD = "PASSWORD",
  CONFIRM_PASSWORD = "CONFIRM_PASSWORD",
  EMAIL = "EMAIL",
}

export interface InputAction {
  type: InputActionType;
  payload?: string;
}

export enum InputActionType {
  USERNAME_CHANGED = "USERNAME_CHANGED",
  PASSWORD_CHANGED = "PASSWORD_CHANGED",
  CONFIRM_PASSWORD_CHANGED = "CONFIRM_PASSWORD_CHANGED",
  EMAIL_CHANGED = "EMAIL_CHANGED",
  SUBMIT = "SUBMIT",
}

export type InputReducer = (state: FormState, action: InputAction) => FormState;
