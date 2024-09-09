import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {toast} from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import authService from "../../services/AuthService";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const validationSchema = Yup.object({
    name: Yup.string()
        .min(3, 'Tên người dùng phải có ít nhất 3 ký tự')
        .required('Tên người dùng là bắt buộc'),
    email: Yup.string()
        .matches(emailRegex, 'Email không hợp lệ')
        .required('Email là bắt buộc'),
    password: Yup.string()
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
        .required('Mật khẩu là bắt buộc'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Mật khẩu xác nhận không khớp')
        .required('Xác nhận mật khẩu là bắt buộc')
});

const Register = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema,
        onSubmit: async (values, {setSubmitting}) => {
            try {
                await authService.register(values);
                toast.success('Đăng ký thành công!', {theme: "colored"});
            } catch (error) {
                toast.error('Đăng ký thất bại! Vui lòng kiểm tra lại thông tin.', {theme: "colored"});
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="text-center">Đăng Ký</h3>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Tên người dùng</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.name}
                                    />
                                    {formik.touched.name && formik.errors.name ? (
                                        <div className="invalid-feedback">{formik.errors.name}</div>
                                    ) : null}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className="invalid-feedback">{formik.errors.email}</div>
                                    ) : null}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Mật khẩu</label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                    />
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className="invalid-feedback">{formik.errors.password}</div>
                                    ) : null}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu</label>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}`}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.confirmPassword}
                                    />
                                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                        <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
                                    ) : null}
                                </div>

                                <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
                                    {formik.isSubmitting ? 'Đang gửi...' : 'Đăng Ký'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
