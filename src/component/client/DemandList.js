import { useEffect, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import { Table, Form, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {toast} from "react-toastify";
import * as demandService from "../../services/DemandService";

function DemandList() {
    const [demands, setDemands] = useState([]);
    const [selectedDemand, setSelectedDemand] = useState(null);
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        getAllDemand()
    }, [])

    const getAllDemand = async (name) => {
        let res = await demandService.getAllDemand();
        console.log(res)
        setDemands(res)
    }

    const handleShow = (demand) => {
        setSelectedDemand(demand);
        setShowModal(true);
    };

    const verifyDemand = async (demand) => {
        let isVerify = await demandService.verifyDemand(demand);
        if(isVerify) {
            demand.isVerify = true
            setDemands(demands.map(s => s !== demand?s:demand));
            toast.success("Duyet nhu cau thành công")
        } else {
            toast.error("Duyet nhu cau thất bại.")
        }
    }

    const deleteDemand = async (id) => {
        let isSuccess = await demandService.deleteDemand(id)
        if(isSuccess) {
            setDemands(demands.filter(s => s.id !== id));
            toast.success("Xoa nhu cau thành công")
        } else {
            toast.error("Xoa thất bại.")
        }
    }

    return (
        <div className="container row">
            {demands.map((item) =>
            <div className="card w-50" >
                <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{item.type}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">{item.realEstateType}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">{item.region}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">{item.minArea}-{item.maxArea} m2</h6>
                    <p className="card-text">{item.notes}</p>
                    <button className="btn btn-warning pr-3" onClick={() => verifyDemand(item)}>Duyet nhu cau</button>
                    <button className="btn btn-danger pr-3" onClick={() => handleShow(item)}>Xoa nhu cau</button>
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