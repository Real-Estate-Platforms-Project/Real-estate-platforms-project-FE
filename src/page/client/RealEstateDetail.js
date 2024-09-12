import {useState, useEffect} from "react";
import "../../css/RealEstateDetail.css"
import * as realEstateService from "../../services/RealEstateService";
import {useParams} from "react-router-dom";


function RealEstateDetail() {
    const {id} = useParams();
    const [realEstate, setRealEstate] = useState(null);
    const [image, setImage] = useState(null);
    const [seller, setSeller] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchRealEstateData = async () => {
            try {
                const data = await realEstateService.getRealEstateById(id);
                setRealEstate(data);
                console.log(data)
            } catch (error) {
                setError("Lỗi khi tải dữ liệu bất động sản.");
            } finally {
                setLoading(false);
            }
        };
        fetchRealEstateData();
    }, [id]);


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
                        <div className="text-center position-relative">
                            <div className="image-real-estate-detail">
                                <img
                                    src="https://file4.batdongsan.com.vn/resize/1275x717/2023/10/19/20231019104327-6df8_wm.jpg"
                                    style={{width: 300, height: 430}} alt=""/>
                            </div>
                                <div className="background-real-estate-detail"></div>
                        </div>
                        <h4 className="mt-4 fw-bold text-black">{realEstate.demandType} <span className="text-lowercase">{realEstate.type}</span> tại
                            {" " + realEstate.address}, {realEstate.ward.name}, {realEstate.district.name}, {realEstate.province.name}
                        </h4>
                        <hr className="text-black-50"/>
                        <div className="row">
                            <div className="d-flex flex-column col-3">
                                <span className="text-muted fw-semibold ">Mức giá:</span>
                                <span className="fs-5 text-dark fw-bold">{realEstate.price} tỷ</span>
                                <span
                                    className="text-body-secondary"><small>~{realEstate.price / realEstate.area} triệu/m²</small></span>
                            </div>
                            <div className="d-flex flex-column col-3">
                                <span className="text-muted fw-semibold ">Diện tích:</span>
                                <span className="fs-5 text-dark fw-bold">{realEstate.area} m²</span>
                            </div>
                            <div className="d-flex flex-column col-3">
                                <span className="text-muted fw-semibold ">Vị trí:</span>
                                <span className="fs-5 text-dark fw-bold">{realEstate.location}</span>
                            </div>
                            <div className="d-flex flex-column col-3">
                                <span className="text-muted fw-semibold ">Hướng:</span>
                                <span className="fs-5 text-dark fw-bold">{realEstate.direction}</span>
                            </div>
                        </div>
                        <hr className="text-black-50"/>
                        <div className="description mt-4">
                            <h4 className="fw-bold">Mô tả chi tiết:</h4>
                            <p><small>{realEstate.note}</small></p>
                            <p>
                                <small>Giá bán: <strong>{realEstate.price}</strong> (Còn thương lượng).</small>
                                <br/>
                                <small>Diện tích: {realEstate.area} m². </small>
                                <br/>
                                <small>Gồm: {realEstate.realEstateDetail?.bedroom} phòng ngủ
                                    - {realEstate.realEstateDetail?.toilet} toilet (có thể cải tạo thêm). Ô tô
                                    đỗ được trước
                                    cửa.</small>
                            </p>
                            <p className="contact-info"><small>
                                Liên hệ: {realEstate.seller} <span className="blur-phone me-2">0908 174 999</span>để xem <span className="text-lowercase">{realEstate.type}</span> thực
                                tế.</small>
                            </p>
                        </div>
                        <hr className="text-black-50"/>
                        <div className="property-features">
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
                                                <i className="fa-solid fa-sack-dollar"></i>
                                                <span className='ms-4'>Mức giá</span>
                                            </div>
                                            <span className="text-muted">{realEstate.price} tỷ</span>
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
                                                <i className="fa-solid fa-note-sticky"></i>
                                                <span className='ms-4'>Pháp lý</span>
                                            </div>
                                            <span className="text-muted">Sổ đỏ/ Sổ hồng</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
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