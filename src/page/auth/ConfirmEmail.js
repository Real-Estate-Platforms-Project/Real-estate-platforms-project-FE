import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import authService from "../../services/AuthService";

const ActivationSuccess = () => {
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    console.log(token);

    useEffect(() => {
        if (token) {
            alert("djwhgdawjdfwjdfgu")
            authService.confirmRegister(token)
                .then(response => {
                    setSuccess(true);
                    setMessage('Tài khoản đã được kích hoạt thành công!');
                })
                .catch(error => {
                    setSuccess(false);
                    setMessage(error.response?.data || 'Có lỗi xảy ra!');
                })
                .finally(() => {
                    setLoading(false);
                    setTimeout(() => navigate('/login'), 10000);
                });
        } else {
            setSuccess(false);
            setMessage('Mã xác thực không hợp lệ!');
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <div className="text-center mt-5">Đang xử lý...</div>;
    }

    return (
        <div className="container text-center mt-5">
            <div className={`alert ${success ? 'alert-success' : 'alert-danger'}`} role="alert">
                <FontAwesomeIcon icon={success ? faCheckCircle : faTimesCircle} size="3x" />
                <h4 className="alert-heading mt-3">{success ? 'Thành công!' : 'Lỗi!'}</h4>
                <p className="text-center">{message}</p>
            </div>
        </div>
    );
};

export default ActivationSuccess;
