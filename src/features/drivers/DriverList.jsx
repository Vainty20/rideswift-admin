import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Divider, Table, Toggle } from "react-daisyui";
import { toast } from "react-toastify";
import { IoCalendarOutline, IoEyeOutline } from "react-icons/io5";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useFilteredItems } from "../../hooks/useFilteredItems";
import { usePagination } from "../../hooks/usePagination";
import useFetchDrivers from "../../hooks/useFetchDrivers";
import PaginationFilter from "../../components/ui/PaginationFilter";
import SearchFilter from "../../components/ui/SearchFilter";
import SetDriverScheduleModal from "../../components/modals/SetDriverScheduleModal";
import DefaultPic from "../../assets/default-profile.jpg";

export default function DriverList() {
  const { drivers } = useFetchDrivers();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const filteredDrivers = useFilteredItems(drivers, searchQuery);

  const actualItemsPerPage =
    itemsPerPage === "All" ? filteredDrivers.length : itemsPerPage;

  const { currentItems: currentDrivers, totalPages } = usePagination(
    filteredDrivers,
    actualItemsPerPage,
    currentPage,
    setCurrentPage
  );

  const handleUpdateStatus = async (driverId, isApproved) => {
    if (!window.confirm("Are you sure you want to update his/her status?"))
      return;
    try {
      const driverRef = doc(db, "drivers", driverId);
      await updateDoc(driverRef, { isApproved: !isApproved });
      toast.success("Status updated successfully");
    } catch (err) {
      toast.error("Error updating status:", err);
    }
  };

  const openModal = (driver) => {
    setSelectedDriver(driver);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDriver(null);
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

      {filteredDrivers.lengspan === 0 ? (
        <p className="text-center text-gray-500">
          {searchQuery
            ? "We couldn't find any drivers matching your search."
            : "No available drivers at spane moment."}
        </p>
      ) : (
        <>
          <div className="overflow-auto">
            <Table className="table-auto w-full" zebra>
              <Table.Head>
                <span>Avatar</span>
                <span>First Name</span>
                <span>Last Name</span>
                <span>Mobile Number</span>
                <span>Vehicle</span>
                <span>Plate Number</span>
                <span>Active</span>
                <span>Actions</span>
              </Table.Head>
              <Table.Body>
                {currentDrivers.map((driver) => (
                  <Table.Row key={driver.id}>
                    <span>
                      <div className="avatar indicator">
                        <span
                          className={`indicator-item rounded-full text-white badge  ${
                            driver?.isApproved ? "badge-success" : "badge-error"
                          }`}
                        >
                          {driver?.isApproved ? "active" : "disabled"}
                        </span>
                        <div className="mask mask-squircle w-12">
                          <img
                            src={
                              driver?.profilePic
                                ? driver?.profilePic
                                : DefaultPic
                            }
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                    </span>
                    <span>{driver.firstName}</span>
                    <span>{driver.lastName}</span>
                    <span>{driver.mobileNumber}</span>
                    <span>{driver.vehicle}</span>
                    <span>{driver.plateNumber}</span>
                    <span>
                      <div
                        className="tooltip"
                        data-tip={` ${
                          driver.isApproved ? "disabled" : "enable"
                        } this account`}
                      >
                        <Toggle
                          checked={driver.isApproved}
                          onChange={() =>
                            handleUpdateStatus(driver.id, driver.isApproved)
                          }
                          className={
                            driver.isApproved
                              ? "bg-success border-success hover:bg-success"
                              : "bg-error border-error hover:bg-error"
                          }
                        />
                      </div>
                    </span>
                    <span className="flex gap-2">
                      <div
                        className="tooltip"
                        data-tip="Go to driver's profile"
                      >
                        <Link
                          to={`/drivers/${driver.id}`}
                          className="btn btn-primary btn-circle"
                        >
                          <IoEyeOutline size={30} color="white" />
                        </Link>
                      </div>
                      {!driver?.isApproved ? (
                        <div
                          className="tooltip"
                          data-tip="set driver's schedule"
                        >
                          <Button
                            color="success"
                            shape="circle"
                            onClick={() => openModal(driver)}
                          >
                            <IoCalendarOutline size={25} color="white" />
                          </Button>
                        </div>
                      ) : null}
                      {isModalOpen && (
                        <SetDriverScheduleModal
                          driver={selectedDriver}
                          isOpen={isModalOpen}
                          onClose={closeModal}
                        />
                      )}
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
