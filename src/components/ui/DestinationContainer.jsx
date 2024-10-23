import { IoLocation, IoRadioButtonOn } from "react-icons/io5";

export default function DestinationContainer({
  pickupLocation,
  dropoffLocation,
}) {
  return (
    <div className="my-2 space-y-2">
      <div className="flex items-center gap-2 text-error">
        <IoLocation size={30} />
        <p className="text-secondary font-semibold">{pickupLocation}</p>
      </div>
      <div className="flex items-center gap-2 text-primary">
        <IoRadioButtonOn size={30} />
        <p className="text-secondary font-semibold">{dropoffLocation}</p>
      </div>
    </div>
  );
}
