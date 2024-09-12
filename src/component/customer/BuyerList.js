import React, { useState, useEffect } from 'react';
import { getAllBuyers, searchBuyers, getBuyerById } from '../../services/BuyerService';
import { Modal, Toast, Table, Button, Container, Row, Col, Form, Card } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { FaSearch, FaEye } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const BuyerList = () => {
    const [buyers, setBuyers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedBuyer, setSelectedBuyer] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [searchCriteria, setSearchCriteria] = useState({
        code: '',
        name: '',
        email: '',
        phoneNumber: ''
    });

    useEffect(() => {
        loadBuyers();
    }, []);

    const loadBuyers = () => {
        getAllBuyers()
            .then((data) => {
                setBuyers(data);
                setShowToast(data.length === 0);
            })
            .catch(console.error);
    };

    const handleSearch = () => {
        searchBuyers(searchCriteria)
            .then((data) => {
                setBuyers(data);
                setShowToast(data.length === 0);
            })
            .catch(console.error);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchCriteria((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedBuyer(null);
    };

    const handleModalShow = async (buyerId) => {
        try {
            const buyer = await getBuyerById(buyerId);
            setSelectedBuyer(buyer);
            setShowModal(true);
        } catch (error) {
            console.error('Error fetching buyer details:', error);
        }
    };

    return (
        <Container className="mt-4">
            <ToastContainer position="top-end" className="p-3">
                <Toast
                    onClose={() => setShowToast(false)}
                    show={showToast}
                    delay={5000}
                    autohide
                    bg="warning"
                >
                    <Toast.Header closeButton>
                        <strong className="me-auto">Thông báo</strong>
                    </Toast.Header>
                    <Toast.Body>Không có người mua nào cả.</Toast.Body>
                </Toast>
            </ToastContainer>

            <Modal show={showModal} onHide={handleModalClose} centered>
                <Modal.Header closeButton style={{ backgroundColor: '#ff6b35', color: 'white' }}>
                    <Modal.Title>Thông tin chi tiết người mua</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedBuyer ? (
                        <Card className="border-0">
                            <Card.Body>
                                <Card.Title style={{ color: '#ff6b35' }}>{selectedBuyer.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Mã: {selectedBuyer.code}</Card.Subtitle>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item"><strong>Ngày sinh:</strong> {selectedBuyer.dob}</li>
                                    <li className="list-group-item"><strong>Giới tính:</strong> {selectedBuyer.gender}</li>
                                    <li className="list-group-item"><strong>Số điện thoại:</strong> {selectedBuyer.phoneNumber}</li>
                                    <li className="list-group-item"><strong>Email:</strong> {selectedBuyer.email}</li>
                                    <li className="list-group-item"><strong>Địa chỉ:</strong> {selectedBuyer.address}</li>
                                    <li className="list-group-item"><strong>ID Card:</strong> {selectedBuyer.idCard}</li>
                                    <li className="list-group-item"><strong>Loại khách hàng:</strong> {selectedBuyer.customerType === 'buyer' ? 'Người mua' : 'Người bán'}</li>
                                </ul>
                            </Card.Body>
                        </Card>
                    ) : (
                        <p>Không có thông tin để hiển thị.</p>
                    )}
                </Modal.Body>
            </Modal>

            <Card className="shadow-sm p-3 mb-4 bg-white rounded">
                <Row className="mb-3 justify-content-center">
                    <Col md={2} className="mb-2">
                        <Form.Control
                            type="text"
                            name="code"
                            placeholder="Mã Người Mua"
                            value={searchCriteria.code}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col md={2} className="mb-2">
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Tên Người Mua"
                            value={searchCriteria.name}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col md={2} className="mb-2">
                        <Form.Control
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={searchCriteria.email}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col md={2} className="mb-2">
                        <Form.Control
                            type="text"
                            name="phoneNumber"
                            placeholder="Số điện thoại"
                            value={searchCriteria.phoneNumber}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col md={2} className="mb-2 d-flex justify-content-center">
                        <Button
                            style={{ backgroundColor: '#ff6b35', borderColor: '#ff6b35' }}
                            className="w-100 text-white"
                            onClick={handleSearch}
                        >
                            <FaSearch /> Tìm kiếm
                        </Button>
                    </Col>
                </Row>
            </Card>

            {buyers.length > 0 ? (
                <Table striped hover responsive="sm" className="align-middle shadow-sm rounded">
                    <thead style={{ backgroundColor: '#ff6b35', color: 'white' }}>
                    <tr>
                        <th>Mã người mua</th>
                        <th>Họ tên</th>
                        <th>Ngày sinh</th>
                        <th>Giới tính</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {buyers.map((buyer) => (
                        <tr key={buyer.id}>
                            <td>{buyer.code}</td>
                            <td>{buyer.name}</td>
                            <td>{buyer.dob}</td>
                            <td>{buyer.gender}</td>
                            <td>{buyer.phoneNumber}</td>
                            <td>{buyer.email}</td>
                            <td>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    style={{ color: '#ff6b35', borderColor: '#ff6b35' }}
                                    onClick={() => handleModalShow(buyer.id)}
                                >
                                    <FaEye /> Xem
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            ) : (
                <div className="text-center">
                    <p style={{ color: '#ff6b35', marginTop: '10px' }}>Không có người mua nào cả.</p>
                </div>
            )}
        </Container>
    );
};

export default BuyerList;