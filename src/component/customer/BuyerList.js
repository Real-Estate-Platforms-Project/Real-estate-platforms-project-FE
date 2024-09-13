import React, { useState, useEffect } from 'react';
import { getAllBuyers, searchBuyers, getBuyerById } from '../../services/BuyerService';
import { Modal, Toast, Table, Button, Container, Row, Col, Form, Card, InputGroup, Pagination } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { FaSearch, FaEye, FaIdCard, FaUser, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import '../../css/PaginationStyles.css';

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

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

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

    const currentBuyers = buyers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(buyers.length / itemsPerPage);

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

            <Card className="shadow-sm p-4 mb-4 bg-white rounded">
                <Row className="justify-content-between align-items-center">
                    <Col md={2} xs={12} className="mb-2">
                        <InputGroup>
                            <InputGroup.Text className="bg-white border-end-0">
                                <FaIdCard className="text-secondary" />
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                name="code"
                                placeholder="Mã Người Mua"
                                value={searchCriteria.code}
                                onChange={handleInputChange}
                                className="border-start-0"
                            />
                        </InputGroup>
                    </Col>
                    <Col md={2} xs={12} className="mb-2">
                        <InputGroup>
                            <InputGroup.Text className="bg-white border-end-0">
                                <FaUser className="text-secondary" />
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Tên Người Mua"
                                value={searchCriteria.name}
                                onChange={handleInputChange}
                                className="border-start-0"
                            />
                        </InputGroup>
                    </Col>
                    <Col md={2} xs={12} className="mb-2">
                        <InputGroup>
                            <InputGroup.Text className="bg-white border-end-0">
                                <FaEnvelope className="text-secondary" />
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={searchCriteria.email}
                                onChange={handleInputChange}
                                className="border-start-0"
                            />
                        </InputGroup>
                    </Col>
                    <Col md={2} xs={12} className="mb-2">
                        <InputGroup>
                            <InputGroup.Text className="bg-white border-end-0">
                                <FaPhoneAlt className="text-secondary" />
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                name="phoneNumber"
                                placeholder="Số điện thoại"
                                value={searchCriteria.phoneNumber}
                                onChange={handleInputChange}
                                className="border-start-0"
                            />
                        </InputGroup>
                    </Col>
                    <Col md={2} xs={12} className="mb-2">
                        <Button
                            style={{ backgroundColor: '#ff6b35', borderColor: '#ff6b35' }}
                            className="w-100 text-white"
                            onClick={handleSearch}
                        >
                            <FaSearch className="me-2" /> Tìm kiếm
                        </Button>
                    </Col>
                </Row>
            </Card>

            {/* Title for managing customers */}
            <h4 className="mt-3 mb-4" style={{ color: '#ff6b35', textAlign: 'left', fontSize: '2rem' }}>Quản lý Khách Hàng</h4>

            {buyers.length > 0 ? (
                <>
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
                        {currentBuyers.map((buyer) => (
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
                                        style={{ color: '#ff6b35', borderColor: '#ff6b35', marginRight: '5px' }}
                                        onClick={() => handleModalShow(buyer.id)}
                                    >
                                        <FaEye /> Xem
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <Pagination className="pagination-custom justify-content-end mt-3">
                        <Pagination.Prev
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        />
                        {Array.from({ length: totalPages }, (_, i) => (
                            <Pagination.Item
                                key={i + 1}
                                active={i + 1 === currentPage}
                                onClick={() => setCurrentPage(i + 1)}
                                className={i + 1 === currentPage ? 'active-page' : ''}
                            >
                                {i + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        />
                    </Pagination>
                </>
            ) : (
                <div className="text-center">
                    <p style={{ color: '#ff6b35', marginTop: '10px' }}>Không có người mua nào cả.</p>
                </div>
            )}

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
        </Container>
    );
};

export default BuyerList;