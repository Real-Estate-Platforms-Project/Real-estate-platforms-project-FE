import { useEffect, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import { Table, Form, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {toast} from "react-toastify";
import * as demandService from "/src/services/DemandService";

function DemandList() {
    const [demands, setDemands] = useState([]);



    useEffect(() => {
        getAllDemand()
    }, [])

    const getAllDemand = async (name) => {
        let res = await demandService.getAllDemand();
        console.log(res)
        setDemands(res)
    }

    return (
        <>
            {demands.map((item) =>
            <div className="card" style="width: 18rem;">
                <div className="card-body">
                    <h5 className="card-title">{item.code}</h5>
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