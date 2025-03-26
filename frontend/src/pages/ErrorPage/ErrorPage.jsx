import React from 'react';
import {Link} from "react-router";

function ErrorPage() {
    return (
        <div>
            <h1>Page not found!</h1>
            <p>We can't seem to find the page you're looking for, or an error occured!</p>
            <Link to="/events">Go to the home page</Link>
        </div>
    );
}

export default ErrorPage;