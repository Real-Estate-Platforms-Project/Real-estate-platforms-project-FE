import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Player} from '@lottiefiles/react-lottie-player';
import lottieSuccess from '../../lottie/success.json';
import lottieError from '../../lottie/error.json';
import authService from "../../services/AuthService";

const ActivationSuccess = () => {
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const [countdown, setCountdown] = useState(10); // Thêm state cho countdown
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    console.log(token);

    useEffect(() => {
        if (token) {
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
                    const timer = setInterval(() => {
                        setCountdown(prevCountdown => prevCountdown - 1);
                    }, 1000);

                    setTimeout(() => {
                        navigate('/login');
                    }, 10000);

                    return () => clearInterval(timer);
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
            <div>
                {
                    success ?
                        <Player
                            autoplay
                            keepLastFrame
                            src={lottieSuccess}
                            style={{height: '300px', width: '300px'}}
                        />
                        :
                        <Player
                            autoplay
                            keepLastFrame
                            src={lottieError}
                            style={{height: '300px', width: '300px'}}
                        />
                }

                <h2 className="alert-heading mt-3">{success ? 'Thành công!' : 'Lỗi!'}</h2>
                <p className="text-center mt-1">{message}</p>
                <p className="text-center mt-5">
                    Trang sẽ được chuyển hướng về trang đăng nhập sau {countdown} giây...
                </p>
            </div>
        </div>
    );
};

export default ActivationSuccess;
