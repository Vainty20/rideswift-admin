import { useParams } from "react-router-dom";
import { Divider } from "react-daisyui";
import useFetchSingleData from "../hooks/useFetchSingleData";
import useFetchBookings from "../hooks/useFetchBookings";
import BookingHistoryCard from "../components/ui/BookingHistoryCard";
import DefaultPic from "../assets/default-profile.jpg";

export default function ViewDriverPage() {
  const { id } = useParams();
  const { data: driver, loading, error } = useFetchSingleData(id, "drivers");
  const { bookings } = useFetchBookings();

  const filteredBookings = bookings.filter(
    (book) => book.driverId === id && book.bookStatus === "dropoff"
  );

  if (loading) return <>Loading...</>;
  if (error) return <>{error.message}</>;

  return (
    <>
      <h1>View Driver</h1>
      <div className="flex items-center gap-6">
        <div
          className="avatar indicator tooltip"
          data-tip={driver?.isApproved ? "active" : "disabled"}
        >
          <span
            className={`indicator-item badge  ${
              driver?.isApproved ? "badge-success" : "badge-error"
            }`}
          ></span>
          <div className="mask mask-squircle w-24">
            <img
              src={driver?.profilePic ? driver?.profilePic : DefaultPic}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">
            {driver?.firstName} {driver?.lastName}
          </h2>
          <p>{driver?.email}</p>
        </div>
      </div>
      <Divider />
      <div className="flex flex-wrap gap-2">
        {filteredBookings.map((book) => (
          <BookingHistoryCard
            key={book?.id}
            id={book?.id}
            profilePic={book?.userProfilePic}
            name={book?.userName}
            mobileNumber={book?.userMobileNumber}
            pickupLocation={book?.pickupLocation}
            dropoffLocation={book?.dropoffLocation}
            createdAt={book?.createdAt}
          />
        ))}
      </div>
    </>
  );
}
