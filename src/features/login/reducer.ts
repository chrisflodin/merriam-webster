import { FormState, InputActionType, InputReducer, InputType } from "./types";

export const formReducer: InputReducer = (prevState, action) => {
  let state: FormState;

  switch (action.inputType) {
    case InputType.USERNAME:
    case InputType.EMAIL:
    case InputType.PASSWORD:
    case InputType.CONFIRM_PASSWORD:
      state = updateInputFormState(prevState, action.inputType, action.payload!);
      break;

    case InputType.ERROR:
      if (!action.payload) return prevState;
      let error = action.actionType === InputActionType.ERROR_THROWN ? action.payload : null;

      state = {
        ...prevState,
        error: error,
      };
      break;

    case InputType.FORM:
      if (!(action.actionType === InputActionType.RESET)) return prevState;
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
  const index = inputFields.findIndex((input) => input.type === type);
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

  return {
    ...state,
    error: null,
    valid: false,
  } as FormState;
};
