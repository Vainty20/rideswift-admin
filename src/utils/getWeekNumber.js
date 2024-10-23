export const getWeekNumber = (date) => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const diff = date - startOfYear;
  return Math.ceil(
    (diff / (1000 * 60 * 60 * 24) + startOfYear.getDay() + 1) / 7
  );
};
