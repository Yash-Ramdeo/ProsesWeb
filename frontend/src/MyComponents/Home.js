import React from 'react'
import Navbar from './Navigation Bar/Navbar'
import UserCards from './User Details/UserCards'
import "./Home.css";

const Home = () => {
    return (
        <div className='userContainer'>
            <Navbar />
            <UserCards />
        </div>
    )
}

export default Home