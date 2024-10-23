import { Table } from "react-daisyui";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import DefaultPic from "../../assets/default-profile.jpg";

export default function RecentDriversCard({ drivers }) {
  const filteredDrivers = [...drivers].slice(0, 5);
  return (
    <div className="rounded-lg border shadow">
      <div className="p-4">
        <h4 className="text-2xl font-semibold">Recent Drivers</h4>
      </div>
      <div className="overflow-auto">
        <Table className="table-auto w-full" zebra>
          <Table.Head>
            <span>Avatar</span>
            <span>Name</span>
            <span>Mobile Number</span>
            <span>Vehicle</span>
            <span>Plate Number</span>
            <span>Actions</span>
          </Table.Head>
          <Table.Body>
            {filteredDrivers.map((driver) => (
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
                        src={driver?.profilePic ? driver?.profilePic : DefaultPic}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </span>
                <span>{driver.firstName} {driver.lastName}</span>
                <span>{driver.mobileNumber}</span>
                <span>{driver.vehicle}</span>
                <span>{driver.plateNumber}</span>
                <span className="flex gap-2">
                  <div className="tooltip" data-tip="Go to driver's profile">
                    <Link
                      to={`/drivers/${driver.id}`}
                      className="btn btn-primary btn-circle"
                    >
                      <IoEyeOutline size={30} color="white" />
                    </Link>
                  </div>
                </span>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
