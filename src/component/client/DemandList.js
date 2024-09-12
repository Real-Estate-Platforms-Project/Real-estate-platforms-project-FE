import React, {useEffect, useState} from "react";
import {Button, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {toast} from "react-toastify";
import * as demandService from "../../services/DemandService";
import "../../css/custom.css"
import * as accountService from "../../services/AccountService";
import SearchBar from "../search/SearchBar";
import SearchBarDemand from "../search/SearchBarDemand";
import * as realEstateService from "../../services/RealEstate";
import {useLocation} from "react-router-dom";

function DemandList() {
    const [demands, setDemands] = useState([]);
    const [selectedDemand, setSelectedDemand] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [userRoles, setUserRoles] = useState(null);

    const location = useLocation();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [totalPages, setTotalPages] = React.useState(0);


    useEffect(() => {
        getAllDemand(userRoles)
    }, [userRoles])

    useEffect(() => {
        getAllRoles()
    }, [])

    useEffect(() => {
        handleSearch()
    }, [])


    const getAllDemand = async (roles) => {
        let res = await demandService.getAllDemand(userRoles);
        setDemands(res)
    }

    const handleShow = (demand) => {
        setSelectedDemand(demand);
        setShowModal(true);
    };

    const getAllRoles = async () => {
        let res = await accountService.getAllRoles()
        setUserRoles(res)
    }

    const verifyDemand = async (demand) => {
        let isVerify = await demandService.verifyDemand(demand);
        if (isVerify) {
            demand.isVerify = true
            setDemands(demands.map(s => s !== demand ? s : demand));
            toast.success("Duyệt nhu cau thành công")
        } else {
            toast.error("Duyệt nhu cau thất bại.")
        }
    }

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
            const response = await demandService.searchDemand(filters);
            console.log(response)
            setDemands(response);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setError('Có lỗi xảy ra khi tìm kiếm. Vui lòng thử lại.');
            setDemands([]);
        } finally {
            setLoading(false);
        }
    };

    // const handlePageChange = (newPage) => {handleSearch(location.state?.filters, newPage)};

    if (!demands) {
        return <>No data</>
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
                                class="fa-solid fa-house"></i> {item.realEstateType}
                            </h6>
                            <h6 className="card-subtitle mb-2 text-muted "><i
                                class="fa-solid fa-location-dot"></i> {item.region}
                            </h6>
                            <h6 className="card-subtitle mb-2 text-muted"><i
                                class="fa-solid fa-map"></i> {item.minArea}-{item.maxArea} m2
                            </h6>
                        </div>
                        {(userRoles.includes("ROLE_ADMIN") || userRoles.includes("ROLE_EMPLOYEE")) ?
                            <div className="d-flex justify-content-end mt-3">
                                <button className="btn btn-danger btn-sm pr-3 me-2" onClick={() => handleShow(item)}>Xoá
                                    nhu cầu
                                </button>
                                {item.isVerify ? "" :
                                    <button className="btn btn-primary btn-sm text-white pr-3"
                                            onClick={() => verifyDemand(item)}>Duyệt nhu
                                        cầu</button>}
                            </div> : ""
                        }
                    </div>
                </div>)
            }
            {/*<div className="pagination">*/}
            {/*    <button*/}
            {/*        onClick={() => handlePageChange(currentPage - 1)}*/}
            {/*        disabled={currentPage === 0}*/}
            {/*    >*/}
            {/*        Trang trước*/}
            {/*    </button>*/}
            {/*    <span>Trang {currentPage + 1} / {totalPages}</span>*/}
            {/*    <button*/}
            {/*        onClick={() => handlePageChange(currentPage + 1)}*/}
            {/*        disabled={currentPage === totalPages - 1}*/}
            {/*    >*/}
            {/*        Trang sau*/}
            {/*    </button>*/}
            {/*</div>*/}

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

    export default DemandList;