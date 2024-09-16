import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function StatisticsSection() {
    return (
        <>
        <div className="py-5 mt-3"  style={{ backgroundColor: '#FFF7F0' }}>
            <div className="container">
                <Row className="justify-content-center text-center">
                    <Col md={3} className="d-flex flex-column align-items-center gap-2">
                        <div className="d-flex justify-content-center align-items-center bg-white rounded-circle shadow-sm" style={{ width: '70px', height: '70px' }}>
                            <i className="bi bi-coin" style={{fontSize: '35px', color: '#ff5722'}}></i>
                        </div>
                        <h4 className="fw-bold mt-3">$15.4M</h4>
                        <p className="text-secondary">
                           Lượng giao dịch trong tháng
                        </p>
                    </Col>

                    <Col md={3} className="d-flex flex-column align-items-center gap-2">
                        <div className="d-flex justify-content-center align-items-center bg-white rounded-circle shadow-sm" style={{ width: '70px', height: '70px' }}>
                            <i className="bi bi-coin" style={{fontSize: '35px', color: '#ff5722'}}></i>
                        </div>
                        <h4 className="fw-bold mt-3">25K+</h4>
                        <p className="text-secondary">
                            Properties for Buy & sell Successfully
                        </p>
                    </Col>

                    <Col md={3} className="d-flex flex-column align-items-center gap-2">
                        <div
                            className="d-flex justify-content-center align-items-center bg-white rounded-circle shadow-sm"
                            style={{width: '70px', height: '70px'}}>
                            <i className="bi bi-coin" style={{fontSize: '35px', color: '#ff5722'}}></i>
                        </div>
                        <h4 className="fw-bold mt-3">$15.4M</h4>
                        <p className="text-secondary">
                            Owned from
                            <br />
                            Properties transactions
                        </p>
                    </Col>

                    <Col md={3} className="d-flex flex-column align-items-center gap-2">
                        <div className="d-flex justify-content-center align-items-center bg-white rounded-circle shadow-sm" style={{ width: '70px', height: '70px' }}>
                            <i className="bi bi-emoji-smile" style={{ fontSize: '35px', color: '#ff5722' }}></i>
                        </div>
                        <h4 className="fw-bold mt-3">600+</h4>
                        <p className="text-secondary">Regular Clients</p>
                    </Col>
                </Row>
            </div>
        </div>
        </>
    );
}
