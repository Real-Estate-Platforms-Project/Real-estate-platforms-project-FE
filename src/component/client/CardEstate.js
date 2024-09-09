import '../../css/Card.css';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import * as estateService from '../../services/RealEstate'
import {findRealEstate} from "../../services/RealEstate";
import {map} from "react-bootstrap/ElementChildren";

function CardEstate() {
    const [estate, setEstate] = useState([])
    useEffect(() => {
        getAllEstate()
    }, []);
    const getAllEstate = async () => {
        let data = await estateService.findRealEstate();
        console.log(data)
        setEstate(data)
    }
    return (
            <div className="container">
                <div className="card">
                    <div className="container">
                        {estate
                            .map((item) =>
                                <div className="box">
                                    <Link to="/404" className="view-property-link">
                                        <div className="top">
                                            <img
                                                src="https://cdn.pixabay.com/photo/2014/07/10/17/18/large-home-389271__340.jpg"
                                                alt=""/>
                                            <span
                                            ><i className="fas fa-heart"></i><i className="fas fa-exchange-alt"></i
                                            ></span>
                                        </div>
                                    </Link>
                                    <div className="bottom">
                                        <h3>{item.province.name}</h3>
                                        <p>
                                            {item.note}
                                        </p>
                                        <div className="advants">
                                            <div>
                                                <span>Bedrooms</span>
                                                <div><i className="fas fa-th-large"></i><span>{item.realEstateDetail.bedroom}</span></div>
                                            </div>
                                            <div>
                                                <span>Bathrooms</span>
                                                <div><i className="fas fa-shower"></i><span>{item.realEstateDetail.toilet}</span></div>
                                            </div>
                                            <div>
                                                <span>Area</span>
                                                <div>
                                                    <i className="fas fa-vector-square"></i
                                                    ><span>{item.area}<span>m²</span></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="price">
                                            <span>For Sale</span>
                                            <span>${item.price}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
    )

}

export default CardEstate;