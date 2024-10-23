import DriverList from "../features/drivers/DriverList";

export default function DriversPage() {
  return (
    <>
      <div>
        <h1>Drivers</h1>
        <p className="text-xl mb-4">Manage and view all of your drivers.</p>
      </div>
      <DriverList />
    </>
  );
}
