import React from 'react';
import '../../css/NotFound.css';
import {useNavigate} from "react-router-dom";


const NotFound = () => {
    const navigate = useNavigate();

    const handleNavigateHome = () => {
        navigate('/');
    };
    return (
        <div className="not-found">
            <div className="content">
                <img src="/images/404error.svg" alt="404 Error" className="astronaut-image"/>
                <h1 className="notFound">404</h1>
                <p className="notFound">Ối! Trang bạn đang tìm kiếm không tồn tại.</p>
            </div>
            <div>
                <button className='btn btn-outline-dark fw-bold' style={{padding: 10}} onClick={handleNavigateHome}>
                    HomePage<i className="bi bi-chevron-right ms-1"></i>
                </button>
            </div>
        </div>
    );
};

export default NotFound;
