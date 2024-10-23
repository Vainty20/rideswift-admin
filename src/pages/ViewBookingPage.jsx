import { useParams, Link } from "react-router-dom";
import { Divider } from "react-daisyui";
import useFetchSingleData from "../hooks/useFetchSingleData";
import RideInfo from "../components/ui/RideInfo";
import DriverInfo from "../components/ui/DriverInfo";
import UserInfo from "../components/ui/UserInfo";
import DestinationContainer from "../components/ui/DestinationContainer";
import MapDirections from "../components/ui/MapDirections";

export default function ViewBookingPage() {
  const { id } = useParams();
  const { data: booking, loading, error } = useFetchSingleData(id, "book");

  if (loading) return <>Loading...</>;
  if (error) return <>{error.message}</>;

  const pickupCoords = {
    lat: parseFloat(booking?.pickupCoords[0]),
    lng: parseFloat(booking?.pickupCoords[1]),
  };

  const dropoffCoords = {
    lat: parseFloat(booking?.dropoffCoords[0]),
    lng: parseFloat(booking?.dropoffCoords[1]),
  };
  return (
    <>
      <MapDirections
        pickupCoords={pickupCoords}
        dropoffCoords={dropoffCoords}
      />
      <Divider />
      <RideInfo
        rideDistance={booking?.rideDistance}
        rideTime={booking?.rideTime}
        ridePrice={booking?.ridePrice}
      />

      <DestinationContainer
        pickupLocation={booking?.pickupLocation}
        dropoffLocation={booking?.dropoffLocation}
      />

      <div className="flex flex-wrap gap-2 mt-2">
        <Link to={`/drivers/${booking.driverId}`}>
          <DriverInfo
            driverProfilePic={booking?.driverProfilePic}
            driverName={booking?.driverName}
            driverMobileNumber={booking?.driverMobileNumber}
            driverVehicle={booking?.driverVehicle}
            driverPlateNumber={booking?.driverPlateNumber}
          />
        </Link>
        <Link to={`/users/${booking.userId}`}>
          <UserInfo
            userProfilePic={booking?.userProfilePic}
            userName={booking?.userName}
            userMobileNumber={booking?.userMobileNumber}
          />
        </Link>
      </div>
    </>
  );
}
