import { Link, useParams } from "react-router-dom";
import { Carousel } from "react-daisyui";
import useFetchSingleData from "../hooks/useFetchSingleData";
import RideInfo from "../components/ui/RideInfo";
import DestinationContainer from "../components/ui/DestinationContainer";
import DriverInfo from "../components/ui/DriverInfo";
import UserInfo from "../components/ui/UserInfo";

export default function ViewReportPage() {
  const { id } = useParams();
  const { data: report, loading, error } = useFetchSingleData(id, "reports");

  if (loading) return <>Loading...</>;
  if (error) return <>{error.message}</>;

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
        <Carousel display="sequential" className="w-full h-[60vh] rounded-lg">
          {report?.images.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                src={image}
                alt={`Report Image ${index + 1}`}
                className="object-cover w-full h-full rounded-lg"
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <div className="flex flex-col justify-center items-center border rounded-lg">
          <h1>Booking Details</h1>
          <RideInfo
            rideDistance={report?.rideDistance}
            rideTime={report?.rideTime}
            ridePrice={report?.ridePrice}
          />

          <DestinationContainer
            pickupLocation={report?.pickupLocation}
            dropoffLocation={report?.dropoffLocation}
          />

          <div className="flex flex-wrap gap-2 mt-2">
            <Link to={`/drivers/${report.userId}`}>
              <DriverInfo
                driverProfilePic={report?.driverProfilePic}
                driverName={report?.driverName}
                driverMobileNumber={report?.driverMobileNumber}
                driverVehicle={report?.driverVehicle}
                driverPlateNumber={report?.driverPlateNumber}
              />
            </Link>
            <Link to={`/users/${report.userId}`}>
              <UserInfo
                userProfilePic={report?.userProfilePic}
                userName={report?.userName}
                userMobileNumber={report?.userMobileNumber}
              />
            </Link>
          </div>
        </div>
      </div>
      <h1>{report?.title}</h1>
      <p>{report?.description}</p>
    </>
  );
}
