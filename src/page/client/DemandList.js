import { useEffect, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import { Table, Form, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {toast} from "react-toastify";
import * as demandService from "/src/services/DemandService";
import * as buyerService from "../../services/BuyerInfor";
import * as authService from "../../services/AuthService";
import {getAllUserRoles} from "../../services/AuthService";

function DemandList() {
    const [demands, setDemands] = useState([]);
    const[userRoles, setUserRoles] = useState(null);
    const[buyer, setBuyer] = useState(null);


    useEffect(() => {
        getAllDemand()
    }, [])

    const getAllDemand = async (name) => {
        let res = await demandService.getAllDemand();
        console.log(res)
        setDemands(res)
    }
    const fetchBuyer = async () => {
        try {
            const buyer = await buyerService.BuyerInfor();
            setBuyer(buyer)
        } catch (error) {
            toast.error("Không thể tải thông tin khách hàng.");
        }
    };
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
        <>
            {demands.map((item) =>
            <div className="card" style="width: 18rem;">
                <div className="card-body">
                    <h5 className="card-title">{item.notes}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{item.type}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">{item.real_estate_type}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">{item.region}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">{item.min_area}-{item.max_area} m2</h6>
                    <p className="card-text">{item.notes}</p>
                </div>
            </div>)
            }
        </>
    )
}

export default DemandList;