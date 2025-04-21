import Navbar from './components/Navbar/Navbar';
import { Outlet } from 'react-router';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { useState } from 'react';

function App() {

  const [connectionStatus, setConnectionStatus] = useState('internetOfflinea');

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Navbar connectionStatus = {connectionStatus} setConnectionStatus = {setConnectionStatus} />
      <Outlet />
    </LocalizationProvider>
  );
}

export default App;
