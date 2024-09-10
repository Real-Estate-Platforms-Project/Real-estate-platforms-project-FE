import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import EmployeeList from '../../component/employees/EmployeeList';  // Nhập thành phần EmployeeList
import '../../css/AdminNav.css';

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
                {/* Sidebar */}
                <Col md={2} className="sidebar">
                    <div className="sidebar-header">
                        <h2>#DASHMIN</h2>
                    </div>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={() => setActiveSection('dashboard')}>
                                <i className="bi bi-speedometer2"></i> Dashboard
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={() => setActiveSection('personal')}>
                                <i className="bi bi-person"></i> Personal
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={() => setActiveSection('employees')}>
                                <i className="bi bi-people"></i> Employees
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={() => setActiveSection('realestate')}>
                                <i className="bi bi-building"></i> Real Estate
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={() => setActiveSection('transactions')}>
                                <i className="bi bi-credit-card"></i> Transactions
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={() => setActiveSection('notifications')}>
                                <i className="bi bi-bell"></i> Notifications
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={() => setActiveSection('support')}>
                                <i className="bi bi-headset"></i> Support
                            </a>
                        </li>
                    </ul>
                </Col>

                {/* Nội dung chính */}
                <Col md={10}>
                    {renderContent()}
                </Col>
            </Row>
        </Container>
    );
};

export default Admin;
