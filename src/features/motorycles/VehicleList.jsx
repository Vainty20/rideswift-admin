import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Divider, Table } from "react-daisyui";
import { useDispatch, useSelector } from "react-redux";
import { deleteVehicle, fetchVehicles } from "./vehicleSlice";
import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";
import { useFilteredItems } from "../../hooks/useFilteredItems";
import { usePagination } from "../../hooks/usePagination";
import PaginationFilter from "../../components/ui/PaginationFilter";
import SearchFilter from "../../components/ui/SearchFilter";
import EditVehicleModal from "../../components/modals/EditVehicleModal";

export default function VehicleList() {
  const dispatch = useDispatch();
  const { vehicles, loading } = useSelector((state) => state.vehicles);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  const filteredVehicles = useFilteredItems(vehicles, searchQuery);

  const sortedVehicles = filteredVehicles.sort((a, b) =>
    a.vehicle.localeCompare(b.vehicle)
  );

  const actualItemsPerPage =
    itemsPerPage === "All" ? filteredVehicles.length : itemsPerPage;

  const { currentItems: currentVehicles, totalPages } = usePagination(
    sortedVehicles,
    actualItemsPerPage,
    currentPage,
    setCurrentPage
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?"))
      return;

    try {
      dispatch(deleteVehicle(id));
      toast.success("Vehicle deleted successfully.");
    } catch (error) {
      console.error("Error deleting vehicle: ", error);
      toast.error("Failed to delete vehicle.");
    }
  };

  const openEditModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedVehicle(null);
  };

  if (loading) return <>Loading...</>;

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

      {filteredVehicles.length === 0 ? (
        <p className="text-center text-gray-500">
          {searchQuery
            ? "We couldn't find any vehicles matching your search."
            : "No available vehicles at the moment."}
        </p>
      ) : (
        <>
          <div className="overflow-auto">
            <Table className="table-auto w-full" zebra>
              <Table.Head>
                <span>ID</span>
                <span>Vehicle</span>
                <span>Actions</span>
              </Table.Head>
              <Table.Body>
                {currentVehicles.map((vehicle) => (
                  <Table.Row key={vehicle.id}>
                    <span>{vehicle.id}</span>
                    <span>{vehicle.vehicle}</span>
                    <span className="flex gap-2">
                      <div className="tooltip" data-tip="edit vehicle">
                        <Button
                          color="success"
                          shape="circle"
                          onClick={() => openEditModal(vehicle)}
                        >
                          <IoPencilOutline size={30} color="white" />
                        </Button>
                      </div>
                      <div className="tooltip" data-tip="delete vehicle">
                        <Button
                          color="error"
                          shape="circle"
                          onClick={() => handleDelete(vehicle.id)}
                        >
                          <IoTrashOutline size={30} color="white" />
                        </Button>
                      </div>
                      {isEditModalOpen && (
                        <EditVehicleModal
                          vehicle={selectedVehicle}
                          isOpen={isEditModalOpen}
                          onClose={closeEditModal}
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
