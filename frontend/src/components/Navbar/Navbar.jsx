import React from 'react';
import './Navbar.css';
import { Link } from 'react-router';
import { useOfflineSupport } from '../../contexts/OfflineSupportContext';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';


function Navbar() {

  const {isLoggedIn} = useAuth();
  const {logoutUser} = useAuth();

 return (
    <header>
        <div className='main--header'>
          <Link to='/'><h1 className='logo'>Evently</h1></Link>

          <nav className='navbar'>
            {
              isLoggedIn() ?
                <>
                  <Link to='/events'>Events</Link>
                  <Link to='/groups'>Groups</Link>
                  <Link to='/categories'>Categories</Link>
                  <Link to='/profile'>Profile</Link>
                  <Link to='/login'onClick={() => {logoutUser();}}>Log out</Link>
                </>
                :
                <>
                  <Link to='/login'>Log in</Link>
                  <Link to='/register'>Register</Link>
                </>
              }
            
          </nav>
        </div>

    </header>
  )
}

export default Navbar;