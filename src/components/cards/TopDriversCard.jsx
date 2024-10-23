import { Table } from "react-daisyui";
import { monthNames } from "../../data/monthNames";
import { formatPrice } from "../../utils/formatPrice";
import { getWeekNumber } from "../../utils/getWeekNumber";
import DefaultPic from "../../assets/default-profile.jpg";

export default function TopDriversCard({
  filterType,
  handleChangeFilterType,
  filteredTopDrivers,
}) {
  return (
    <div className="w-full border rounded-lg p-3">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Top 5 Drivers by Income</h2>
        <select
          className="input input-bordered"
          value={filterType}
          onChange={(e) => handleChangeFilterType(e.target.value)}
        >
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>
      <div className="overflow-auto">
        <Table className="table-auto w-full" zebra>
          <Table.Head>
            <span>Avatar</span>
            <span>Name</span>
            <span>Total Income</span>
            <span>{filterType === "monthly" ? "Month" : "Week"}</span>
          </Table.Head>
          <Table.Body>
            {filteredTopDrivers.map((driver, index) => (
              <Table.Row key={index}>
                <span>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12">
                      <img
                        src={
                          driver?.driverProfilePic
                            ? driver?.driverProfilePic
                            : DefaultPic
                        }
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </span>
                <span>{driver.driverName}</span>
                <span>{formatPrice(driver.totalIncome)}</span>
                <span>
                  {filterType === "monthly"
                    ? `${monthNames[new Date(driver.topDate).getMonth()]}`
                    : `${getWeekNumber(new Date(driver.topDate))}`}
                </span>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
