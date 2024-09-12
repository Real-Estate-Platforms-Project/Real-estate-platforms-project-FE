import React, { useState, useEffect } from 'react';
import { getAllSellers, getSellerById, searchSellers } from '../../services/SellerService';
import { Modal, Toast, Table, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { FaSearch, FaEye } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const SellerList = () => {
    const [sellers, setSellers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedSeller, setSelectedSeller] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [searchCriteria, setSearchCriteria] = useState({
        code: '',
        name: '',
        email: '',
        phoneNumber: ''
    });

    useEffect(() => {
        loadSellers();
    }, []);

    const loadSellers = () => {
        getAllSellers()
            .then((data) => {
                setSellers(data);
                setShowToast(data.length === 0);
            })
            .catch(console.error);
    };

    const handleSearch = () => {
        searchSellers(searchCriteria)
            .then((data) => {
                setSellers(data);
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
        setSelectedSeller(null);
    };

    const handleModalShow = async (sellerId) => {
        try {
            const seller = await getSellerById(sellerId);
            setSelectedSeller(seller);
            setShowModal(true);
        } catch (error) {
            console.error('Error fetching seller details:', error);
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
                    <Toast.Body>Không có người bán nào cả.</Toast.Body>
                </Toast>
            </ToastContainer>

            <Modal show={showModal} onHide={handleModalClose} centered>
                <Modal.Header closeButton style={{ backgroundColor: '#FC650B', color: 'white' }}>
                    <Modal.Title>Thông tin chi tiết người bán</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedSeller ? (
                        <div className="card border-0">
                            <div className="card-body">
                                <h5 className="card-title" style={{ color: '#FC650B' }}>{selectedSeller.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Mã: {selectedSeller.code}</h6>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item"><strong>Ngày sinh:</strong> {selectedSeller.dob}</li>
                                    <li className="list-group-item"><strong>Giới tính:</strong> {selectedSeller.gender}</li>
                                    <li className="list-group-item"><strong>Số điện thoại:</strong> {selectedSeller.phoneNumber}</li>
                                    <li className="list-group-item"><strong>Email:</strong> {selectedSeller.email}</li>
                                    <li className="list-group-item"><strong>Địa chỉ:</strong> {selectedSeller.address}</li>
                                    <li className="list-group-item"><strong>ID Card:</strong> {selectedSeller.idCard}</li>
                                    <li className="list-group-item"><strong>Loại khách hàng:</strong> {selectedSeller.customerType === 'seller' ? 'Người bán' : 'Người mua'}</li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <p>Không có thông tin để hiển thị.</p>
                    )}
                </Modal.Body>
            </Modal>

            <div className="bg-white p-3 rounded shadow-sm mb-4">
                <Row className="mb-3">
                    <Col md={2} className="mb-2">
                        <Form.Control
                            type="text"
                            name="code"
                            placeholder="Mã Người Bán"
                            value={searchCriteria.code}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col md={2} className="mb-2">
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Tên Người Bán"
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
                    <Col md={2} className="mb-2">
                        <Button
                            variant="outline-dark"
                            className="w-100"
                            onClick={handleSearch}
                        >
                            <FaSearch /> Tìm kiếm
                        </Button>
                    </Col>
                </Row>
            </div>

            {sellers.length > 0 ? (
                <div className="table-responsive shadow-sm rounded">
                    <Table striped hover responsive="sm" className="align-middle">
                        <thead className="bg-primary text-white">
                        <tr>
                            <th>Mã người bán</th>
                            <th>Họ tên</th>
                            <th>Ngày sinh</th>
                            <th>Giới tính</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sellers.map((seller) => (
                            <tr key={seller.id}>
                                <td>{seller.code}</td>
                                <td>{seller.name}</td>
                                <td>{seller.dob}</td>
                                <td>{seller.gender}</td>
                                <td>{seller.phoneNumber}</td>
                                <td>{seller.email}</td>
                                <td>
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={() => handleModalShow(seller.id)}
                                    >
                                        <FaEye /> Xem
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            ) : (
                <div className="text-center">
                    <p style={{ color: '#FC650B', marginTop: '10px' }}>Không có người bán nào cả.</p>
                </div>
            )}
        </Container>
    );
};

export default SellerList;