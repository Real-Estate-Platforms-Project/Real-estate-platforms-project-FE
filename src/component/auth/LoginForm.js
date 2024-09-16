import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import authService from '../../services/AuthService';
import * as accountService from '../../services/AccountService';
import {useDispatch} from 'react-redux';
import {setToken} from '../../redux/UserReducer';
import toastCustom from '../../css/Toastify.module.css';
import styles from '../../css/Auth.module.css';

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


const validationSchema = Yup.object({
    email: Yup.string()
        .matches(regexEmail, 'Địa chỉ email không hợp lệ')
        .required('Địa chỉ email là bắt buộc'),
    password: Yup.string()
        .required('Mật khẩu là bắt buộc')
});

const LoginForm = ({rememberMe, setRememberMe, isLoggingIn, setIsLoggingIn}) => {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoggingIn(true);
            try {
                const response = await authService.login(values.email, values.password);
                const isDeleted = await accountService.checkIsDeleted();

                if (isDeleted) {
                    toast.error("Tài khoản đã bị vô hiệu hóa");
                    return;
                }

                if (rememberMe) {
                    localStorage.setItem('token', response.data.token);
                } else {
                    sessionStorage.setItem('token', response.data.token);
                }

                const passwordCheck = await accountService.checkDateToChangePassword(values.email);
                if (passwordCheck) {
                    toast.error('Tài khoản của bạn cần thay đổi mật khẩu ngay!');
                }
                dispatch(setToken(response.data.token));
                const roles = response.data.authorities;
                const isAdmin = roles.some(role => ['ROLE_EMPLOYEE', 'ROLE_ADMIN'].includes(role.authority));
                if (isAdmin) {
                    navigate('/admin')
                    return;
                }
                navigate("/");

            } catch (error) {
                const errorMessage = error.response?.data;
                toast.error(errorMessage, {
                    theme: "colored",
                    className: toastCustom.customToast
                });
            } finally {
                setIsLoggingIn(false);
            }
        }
    });

    return (
        <form onSubmit={formik.handleSubmit} className="form-container">
            <div className="form-group mb-4">
                <label htmlFor="email">Địa chỉ Email</label>
                <input
                    type="text"
                    className={`form-control ${styles.formInputLogin} ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    placeholder="Nhập email..."
                    {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className="invalid-feedback">{formik.errors.email}</div>
                ) : null}
            </div>
            <div className="form-group mb-4">
                <label htmlFor="password">Mật khẩu</label>
                <div className="input-group position-relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        className={`form-control ${styles.formInputLogin} ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                        id="password"
                        placeholder="Nhập mật khẩu..."
                        {...formik.getFieldProps('password')}
                    />
                    <span className={`position-absolute ${styles.showPasswordInput}`}
                          onClick={() => setShowPassword(!showPassword)}
                          style={{cursor: 'pointer'}}>
                            {showPassword ? (<i className="fa-solid fa-eye-slash"></i>) : (
                                <i className="fa-solid fa-eye"></i>)}
                        </span>
                </div>
                {formik.touched.password && formik.errors.password ? (
                    <div className="invalid-feedback">{formik.errors.password}</div>
                ) : null}
            </div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                    />
                    <label className="form-check-label" htmlFor="rememberMe">Ghi nhớ đăng nhập!</label>
                </div>
                <a href="/forget-password">Quên mật khẩu?</a>
            </div>
            <button
                type="submit"
                className={`btn btn-warning w-100 mb-4 ${styles.btnCustomWarning}`}
                disabled={isLoggingIn}
            >
                {isLoggingIn ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
        </form>
    );
};

export default LoginForm;
