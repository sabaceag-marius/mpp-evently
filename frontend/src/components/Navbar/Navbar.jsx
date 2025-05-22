import React from 'react';
import './Navbar.css';
import { Link } from 'react-router';
import { useOfflineSupport } from '../../contexts/OfflineSupportContext';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';


function Navbar() {

  const {connectionStatus} = useOfflineSupport();
  var connectionHeader = {
    'online' : {
      style: {
        display: 'none'
      },
      text : ""
    },
    
    'serverOffline' : {
      style: {
        backgroundColor : 'var(--error)'
      },
      text : "Server is currently offline"
    },

    'internetOffline': {
      style: {
        backgroundColor : 'var(--error)'
      },
      text : "No internet"
    },

    'syncing' : {
      style: {
        backgroundColor : 'var(--warning)'
      },
      text : "Currently syncing with the server"
    },
    'finishedSyncing' : {
      style: {
        backgroundColor : 'var(--success)'
      },
      text : "Sync successful!"
    }
  }

  const {isLoggedIn} = useAuth();
  const {logoutUser} = useAuth();

  const connectionHeaderStyle = connectionHeader[connectionStatus] ? connectionHeader[connectionStatus].style : {}
  const connectionHeaderText = connectionHeader[connectionStatus] ? connectionHeader[connectionStatus].text : ""
  return (
    <header>
        <div className='connection--header' style={connectionHeaderStyle}>
          {connectionHeaderText}
        </div>
        <div className='main--header'>
          <Link to='/events'><h1 className='logo'>Evently</h1></Link>

          <nav className='navbar'>
            {
              isLoggedIn() ?
                <>
                  <Link to='/events'>Events</Link>
                  <Link to='/login'onClick={() => {
                    logoutUser();
                  }}>Log out</Link>
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