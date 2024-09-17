import React from 'react';
import {Outlet} from 'react-router-dom';
import AdminNav from '../../component/admin/SideBar';
import {Col, Container, Row} from "react-bootstrap";
import NavBar from "../../component/admin/NavBar";

const Admin = () => {
    return (
        <div className="admin-layout">
            <Container fluid className="admin-dashboard">
                <Row>
                    <AdminNav/>
                    <Col md={10} className={"px-0"}>
                            <NavBar/>
                        <Outlet/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Admin;
