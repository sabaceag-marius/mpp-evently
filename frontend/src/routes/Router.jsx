import {createBrowserRouter} from 'react-router';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import EventsPage from '../pages/EventsPage/EventsPage';
import App from '../App';
import EventDetailsPage from '../pages/EventDetailsPage/EventDetailsPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import AuthentificatedRoute from './AuthentificatedRoute';
import UnauthentificatedRoute from './UnauthentificatedRoute';
import ProfilePage from '../pages/ProfilePage/ProfilePage';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {path: "/events", element:<AuthentificatedRoute redirectPage='/login'><EventsPage /></AuthentificatedRoute>},
            {path: "/profile", element:<AuthentificatedRoute redirectPage='/login'><ProfilePage /></AuthentificatedRoute>},
            {path: "/events/:id", element:<AuthentificatedRoute redirectPage='/login'><EventDetailsPage /></AuthentificatedRoute>},
            {path: "/login", element: <UnauthentificatedRoute redirectPage='/events'><LoginPage /></UnauthentificatedRoute>},
            {path: "/register", element: <UnauthentificatedRoute redirectPage='/events'><RegisterPage /></UnauthentificatedRoute>},
            {path: "*", element: <ErrorPage />}
        ]
    }
])