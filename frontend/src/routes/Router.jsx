import {createBrowserRouter} from 'react-router';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import EventsPage from '../pages/EventsPage/EventsPage';
import App from '../App';
import EventDetailsPage from '../pages/EventDetailsPage/EventDetailsPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import OfflineRoute from './OfflineRoute';
import AuthentificatedRoute from './AuthentificatedRoute';
import UnauthentificatedRoute from './UnauthentificatedRoute';
import ProfilePage from '../pages/ProfilePage/ProfilePage';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {path: "/events", element:<AuthentificatedRoute redirectPage='/login'><OfflineRoute><EventsPage /></OfflineRoute></AuthentificatedRoute>},
            {path: "/profile", element:<AuthentificatedRoute redirectPage='/login'><OfflineRoute><ProfilePage /></OfflineRoute></AuthentificatedRoute>},
            {path: "/events/:id", element:<AuthentificatedRoute redirectPage='/login'><OfflineRoute><EventDetailsPage /></OfflineRoute></AuthentificatedRoute>},
            {path: "/login", element: <UnauthentificatedRoute redirectPage='/events'><OfflineRoute><LoginPage /></OfflineRoute></UnauthentificatedRoute>},
            {path: "/register", element: <UnauthentificatedRoute redirectPage='/events'><OfflineRoute><RegisterPage /></OfflineRoute></UnauthentificatedRoute>},
            {path: "*", element: <ErrorPage />}
        ]
    }
])