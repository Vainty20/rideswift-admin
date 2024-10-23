import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Divider, Select, Table } from "react-daisyui";
import { IoEyeOutline, IoTrashOutline } from "react-icons/io5";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useFilteredItems } from "../../hooks/useFilteredItems";
import { usePagination } from "../../hooks/usePagination";
import useFetchReports from "../../hooks/useFetchReports";
import PaginationFilter from "../../components/ui/PaginationFilter";
import SearchFilter from "../../components/ui/SearchFilter";
import DefaultPic from "../../assets/default-profile.jpg";

export default function ReportList() {
  const { reports } = useFetchReports();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredReports = useFilteredItems(reports, searchQuery);

  const actualItemsPerPage =
    itemsPerPage === "All" ? filteredReports.length : itemsPerPage;

  const { currentItems: currentReports, totalPages } = usePagination(
    filteredReports,
    actualItemsPerPage,
    currentPage,
    setCurrentPage
  );

  const handleUpdateStatus = async (reportId, newStatus) => {
    if (!window.confirm("Are you sure you want to update this report?")) return;
    try {
      const reportRef = doc(db, "reports", reportId);
      await updateDoc(reportRef, { status: newStatus });
      toast.success("Status updated successfully");
    } catch (err) {
      toast.error("Error updating status:", err);
    }
  };

  const handleDelete = async (reportId) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;

    try {
      const reportRef = doc(db, "reports", reportId);
      await deleteDoc(reportRef);
      toast.success("Report deleted successfully.");
    } catch (error) {
      console.error("Error deleting report: ", error);
      toast.error("Failed to delete report.");
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

      {filteredReports.length === 0 ? (
        <p className="text-center text-gray-500">
          {searchQuery
            ? "We couldn't find any reports matching your search."
            : "No available reports at the moment."}
        </p>
      ) : (
        <>
          <div className="overflow-auto">
            <Table className="table-auto w-full" zebra>
              <Table.Head>
                <span>Image</span>
                <span>Title</span>
                <span>Driver Name</span>
                <span>Driver Mobile Number</span>
                <span>User Name</span>
                <span>User Mobile Number</span>
                <span>Status</span>
                <span>Actions</span>
              </Table.Head>
              <Table.Body>
                {currentReports.map((report) => (
                  <Table.Row key={report.id}>
                    <span>
                      <div>
                        <img
                          src={report.images[0] || DefaultPic}
                          className="w-20 object-cover"
                        />
                      </div>
                    </span>
                    <span>{report.title}</span>
                    <span>{report.driverName}</span>
                    <span>{report.driverMobileNumber}</span>
                    <span>{report.userName}</span>
                    <span>{report.userMobileNumber}</span>
                    <span>
                      <div
                        className="tooltip"
                        data-tip="change report's status"
                      >
                        <Select
                          value={report.status}
                          onChange={(e) =>
                            handleUpdateStatus(report.id, e.target.value)
                          }
                          className="select select-bordered"
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                        </Select>
                      </div>
                    </span>
                    <span className="flex gap-2">
                      <div className="tooltip" data-tip="view report">
                        <Link
                          to={`/reports/${report.id}`}
                          className="btn btn-primary btn-circle"
                        >
                          <IoEyeOutline size={30} color="white" />
                        </Link>
                      </div>
                      <div className="tooltip" data-tip="delete report">
                        <Button
                          color="error"
                          shape="circle"
                          onClick={() => handleDelete(report.id)}
                        >
                          <IoTrashOutline size={30} color="white" />
                        </Button>
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
