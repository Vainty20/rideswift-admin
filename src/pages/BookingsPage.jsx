import BookingList from "../features/bookings/BookingList";

export default function BookingsPage() {
  return (
    <>
      <div className="mb-4">
        <h1>Bookings</h1>
        <p className="text-lg">
          Manage and view all of the bookings in one place.
        </p>
      </div>
      <BookingList />
    </>
  );
}
