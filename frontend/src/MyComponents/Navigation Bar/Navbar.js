import React from 'react';
import "./Navbar.css";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div className='navbar'>
            <img src="/logo.png" onClick={navigate("./")} />
            <div className='avatar'><img src="" alt="avatar" /></div>
        </div>
    )
}

export default Navbar