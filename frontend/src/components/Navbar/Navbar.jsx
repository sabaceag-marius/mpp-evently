import React from 'react';
import './Navbar.css';
import { Link } from 'react-router';
import { useOfflineSupport } from '../../contexts/OfflineSupportContext';


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
            <Link to='/events'>Events</Link>
            <Link to='/events'>Friends</Link>
            <Link to='/events'>Profile</Link>
            <Link to='/events'>Log out</Link>
          </nav>
        </div>

    </header>
  )
}

export default Navbar;