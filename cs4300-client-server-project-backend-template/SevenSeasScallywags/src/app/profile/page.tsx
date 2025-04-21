'use client';

import { useState, useRef } from 'react';
import connectMongoDB from "../../../config/mongodb";
import CollegeSearchDropdown from "../../components/CollegeSearchDropdown.jsx";

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

export default function Profile() {
  connectMongoDB();

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    condition: '',
    status: '',
    location: '',
    description: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([
    {
      id: 1,
      name: "Comfy Chair",
      image: "https://via.placeholder.com/100",
      condition: "used-good",
      status: "available",
      location: "Dorm A",
      description: "Still in great shape!",
      saved: false,
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
  
  // Dummy save handler
  const handleSaveItem = (id:number) => {
    setFilteredItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, saved: !item.saved } : item
      )
    );
  };

  let user = {
    id: '#123456778',
    name: 'bob',
    join_date: '12/12/2025',
    college: 'UGA',
    items: [filteredItems[0], filteredItems[1], filteredItems[2]]
  };
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Item:", formData);
  
    setFormData({
      name: '',
      category: '',
      condition: '',
      status: '',
      pickup: '',
      location: '',
      description: '',
      image: null,
    });
  
    // Clear file input manually
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section className="p-4">
      <div className="profileInfo mx-auto text-center p-4 rounded-lg mt-4 w-[40%] bg-gray-300 text-black">
        <p>User ID: {user.id}</p>
        <p>Username: {user.name}</p>
        <p>Date Joined: {user.join_date}</p>
        <p>User College: {user.college}</p>
      </div>

    <div className="App text-center p-4">
        <h1>Search Colleges</h1>
        <CollegeSearchDropdown apiKey="QR29qgsZRha4UVV0LciyIXXzXin6aYldRs6U33P4" />
    </div>

      <div className="flex flex-col md:flex-row gap-8 justify-center mt-10">
        <div className="form md-w-md">
          <form className="bg-white shadow-md rounded-xl p-6 space-y-4 text-black"
          onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-bold text-center mb-4">List an Item</h2>

            <div>
              <label className="block font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                placeholder="item name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                <option value="furniture">Furniture</option>
                <option value="book">Books</option>
                <option value="kitchen">Kitchen</option>
                <option value="school supplies">School Supplies</option>
                <option value="cleaning">Cleaning Supplies</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700">Condition</label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select condition</option>
                <option value="new">New</option>
                <option value="used-good">Used - Good</option>
                <option value="used-fair">Used - Fair</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select status</option>
                <option value="available">Available</option>
                <option value="pending">Pending</option>
                <option value="claimed">Claimed</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                placeholder="address or location title"
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                placeholder="describe your item..."
                rows={3}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Upload Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            <div className="text-center">
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-black transition-all"
              >
              Submit
            </button>
            </div>
          </form>
        </div>

        <div className="md-w-xl flex flex-col items-center">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            style={{ backgroundColor: '#FFCC00' }}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 opacity-50 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-white text-black mb-6"
          />

<div className="userItems w-full max-w-xl text-center bg-white rounded-lg p-2">
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
            className={`hover:text-green-700 ${item.saved ? "text-red-500":"text-green-500"}`} // Conditional colors
            onClick={() => handleSaveItem(item.id)}
          >
            <i className={item.saved ? "fas fa-minus" : "fas fa-plus"}></i> {/* Conditional icon */}
          </button>
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-400 italic">No matching items found.</p>
  )}
</div>

        </div>
      </div>
    </section>
  );
}


