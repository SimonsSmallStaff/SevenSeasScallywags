"use client";
import { useState } from "react";

//dummy interface
interface Item {
  id: number;
  name: string;
  image: string;
  condition: string;
  status: string;
  location: string;
  description: string;
  saved: boolean;
}
  
export default function Plunder() {

  const [filteredItems, setFilteredItems] = useState([
    {
      id: 1,
      name: "Comfy Chair",
      image: "https://via.placeholder.com/100",
      condition: "used-good",
      status: "available",
      location: "Dorm A",
      description: "Still in great shape!",
      saved: true,
    },
    {
      id: 2,
      name: "Textbook",
      image: "https://via.placeholder.com/100",
      condition: "new",
      status: "available",
      location: "Library",
      description: "Barely used. Required for CS101.",
      saved: true,
    },
    {
      id: 3,
      name: "Calculator",
      image: "https://via.placeholder.com/100",
      condition: "new",
      status: "available",
      location: "Student center",
      description: "New, good for calculus 2",
      saved: true,
    },
  ]);
// Dummy state hooks for filters
const [housing, setHousing] = useState("");
const [condition, setCondition] = useState("");
const [status, setStatus] = useState("");
const [category, setCategory] = useState("");
const [distance, setDistance] = useState("");
const [searchTerm, setSearchTerm] = useState("");
const [sortBy, setSortBy] = useState("");
const [savedItemsOnly, setSavedItemsOnly] = useState(false);

const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearchTerm(e.target.value);
};

const handleSavedItemsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSavedItemsOnly(e.target.checked);
};

const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setSortBy(e.target.value);
};

let user = {
  id: '#123456778',
  name: 'bob',
  join_date: '12/12/2025',
  college: 'UGA',
  savedItems: [filteredItems[0], filteredItems[1], filteredItems[2]]
};
  // Dummy save handler
  const handleSaveItem = (id:number) => {
    setFilteredItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, saved: !item.saved } : item
      )
    );
  };
  // Dummy handlers
const handleFilterChange = (
  e: React.ChangeEvent<HTMLSelectElement>,
  setter: React.Dispatch<React.SetStateAction<string>>
) => {
  setter(e.target.value);
};

  return (
    <section className="m-[5%]">
      <div className="flex">
        <div className="w-[10%] min-w-[150px] p-4 h-screen text-white" style={{ backgroundColor: '#3c2222' }}>
          <h3 className="font-medium">Filters</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium">Housing</label>
            <select
              value={housing}
              onChange={(e) => handleFilterChange(e, setHousing)}
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  bg-white text-black"
            >
              <option value="" disabled hidden>Housing</option>
              <option value="dorm">Dorm</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Condition</label>
            <select
              value={condition}
              onChange={(e) => handleFilterChange(e, setCondition)}
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  bg-white text-black"
            >
              <option value="" disabled hidden>Condition</option>
              <option value="new">New</option>
              <option value="used-good">Used-good</option>
              <option value="used-fair">used-fair</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Status</label>
            <select
              value={status}
              onChange={(e) => handleFilterChange(e, setStatus)}
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
            >
              <option value="" disabled hidden>Status</option>
              <option value="available">Available</option>
              <option value="sold">Sold</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => handleFilterChange(e, setCategory)}
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
            >
                <option value="" disabled hidden>category</option>
                <option value="furniture">Furniture</option>
                <option value="book">Books</option>
                <option value="kitchen">Kitchen</option>
                <option value="school supplies">School Supplies</option>
                <option value="cleaning">Cleaning Supplies</option>
                <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Distance</label>
            <select
              value={distance}
              onChange={(e) => handleFilterChange(e, setDistance)}
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
            >
              <option value="" disabled hidden>Distance</option>
              <option value="5">5 miles</option>
              <option value="10">10 miles</option>
              <option value="20">20 miles</option>
              <option value="50">50 miles</option>
            </select>
          </div>

          <button
            onClick={() => {
            setHousing("");
            setCondition("");
            setStatus("");
            setCategory("");
            setDistance("");
            setSearchTerm("");
            setSortBy("");
            setSavedItemsOnly(false);
            }}
            className="w-full p-2 mt-4 text-white bg-red-500 rounded-lg hover:bg-red-600"
            >
            Reset Filters
          </button>
        </div>

        <div className="flex-1 p-4">
          <div className="flex mb-4 bg-white rounded-lg opacity-75 text-black">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search items..."
              className="flex-1 p-2 border rounded-l-lg focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between mb-4 bg-amber-800 p-1 rounded-lg">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={savedItemsOnly}
                onChange={handleSavedItemsChange}
                id="savedItems"
                className="mr-2"
              />
              <label htmlFor="savedItems">Saved items</label>
            </div>
            <div className="flex items-center">
              <label htmlFor="sortBy" className="mr-2">Sort by:</label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={handleSortByChange}
                className="p-2 border rounded text-black bg-white"
              >
                <option value="" hidden>Select</option>
                <option value="name">Name</option>
                <option value="location">Location</option>
                <option value="category">Category</option>
              </select>
            </div>
          </div>

          <div>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
              <div key={index} className="flex items-center bg-white p-4 mb-4 rounded-lg shadow-lg">
                  <div className="flex-shrink-0 w-1/5 mr-4">
                    <img src={item.image} alt={item.name} className="w-full h-auto rounded-lg" />
                    <h3 className="mt-2 text-lg font-semibold">{item.name}</h3>
                  </div>

        <div className="flex-1 text-center">
          <p className="text-sm font-medium text-gray-700">
            <span className="mr-2">Condition: {item.condition}</span>
            <span className="mr-2">Status: {item.status}</span>
            <span className="mr-2">Location: {item.location}</span>
          </p>
        </div>

        <div className="flex items-center justify-between w-1/4 ml-4">
          <p className="text-sm text-gray-700 flex-1">{item.description}</p>
          <button
            className={`hover:text-green-700 ${item.saved ? "text-red-500":"text-green-500"}`}
            onClick={() => handleSaveItem(item.id)}
          >
            <i className={item.saved ? "fas fa-minus" : "fas fa-plus"}></i>
          </button>
                </div>
              </div>
              ))) : (<p>No items found.</p>)}
          </div>
        </div>
      </div>
    </section>
);
}