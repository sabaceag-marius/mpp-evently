import {createBrowserRouter} from 'react-router';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import EventsPage from '../pages/EventsPage/EventsPage';
import App from '../App';
import EventDetailsPage from '../pages/EventDetailsPage/EventDetailsPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import OfflineRoute from './OfflineRoute';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {path: "/events", element:<EventsPage />},
            {path: "/events/:id", element:<EventDetailsPage />},
            {path: "/login", element: <LoginPage />},
            {path: "/register", element: <OfflineRoute><RegisterPage /></OfflineRoute>},
            {path: "*", element: <ErrorPage />}
        ]
    }
])