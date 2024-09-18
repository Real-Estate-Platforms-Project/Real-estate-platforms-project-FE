import React, {useState} from 'react';
import { Col } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import Logo from "../Logo";
import '../../css/AdminSideBar.css';

const SideBar = () => {
    const [isCustomerManagementOpen, setIsCustomerManagementOpen] = useState(false);

    const toggleCustomerManagement = (e) => {
        e.preventDefault();
        setIsCustomerManagementOpen(!isCustomerManagementOpen);
    };

    return (
        <Col md={2} className="sidebar">
            <NavLink to="/" className="d-flex justify-content-center mt-5">
                <Logo width="180px" />
            </NavLink>
            <ul className="custom-nav flex-column">
                <li className="custom-nav-item">
                    <NavLink className="custom-nav-link" to="/admin/dashboard">
                        <i className="bi bi-speedometer2"></i> Bảng điều khiển
                    </NavLink>
                </li>
                <li className="custom-nav-item">
                    <NavLink className="custom-nav-link" to="/admin/employee">
                        <i className="bi bi-people"></i> Quản lý nhân viên
                    </NavLink>
                </li>
                <li className="custom-nav-item">
                    <a className="custom-nav-link" to="#" onClick={(e) => toggleCustomerManagement(e)}>
                        <i className="bi bi-briefcase"></i> Quản lý khách hàng
                    </a>
                    {isCustomerManagementOpen && (
                        <ul className="custom-subnav flex-column ms-3">
                            <li className="custom-nav-item">
                                <NavLink className="custom-nav-link" to="/admin/buyers">
                                    <i className="bi bi-person"></i> Người mua
                                </NavLink>
                            </li>
                            <li className="custom-nav-item">
                                <NavLink className="custom-nav-link" to="/admin/sellers">
                                    <i className="bi bi-person"></i> Người bán
                                </NavLink>
                            </li>
                            <li className="custom-nav-item">
                                <NavLink className="custom-nav-link" to="/admin/customers/add">
                                    <i className="bi bi-plus"></i> Thêm mới
                                </NavLink>
                            </li>
                        </ul>
                    )}
                </li>
                <li className="custom-nav-item">
                    <NavLink className="custom-nav-link" to="/admin/transaction">
                        <i className="bi bi-building"></i> Bất động sản
                    </NavLink>
                </li>
                <li className="custom-nav-item">
                    <NavLink className="custom-nav-link" to="/admin/danh-sach-nhu-cau">
                        <i className="bi bi-building"></i> Danh sách nhu cầu
                    </NavLink>
                </li>
                <li className="custom-nav-item">
                    <NavLink className="custom-nav-link" to="/admin/real-estate">
                        <i className="bi bi-credit-card"></i> Giao dịch
                    </NavLink>
                </li>
                <li className="custom-nav-item">
                    <NavLink className="custom-nav-link" to="/admin">
                        <i className="bi bi-graph-up"></i> Thống kê
                    </NavLink>
                </li>
                <li className="custom-nav-item">
                    <NavLink className="custom-nav-link" to="/admin/notification">
                        <i className="bi bi-bell"></i> Thông báo
                    </NavLink>
                </li>
                <li className="custom-nav-item">
                    <NavLink className="custom-nav-link" to="/admin/support">
                        <i className="bi bi-headset"></i> Hỗ trợ
                    </NavLink>
                </li>
            </ul>
        </Col>
    );
};

export default SideBar;
