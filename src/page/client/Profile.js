import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {format} from 'date-fns';
import {vi} from 'date-fns/locale';
import styles from '../../css/Profile.module.css'
import ProfileForm from "../../component/client/ProfileForm";
import {toast} from "react-toastify";
import customToast from "../../css/Toastify.module.css";

export default function ProfilePage() {
    const [userPermission, setUserPermission] = useState('');
    const [highestRole, setHighestRole] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const user = useSelector((state) => state.auth.user);
    const roles = useSelector((state) => state.auth.roles);
    const formattedDob = user.dob ? format(new Date(user.dob), 'dd/MM/yyyy', {locale: vi}) : '';

    const rolePriority = {
        'ROLE_BUYER': 1,
        'ROLE_SELLER': 2,
        'ROLE_EMPLOYEE': 3,
        'ROLE_ADMIN': 4
    };

    const handleSave = () => {
        localStorage.setItem('profileUpdateToast', 'Cập nhật thông tin thành công.');
        window.location.href="/profile";
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    useEffect(() => {
        if (roles && roles.length > 0) {
            const highest = roles.reduce((highest, current) => {
                return rolePriority[current.name] > rolePriority[highest.name] ? current : highest;
            }, roles[0]);
            setHighestRole(highest);

            switch (highest.name) {
                case 'ROLE_ADMIN':
                    setUserPermission('Quản trị viên');
                    break;
                case 'ROLE_EMPLOYEE':
                    setUserPermission('Nhân viên');
                    break;
                case 'ROLE_SELLER':
                    setUserPermission('Người bán');
                    break;
                case 'ROLE_BUYER':
                    setUserPermission('Người mua');
                    break;
                default:
                    setUserPermission('Không xác định');
            }
        }
    }, [roles]);

    useEffect(() => {
        const toastMessage = localStorage.getItem('profileUpdateToast');
        if (toastMessage) {
            toast.success(toastMessage, {theme: "colored", className: customToast.customToast});
            localStorage.removeItem('profileUpdateToast');
        }
    }, []);

    return (
        <section style={{backgroundColor: '#eee'}}>
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-4">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb bg-light rounded-3 p-3 mb-4">
                                <li className="breadcrumb-item">
                                    <Link to="/">Trang chủ</Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Thông tin cá nhân</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-lg-8">
                        {isEditing ? (<h4 className={'text-center mb-4 p-3 text-black bg-light rounded-3'}>Cập nhật thông tin</h4>) : (
                            <div className="d-flex mb-4 p-3 justify-content-center text-black bg-light rounded-3">
                                <h4 className={'mb-0'}>Thông tin người dùng</h4>
                                <i onClick={() => {setIsEditing(!isEditing)}} className={`fa-solid fa-pen-to-square ms-2 fs-5 align-content-center ${styles.btnEdit}`}></i>
                            </div>
                        )}
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-4">
                        <div className="card mb-4 text-center">
                            <div className="card-body">
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{width: '150px'}}
                                />
                                <p className="text-black mb-3 mt-4 fw-bold fs-5">{`Quyền hạn: ${userPermission}`}</p>
                                {highestRole?.name === 'ROLE_BUYER' && (
                                    <div className="d-flex justify-content-center mb-2">
                                        <button className={styles.btnUpperRole}>Đăng ký người bán</button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="card mb-4">
                            <div className="card-body p-0">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i className="fas fa-globe fa-lg text-warning"></i>
                                        <span>http://realestateplatform.com.vn</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i className="fab fa-github fa-lg" style={{color: '#333333'}}></i>
                                        <span>github</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i className="fa-solid fa-envelope" style={{color: '#ef765d'}}></i>
                                        <span>realestateplatform@gmail.com</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i className="fab fa-instagram fa-lg" style={{color: '#ac2bac'}}></i>
                                        <span>instagram</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i className="fab fa-facebook fa-lg" style={{color: '#3b5998'}}></i>
                                        <span>facebook</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8">

                        {isEditing ? (
                            <ProfileForm user={user} onSave={handleSave} onCancel={handleCancel}/>
                        ) : (

                            <div className="card mb-4">
                                <div className="card-body">
                                    {[
                                        {label: "Họ tên", value: user.name},
                                        {label: "Ngày sinh", value: formattedDob},
                                        {label: "Email", value: user.email},
                                        {label: "Số điện thoại", value: user.phoneNumber},
                                        {label: "Mã người dùng", value: user.code},
                                        {label: "Địa chỉ", value: user.address},
                                        {label: "Giới tính", value: user.gender},
                                        {label: "CCCD/Hộ chiếu", value: user.idCard}
                                    ].map(({label, value}, index) => (
                                        <div key={index} className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0 fw-bold">{label}</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-dark mb-0">{value}</p>
                                            </div>
                                            <hr/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
