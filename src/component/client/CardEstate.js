import '../../css/Card.css';
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import * as estateService from '../../services/RealEstate';
import {Button} from "react-bootstrap";

function CardEstate() {
    const [estate, setEstate] = useState([])
    const [selectedLocation, setSelectedLocation] = useState('all');
    const [filteredEstate, setFilteredEstate] = useState([]);

    useEffect(() => {
        getAllEstate();
    }, []);


    const getAllEstate = async () => {
        try {
            let data = await estateService.findRealEstate();
            console.log(data);
            if (Array.isArray(data)) {
                handleLocationChange('all');
                setEstate(data);
                setFilteredEstate(data);


            } else {
                console.error("Expected an array but received:", data);
                setEstate([]);
                setFilteredEstate([]);
            }
        } catch (error) {
            console.error("Failed to fetch real estate data", error);
            setEstate([]);
            setFilteredEstate([]);
        }
    }
    const handleLocationChange = (location) => {
        setSelectedLocation(location);
        console.log(location)
        if (location === 'all') {
            setFilteredEstate(estate);
        } else {
            const filtered = estate.filter(item =>
                item.location && item.location.toLowerCase().includes(location.toLowerCase())
            );
            setFilteredEstate(filtered);
        }
    };
    const displayEstates = filteredEstate.slice(0, 6);
    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
    }
    return (
        <div className="container mt-3">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Bất động sản nổi bật</h2>
                <Link to="/estate-list" className="text-decoration-none text-warning">
                    Tất cả →
                </Link>
            </div>
            <div className="mb-4 d-flex">
                <Button
                    variant={selectedLocation === 'all' ? 'primary' : 'light'}
                    onClick={() => handleLocationChange('all')}
                    className="me-2"
                >
                    Khu vực nổi bật
                </Button>
                <Button
                    variant={selectedLocation === 'Trung tâm' ? 'primary' : 'light'}
                    onClick={() => handleLocationChange('Trung tâm')}
                    className="me-2"
                >
                    Khu vực trung tâm
                </Button>
                <Button
                    variant={selectedLocation === 'Ngoại ô' ? 'primary' : 'light'}
                    onClick={() => handleLocationChange('Ngoại ô')}
                    className="me-2"
                >
                    Khu vực ngoại ô
                </Button>
            </div>
            <div className="card">
                <div className="container row">
                    {/* Kiểm tra nếu không có dữ liệu */}
                    {displayEstates.length === 0 ? (
                        <p>Không tìm thấy bất động sản nào.</p>
                    ) : (
                        displayEstates.map((item, index) => (
                            <div key={index} className="box col-3">
                                <Link to={`/real-estate-detail/${item.id}`} className="view-property-link">
                                    <div className="top">
                                        <img
                                            src={item.images[0]?.name || ""}
                                            alt="Real estate"

                                        />
                                        <span>
                                                <i className="fas fa-heart"></i>
                                                <i className="fas fa-exchange-alt"></i>
                                            </span>
                                    </div>
                                </Link>
                                <div className="bottom">
                                    {item.type === 'Nhà' ? (
                                        <>
                                            <h3><b>Địa chỉ :</b> {item?.address || 'Unknown Province'}</h3>
                                            <p><b>Mô tả : </b> {item?.note || 'No additional information available.'}
                                            </p>
                                            <div className="advants">
                                                <div>
                                                    <span>Phòng ngủ</span>
                                                    <div>
                                                        <i className="fas fa-th-large"></i>
                                                        <span>{item?.realEstateDetail?.bedroom || 'Không có'}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <span>Nhà tắm</span>
                                                    <div>
                                                        <i className="fas fa-shower"></i>
                                                        <span>{item?.realEstateDetail?.toilet || 'Không có'}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <span>Diện tích</span>
                                                    <div>
                                                        <i className="fas fa-vector-square"></i>
                                                        <span>{item?.area || 'Không có'} m²</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="price">
                                                <span>For Sale</span>
                                                <span>{formatPrice(item?.price) || 'Contact for price'}</span>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <h3><b>Địa chỉ :</b>{item?.address || 'Unknown Province'}</h3>
                                            <p><b>Mô tả : </b>{item?.note || 'No additional information available.'}</p>
                                            <div className="advants">
                                                <div>
                                                    <span>Diện tích</span>
                                                    <div>
                                                        <i className="fas fa-vector-square"></i>
                                                        <span>{item?.area || 'Không có'} m²</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <span>Giá trên m²</span>
                                                    <div>
                                                        <i className="fas fa-vector-square"></i>
                                                        <span>{formatPrice(item?.price / item.area) || 'Không có'} /m²</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="price">
                                                <span>For Sale</span>
                                                <span>{formatPrice(item?.price) || 'Contact for price'}</span>
                                            </div>
                                        </>
                                    )}

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