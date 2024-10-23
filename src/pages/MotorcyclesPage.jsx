import { Button } from "react-daisyui";
import VehicleList from "../features/motorycles/VehicleList";
import { useState } from "react";
import AddVehicleModal from "../components/modals/AddVehicleModal";

export default function MotorcyclesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1>Motorcycles</h1>
          <p className="text-xl">
            Manage and view all of available motorycles.
          </p>
        </div>

        <Button color="primary" className="text-white" onClick={openAddModal}>
          Add Vehicle
        </Button>
      </div>
      <VehicleList />
      {isAddModalOpen && (
        <AddVehicleModal isOpen={isAddModalOpen} onClose={closeAddModal} />
      )}
    </>
  );
}
