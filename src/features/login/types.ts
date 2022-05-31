export interface InputState {
  touched?: boolean;
  valid?: boolean;
  value: string;
}

export interface FormState {
  username: InputState;
  email: InputState;
  password: InputState;
  confirmPassword: InputState;
  valid?: boolean;
}

export enum InputType {
  USERNAME = "USERNAME",
  PASSWORD = "PASSWORD",
  CONFIRM_PASSWORD = "CONFIRM_PASSWORD",
  EMAIL = "EMAIL",
}

export enum InputActionType {
  USERNAME_CHANGED = "USERNAME_CHANGED",
  PASSWORD_CHANGED = "PASSWORD_CHANGED",
  CONFIRM_PASSWORD_CHANGED = "CONFIRM_PASSWORD_CHANGED",
  EMAIL_CHANGED = "EMAIL_CHANGED",
  SUBMIT = "SUBMIT",
}

export interface InputAction {
  type: InputActionType;
  payload?: string;
}

export type InputReducer = (state: FormState, action: InputAction) => FormState;
