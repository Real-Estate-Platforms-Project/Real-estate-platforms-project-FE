import React, { useState, useEffect } from 'react';
import { getAllSellers, getSellerById, searchSellers } from '../../services/SellerService';
import { Modal, Toast, Table, Button, Container, Row, Col, Form, Card, InputGroup, Pagination } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { FaSearch, FaEye, FaIdCard, FaUser, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import '../../css/PaginationStyles.css';

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

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

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

    const currentSellers = sellers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(sellers.length / itemsPerPage);

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
                <Modal.Header closeButton style={{ backgroundColor: '#FF6B35', color: 'white' }}>
                    <Modal.Title>Thông tin chi tiết người bán</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedSeller ? (
                        <div className="card border-0">
                            <div className="card-body">
                                <h5 className="card-title" style={{ color: '#FF6B35' }}>{selectedSeller.name}</h5>
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
                                placeholder="Mã Người Bán"
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
                                placeholder="Tên Người Bán"
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

            {sellers.length > 0 ? (
                <>
                    <Table striped hover responsive="sm" className="align-middle shadow-sm rounded">
                        <thead style={{backgroundColor: '#ff6b35', color: 'white'}}>
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
                        {currentSellers.map((seller) => (
                            <tr key={seller.id}>
                                <td>{seller.code}</td>
                                <td>{seller.name}</td>
                                <td>{seller.dob}</td>
                                <td>{seller.gender}</td>
                                <td>{seller.phoneNumber}</td>
                                <td>{seller.email}</td>
                                <td>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        style={{ color: '#ff6b35', borderColor: '#ff6b35', marginRight: '5px' }}
                                        onClick={() => handleModalShow(seller.id)}
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
                    <p style={{ color: '#FC650B', marginTop: '10px' }}>Không có người bán nào cả.</p>
                </div>
            )}
        </Container>
    );
};

export default SellerList;