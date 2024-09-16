import React, { useState } from 'react';
import LoginForm from '../../component/auth/LoginForm';
import RegisterForm from '../../component/auth/RegisterForm';
import mdbCustom from '../../css/Auth.module.css';
import Logo from "../../component/Logo";
import {Link} from "react-router-dom";
import styles from "../../css/Auth.module.css";

const Authentication = () => {
    const [justifyActive, setJustifyActive] = useState('login');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleJustifyClick = (value) => {
        setJustifyActive(value);
    };

    return (
        <div className='vh-100 d-flex justify-content-center align-items-center'>
            <div className={`col-6 col-lg-5 col-xl-4 ${mdbCustom.formContainer}`}>
                <div className="d-flex mb-4 justify-content-center">
                    <Link to={'/'}>
                        <Logo width={'200px'}/>
                    </Link>
                </div>
                <ul className="nav nav-tabs mb-5 row">
                    <li className="nav-item col-6 d-flex justify-content-center">
                        <button
                            className={`nav-link fw-bold w-100 ${justifyActive === 'login' ? styles.activeTab : ''}`}
                            onClick={() => handleJustifyClick('login')}
                        >
                            Đăng nhập
                        </button>
                    </li>
                    <li className="nav-item col-6 d-flex justify-content-center">
                        <button
                            className={`nav-link fw-bold w-100 ${justifyActive === 'register' ? styles.activeTab : ''}`}
                            onClick={() => handleJustifyClick('register')}
                        >
                            Đăng Ký
                        </button>
                    </li>
                </ul>

                {justifyActive === 'login' && (
                    <LoginForm
                        rememberMe={rememberMe}
                        setRememberMe={setRememberMe}
                        isLoggingIn={isLoggingIn}
                        setIsLoggingIn={setIsLoggingIn}
                    />
                )}

                {justifyActive === 'register' && <RegisterForm/>}
            </div>
        </div>
    );
}

export default Authentication;
