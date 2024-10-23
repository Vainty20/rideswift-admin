import { useParams } from "react-router-dom";
import { Divider } from "react-daisyui";
import useFetchSingleData from "../hooks/useFetchSingleData";
import useFetchBookings from "../hooks/useFetchBookings";
import BookingHistoryCard from "../components/ui/BookingHistoryCard";
import DefaultPic from "../assets/default-profile.jpg";

export default function ViewUserPage() {
  const { id } = useParams();
  const { data: user, loading, error } = useFetchSingleData(id, "users");
  const { bookings } = useFetchBookings();

  const filteredBookings = bookings.filter(
    (book) => book.userId === id && book.bookStatus === "dropoff"
  );

  if (loading) return <>Loading...</>;
  if (error) return <>{error.message}</>;

  return (
    <>
      <h1>View User</h1>
      <div className="flex items-center gap-6">
        <div
          className="avatar indicator tooltip"
          data-tip={user?.isApproved ? "active" : "disabled"}
        >
          <span
            className={`indicator-item badge  ${
              user?.isApproved ? "badge-success" : "badge-error"
            }`}
          ></span>
          <div className="mask mask-squircle w-24">
            <img
              src={user?.profilePic ? user?.profilePic : DefaultPic}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">
            {user?.firstName} {user?.lastName}
          </h2>
          <p>{user?.email}</p>
        </div>
      </div>
      <Divider />
      <div className="flex flex-wrap gap-2">
        {filteredBookings.map((book) => (
          <BookingHistoryCard
            key={book?.id}
            id={book?.id}
            profilePic={book?.driverProfilePic}
            name={book?.driverName}
            mobileNumber={book?.driverMobileNumber}
            pickupLocation={book?.pickupLocation}
            dropoffLocation={book?.dropoffLocation}
            createdAt={book?.createdAt}
          />
        ))}
      </div>
    </>
  );
}
