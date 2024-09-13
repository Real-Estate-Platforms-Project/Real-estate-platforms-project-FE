import React from 'react';
import {Outlet} from 'react-router-dom';
import AdminNav from '../../component/admin/SideBar';
import {Col, Container, Row} from "react-bootstrap";

const Admin = () => {
    return (
        <div className="admin-layout">
            <Container fluid className="admin-dashboard">
                <Row>
                    <AdminNav/>
                    <Col md={10}>
                        <Outlet/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Admin;