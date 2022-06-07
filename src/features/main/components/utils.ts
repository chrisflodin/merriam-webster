export const getActiveFilter = (filter: Map<string, boolean>): string => {
  for (const [key, val] of filter.entries()) {
    if (val) return key;
  }
  return "";
};

export const validateQuery = (query: string | null, filter: Map<string, boolean>): boolean => {
  if (!query) return false;

  const searchTermRegex = new RegExp(
    Array.from(filter)
      .map((word) => `^${word[0]}^`)
      .join("|")
  );

  return searchTermRegex.test(query);
};
