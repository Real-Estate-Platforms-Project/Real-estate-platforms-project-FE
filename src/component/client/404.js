import React from 'react';
import '../../css/NotFound.css';


const NotFound = () => {
    return (
            <div className="not-found">
                <div className="content">
                    <img src="/images/404error.svg" alt="404 Error" className="astronaut-image"/>
                    <h1>404</h1>
                    <p>Oops! The page you’re looking for doesn’t exist.</p>
                </div>
                <div>
                    <button>HomePage <i className="bi bi-chevron-right"></i></button>
                </div>
            </div>
    );
};

export default NotFound;
