import React from 'react';
import './Navbar.css';
import { Link } from 'react-router';


function Navbar() {
  return (
    <header>

        <Link to='/events'><h1 className='logo'>Evently</h1></Link>

        <nav className='navbar'>
          <Link to='/events'>Events</Link>
          <Link to='/events'>Friends</Link>
          <Link to='/events'>Profile</Link>
          <Link to='/events'>Log out</Link>
        </nav>

    </header>
  )
}

export default Navbar;