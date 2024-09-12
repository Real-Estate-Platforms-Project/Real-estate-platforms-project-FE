import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import authService from '../../services/AuthService';
import {
    MDBBtn,
    MDBCheckbox,
    MDBContainer,
    MDBInput,
    MDBTabs,
    MDBTabsContent,
    MDBTabsItem,
    MDBTabsLink,
} from "mdb-react-ui-kit";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import styles from '../../css/Toastify.module.css';
import mdbCustom from '../../css/MDBCustom.module.css'
import Logo from '../../component/Logo.js'

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

function Authentication() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [justifyActive, setJustifyActive] = useState('login');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.login(email, password);
            localStorage.setItem('token', response.data.token);
            toast.success('Đăng nhập thành công!', {theme: "colored", className: styles.customToast});
            navigate('/');
        } catch (error) {
            toast.error('Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin đăng nhập.', {theme: "colored", className: styles.customToast});
        }
    };

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }
        setJustifyActive(value);
    };

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
                const response = await authService.register(values);
                toast.success('Đăng ký thành công! vui lòng kiểm tra email để kích hoạt tài khoản.', {theme: "colored", className: styles.customToast});
                setJustifyActive('login');
            } catch (error) {
                toast.error('Đăng ký thất bại! Vui lòng kiểm tra lại thông tin đăng ký.', {theme: "colored", className: styles.customToast});
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <div className="container">
            <Link to="/" className="d-flex justify-content-center mt-5">
                <Logo width="200px"/>.
            </Link>
            <MDBContainer className="p-3 d-flex flex-column w-50 mt-3">
                <MDBTabs justify className='mb-3 d-flex flex-row justify-space-between mb-7'>
                    <MDBTabsItem>
                        <MDBTabsLink
                            onClick={() => handleJustifyClick('login')}
                            active={justifyActive === 'login'}
                        className={`${justifyActive === 'login' ? mdbCustom.activeTab : ''} fw-bold`}>
                            Đăng nhập
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink
                            onClick={() => handleJustifyClick('register')}
                            active={justifyActive === 'register'}
                            className={`${justifyActive === 'register' ? mdbCustom.activeTab : ''} fw-bold`}>
                            Đăng Ký
                        </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>
                <MDBTabsContent>
                    {justifyActive === 'login' ? <div>
                            <form onSubmit={handleLogin}>
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Địa chỉ Email'
                                    id='form1'
                                    type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Mật khẩu'
                                    id='form2'
                                    type='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <div className="d-flex justify-content-between mx-4 mb-4">
                                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault'
                                                 label='Ghi nhớ đăng nhập!'/>
                                    <a href="/forget-password">Quên mật khẩu?</a>
                                </div>

                                <MDBBtn className={`mb-4 w-100 ${mdbCustom.btnCustomWarning}`}>Đăng nhập</MDBBtn>
                            </form>
                            <p className="text-center">Bạn chưa có tài khoản? <a className="text-warning" href="#" onClick={() => handleJustifyClick('register')}>Đăng ký ngay</a></p>
                        </div>
                        :
                        <form onSubmit={formik.handleSubmit}>
                            <MDBInput
                                wrapperClass='mb-4'
                                label='Tên người dùng'
                                id='name'
                                type='text'
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={formik.touched.name && formik.errors.name ? 'is-invalid' : ''}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="invalid-feedback">{formik.errors.name}</div>
                            ) : null}

                            <MDBInput
                                wrapperClass='mb-4'
                                label='Địa chỉ Email'
                                id='email'
                                type='email'
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={formik.touched.email && formik.errors.email ? 'is-invalid' : ''}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="invalid-feedback">{formik.errors.email}</div>
                            ) : null}

                            <MDBInput
                                wrapperClass='mb-4'
                                label='Mật khẩu'
                                id='password'
                                type='password'
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={formik.touched.password && formik.errors.password ? 'is-invalid' : ''}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="invalid-feedback">{formik.errors.password}</div>
                            ) : null}

                            <MDBInput
                                wrapperClass='mb-4'
                                label='Nhập lại Mật khẩu'
                                id='confirmPassword'
                                type='password'
                                name="confirmPassword"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
                            ) : null}

                            <div className='d-flex justify-content-center mb-4'>
                                <MDBCheckbox
                                    name='flexCheck'
                                    id='flexCheckDefault1'
                                    label='Tôi đã đọc và đồng ý với các điều khoản.'
                                />
                            </div>

                            <MDBBtn className={`mb-4 w-100 ${mdbCustom.btnCustomWarning}`} type="submit" disabled={formik.isSubmitting}>
                                {formik.isSubmitting ? 'Đang gửi...' : 'Đăng ký'}
                            </MDBBtn>
                        </form>
                    }
                </MDBTabsContent>
            </MDBContainer>
        </div>

    );
}

export default Authentication;
