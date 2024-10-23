import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Divider, Table } from "react-daisyui";
import { useDispatch, useSelector } from "react-redux";
import { IoTrashOutline } from "react-icons/io5";
import { deleteSchedule, fetchSchedules } from "./scheduleSlice";
import { useFilteredItems } from "../../hooks/useFilteredItems";
import { usePagination } from "../../hooks/usePagination";
import PaginationFilter from "../../components/ui/PaginationFilter";
import SearchFilter from "../../components/ui/SearchFilter";
import DefaultPic from "../../assets/default-profile.jpg";

export default function ScheduleList() {
  const dispatch = useDispatch();
  const { schedules, loading, error } = useSelector((state) => state.schedules);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchSchedules());
  }, [dispatch]);

  const filteredSchedules = useFilteredItems(schedules, searchQuery);

  const actualItemsPerPage =
    itemsPerPage === "All" ? filteredSchedules.length : itemsPerPage;

  const { currentItems: currentSchedules, totalPages } = usePagination(
    filteredSchedules,
    actualItemsPerPage,
    currentPage,
    setCurrentPage
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this schedule?"))
      return;

    try {
      dispatch(deleteSchedule(id));
      toast.success("Schedule deleted successfully.");
    } catch (error) {
      console.error("Error deleting schedule: ", error);
      toast.error("Failed to delete schedule.");
    }
  };

  if (loading) return <>Loading...</>;
  if (error) return <>{error.message}</>;

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

      {filteredSchedules.length === 0 ? (
        <p className="text-center text-gray-500">
          {searchQuery
            ? "We couldn't find any schedules matching your search."
            : "No available schedules at the moment."}
        </p>
      ) : (
        <>
          <div className="overflow-auto">
            <Table className="table-auto w-full" zebra>
              <Table.Head>
                <span>Avatar</span>
                <span>Name</span>
                <span>Mobile Number</span>
                <span>Plate Number</span>
                <span>Max Load</span>
                <span>Scheduled At</span>
                <span>Actions</span>
              </Table.Head>
              <Table.Body>
                {currentSchedules.map((schedule) => (
                  <Table.Row key={schedule.id}>
                    <span>
                      <div className="avatar indicator">
                        <div className="mask mask-squircle w-12">
                          <img
                            src={
                              schedule?.driverProfilePic
                                ? schedule?.driverProfilePic
                                : DefaultPic
                            }
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                    </span>
                    <span>{schedule.driverName}</span>
                    <span>{schedule.driverMobileNumber}</span>
                    <span>{schedule.driverPlateNumber}</span>
                    <span>{schedule.driverMaxLoad}</span>
                    <span>{schedule.scheduledAt}</span>
                    <span>
                      <div className="tooltip" data-tip="delete schedule">
                        <Button
                          color="error"
                          shape="circle"
                          onClick={() => handleDelete(schedule.id)}
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
