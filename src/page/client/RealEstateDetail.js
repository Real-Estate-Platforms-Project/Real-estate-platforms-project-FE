import {useState, useEffect} from "react";
import "../../css/RealEstateDetail.css"
import * as realEstateService from "../../services/RealEstate";
import {useParams} from "react-router-dom";
import CurrencyHelper from "../../utils/CurrencyHelper";
import {Carousel} from "react-responsive-carousel";



function RealEstateDetail() {
    const {id} = useParams();
    const [realEstate, setRealEstate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isSaved, setIsSaved] = useState(false);


    useEffect(() => {
        const fetchRealEstateData = async () => {
            try {
                const data = await realEstateService.getRealEstateById(id);
                setRealEstate(data);
            } catch (error) {
                setError("Lỗi khi tải dữ liệu bất động sản.");
            } finally {
                setLoading(false);
            }
        };
        fetchRealEstateData();
    }, [id]);

    const toggleSave = () => {
        setIsSaved(!isSaved);
    };

    if (loading) {
        return <div>Đang tải...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container-fluid w-75 mt-4 ">
            <div className="row justify-content-center ">
                {realEstate ? (
                    <div className="w-75 p-4">
                        <Carousel
                            showThumbs={false}
                            showStatus={false}
                            useKeyboardArrows
                            selectedItem={currentImageIndex}
                            onChange={(index) => setCurrentImageIndex(index)}
                        >
                            {realEstate.images.map((image, index) => (
                                <div className="text-center position-relative rounded-4 overflow-hidden" key={index}>
                                    <div className="image-real-estate-detail ">
                                        <img
                                            src={image.name}
                                            style={{width: 380, height: 430}}
                                            alt={`Real Estate ${index}`}
                                            className={`${currentImageIndex === index ? 'active-image' : ''} rounded-0`}
                                        />
                                    </div>
                                    <div className="background-real-estate-detail rounded-4"
                                         style={{backgroundImage: `url(${image.name}})`}}></div>
                                </div>
                            ))}
                        </Carousel>
                        <div className="d-flex mt-2 ">
                            {realEstate.images.map((image, index) => (
                                <div key={index} className="image-container me-2">
                                    <img
                                        src={image.name}
                                        style={{width: 150, height: 100, objectFit:"cover"}}
                                        alt={`Real Estate ${index}`}
                                        className={`rounded-2 ${currentImageIndex === index ? 'active-image' : ''}`}
                                        onClick={() => setCurrentImageIndex(index)}
                                    />
                                </div>
                            ))}
                        </div>
                        <h4 className="mt-4 fw-bold text-black">
                            <p className="m-0">{realEstate.title}</p>
                            <span className="text-black-50 fs-6 fw-normal">
                                {realEstate.address}, {realEstate.ward.name},{" "}
                                {realEstate.district.name}, {realEstate.province.name}
                            </span>
                        </h4>
                        <hr className="text-black-50"/>
                        <div className="d-flex justify-content-between">
                            <div className="d-flex flex-column ">
                                <span className="text-muted fw-semibold ">Mức giá:</span>
                                <span
                                    className="fs-5 text-dark fw-bold">{CurrencyHelper.formatCurrency(realEstate.price)}</span>
                                <span
                                    className="text-body-secondary"><small>~{CurrencyHelper.formatCurrency(realEstate.price / realEstate.area)} /m²</small></span>
                            </div>
                            <div className="d-flex flex-column ">
                                <span className="text-muted fw-semibold ">Diện tích:</span>
                                <span className="fs-5 text-dark fw-bold">{realEstate.area} m²</span>
                            </div>
                            <div className="d-flex flex-column ">
                                <span className="text-muted fw-semibold ">Vị trí:</span>
                                <span className="fs-5 text-dark fw-bold">{realEstate.location}</span>
                            </div>
                            <div className="d-flex flex-column ">
                                <span className="text-muted fw-semibold ">Hướng:</span>
                                <span className="fs-5 text-dark fw-bold">{realEstate.direction}</span>
                            </div>
                            <div className="fs-3 icon-wrapper" onClick={toggleSave}>
                                <span className="tooltip">{isSaved ? 'Bỏ lưu tin' : 'Lưu tin'}</span>
                                <button className="border-0 bg-white icon-button">
                                    <i className={`bi ${isSaved ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                                </button>
                            </div>
                        </div>
                        <hr className="text-black-50"/>
                        <div className="mt-4">
                            <h4 className="fw-bold">Mô tả chi tiết:</h4>
                            <p><small>{realEstate.note}</small></p>
                            <p>
                                <small>Giá <span className="text-lowercase">{realEstate.demandType}</span>: <strong>{CurrencyHelper.formatCurrency(realEstate.price)}</strong> (Còn
                                    thương lượng).</small>
                                <br/>
                                <small>Diện tích: {realEstate.area} m². </small>
                                <br/>
                                {realEstate.type === 'Nhà ở' ? (
                                    <small>Gồm: {realEstate.realEstateDetail?.bedroom} phòng ngủ
                                        - {realEstate.realEstateDetail?.toilet} toilet (có thể cải tạo thêm). Ô tô
                                        đỗ được trước
                                        cửa.</small> ) : ("")}
                            </p>
                            <p className="contact-info"><small>
                                Liên hệ: {realEstate.seller.name} <span className="blur-phone me-2">{realEstate.seller.phoneNumber}</span>để
                                xem <span className="text-lowercase">{realEstate.type}</span> thực
                                tế.</small>
                            </p>
                        </div>
                        <hr className="text-black-50"/>
                        <div className="property-features">
                            {realEstate.type === "Nhà ở" ? (
                                <div className="row">
                                    <div className="col-6">
                                        <ul className="list-unstyled">
                                            <li>
                                                <div>
                                                    <i className="fa-solid fa-vector-square"></i>
                                                    <span className='ms-4'>Diện tích</span>
                                                </div>
                                                <span className="text-muted">{realEstate.area} m²</span>
                                            </li>
                                            <li>
                                                <div>
                                                    <i className="fa-solid fa-city"></i>
                                                    <span className='ms-3'>Số tầng</span>
                                                </div>
                                                <span
                                                    className="text-muted">{realEstate.realEstateDetail?.floor} tầng</span>
                                            </li>
                                            <li>
                                                <div>
                                                    <i className="fa-sharp fa-solid fa-bath me-1"></i>
                                                    <span className='ms-3'>Số toilet</span>
                                                </div>
                                                <span
                                                    className="text-muted">{realEstate.realEstateDetail?.toilet} toilet</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-6">
                                        <ul className="list-unstyled">
                                            <li>
                                                <div>
                                                    <i className="bi bi-coin"></i>
                                                    <span className='ms-4'>Mức giá</span>
                                                </div>
                                                <span
                                                    className="text-muted">{CurrencyHelper.formatCurrency(realEstate.price)}</span>
                                            </li>
                                            <li>
                                                <div>
                                                    <i className="fa-sharp fa-solid fa-bed"></i>
                                                    <span className='ms-3'>Số phòng ngủ</span>
                                                </div>
                                                <span
                                                    className="text-muted">{realEstate.realEstateDetail?.bedroom} phòng</span>
                                            </li>
                                            <li>
                                                <div>
                                                    <i className="bi bi-journal"></i>
                                                    <span className='ms-4'>Pháp lý</span>
                                                </div>
                                                <span className="text-muted">Sổ đỏ/ Sổ hồng</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div> ) : (
                                <div className="row">
                                    <div className="col-6">
                                        <ul className="list-unstyled">
                                            <li>
                                                <div>
                                                    <i className="fa-solid fa-vector-square"></i>
                                                    <span className='ms-4'>Diện tích</span>
                                                </div>
                                                <span className="text-muted">{realEstate.area} m²</span>
                                            </li>
                                            <li>
                                                <div>
                                                    <i className="bi bi-signpost-split"></i>
                                                    <span className='ms-3'>Hướng nhà</span>
                                                </div>
                                                <span
                                                    className="text-muted">{realEstate.direction}</span>
                                            </li>
                                            <li>
                                                <div>
                                                    <i className="bi bi-pin-map-fill"></i>
                                                    <span className='ms-3'>Vị trí</span>
                                                </div>
                                                <span
                                                    className="text-muted">{realEstate.location}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-6">
                                        <ul className="list-unstyled">
                                            <li>
                                                <div>
                                                    <i className="bi bi-coin"></i>
                                                    <span className='ms-4'>Mức giá</span>
                                                </div>
                                                <span
                                                    className="text-muted">{CurrencyHelper.formatCurrency(realEstate.price)}</span>
                                            </li>
                                            <li>
                                                <div>
                                                    <i className="bi bi-journal"></i>
                                                    <span className='ms-4'>Pháp lý</span>
                                                </div>
                                                <span className="text-muted">Sổ đỏ/ Sổ hồng</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>) : (
                    <div>Không tìm thấy thông tin bất động sản.</div>
                )}
            </div>
        </div>
    )
        ;
}

export default RealEstateDetail;