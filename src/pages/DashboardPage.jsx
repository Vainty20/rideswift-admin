import { useSelector } from "react-redux";
import { Divider } from "react-daisyui";
import { greetings } from "../utils/greetings";
import useFetchBookings from "../hooks/useFetchBookings";
import useFetchDrivers from "../hooks/useFetchDrivers";
import useFetchUsers from "../hooks/useFetchUsers";
import RecentDriversCard from "../components/cards/RecentDriversCard";
import RecentUsersCard from "../components/cards/RecentUsersCard";
import Analytics from "../features/analytics/Analytics";
import SalesChartCard from "../components/cards/SalesChartCard";

export default function DashboardPage() {
  const { user, loading: authLoading } = useSelector((state) => state.auth);
  const { bookings, loading: bookingLoading } = useFetchBookings();
  const { drivers, loading: driverLoading } = useFetchDrivers();
  const { users, loading: userLoading } = useFetchUsers();

  if (authLoading || bookingLoading || driverLoading || userLoading)
    return <div>Loading...</div>;

  return (
    <>
      <h1>Dashboard</h1>
      <p className="text-lg max-w-4xl">
        {greetings()}, <strong>{user?.username}</strong>! Welcome back to your
        dashboard. <br />
        Here&apos;s to another <strong>
          productive day—stay focused
        </strong>, <strong>manage your tasks</strong>, and{" "}
        <strong>view app progress.</strong>
      </p>
      <Divider />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
        <div className="col-span-1 xl:col-span-2">
          <SalesChartCard bookings={bookings} />
        </div>
        <div className="col-span-1">
          <Analytics bookings={bookings} drivers={drivers} users={users} />
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <RecentDriversCard drivers={drivers} />
        <RecentUsersCard users={users} />
      </div>
    </>
  );
}
