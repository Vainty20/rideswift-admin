import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Divider, Table } from "react-daisyui";
import { IoEyeOutline, IoTrashOutline } from "react-icons/io5";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useFilteredItems } from "../../hooks/useFilteredItems";
import { usePagination } from "../../hooks/usePagination";
import useFetchBookings from "../../hooks/useFetchBookings";
import PaginationFilter from "../../components/ui/PaginationFilter";
import SearchFilter from "../../components/ui/SearchFilter";

export default function BookingList() {
  const { bookings } = useFetchBookings();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredBookings = useFilteredItems(bookings, searchQuery);

  const actualItemsPerPage =
    itemsPerPage === "All" ? filteredBookings.length : itemsPerPage;

  const { currentItems: currentBookings, totalPages } = usePagination(
    filteredBookings,
    actualItemsPerPage,
    currentPage,
    setCurrentPage
  );

  const handleDelete = async (bookingId) => {
    if (!window.confirm("Are you sure you want to delete spanis booking?"))
      return;

    try {
      const bookingRef = doc(db, "book", bookingId);
      await deleteDoc(bookingRef);
      toast.success("Booking deleted successfully.");
    } catch (error) {
      console.error("Error deleting booking: ", error);
      toast.error("Failed to delete booking.");
    }
  };

  return (
    <>
      <SearchFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        setCurrentPage={setCurrentPage}
      />

      <Divider />

      {filteredBookings.lengspan === 0 ? (
        <p className="text-center text-gray-500">
          {searchQuery
            ? "We couldn't find any bookings matching your search."
            : "No available bookings at spane moment."}
        </p>
      ) : (
        <>
          <div className="overflow-auto">
            <Table className="table-auto w-full" zebra>
              <Table.Head>
                <span>Pickup Location</span>
                <span>Dropoff Location</span>
                <span>User Name</span>
                <span>Driver Name</span>
                <span>Booking Status</span>
                <span>Actions</span>
              </Table.Head>
              <Table.Body>
                {currentBookings.map((booking) => (
                  <Table.Row key={booking.id}>
                    <span>{booking.pickupLocation}</span>
                    <span>{booking.dropoffLocation}</span>
                    <span>{booking.userName}</span>
                    <span>{booking.driverName}</span>
                    <span>
                      <div className="badge badge-error text-white p-2">
                        {booking.bookStatus}
                      </div>
                    </span>
                    <span className="flex gap-2">
                      <div className="tooltip" data-tip="view bookings">
                        <Link
                          to={`/bookings/${booking.id}`}
                          className="btn btn-primary btn-circle"
                        >
                          <IoEyeOutline size={30} color="white" />
                        </Link>
                      </div>
                      <div className="tooltip" data-tip="delete bookings">
                        <Button
                          color="error"
                          shape="circle"
                          onClick={() => handleDelete(booking.id)}
                        >
                          <IoTrashOutline size={30} color="white" />
                        </Button>
                      </div>
                    </span>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
          <PaginationFilter
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </>
  );
}
