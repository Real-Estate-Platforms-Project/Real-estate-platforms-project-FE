import {useEffect, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import {Table, Form, Button, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {toast} from "react-toastify";
import * as demandService from "../../services/DemandService";
import "../../css/custom.css"
import * as buyerService from "../../services/BuyerInfor";
import * as authService from "../../services/AuthService";

function DemandList() {
    const [demands, setDemands] = useState([]);
    const [selectedDemand, setSelectedDemand] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const[userRoles, setUserRoles] = useState(null);


    useEffect(() => {
        getAllDemand()
    }, [])
    useEffect(() => {
        getAllUserRole()
    }, [])

    const getAllDemand = async (userRoles) => {
        let res = await demandService.getAllDemand(userRoles);
        console.log(res)
        setDemands(res)
    }

    const handleShow = (demand) => {
        setSelectedDemand(demand);
        setShowModal(true);
    };

    const verifyDemand = async (demand) => {
        let isVerify = await demandService.verifyDemand(demand);
        if (isVerify) {
            demand.isVerify = true
            setDemands(demands.map(s => s !== demand ? s : demand));
            toast.success("Duyet nhu cau thành công")
        } else {
            toast.error("Duyet nhu cau thất bại.")
        }
    }

    const deleteDemand = async (id) => {
        let isSuccess = await demandService.deleteDemand(id)
        if (isSuccess) {
            setDemands(demands.filter(s => s.id !== id));
            toast.success("Xoa nhu cau thành công")
        } else {
            toast.error("Xoa thất bại.")
        }
    }

    const getAllUserRole = async() => {
        try {
            const roles = await authService.getAllUserRoles();
            setUserRoles(roles)
        } catch (error) {
            console.log("Người dùng không có quyền truy cập")
            // toast.error("Không thể tải thông tin khách hàng.");
        }
    }

    return (
        <div className="container m-auto mt-5 p-4 row">
            {demands.map((item) =>
                <div className="shadow-sm rounded col-4 mx-2" key={item.id}>
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
                        <div className="d-flex justify-content-end mt-3">
                            <button className="btn btn-danger btn-sm pr-3 me-2" onClick={() => handleShow(item)}>Xoá nhu cầu
                            </button>
                            {item.isVerify ? "" :
                                <button className="btn btn-primary btn-sm text-white pr-3" onClick={() => verifyDemand(item)}>Duyệt nhu
                                    cầu</button>}

                        </div>
                    </div>
                </div>)
            }
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