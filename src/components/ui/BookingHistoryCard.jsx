import { Card } from "react-daisyui";
import { Link } from "react-router-dom";
import { formatDateAndTime } from "../../utils/formatDate";
import DefaultPic from "../../assets/default-profile.jpg";
import { IoLocation, IoRadioButtonOn } from "react-icons/io5";

export default function BookingHistoryCard({
  id,
  profilePic,
  name,
  mobileNumber,
  pickupLocation,
  dropoffLocation,
  createdAt,
}) {
  return (
    <Link
      to={`/bookings/${id}`}
      className="tooltip text-left"
      data-tip="view bookings"
    >
      <Card className="w-full h-full max-w-[300px]">
        <Card.Body>
          <div className="badge badge-error text-white p-2 self-end">
            dropoff
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="avatar">
              <div className="mask mask-squircle w-12">
                <img
                  src={profilePic ? profilePic : DefaultPic}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div>
              <h2 className="font-semibold">{name}</h2>
              <p>{mobileNumber}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-error">
              <IoLocation size={20} />
            </div>
            <h2 className="font-semibold">Pickup Location</h2>
          </div>
          <p>{pickupLocation}</p>

          <div className="flex items-center gap-2">
            <div className="text-primary">
              <IoRadioButtonOn size={20} />
            </div>
            <h2 className="font-semibold">Dropoff Location</h2>
          </div>
          <p>{dropoffLocation}</p>

          <p className="border-t pt-2">{formatDateAndTime(createdAt)}</p>
        </Card.Body>
      </Card>
    </Link>
  );
}
