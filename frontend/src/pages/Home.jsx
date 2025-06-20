import React from 'react'
import { motion } from 'framer-motion'
// import Navbar from '../components/Navbar'
import hero1 from '../assets/hero1.jpg'
//import Search from '../components/Search'



function Home() {
  return (
    <div className="min-h-screen bg-stone-600">
      
      {/* Hero Banner */}
      <div className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
           <img className="w-full h-full" src={hero1} alt="logo" />
            {/* className="w-full h-full object-cover" */}
          {/* /> */}
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
        {/* <Search /> */}
        <div className="container mx-auto px-4 ">
          <h2 className="text-3xl font-bold text-center mb-8 text-cyan-950">Find Your Perfect Event</h2>
          <p className="text-center text-orange-600 mb-18">
            Explore a wide range of events happening near you.
          </p>
          
        </div>
      </div>
      
    </div>
  )
}

export default Home