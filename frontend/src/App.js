import Navbar from './components/Navbar/Navbar';
import { Outlet } from 'react-router';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { useState } from 'react';
import { QueryDataProvider } from './contexts/EventQueryContext';
import { OfflineSupportProvider } from './contexts/OfflineSupportContext';

function App() {

  return (
    <OfflineSupportProvider>
      <QueryDataProvider>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Navbar />
          <Outlet />
        </LocalizationProvider>
      </QueryDataProvider>
    </OfflineSupportProvider>
  );
}

export default App;
