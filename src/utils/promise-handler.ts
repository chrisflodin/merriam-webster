export type SuccessResponse<T> = readonly [null, T];
export type ErrorResponse<U> = readonly [U, null];
export type Result<T, U> = Promise<SuccessResponse<T> | ErrorResponse<U>>


export const promiseHandler = async <T, U extends Error>(promise: Promise<T>): Result<T, U> =>
  promise
    .then((data) => {
      return [null, data] as const
    })
    .catch((err) => [err, null] as const);