import { useState } from 'react';

const Search = ({ items }) => {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortOption, setSortOption] = useState('default');

  // Extract unique categories and locations from items
  const categories = ['all', ...new Set(items.map(item => item.category))];
  const locations = ['all', ...new Set(items.map(item => item.location))];

  // Filter and sort logic
  const filteredItems = items
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesLocation = selectedLocation === 'all' || item.location === selectedLocation;
      
      return matchesSearch && matchesCategory && matchesLocation;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filter Section */}
      <div className="bg-gray-400 rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-orange-700 mb-1">
              Search
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search items..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <select
              id="location"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              {locations.map(location => (
                <option key={location} value={location}>
                  {location.charAt(0).toUpperCase() + location.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        </div>
        {/* Sort Options
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSortOption('default')}
              className={`px-3 py-1 text-sm rounded-md ${sortOption === 'default' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Default
            </button>
            <button
              onClick={() => setSortOption('name-asc')}
              className={`px-3 py-1 text-sm rounded-md ${sortOption === 'name-asc' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Name (A-Z)
            </button>
            <button
              onClick={() => setSortOption('name-desc')}
              className={`px-3 py-1 text-sm rounded-md ${sortOption === 'name-desc' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Name (Z-A)
            </button>
            <button
              onClick={() => setSortOption('price-asc')}
              className={`px-3 py-1 text-sm rounded-md ${sortOption === 'price-asc' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Price (Low to High)
            </button>
            <button
              onClick={() => setSortOption('price-desc')}
              className={`px-3 py-1 text-sm rounded-md ${sortOption === 'price-desc' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Price (High to Low)
            </button>
          </div>
        </div>
      </div> */}

      {/* Results Section */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600 mt-1">{item.description}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-sm text-gray-500">{item.category} • {item.location}</span>
                  <span className="font-bold text-blue-600">${item.price}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No items found matching your criteria.</p>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Search;