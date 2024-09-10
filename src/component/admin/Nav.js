import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import EmployeeList from '../../component/employees/EmployeeList';  // Nhập thành phần EmployeeList
import '../../css/AdminNav.css';
import {Link} from "react-router-dom";
import Logo from "../Logo";

const Admin = () => {
    const [activeSection, setActiveSection] = useState('dashboard');

    const renderContent = () => {
        switch (activeSection) {
            case 'dashboard':
                return <div>Nội dung Dashboard</div>;
            case 'employees':
                return <EmployeeList />;
            case 'personal':
                return <div>Nội dung Personal</div>;
            case 'realestate':
                return <div>Nội dung Real Estate</div>;
            case 'transactions':
                return <div>Nội dung Transactions</div>;
            case 'notifications':
                return <div>Nội dung Notifications</div>;
            case 'support':
                return <div>Nội dung Support</div>;
            default:
                return <div>Chọn một phần</div>;
        }
    };

    return (
        <Container fluid className="admin-dashboard">
            <Row>
                <Col md={2} className="sidebar">
                    <Link to="/" className="d-flex justify-content-center mt-5">
                        <Logo width="200px"/>.
                    </Link>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link className="nav-link" to="#" onClick={() => setActiveSection('dashboard')}>
                                <i className="bi bi-speedometer2"></i> Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#" onClick={() => setActiveSection('personal')}>
                                <i className="bi bi-person"></i> Personal
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#" onClick={() => setActiveSection('employees')}>
                                <i className="bi bi-people"></i> Employees
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#" onClick={() => setActiveSection('realestate')}>
                                <i className="bi bi-building"></i> Real Estate
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#" onClick={() => setActiveSection('transactions')}>
                                <i className="bi bi-credit-card"></i> Transactions
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#" onClick={() => setActiveSection('notifications')}>
                                <i className="bi bi-bell"></i> Notifications
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#" onClick={() => setActiveSection('support')}>
                                <i className="bi bi-headset"></i> Support
                            </Link>
                        </li>
                    </ul>
                </Col>
                <Col md={10}>
                    {renderContent()}
                </Col>
            </Row>
        </Container>
    );
};

export default Admin;
