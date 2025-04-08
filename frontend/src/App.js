import Navbar from './components/Navbar/Navbar';
import { Outlet } from 'react-router';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Navbar />
      <Outlet />
    </LocalizationProvider>
  );
}

export default App;
