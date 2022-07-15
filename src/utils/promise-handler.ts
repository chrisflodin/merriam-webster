type SuccessResponse<T> = readonly [null, T];
type ErrorResponse<U> = readonly [U, null];
type Result<T, U> = Promise<SuccessResponse<T> | ErrorResponse<U>>


export const promiseHandler = async <T, U extends Error>(promise: Promise<T>): Result<T, U> =>
  promise
    .then((data) => [null, data] as const)
    .catch((err) => [err, null] as const);