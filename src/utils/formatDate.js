export const formatDate = (timestamp) => {
  if (!timestamp) return "";

  const date = timestamp.toDate();
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatChartDate = (timestamp) => {
  if (!timestamp) return "";

  const date = new Date(timestamp);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const convertToDate = (input) => {
  if (input instanceof Date) return input;
  if (input?.seconds) return input.toDate(); 
  return new Date(input); 
};

export const formatDateAndTime = (input) => {
  if (!input) return "";
  const date = convertToDate(input);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
