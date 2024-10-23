import { useMemo, useState } from "react";
import { getWeekNumber } from "../../utils/getWeekNumber";
import PieChartCard from "../../components/cards/PieChartCard";
import TopDriversCard from "../../components/cards/TopDriversCard";

export default function Analytics({ bookings, drivers, users }) {
  const [filterType, setFilterType] = useState("monthly");

  const filteredBookings = useMemo(() => {
    const now = new Date();
    return bookings.filter((booking) => {
      const bookingDate = new Date(booking.createdAt.seconds * 1000);
      if (filterType === "monthly") {
        return (
          bookingDate.getMonth() === now.getMonth() &&
          bookingDate.getFullYear() === now.getFullYear()
        );
      } else {
        return (
          getWeekNumber(bookingDate) === getWeekNumber(now) &&
          bookingDate.getFullYear() === now.getFullYear()
        );
      }
    });
  }, [bookings, filterType]);

  const driverIncome = useMemo(() => {
    const incomeMap = {};

    filteredBookings.forEach((booking) => {
      if (!incomeMap[booking.driverId]) {
        const driver = drivers.find((d) => d.id === booking.driverId);
        if (driver) {
          incomeMap[booking.driverId] = {
            driverProfilePic: driver.profilePic,
            driverName: `${driver.firstName} ${driver.lastName}`,
            totalIncome: 0,
            topDate: booking.createdAt.seconds * 1000,
          };
        }
      }

      if (incomeMap[booking.driverId]) {
        incomeMap[booking.driverId].totalIncome += booking.ridePrice;
      }
    });

    return Object.values(incomeMap);
  }, [filteredBookings, drivers]);

  const filteredTopDrivers = useMemo(() => {
    return [...driverIncome]
      .sort((a, b) => b.totalIncome - a.totalIncome)
      .slice(0, 5);
  }, [driverIncome]);

  const handleChangeFilterType = (type) => {
    setFilterType(type);
  };

  const totalDrivers = [...drivers].length;
  const totalUsers = [...users].length;

  const totalActiveDrivers = [...drivers].filter(
    (driver) => driver.isApproved === true
  ).length;
  const totalDisabledDrivers = [...drivers].filter(
    (driver) => driver.isApproved === false
  ).length;

  const totalActiveUsers = [...users].filter(
    (user) => user.isApproved === true
  ).length;
  const totalDisabledUsers = [...users].filter(
    (user) => user.isApproved === false
  ).length;

  return (
    <div className="flex flex-col items-center justify-center max-w-lg gap-4">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <PieChartCard
          activeLabel="Active Drivers"
          disabledLabel="Disabled Drivers"
          totalActive={totalActiveDrivers}
          totalDisabled={totalDisabledDrivers}
          totalValue={totalDrivers}
          title="Total Drivers"
        />

        <PieChartCard
          activeLabel="Active Users"
          disabledLabel="Disabled Users"
          totalActive={totalActiveUsers}
          totalDisabled={totalDisabledUsers}
          totalValue={totalUsers}
          title="Total Users"
        />
      </div>
      <TopDriversCard
        filterType={filterType}
        handleChangeFilterType={handleChangeFilterType}
        filteredTopDrivers={filteredTopDrivers}
      />
    </div>
  );
}
