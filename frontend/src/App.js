import Navbar from './components/Navbar/Navbar';
import { Outlet } from 'react-router';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { useState } from 'react';
import { QueryDataProvider } from './contexts/EventQueryContext';

function App() {

  const [connectionStatus, setConnectionStatus] = useState('internetOfflinea');

  return (
    <QueryDataProvider>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Navbar connectionStatus = {connectionStatus} setConnectionStatus = {setConnectionStatus} />
        <Outlet />
      </LocalizationProvider>
    </QueryDataProvider>
  );
}

export default App;
