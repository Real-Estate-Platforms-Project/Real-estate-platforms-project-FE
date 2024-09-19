import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Forbidden.css';

const Forbidden = () => {
    const navigate = useNavigate();

    const handleNavigateHome = () => {
        navigate('/');
    };

    return (
        <div className="not-found">
            <div className="content">
                <img src="/images/Remove-bg.ai_1725959794564.png" alt="403 ForBidden" className="astronaut-images"/>
                <h1 className="forbidden">403</h1>
                <p className="forbidden">Bạn không có quyền truy cập trang web này.</p>
            </div>
            <div>
                <button className='btn btn-outline-dark fw-bold' style={{padding: 10}} onClick={handleNavigateHome}>
                    HomePage<i className="bi bi-chevron-right ms-1"></i>
                </button>
            </div>
        </div>
    );
};

export default Forbidden;
