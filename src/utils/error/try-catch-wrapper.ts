export const tryCatchWrapper = (fn: Function, ...args: any[]): [null, any] | [Error | unknown, null] => {
  try {
    const res = fn(...args);
    return [null, res];
  } catch (err) {
    return [err, null];
  }
};
