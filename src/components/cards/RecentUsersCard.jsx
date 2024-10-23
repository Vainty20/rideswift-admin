import { Table } from "react-daisyui";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import DefaultPic from "../../assets/default-profile.jpg";

export default function RecentUsersCard({ users }) {
  const filteredUsers = [...users].slice(0, 5);
  return (
    <div className="rounded-lg border shadow">
      <div className="p-4">
        <h4 className="text-2xl font-semibold">Recent Users</h4>
      </div>
      <div className="overflow-auto">
        <Table className="table-auto w-full" zebra>
          <Table.Head>
            <span>Avatar</span>
            <span>Name</span>
            <span>Email</span>
            <span>Mobile Number</span>
            <span>Actions</span>
          </Table.Head>
          <Table.Body>
            {filteredUsers.map((user) => (
              <Table.Row key={user.id}>
                <span>
                  <div className="avatar indicator">
                    <span
                      className={`indicator-item rounded-full text-white badge  ${
                        user?.isApproved ? "badge-success" : "badge-error"
                      }`}
                    >
                      {user?.isApproved ? "active" : "disabled"}
                    </span>
                    <div className="mask mask-squircle w-12">
                      <img
                        src={user?.profilePic ? user?.profilePic : DefaultPic}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </span>
                <span>{user.firstName} {user.lastName}</span>
                <span>{user.email}</span>
                <span>{user.mobileNumber}</span>

                <span className="flex gap-2">
                  <div className="tooltip" data-tip="Go to user's profile">
                    <Link
                      to={`/users/${user.id}`}
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
