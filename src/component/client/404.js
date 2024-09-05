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
                    <button className='btn btn-outline-dark fw-bold' style={{padding: 10}}>HomePage<i className="bi bi-chevron-right ms-1"></i></button>
                </div>
            </div>
    );
};

export default NotFound;
