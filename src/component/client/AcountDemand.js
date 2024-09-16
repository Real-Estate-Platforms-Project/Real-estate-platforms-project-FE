import React, {useEffect, useState} from "react";
import {Button, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import * as demandService from "../../services/DemandService";
import "../../css/custom.css"
import SearchBarDemand from "../search/SearchBarDemand";
import {useLocation} from "react-router-dom";

function AccountDemand() {
    const [demands, setDemands] = useState([]);
    const [selectedDemand, setSelectedDemand] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const location = useLocation();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [totalPages, setTotalPages] = React.useState(0);


    useEffect(() => {
        const filters = location.state?.filters || {};
        handleSearch(filters, 0);
    }, [location.state]);


    const handleShow = (demand) => {
        setSelectedDemand(demand);
        setShowModal(true);
    };

    const deleteDemand = async (id) => {
        let isSuccess = await demandService.deleteDemand(id)
        if (isSuccess) {
            setDemands(demands.filter(s => s.id !== id));
            toast.success("Xoá nhu cau thành công")
        } else {
            toast.error("Xoá thất bại.")
        }
    }

    const handleSearch = async (filters, page = 0) => {
        setLoading(true);
        setError(null);
        try {
            const response = await demandService.searchAccountDemand({...filters, page, size: 6});
            setDemands(response.content || []);
            setTotalPages(response.totalPages || 0);
            setCurrentPage(page);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setError('Có lỗi xảy ra khi tìm kiếm. Vui lòng thử lại.');
            setDemands([]);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => handleSearch(location.state?.filters, newPage);

    if (!demands) {
        return <>
            <div className="custom-search w-75" style={{justifyContent: "center", margin: "auto"}}>
                <SearchBarDemand onSearch={handleSearch}/>
            </div>
            <h3 className="text-center">Không có nhu cầu</h3>
        </>
    }
    return (
        <div className="container m-auto mt-5 p-3 justify-content-center row">

            <div className="custom-search w-75" style={{justifyContent: "center", margin: "auto"}}>
                <SearchBarDemand onSearch={handleSearch}/>
            </div>

            {demands.map((item) =>
                <div className="shadow-sm rounded col-4 mx-2 mt-5" key={item.id}>
                    <div className="x p-3">
                        <h5 className="card-title fw-bold">{item.title}</h5>
                        <p className="card-text mt-3">{item.notes}</p>
                        <h6 className="card-subtitle mb-3 text-muted"> Liên
                            hệ: {item.buyer.name} - {item.buyer.phoneNumber}</h6>
                        <div className="d-flex justify-content-between mt-3">
                            <h6 className="card-subtitle mb-2"><i class="fa-solid fa-money-bill-transfer"></i>
                                <span className="ms-2">{item.type}</span>
                            </h6>
                            <h6 className="card-subtitle mb-2 text-muted "><i
                                className="fa-solid fa-house"></i> {item.realEstateType}
                            </h6>
                            <h6 className="card-subtitle mb-2 text-muted "><i
                                className="fa-solid fa-location-dot"></i> {item.region}
                            </h6>
                            <h6 className="card-subtitle mb-2 text-muted"><i
                                className="fa-solid fa-map"></i> {item.minArea}-{item.maxArea} m2
                            </h6>
                        </div>
                        {!item.isVerify ?
                            <h6 className="card-subtitle mb-3 text-warning" style={{fontStyle: "italic"}}>Nhu cầu đang
                                chờ phê duyệt</h6> : ""}
                        <div className="d-flex justify-content-end mt-3">
                            <button className="btn btn-danger btn-sm pr-3 me-2" onClick={() => handleShow(item)}>
                                Xoá nhu cầu
                            </button>
                            <Link to={`/demand/edit/${item.id}`}>
                                <button className="btn btn-primary btn-sm text-white pr-3">
                                    Chỉnh sửa nhu cầu
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>)
            }

            <div className="pagination pagination--center">
                <button
                    className="prev page-numbers"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                >
                    <i className="fas fa-angle-left"></i>
                </button>
                {[...Array(totalPages).keys()].map((page) => (
                    <span
                        key={page}
                        className={`page-numbers ${page === currentPage ? 'current' : ''}`}
                        onClick={() => handlePageChange(page)}
                    >{page + 1}</span>
                ))}
                <button
                    className="next page-numbers"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                >
                    <i className="fas fa-angle-right"></i>
                </button>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xoá</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc muốn xoá nhu cau {selectedDemand?.code} không?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Huỷ
                    </Button>
                    <Button variant="danger" onClick={() => deleteDemand(selectedDemand.id)}>
                        Xoá
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AccountDemand;