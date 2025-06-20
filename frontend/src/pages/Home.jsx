import React from 'react'
import { motion } from 'framer-motion'
// import Navbar from '../components/Navbar'
import hero1 from '../assets/hero1.jpg'
//import Search from '../components/Search'
import { FiSearch } from "react-icons/fi";
import Footer from '../components/Footer';

const sampleEvents = [
  { id: 1, name: "Nairobi Food Fest", location: "Nairobi", category: "music" },
 
];

function Search({ onSearch }) {
  const [location, setLocation] = React.useState('');
  const [category, setCategory] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch && onSearch({ location, category });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
      <input
        type="text"
        placeholder="Location.."
        value={location}
        onChange={e => setLocation(e.target.value)}
        className="border border-gray-600 rounded-lg px-4 py-2 w-64 bg-gray-100 text-gray-800"
      />
       <input
        type="text"
        placeholder="Category.."
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="border border-gray-600 rounded-lg px-4 py-2 w-64 bg-gray-100 text-gray-800"
      />
     <button
        type="submit"
        className="bg-orange-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center"
        aria-label="Search"
      >
        <FiSearch className="w-6 h-5 text-bold" />
      </button>
    </form>
  );
}

function Home() {
  const [filters, setFilters] = React.useState({});
  const [filteredEvents, setFilteredEvents] = React.useState(sampleEvents);

  const handleSearch = ({ location, category }) => {
    setFilters({ location, category });
    let filtered = sampleEvents;
    if (location) {
      filtered = filtered.filter(event =>
        event.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    if (category) {
      filtered = filtered.filter(event =>
        event.category === category
      );
    }
    setFilteredEvents(filtered);
  };

  return (
    <div className="min-h-screen bg-stone-600">
      {/* Hero Banner */}
      <div className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <img className="w-full h-full" src={hero1} alt="logo" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative text-center text-white px-4"
        >
          <h1 className="text-2xl md:text-6xl font-bold mb-6">
            Looking for best events in Kenya?
            <br />
            We got you 
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Streamline Your Next Event!
          </p>
          <button
            onClick={() => document.querySelector('#searchSection').scrollIntoView({ behavior: 'smooth' })}
            className="bg-orange-700 hover:bg-amber-800 text-white px-8 py-4 rounded-lg text-lg font-medium"
          >
            Search Events
          </button>
        </motion.div>
      </div>
      {/* Search Section */}
      <div id="searchSection" className="py-16 bg-white">
        <div className="container mx-auto px-4 ">
          <h2 className="text-3xl font-bold text-center mb-8 text-cyan-950">Find Your Perfect Event</h2>
          <p className="text-center text-orange-600 mb-18">
            Explore a wide range of events happening near you.
          </p>
          <br />
          <Search onSearch={handleSearch} />
          {/* Event list rendering below */}
          {/* <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.length === 0 ? (
              <p className="text-center col-span-full text-gray-500">No events found.</p>
            ) : (
              filteredEvents.map(event => (
                <div key={event.id} className="bg-stone-100 rounded-lg shadow p-6">
                  <h3 className="text-xl font-bold text-cyan-950 mb-2">{event.name}</h3>
                  <p className="text-gray-700 mb-1">Location: <span className="font-medium">{event.location}</span></p>
                  <p className="text-gray-700">Category: <span className="font-medium">{event.category}</span></p>
                </div>
              ))
            )}
          </div> */}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home