export const useFilteredItems = (items, searchQuery) => {
  const lowerCaseQuery = searchQuery.toLowerCase();

  return items.filter((item) => {
    return Object.keys(item).some((key) => {
      const value = item[key];

      if (typeof value === "string") {
        return value.toLowerCase().includes(lowerCaseQuery);
      }

      return false;
    });
  });
};
