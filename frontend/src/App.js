import logo from './logo.svg';
import Navbar from './components/Navbar/Navbar';
import EventCard from './components/EventCard/EventCard';
import { Outlet } from 'react-router';
import ErrorPage from './pages/ErrorPage/ErrorPage';

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
