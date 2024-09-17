import React, {useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import authService from '../../services/AuthService';
import toastCustom from '../../css/Toastify.module.css';
import {toast} from 'react-toastify';
import styles from '../../css/Auth.module.css';

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/

const validationSchema = Yup.object({
    name: Yup.string()
        .min(3, 'Tên người dùng phải có ít nhất 3 ký tự')
        .max(255, 'Tên người dùng tối đa 155 ký tự')
        .required('Tên người dùng là bắt buộc'),
    email: Yup.string()
        .matches(regexEmail,'Địa chỉ email không hợp lệ')
        .max(100, 'Email tối đa 100 ký tự')
        .required('Email là bắt buộc'),
    password: Yup.string()
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
        .matches(regexPassword, 'Mật khẩu bao gồm chữ cái viết hoa, viết thường, ký tự đặc biệt và số')
        .required('Mật khẩu là bắt buộc'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Mật khẩu xác nhận không khớp')
        .required('Xác nhận mật khẩu là bắt buộc')
});

const RegisterForm = () => {
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema,
        onSubmit: async (values, {setSubmitting}) => {
            if (!termsAccepted) {
                toast.warning('Bạn cần đồng ý với các chính sách và điều khoản!', {
                    theme: "colored",
                    className: toastCustom.customToast
                });
                setSubmitting(false);
                return;
            }
            try {
                const response = await authService.register(values);
                toast.success('Đăng ký thành công! Vui lòng kiểm tra email để kích hoạt tài khoản.', {
                    theme: "colored",
                    className: toastCustom.customToast
                });
            } catch (error) {
                toast.error(error.response?.data, {
                    theme: "colored",
                    className: toastCustom.customToast
                });
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="form-group mb-4">
                <label htmlFor="name">Tên người dùng</label>
                <input
                    type="text"
                    className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : styles.formInputRegister}`}
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                    <div className="invalid-feedback">{formik.errors.name}</div>
                ) : null}
            </div>

            <div className="form-group mb-4">
                <label htmlFor="email">Địa chỉ Email</label>
                <input
                    type="text"
                    className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : styles.formInputRegister}`}
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className="invalid-feedback">{formik.errors.email}</div>
                ) : null}
            </div>

            <div className="form-group mb-4">
                <label htmlFor="password">Mật khẩu</label>
                <div className="form-group position-relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : styles.formInputRegister}`}
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <span className={`position-absolute ${styles.showPasswordInput}`}
                          onClick={() => setShowPassword(!showPassword)}
                          style={{cursor: 'pointer'}}>
                            {showPassword ? (<i className="fa-solid fa-eye-slash"></i>) : (
                                <i className="fa-solid fa-eye"></i>)}
                        </span>
                    {formik.touched.password && formik.errors.password ? (
                        <div className="invalid-feedback">{formik.errors.password}</div>
                    ) : null}
                </div>
            </div>

            <div className="form-group mb-4">
                <label htmlFor="confirmPassword">Nhập lại Mật khẩu</label>
                <div className="form-group position-relative">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : styles.formInputRegister}`}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <span
                        className={`position-absolute ${styles.showPasswordInput}`}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{cursor: 'pointer'}}>
                            {showConfirmPassword ? (<i className="fa-solid fa-eye-slash"></i>) : (
                                <i className="fa-solid fa-eye"></i>)}
                        </span>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                        <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
                    ) : null}
                </div>

            </div>

            <div className='d-flex align-items-center mb-4 justify-content-center'>
                <input
                    type="checkbox"
                    className="form-check-input me-2 mt-0"
                    id="termsAccepted"
                    checked={termsAccepted}
                    onChange={() => setTermsAccepted(!termsAccepted)}
                />
                <label htmlFor="termsAccepted" className="form-check-label">
                    Tôi đã đồng ý với <a href="/terms-and-polocies" target="_blank" rel="noopener noreferrer">chính sách
                    và điều khoản</a>.
                </label>
            </div>

            <button
                type="submit"
                className={`btn btn-warning w-100 mb-4 ${styles.btnCustomWarning}`}
                disabled={formik.isSubmitting}
            >
                {formik.isSubmitting ? 'Đang gửi...' : 'Đăng ký'}
            </button>
        </form>
    );
};

export default RegisterForm;