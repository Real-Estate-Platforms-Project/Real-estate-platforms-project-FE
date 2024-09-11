import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import EmployeeList from '../../component/employees/EmployeeList';
import '../../css/AdminNav.css';
import {Link} from "react-router-dom";
import Logo from "../Logo";

const Nav = () => {
    const [activeSection, setActiveSection] = useState('dashboard');


    return (
        <Col md={2} className="sidebar">
            <Link to="/" className="d-flex justify-content-center mt-5">
                <Logo width="200px"/>.
            </Link>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link className="nav-link" to={"/admin"}>
                        <i className="bi bi-speedometer2"></i> Bảng điều khiển
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/admin/personal" >
                        <i className="bi bi-person"></i> Cá nhân
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/admin/employee" >
                        <i className="bi bi-people"></i> Quản lý nhân viên
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#" >
                        <i className="bi bi-building"></i> Bất động sản
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#" >
                        <i className="bi bi-credit-card"></i> Giao dịch
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#">
                        <i className="bi bi-bell"></i> Thông báo
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#">
                        <i className="bi bi-headset"></i> Hỗ trợ
                    </Link>
                </li>
            </ul>
        </Col>
    );
};

export default Nav;
