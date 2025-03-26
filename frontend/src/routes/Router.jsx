import {createBrowserRouter} from 'react-router';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import EventsPage from '../pages/EventsPage/EventsPage';
import App from '../App';
import EventDetailsPage from '../pages/EventDetailsPage/EventDetailsPage';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {path: "/events", element:<EventsPage />},
            {path: "/events/:id", element:<EventDetailsPage />},
            {path: "*", element: <ErrorPage />}
        ]
    }
])