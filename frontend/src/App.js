import Navbar from './components/Navbar/Navbar';
import { Outlet } from 'react-router';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { useState } from 'react';
import { QueryDataProvider } from './contexts/EventQueryContext';
import { OfflineSupportProvider } from './contexts/OfflineSupportContext';
import { UserProvider } from './contexts/AuthContext';

function App() {

  return (
      // <OfflineSupportProvider>
        <UserProvider>

      {/* <QueryDataProvider> */}
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Navbar />
          <Outlet />
        </LocalizationProvider>
      {/* </QueryDataProvider> */}
      </UserProvider>

    // </OfflineSupportProvider>
    
  );
}

export default App;
