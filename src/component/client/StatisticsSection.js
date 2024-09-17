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
                            <h4 className="fw-bold mt-3">> 15 tỷ </h4>
                            <p className="text-secondary">
                                Lượng giao dịch trong tháng
                            </p>
                        </Col>

                        <Col md={3} className="d-flex flex-column align-items-center gap-2">
                            <div className="d-flex justify-content-center align-items-center bg-white rounded-circle shadow-sm" style={{ width: '70px', height: '70px' }}>
                                <i className="bi bi-coin" style={{fontSize: '35px', color: '#ff5722'}}></i>
                            </div>
                            <h4 className="fw-bold mt-3">1K+</h4>
                            <p className="text-secondary">
                                Số lượt mua bán thành công
                            </p>
                        </Col>

                        <Col md={3} className="d-flex flex-column align-items-center gap-2">
                            <div
                                className="d-flex justify-content-center align-items-center bg-white rounded-circle shadow-sm"
                                style={{width: '70px', height: '70px'}}>
                                <i className="bi bi-coin" style={{fontSize: '35px', color: '#ff5722'}}></i>
                            </div>
                            <h4 className="fw-bold mt-3">> 5 tỷ  </h4>
                            <p className="text-secondary">
                                Doanh thu
                                <br />
                                dự kiến trong quý
                            </p>
                        </Col>

                        <Col md={3} className="d-flex flex-column align-items-center gap-2">
                            <div className="d-flex justify-content-center align-items-center bg-white rounded-circle shadow-sm" style={{ width: '70px', height: '70px' }}>
                                <i className="bi bi-emoji-smile" style={{ fontSize: '35px', color: '#ff5722' }}></i>
                            </div>
                            <h4 className="fw-bold mt-3">100+</h4>
                            <p className="text-secondary">Khách hàng <br />
                                thường xuyên truy cập</p>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
}