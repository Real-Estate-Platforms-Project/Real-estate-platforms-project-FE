import React, { useState, useEffect, useRef } from 'react';
import { getAllSellers, searchSellers, getSellerById } from '../../services/SellerService';
import { updateAccountRole } from '../../services/CustomerService'; // Sử dụng đúng service cho update role
import { Modal, Table, Button, Container, Row, Col, Form, Card, InputGroup } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import {FaSearch, FaEye, FaIdCard, FaUser, FaEnvelope, FaPhoneAlt, FaSync} from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../css/PaginationStyles.module.css';
import modalStyles from '../../css/ModalStyles.module.css';

const SellerList = () => {
    const [sellers, setSellers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedSeller, setSelectedSeller] = useState(null);
    const [searchCriteria, setSearchCriteria] = useState({
        code: '',
        name: '',
        email: '',
        phoneNumber: ''
    });

    const toastId = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [sellerToUpdate, setSellerToUpdate] = useState(null);


    useEffect(() => {
        loadSellers();
    }, []);

    const loadSellers = () => {
        getAllSellers()
            .then((data) => {
                setSellers(data);
                if (data.length === 0) {
                    showToast('Không có dữ liệu người bán.', 'warn');
                }
            })
            .catch((error) => {
                console.error('Error fetching sellers:', error);
                showToast('Đã xảy ra lỗi khi tải dữ liệu.', 'error');
            });
    };

    const handleSearch = () => {
        searchSellers(searchCriteria)
            .then((data) => {
                setSellers(data);
                if (data.length === 0) {
                    showToast('Không có người bán nào khớp với tiêu chí tìm kiếm.', 'warn');
                } else {
                    toast.dismiss(toastId.current);
                }
            })
            .catch((error) => {
                console.error('Error searching sellers:', error);
                showToast('Đã xảy ra lỗi khi tìm kiếm.', 'error');
            });
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
            showToast('Đã xảy ra lỗi khi lấy thông tin chi tiết.', 'error');
        }
    };

    const handleConfirmClose = () => {
        setShowConfirmModal(false);
        setSellerToUpdate(null);
    };

    const handleConfirmShow = (seller) => {
        setSellerToUpdate(seller);
        setShowConfirmModal(true);
    };

    const handleUpdateRole = async () => {
        if (!sellerToUpdate) return;
        try {
            const newRole = sellerToUpdate.customerType === 'buyer' ? 'seller' : 'buyer';
            await updateAccountRole(sellerToUpdate.account.id, newRole);
            setSellers((prevSellers) => prevSellers.filter(seller => seller.id !== sellerToUpdate.id));
            showToast(`Vai trò đã được cập nhật thành ${newRole === 'seller' ? 'Người bán' : 'Người mua'}.`, 'info');
            handleConfirmClose();
        } catch (error) {
            console.error('Error updating role:', error);
            showToast('Đã xảy ra lỗi khi cập nhật vai trò.', 'error');
        }
    };

    const showToast = (message, type) => {
        if (!toast.isActive(toastId.current)) {
            switch (type) {
                case 'info':
                    toastId.current = toast.info(message);
                    break;
                case 'warn':
                    toastId.current = toast.warn(message);
                    break;
                case 'error':
                    toastId.current = toast.error(message);
                    break;
                default:
                    toastId.current = toast(message);
            }
        } else {
            toast.update(toastId.current, { render: message, type: toast.TYPE[type] });
        }
    };

    const handlePrevClick = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const currentSellers = sellers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(sellers.length / itemsPerPage);

    return (
        <Container className="mt-4">
            <ToastContainer position="top-right" className="p-3" limit={1} autoClose={3000} />
            <Card className="shadow-sm p-4 mb-4 bg-white rounded">
                <Row className="d-flex align-items-center justify-content-between flex-wrap">
                    <Col md="auto" className="mb-2">
                        <InputGroup size="lg">
                            <InputGroup.Text className="bg-white border-end-0">
                                <FaIdCard className="text-secondary" />
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                name="code"
                                placeholder="Mã Người Bán"
                                value={searchCriteria.code}
                                onChange={handleInputChange}
                                className="border-start-0 form-control-lg"
                            />
                        </InputGroup>
                    </Col>
                    <Col md="auto" className="mb-2">
                        <InputGroup size="lg">
                            <InputGroup.Text className="bg-white border-end-0">
                                <FaUser className="text-secondary" />
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Tên Người Bán"
                                value={searchCriteria.name}
                                onChange={handleInputChange}
                                className="border-start-0 form-control-lg"
                            />
                        </InputGroup>
                    </Col>
                    <Col md="auto" className="mb-2">
                        <InputGroup size="lg">
                            <InputGroup.Text className="bg-white border-end-0">
                                <FaEnvelope className="text-secondary" />
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={searchCriteria.email}
                                onChange={handleInputChange}
                                className="border-start-0 form-control-lg"
                            />
                        </InputGroup>
                    </Col>
                    <Col md="auto" className="mb-2">
                        <InputGroup size="lg">
                            <InputGroup.Text className="bg-white border-end-0">
                                <FaPhoneAlt className="text-secondary" />
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                name="phoneNumber"
                                placeholder="Số điện thoại"
                                value={searchCriteria.phoneNumber}
                                onChange={handleInputChange}
                                className="border-start-0 form-control-lg"
                            />
                        </InputGroup>
                    </Col>
                    <Col md="auto" className="mb-2">
                        <Button
                            size="lg"
                            style={{ backgroundColor: '#ff6b35', borderColor: '#ff6b35', padding: '10px 20px' }}
                            className="text-white"
                            onClick={handleSearch}
                        >
                            <FaSearch className="me-2" /> Tìm kiếm
                        </Button>
                    </Col>
                </Row>
            </Card>

            <h4 className="mt-3 mb-4" style={{ color: '#ff6b35', textAlign: 'left', fontSize: '2rem' }}>Quản lý Người Bán</h4>

            {sellers.length > 0 ? (
                <>
                    <Table striped hover responsive="sm" className="align-middle shadow-sm rounded">
                        <thead style={{ backgroundColor: '#ff6b35', color: 'white' }}>
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
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        style={{color: '#ff6b35', borderColor: '#ff6b35'}}
                                        onClick={() => handleConfirmShow(seller)}
                                    >
                                        <FaSync /> Cập nhật
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <div className={styles.paginationCustom}>
                        <div
                            className={`${styles.pageItem} ${currentPage === 1 ? styles.pageItemDisabled : ''}`}
                            onClick={handlePrevClick}
                        >
                            &lt;
                        </div>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <div
                                key={i + 1}
                                className={`${styles.pageItem} ${i + 1 === currentPage ? styles.pageItemActive : ''}`}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </div>
                        ))}
                        <div
                            className={`${styles.pageItem} ${currentPage === totalPages ? styles.pageItemDisabled : ''}`}
                            onClick={handleNextClick}
                        >
                            &gt;
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center">
                    <p style={{ color: '#ff6b35', marginTop: '10px' }}>Không có người bán nào cả.</p>
                </div>
            )}

            <Modal
                show={showModal}
                onHide={handleModalClose}
                centered
                size="lg"
                dialogClassName={modalStyles.customModalOverlay}
            >
                <Modal.Header
                    closeButton
                    className={`${modalStyles.customModalHeader} border-0`}
                >
                    <Modal.Title
                        className={`${modalStyles.customModalTitle} fs-3 text-center`}
                        style={{ color: "white", width: '100%' }}
                    >
                        Thông tin chi tiết người bán
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={modalStyles.customModalBody}>
                    {selectedSeller ? (
                        <Card className={`border-0 ${modalStyles.customModalCard}`}>
                            <Card.Body className="text-start">
                                {selectedSeller.imageUrl && (
                                    <div className="mb-3 text-center">
                                        <img
                                            src={selectedSeller.imageUrl}
                                            alt={selectedSeller.name}
                                            className={modalStyles.customModalImage}
                                        />
                                    </div>
                                )}
                                <Card.Title className="text-primary h4">{selectedSeller.name}</Card.Title>
                                <Card.Subtitle className="mb-3 text-muted fs-5">Mã: {selectedSeller.code}</Card.Subtitle>
                                <ul className={`list-group ${modalStyles.customListGroup}`}>
                                    <li className={`list-group-item ${modalStyles.customListItem}`}>
                                        <strong>Ngày sinh:</strong> <span>{selectedSeller.dob}</span>
                                    </li>
                                    <li className={`list-group-item ${modalStyles.customListItem}`}>
                                        <strong>Giới tính:</strong> <span>{selectedSeller.gender}</span>
                                    </li>
                                    <li className={`list-group-item ${modalStyles.customListItem}`}>
                                        <strong>Số điện thoại:</strong> <span>{selectedSeller.phoneNumber}</span>
                                    </li>
                                    <li className={`list-group-item ${modalStyles.customListItem}`}>
                                        <strong>Email:</strong> <span>{selectedSeller.email}</span>
                                    </li>
                                    <li className={`list-group-item ${modalStyles.customListItem}`}>
                                        <strong>Địa chỉ:</strong> <span>{selectedSeller.address}</span>
                                    </li>
                                    <li className={`list-group-item ${modalStyles.customListItem}`}>
                                        <strong>ID Card:</strong> <span>{selectedSeller.idCard}</span>
                                    </li>
                                    <li className={`list-group-item ${modalStyles.customListItem}`}>
                                        <strong>Loại khách hàng:</strong> <span>{selectedSeller.customerType === 'buyer' ? 'Người mua' : 'Người bán'}</span>
                                    </li>
                                </ul>
                            </Card.Body>
                        </Card>
                    ) : (
                        <p className="text-center text-muted">Không có thông tin để hiển thị.</p>
                    )}
                </Modal.Body>
            </Modal>

            <Modal
                show={showConfirmModal}
                onHide={handleConfirmClose}
                centered
                size="md"
                dialogClassName={modalStyles.customModalOverlay}
            >
                <Modal.Header
                    closeButton
                    className={`${modalStyles.customModalHeader} border-0`}
                >
                    <Modal.Title
                        className={`${modalStyles.customModalTitle} fs-4 text-center`}
                        style={{ color: "white", width: '100%' }}
                    >
                        Xác nhận thay đổi vai trò
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={modalStyles.customModalBody}>
                    <p className="text-center">
                        Bạn có chắc chắn muốn thay đổi vai trò của người mua <strong>{sellerToUpdate?.name}</strong> từ <strong>{sellerToUpdate?.customerType === 'buyer' ? 'Người mua' : 'Người bán'}</strong> thành <strong>{sellerToUpdate?.customerType === 'seller' ? 'Người bán' : 'Người mua'}</strong> không?
                    </p>
                </Modal.Body>
                <Modal.Footer className="border-0 d-flex justify-content-center">
                    <Button
                        variant="outline-secondary"
                        onClick={handleConfirmClose}
                    >
                        Hủy
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleUpdateRole}
                    >
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default SellerList;