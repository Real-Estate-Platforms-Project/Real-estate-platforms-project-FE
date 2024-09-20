import React, { useState, useEffect, useRef } from 'react';
import { getAllBuyers, searchBuyers, getBuyerById } from '../../services/BuyerService';
import { updateAccountRole } from '../../services/CustomerService';
import { Modal, Table, Button, Container, Row, Col, Form, Card, InputGroup } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { FaSearch, FaEye, FaIdCard, FaUser, FaEnvelope, FaPhoneAlt, FaSync } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../css/PaginationStyles.module.css';
import modalStyles from '../../css/ModalStyles.module.css';

const BuyerList = () => {
    const [buyers, setBuyers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedBuyer, setSelectedBuyer] = useState(null);
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
    const [buyerToUpdate, setBuyerToUpdate] = useState(null);

    useEffect(() => {
        loadBuyers();
    }, []);

    const loadBuyers = () => {
        getAllBuyers()
            .then((data) => {
                setBuyers(data);
                if (data.length === 0) {
                    showToast('Không có dữ liệu người mua.', 'warn');
                }
            })
            .catch((error) => {
                console.error('Error fetching buyers:', error);
                showToast('Đã xảy ra lỗi khi tải dữ liệu.', 'error');
            });
    };

    const handleSearch = () => {
        searchBuyers(searchCriteria)
            .then((data) => {
                setBuyers(data);
                if (data.length === 0) {
                    showToast('Không có người mua nào khớp với tiêu chí tìm kiếm.', 'warn');
                } else {
                    toast.dismiss(toastId.current);
                }
            })
            .catch((error) => {
                console.error('Error searching buyers:', error);
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
        setSelectedBuyer(null);
    };

    const handleModalShow = async (buyerId) => {
        try {
            const buyer = await getBuyerById(buyerId);
            setSelectedBuyer(buyer);
            setShowModal(true);
        } catch (error) {
            console.error('Error fetching buyer details:', error);
            showToast('Đã xảy ra lỗi khi lấy thông tin chi tiết.', 'error');
        }
    };

    const handleConfirmClose = () => {
        setShowConfirmModal(false);
        setBuyerToUpdate(null);
    };

    const handleConfirmShow = (buyer) => {
        setBuyerToUpdate(buyer);
        setShowConfirmModal(true);
    };

    const handleUpdateRole = async () => {
        if (!buyerToUpdate) return;
        try {
            const newRole = buyerToUpdate.customerType === 'seller' ? 'buyer' : 'seller';
            await updateAccountRole(buyerToUpdate.account.id, newRole);
            loadBuyers();
            showToast(`Vai trò đã được cập nhật thành ${newRole === 'buyer' ? 'Người mua' : 'Người bán'}.`, 'info');
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

    const currentBuyers = buyers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(buyers.length / itemsPerPage);

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
                                placeholder="Mã Người Mua"
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
                                placeholder="Tên Người Mua"
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

            <h4 className="mt-3 mb-4" style={{ color: '#ff6b35', textAlign: 'left', fontSize: '2rem' }}>Quản lý Người Mua</h4>

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
                                        style={{color: '#ff6b35', borderColor: '#ff6b35', marginRight: '5px'}}
                                        onClick={() => handleModalShow(buyer.id)}
                                    >
                                        <FaEye/> Xem
                                    </Button>
                                    {/* Hide update button if user has both roles */}
                                    {buyer.customerType !== 'seller' && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            style={{color: '#ff6b35', borderColor: '#ff6b35'}}
                                            onClick={() => handleConfirmShow(buyer)}
                                        >
                                            <FaSync /> Cập nhật
                                        </Button>
                                    )}
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
                        {Array.from({length: totalPages}, (_, i) => (
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
                    <p style={{ color: '#ff6b35', marginTop: '10px' }}>Không có người mua nào cả.</p>
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
                        Thông tin chi tiết người mua
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={modalStyles.customModalBody}>
                    {selectedBuyer ? (
                        <Card className={`border-0 ${modalStyles.customModalCard}`}>
                            <Card.Body className="text-start">
                                {selectedBuyer.imageUrl && (
                                    <div className="mb-3 text-center">
                                        <img
                                            src={selectedBuyer.imageUrl}
                                            alt={selectedBuyer.name}
                                            className={modalStyles.customModalImage}
                                        />
                                    </div>
                                )}
                                <Card.Title className="text-primary h4">{selectedBuyer.name}</Card.Title>
                                <Card.Subtitle className="mb-3 text-muted fs-5">Mã: {selectedBuyer.code}</Card.Subtitle>
                                <ul className={`list-group ${modalStyles.customListGroup}`}>
                                    <li className={`list-group-item ${modalStyles.customListItem}`}>
                                        <strong>Ngày sinh:</strong> <span>{selectedBuyer.dob}</span>
                                    </li>
                                    <li className={`list-group-item ${modalStyles.customListItem}`}>
                                        <strong>Giới tính:</strong> <span>{selectedBuyer.gender}</span>
                                    </li>
                                    <li className={`list-group-item ${modalStyles.customListItem}`}>
                                        <strong>Số điện thoại:</strong> <span>{selectedBuyer.phoneNumber}</span>
                                    </li>
                                    <li className={`list-group-item ${modalStyles.customListItem}`}>
                                        <strong>Email:</strong> <span>{selectedBuyer.email}</span>
                                    </li>
                                    <li className={`list-group-item ${modalStyles.customListItem}`}>
                                        <strong>Địa chỉ:</strong> <span>{selectedBuyer.address}</span>
                                    </li>
                                    <li className={`list-group-item ${modalStyles.customListItem}`}>
                                        <strong>ID Card:</strong> <span>{selectedBuyer.idCard}</span>
                                    </li>
                                    <li className={`list-group-item ${modalStyles.customListItem}`}>
                                        <strong>Loại khách hàng:</strong> <span>{selectedBuyer.customerType === 'seller' ? 'Người bán' : 'Người mua'}</span>
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
                        Bạn có chắc chắn muốn thay đổi vai trò của <strong>{buyerToUpdate?.name}</strong> từ <strong>{buyerToUpdate?.customerType === 'seller' ? 'Người bán' : 'Người mua'}</strong> thành <strong>{buyerToUpdate?.customerType === 'buyer' ? 'Người mua' : 'Người bán'}</strong> không?
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

export default BuyerList;
