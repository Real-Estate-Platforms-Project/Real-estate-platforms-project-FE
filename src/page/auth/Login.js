import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import authService from '../../services/AuthService';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.login(email, password);
            localStorage.setItem('token', response.data.token); // Lưu JWT vào localStorage
            toast.success('Đăng nhập thành công!', {theme: "colored"});
            navigate('/');
        } catch (error) {
            toast.error('Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.', {theme: "colored"});
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="p-5 shadow rounded-3">
                        <h2 className="text-center mb-4">Đăng Nhập</h2>
                        <form onSubmit={handleLogin}>
                            <div className="form-group mb-3">
                                <label className="mb-1" htmlFor="email">Tên đăng nhập</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    id="email"
                                    placeholder="Nhập tên đăng nhập"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="mb-1" htmlFor="password">Mật khẩu</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    id="password"
                                    placeholder="Nhập mật khẩu"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="text-end">
                                <button type="submit" className="btn btn-primary btn-block">Đăng Nhập</button>
                            </div>
                        </form>
                        <p className="text-center mt-4">Nếu bạn chưa có tài khoản vui lòng <Link to="/register">đăng ký</Link> tài khoản</p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;
