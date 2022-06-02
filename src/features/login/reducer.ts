import { FormState, InputActionType, InputReducer, InputType } from "./types";

export const formReducer: InputReducer = (prevState, action) => {
  let state: FormState;

  switch (action.type) {
    case InputActionType.USERNAME_CHANGED:
      state = updateInputFormState(prevState, InputType.USERNAME, action.payload!);
      break;

    case InputActionType.EMAIL_CHANGED:
      state = updateInputFormState(prevState, InputType.EMAIL, action.payload!);
      break;

    case InputActionType.PASSWORD_CHANGED:
      state = updateInputFormState(prevState, InputType.PASSWORD, action.payload!);
      break;

    case InputActionType.CONFIRM_PASSWORD_CHANGED:
      state = updateInputFormState(prevState, InputType.CONFIRM_PASSWORD, action.payload!);
      break;

    case InputActionType.SUBMIT:
      state = resetInputFormState(prevState);
      break;

    default:
      return { ...prevState };
  }

  state!.valid = isFormValid(state!);
  return { ...state };
};

const isFormValid = (prevState: FormState) => {
  return prevState.inputFields.every((input) => input.valid);
};

const updateInputFormState = (state: FormState, type: InputType, payload: string) => {
  const inputFields = state.inputFields;
  const index = inputFields.findIndex((input) => input.type === type)!;
  const input = inputFields[index];

  input.touched = true;
  input.value = payload;
  input.valid = input.validator(payload!, inputFields);

  inputFields[index] = input;

  return state;
};

const resetInputFormState = (state: FormState) => {
  state.inputFields = state.inputFields.map((input) => {
    return {
      ...input,
      touched: false,
      value: "",
      valid: false,
    };
  });

  return state;
};
