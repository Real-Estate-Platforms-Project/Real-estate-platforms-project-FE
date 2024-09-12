import '../../css/Card.css';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import * as estateService from '../../services/RealEstateService';

function CardEstate() {
    const [estate, setEstate] = useState([])

    useEffect(() => {
        getAllEstate();
    }, []);

    // Hàm gọi API và xử lý lỗi
    const getAllEstate = async () => {
        try {
            let data = await estateService.findRealEstate();
            console.log(data);
            setEstate(data);
        } catch (error) {
            console.error("Failed to fetch real estate data", error);
        }
    }

    return (
        <div className="container mt-3">
            <div className="card">
                <div className="container">
                    {/* Kiểm tra nếu không có dữ liệu */}
                    {estate.length === 0 ? (
                        <p>Không tìm thấy bất động sản nào.</p>
                    ) : (
                        estate.map((item, index) => (
                            <div key={index} className="box">
                                <Link to="/404" className="view-property-link">
                                    <div className="top">
                                        <img
                                            src="https://cdn.pixabay.com/photo/2014/07/10/17/18/large-home-389271__340.jpg"
                                            alt="Real estate"
                                        />
                                        <span>
                                            <i className="fas fa-heart"></i>
                                            <i className="fas fa-exchange-alt"></i>
                                        </span>
                                    </div>
                                </Link>
                                <div className="bottom">
                                    <h3>{item?.province?.name || 'Unknown Province'}</h3>
                                    <p>{item?.note || 'No additional information available.'}</p>
                                    <div className="advants">
                                        <div>
                                            <span>Bedrooms</span>
                                            <div>
                                                <i className="fas fa-th-large"></i>
                                                <span>{item?.realEstateDetail?.bedroom || 'N/A'}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span>Bathrooms</span>
                                            <div>
                                                <i className="fas fa-shower"></i>
                                                <span>{item?.realEstateDetail?.toilet || 'N/A'}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span>Area</span>
                                            <div>
                                                <i className="fas fa-vector-square"></i>
                                                <span>{item?.area || 'N/A'} m²</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="price">
                                        <span>For Sale</span>
                                        <span>${item?.price || 'Contact for price'}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default CardEstate;
