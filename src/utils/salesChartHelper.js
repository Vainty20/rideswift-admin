import { monthNames } from "../data/monthNames";
import { formatDate } from "./formatDate";
import { getWeekNumber } from "./getWeekNumber";

export const filterBookings = (bookings, filterType) => {
  const currentDate = new Date();
  let filteredBookings = [];

  if (filterType === "monthly") {
    filteredBookings = bookings.filter((booking) => {
      const bookingDate = new Date(formatDate(booking.createdAt));
      const bookingMonth = bookingDate.getMonth();
      const currentMonth = currentDate.getMonth();
      return bookingMonth >= currentMonth - 2 && bookingMonth <= currentMonth;
    });
  } else if (filterType === "weekly") {
    filteredBookings = bookings.filter((booking) => {
      const bookingDate = new Date(formatDate(booking.createdAt));
      const bookingWeek = getWeekNumber(bookingDate);
      const currentWeek = getWeekNumber(currentDate);
      return bookingWeek >= currentWeek - 2 && bookingWeek <= currentWeek;
    });
  } else if (filterType === "daily") {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(currentDate.getDate() - 6);
    filteredBookings = bookings.filter((booking) => {
      const bookingDate = new Date(formatDate(booking.createdAt));
      return bookingDate >= sevenDaysAgo && bookingDate <= currentDate;
    });
  }

  return filteredBookings;
};

export const generateLabel = (date, filterType) => {
  const bookingDate = new Date(date.seconds * 1000);
  if (filterType === "monthly") {
    return monthNames[bookingDate.getMonth()];
  } else if (filterType === "weekly") {
    return `Week ${getWeekNumber(bookingDate)}`;
  } else if (filterType === "daily") {
    return `${bookingDate.getDate()}/${bookingDate.getMonth() + 1}`;
  }
};

export const calculateTotalIncome = (filteredBookings) => {
  return filteredBookings.reduce(
    (total, booking) => total + booking.ridePrice,
    0
  );
};

export const calculateMaxYValue = (data) => {
  return Math.max(...data.map((item) => item.y), 0);
};

export const groupAndSumBookings = (filteredBookings, filterType) => {
  const groupedData = {};

  filteredBookings.forEach((booking) => {
    const label = generateLabel(booking.createdAt, filterType);

    if (!groupedData[label]) {
      groupedData[label] = 0;
    }

    groupedData[label] += booking.ridePrice;
  });

  return Object.entries(groupedData).map(([label, totalRidePrice]) => ({
    x: label,
    y: totalRidePrice,
  }));
};
