export const tryCatchWrapper = (fn: Function, ...args: any[]) => {
  try {
    const res = fn(...args);
    return [null, res];
  } catch (err) {
    if (err instanceof Error) {
      return [new Error(err.message), null];
    }
  }
};
