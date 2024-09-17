import '../../css/Card.css';
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import * as estateService from '../../services/RealEstateService';
import {Button} from "react-bootstrap";
import lottieEmpty from "../../lottie/empty-estate.json";
import {Player} from "@lottiefiles/react-lottie-player";

function CardEstate() {
    const [estate, setEstate] = useState([])
    const [selectedLocation, setSelectedLocation] = useState('all');
    const [filteredEstate, setFilteredEstate] = useState([]);
    const displayEstates = filteredEstate.slice(0, 8);
    const [savedItems, setSavedItems] = useState({});

    useEffect(() => {
        getAllEstate();
    }, []);

    const getAllEstate = async () => {
        try {
            let data = await estateService.findRealEstate();
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
        if (location === 'all') {
            setFilteredEstate(estate);
        } else {
            const filtered = estate.filter(item =>
                item.location && item.location.toLowerCase().includes(location.toLowerCase())
            );
            setFilteredEstate(filtered);
        }
    };

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
    }


    const toggleSave = (id) => {
        setSavedItems(prevSavedItems => ({
            ...prevSavedItems,
            [id]: !prevSavedItems[id]
        }));
    };
    return (
        <div className="bg-body-tertiary ">
            <div className="container my-3 py-5">
                <div className="d-flex justify-content-between align-items-center ">
                    <h2>Bất động sản nổi bật</h2>
                    <Link to="/estate-list" className="text-decoration-none text-warning">
                        Tất cả →
                    </Link>
                </div>
                <div className="d-flex mt-2">
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
                <div className="mt-4">
                    <div className="row">
                        {displayEstates.length === 0 ? (
                            <Player
                                autoplay
                                keepLastFrame
                                src={lottieEmpty}
                                style={{height: '800px', width: 'auto',backgroundColor: 'white'}}
                            ></Player>
                        ) : (
                            displayEstates.map((item, index) => (
                                <div key={index} className="col-md-3 mb-4 ">
                                    <div className="card shadow-4">
                                        <Link to={`/real-estate-detail/${item.id}`}
                                              className="text-decoration-none text-black">
                                            <div className="image-container">
                                                <img
                                                    src={item.images[0]?.name || ""}
                                                    alt="Real estate"
                                                    className="card-img-top"
                                                    style={{height: "200px", objectFit: "cover"}}
                                                />
                                            </div>
                                            <div className="card-body pb-1">
                                                <h6 className="card-title title fw-bold">{item?.title || ''}</h6>
                                                <p className="card-text description mt-3">{item?.note || ''}</p>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="text-danger fw-bold">
                                                        {formatPrice(item?.price) || 'Liên hệ để biết giá'}
                                                    </div>
                                                    <div className="text-danger fw-bold">{item?.area || ''} m²
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer d-flex justify-content-between align-items-center">
                                                <div>
                                                    <i className="bi bi-geo-alt me-2"></i>
                                                    <small
                                                        className="text-muted">{item.district.name}, {item.province.name}</small>
                                                </div>
                                                <button
                                                    className="button-heart btn-outline-danger btn-sm position-relative"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        toggleSave(item.id);
                                                    }}
                                                >
                                                <span
                                                    className="tooltip-in-page-all">{savedItems[item.id] ? 'Bấm để bỏ lưu tin' : 'Bấm để lưu tin'}</span>
                                                    <i className={`bi ${savedItems[item.id] ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                                                </button>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CardEstate;