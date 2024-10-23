import DefaultPic from "../../assets/default-profile.jpg";

export default function DriverInfo({
  driverProfilePic,
  driverName,
  driverMobileNumber,
  driverVehicle,
  driverPlateNumber,
}) {
  return (
    <div className="border rounded-lg p-4">
      <h4 className="text-2xl font-semibold">Driver Info:</h4>
      <div className="flex items-center gap-4">
        <img
          src={driverProfilePic || DefaultPic}
          className="w-12 rounded-full"
        />
        <div className="text-left">
          <p className="text-sm">{driverMobileNumber}</p>
          <p className="font-semibold">{driverName}</p>
        </div>
        <div className="text-right">
          <p className="text-sm">{driverVehicle}</p>
          <p className="font-semibold">{driverPlateNumber}</p>
        </div>
      </div>
    </div>
  );
}
