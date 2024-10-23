import { useState } from "react";
import { Link } from "react-router-dom";
import { Divider, Table, Toggle } from "react-daisyui";
import { toast } from "react-toastify";
import { IoEyeOutline } from "react-icons/io5";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useFilteredItems } from "../../hooks/useFilteredItems";
import { usePagination } from "../../hooks/usePagination";
import useFetchUsers from "../../hooks/useFetchUsers";
import PaginationFilter from "../../components/ui/PaginationFilter";
import SearchFilter from "../../components/ui/SearchFilter";
import DefaultPic from "../../assets/default-profile.jpg";

export default function UserList() {
  const { users } = useFetchUsers();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredUsers = useFilteredItems(users, searchQuery);

  const actualItemsPerPage =
    itemsPerPage === "All" ? filteredUsers.length : itemsPerPage;

  const { currentItems: currentUsers, totalPages } = usePagination(
    filteredUsers,
    actualItemsPerPage,
    currentPage,
    setCurrentPage
  );

  const handleUpdateStatus = async (userId, isApproved) => {
    if (!window.confirm("Are you sure you want to update his/her status?"))
      return;

    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { isApproved: !isApproved });
      toast.success("Status updated successfully");
    } catch (err) {
      toast.error("Error updating status: " + err.message);
    }
  };

  return (
    <>
      <SearchFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        setCurrentPage={setCurrentPage}
      />

      <Divider />

      {filteredUsers.length === 0 ? (
        <p className="text-center text-gray-500">
          {searchQuery
            ? "We couldn't find any users matching your search."
            : "No available users at the moment."}
        </p>
      ) : (
        <>
          <div className="overflow-auto">
            <Table className="table-auto w-full" zebra>
              <Table.Head>
                <span>Avatar</span>
                <span>First Name</span>
                <span>Last Name</span>
                <span>Mobile Number</span>
                <span>Active</span>
                <span>Actions</span>
              </Table.Head>
              <Table.Body>
                {currentUsers.map((user) => (
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
                            src={
                              user?.profilePic
                                ? user?.profilePic
                                : DefaultPic
                            }
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                    </span>
                    <span>{user.firstName}</span>
                    <span>{user.lastName}</span>
                    <span>{user.mobileNumber}</span>
                    <span>
                      <div
                        className="tooltip"
                        data-tip={` ${
                          user.isApproved ? "disabled" : "enable"
                        } this account`}
                      >
                        <Toggle
                          checked={user.isApproved}
                          onChange={() =>
                            handleUpdateStatus(user.id, user.isApproved)
                          }
                          className={
                            user.isApproved
                              ? "bg-success border-success hover:bg-success"
                              : "bg-error border-error hover:bg-error"
                          }
                        />
                      </div>
                    </span>
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

          <PaginationFilter
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </>
  );
}
