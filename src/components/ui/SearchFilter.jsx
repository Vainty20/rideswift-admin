import { Input, Select } from "react-daisyui";

export default function SearchFilter({
  searchQuery,
  setSearchQuery,
  itemsPerPage,
  setItemsPerPage,
  setCurrentPage,
}) {
  return (
    <div className="flex flex-row gap-2">
      <div className="tooltip w-full max-w-lg" data-tip="search here">
        <Input
          type="text"
          value={searchQuery}
          bordered={true}
          placeholder="Search here..."
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full join-item"
          aria-label="Search products"
        />
      </div>
      <div className="tooltip" data-tip="item per page">
        <Select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(e.target.value);
            setCurrentPage(1);
          }}
          className="w-32"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="All">All</option>
        </Select>
      </div>
    </div>
  );
}
