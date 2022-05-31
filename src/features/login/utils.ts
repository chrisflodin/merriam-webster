import { FormState, InputActionType, InputReducer, InputState } from "./types";
import validator from "validator";
import { pswRequirement } from "./config";

export const formReducer: InputReducer = (prevState, action) => {
  let state: FormState,
    payload = action.payload!;

  switch (action.type) {
    case InputActionType.USERNAME_CHANGED:
      state = {
        ...prevState,
        username: {
          touched: true,
          value: payload,
          valid: payload.length >= 3 && validator.isAlphanumeric(payload),
        },
      };
      break;

    case InputActionType.EMAIL_CHANGED:
      state = {
        ...prevState,
        email: {
          touched: true,
          value: payload,
          valid: validator.isEmail(payload),
        },
      };
      break;

    case InputActionType.PASSWORD_CHANGED:
      state = {
        ...prevState,
        password: {
          touched: true,
          value: payload,
          valid: validator.isStrongPassword(payload, pswRequirement) && validator.isAlphanumeric(payload),
        },
        confirmPassword: {
          touched: prevState.confirmPassword.touched,
          ...prevState.confirmPassword,
        },
      };
      break;

    case InputActionType.CONFIRM_PASSWORD_CHANGED:
      state = {
        ...prevState,
        confirmPassword: {
          touched: true,
          value: payload,
          valid: payload === prevState.password.value && validator.isAlphanumeric(payload),
        },
      };
      break;

    default:
      break;
  }

  state!.valid = isFormValid(state!);
  return state!;
};

const isFormValid = (prevState: FormState) => {
  return Object.entries(prevState)
    .filter((prop) => prop[0] !== "valid")
    .every((prop: [string, InputState]) => {
      return prop[1].valid;
    });
};
