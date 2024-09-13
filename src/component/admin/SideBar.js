import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Logo from "../Logo";
import '../../css/AdminNav.css';

const SideBar = () => {
    const [isCustomerManagementOpen, setIsCustomerManagementOpen] = useState(false);

    const toggleCustomerManagement = () => {
        setIsCustomerManagementOpen(!isCustomerManagementOpen);
    };

    return (
        <Col md={2} className="sidebar">
            <Link to="/" className="d-flex justify-content-center mt-5">
                <Logo width="200px" />
            </Link>
            <ul className="custom-nav flex-column">
                <li className="custom-nav-item">
                    <Link className="custom-nav-link" to="/admin">
                        <i className="bi bi-speedometer2"></i> Bảng điều khiển
                    </Link>
                </li>
                <li className="custom-nav-item">
                    <Link className="custom-nav-link" to="/admin/personal">
                        <i className="bi bi-person"></i> Cá nhân
                    </Link>
                </li>
                <li className="custom-nav-item">
                    <Link className="custom-nav-link" to="/admin/employee">
                        <i className="bi bi-people"></i> Quản lý nhân viên
                    </Link>
                </li>
                <li className="custom-nav-item">
                    <Link className="custom-nav-link" to="#" onClick={toggleCustomerManagement}>
                        <i className="bi bi-briefcase"></i> Quản lý khách hàng
                    </Link>
                    {isCustomerManagementOpen && (
                        <ul className="custom-subnav flex-column ms-3">
                            <li className="custom-nav-item">
                                <Link className="custom-nav-link" to="/admin/buyers">
                                    <i className="bi bi-person"></i> Người mua
                                </Link>
                            </li>
                            <li className="custom-nav-item">
                                <Link className="custom-nav-link" to="/admin/sellers">
                                    <i className="bi bi-person"></i> Người bán
                                </Link>
                            </li>
                            <li className="custom-nav-item">
                                <Link className="custom-nav-link" to="/admin/customers/add">
                                    <i className="bi bi-plus"></i> Thêm mới
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>
                <li className="custom-nav-item">
                    <Link className="custom-nav-link" to="#">
                        <i className="bi bi-building"></i> Bất động sản
                    </Link>
                </li>
                <li className="custom-nav-item">
                    <Link className="custom-nav-link" to="#">
                        <i className="bi bi-credit-card"></i> Giao dịch
                    </Link>
                </li>
                <li className="custom-nav-item">
                    <Link className="custom-nav-link" to="/admin/notification">
                        <i className="bi bi-bell"></i> Thông báo
                    </Link>
                </li>
                <li className="custom-nav-item">
                    <Link className="custom-nav-link" to="#">
                        <i className="bi bi-headset"></i> Hỗ trợ
                    </Link>
                </li>
            </ul>
        </Col>
    );
};

export default SideBar;
