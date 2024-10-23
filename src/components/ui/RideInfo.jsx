import { IoSpeedometerOutline, IoTimeOutline } from "react-icons/io5";
import { formatPrice } from "../../utils/formatPrice";

export default function RideInfo({ rideDistance, rideTime, ridePrice }) {
  return (
    <div className="flex flex-wrap items-center font-semibold gap-4">
      <div className="flex items-center gap-2">
        <IoSpeedometerOutline size={30} />
        <p>{rideDistance}</p>
      </div>
      <div className="flex items-center gap-2">
        <IoTimeOutline size={30} />
        <p>{rideTime}</p>
      </div>
      <p className="text-2xl">{formatPrice(ridePrice)}</p>
    </div>
  );
}
