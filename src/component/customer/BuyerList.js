import React, { useState, useEffect } from 'react';
import { getAllBuyers, searchBuyers } from '../../services/BuyerService';
import { Modal, Toast} from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { FaSearch, FaEye } from 'react-icons/fa';
import '../../css/BuyerList.css';

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
                if (data.length === 0) {
                    setShowToast(true);
                } else {
                    setShowToast(false);
                }
            })
            .catch(console.error);
    };

    const handleSearch = () => {
        searchBuyers(searchCriteria)
            .then((data) => {
                setBuyers(data);
                if (data.length === 0) {
                    setShowToast(true);
                } else {
                    setShowToast(false);
                }
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

    const handleModalShow = (buyer) => {
        setSelectedBuyer(buyer);
        setShowModal(true);
    };

    return (
        <div className="container mt-4">
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
                <Modal.Header closeButton style={{ backgroundColor: '#FC650B', color: 'white' }}>
                    <Modal.Title>Thông tin chi tiết người mua</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedBuyer ? (
                        <div className="card border-0">
                            <div className="card-body">
                                <h5 className="card-title" style={{ color: '#FC650B' }}>{selectedBuyer.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Mã: {selectedBuyer.code}</h6>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item"><strong>Ngày sinh:</strong> {selectedBuyer.dob}</li>
                                    <li className="list-group-item"><strong>Giới tính:</strong> {selectedBuyer.gender}</li>
                                    <li className="list-group-item"><strong>Số điện thoại:</strong> {selectedBuyer.phoneNumber}</li>
                                    <li className="list-group-item"><strong>Email:</strong> {selectedBuyer.email}</li>
                                    <li className="list-group-item"><strong>Địa chỉ:</strong> {selectedBuyer.address}</li>
                                    <li className="list-group-item"><strong>ID Card:</strong> {selectedBuyer.idCard}</li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <p>Không có thông tin để hiển thị.</p>
                    )}
                </Modal.Body>
            </Modal>

            <div className="search-form mb-4 p-3 rounded shadow-sm">
                <div className="row mb-3">
                    <div className="col-md-2 mb-2">
                        <input
                            type="text"
                            name="code"
                            placeholder="Mã Người Mua"
                            value={searchCriteria.code}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-2 mb-2">
                        <input
                            type="text"
                            name="name"
                            placeholder="Tên Người Mua"
                            value={searchCriteria.name}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-2 mb-2">
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={searchCriteria.email}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-2 mb-2">
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Số điện thoại"
                            value={searchCriteria.phoneNumber}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-2 mb-2">
                        <button
                            className="btn btn-outline-dark w-100"
                            onClick={handleSearch}
                        >
                            <FaSearch /> Tìm kiếm
                        </button>
                    </div>
                </div>
            </div>

            {buyers.length > 0 ? (
                <div className="table-responsive shadow-sm rounded">
                    <table className="table table-striped table-hover align-middle">
                        <thead className="table-header">
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
                                    <button
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => handleModalShow(buyer)}
                                    >
                                        <FaEye /> Xem
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center">
                    <p style={{ color: '#FC650B', marginTop: '10px' }}>Không có người mua nào cả.</p>
                </div>
            )}
        </div>
    );
};

export default BuyerList;