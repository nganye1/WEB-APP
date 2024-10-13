import React, { useState, useEffect } from 'react'; // Import necessary React hooks
import './App.css'; // Import the App-specific styles

function App() { 
  // State to hold the current search term entered by the user
  const [searchTerm, setSearchTerm] = useState('');
  
  // State to hold the list of fetched countries from the backend
  const [countries, setCountries] = useState([]);

  // State to manage any errors that occur during fetching
  const [error, setError] = useState('');

  // State to indicate if data is currently being loaded
  const [loading, setLoading] = useState(false);

  // Effect hook to fetch countries from the backend whenever the search term changes
  useEffect(() => {
    const fetchCountries = async () => {
      // If the search term is empty, clear the countries and return
      if (searchTerm.trim() === '') {
        setCountries([]);  // Clear countries if no search term
        return;
      }

      setLoading(true);  // Set loading state to true before fetching data

      try {
        // Fetch countries from the backend with the search term
        const response = await fetch(`http://localhost:3006/countries?search=${searchTerm}`);
        
        // Check if the response is not OK (status code not in the 200 range)
        if (!response.ok) {
          throw new Error('Error fetching countries'); // Handle non-200 responses
        }

        // Parse the JSON data from the response
        const data = await response.json();
        
        // Update the countries state with the fetched data
        setCountries(data.countries);  
        setError('');  // Clear any previous errors

      } catch (err) {
        // If an error occurs during fetching, set the error message
        setError(err.message);         
      } finally {
        // Reset loading state to false once the fetch is complete
        setLoading(false);             
      }
    };

    fetchCountries();  // Call the fetch function directly whenever the searchTerm changes
  }, [searchTerm]);  // Effect runs whenever searchTerm changes

  // Function to handle clearing the search term and country list
  const handleClearSearch = () => {
    setSearchTerm('');   // Reset the search term to empty
    setCountries([]);    // Clear the list of countries
  };

  return (
    <div className="app-container"> {/* Main container for the app */}
      
      {/* Input field and 'Remove' button in a flex container */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search for a country..." // Placeholder text for the input
          className="search-bar" // CSS class for styling the input
          value={searchTerm} // Current value of the input
          onChange={(e) => setSearchTerm(e.target.value)}  // Update search term on change
        />
        
        {/* Button to clear search term and country list */}
        <button className="remove-btn" onClick={handleClearSearch}>
          Remove
        </button>
      </div>

      {/* Display filtered countries or a "no results" message */}
      <ul className="country-list"> 
        {countries.length > 0 ? ( // Check if there are countries in the list
          countries.map((country) => ( // Map through the countries array
            <li key={country} className="country-item"> {/* Render each country in a list item */}
              {country} {/* Display the country name */}
            </li>
          ))
        ) : (
          <li>No countries found</li> // Message displayed if no countries match the search
        )}
      </ul>
    </div>
  );
}

export default App; // Export the App component for use in other files
