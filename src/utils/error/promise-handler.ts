export const promiseHandler = <T>(promise: Promise<T>): Promise<(T | null)[] | [Error, null]> =>
  promise.then((data: T) => [null, data]).catch((err: Error) => [err, null]);
