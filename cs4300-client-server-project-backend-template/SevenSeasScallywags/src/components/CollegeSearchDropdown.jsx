import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CollegeSearchDropdown = ({ apiKey }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [colleges, setColleges] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (searchTerm === '') {
      setColleges([]);
      return;
    }

    const fetchColleges = async () => {
      setErrorMessage('');
      try {
        const response = await axios.get(
          `https://api.data.gov/ed/collegescorecard/v1/schools`, {
            params: {
              api_key: apiKey,
              school_name: searchTerm,
              fields: 'id,school.name',
              per_page: 10,
              sort: 'school.name',
            }
          }
        );

        setColleges(response.data.results);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          setErrorMessage('You have reached the API rate limit. Please try again later.');
        } else {
        console.error('Error fetching colleges:', error);
        }
      }
    };

    fetchColleges();
  }, [searchTerm, apiKey]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectCollege = (collegeName) => {
    setSearchTerm(collegeName);
    console.log('Selected College:', collegeName);
  };

  return (
  <div className="college-search bg-black relative">
  <div className="flex items-center space-x-2">
    <input
      type="text"
      value={searchTerm}
      onChange={handleInputChange}
      placeholder="Search for a college"
      className="w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    
    <button
      onClick={() => console.log("Set button clicked")}
      className="px-4 py-2 bg-green-400 text-white focus:outline-none"
    >
      Set
    </button>
  </div>
  {searchTerm && colleges.length > 0 && (
    <div className="autocomplete-dropdown-container absolute left-0 right-0 mt-0 bg-black shadow-lg z-10">
      {colleges.map((college) => (
        <div
          key={college.id}
          onClick={() => handleSelectCollege(college['school.name'])}
          className="suggestion-item p-2 cursor-pointer hover:bg-gray-200"
        >
          {college['school.name']}
        </div>
      ))}
    </div>
  )}
</div>

  
  );
};

export default CollegeSearchDropdown;
