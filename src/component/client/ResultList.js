import React from 'react';
import {Link} from "react-router-dom";
import "../../css/Card.css"
import {Player} from "@lottiefiles/react-lottie-player";
import lottieEmpty from "../../lottie/empty-estate.json";
import lottieLoading from "../../lottie/loading-estate.json";

const ResultsList = ({results, loading, error, currentPage, totalPages, handlePageChange}) => {

    const Ban = results.some(item => item.demandType === 'Bán');
    const ChoThue = results.some(item => item.demandType === 'Cho thuê');

    const demandType = Ban && ChoThue ? "Bán,Cho thuê" : Ban ? "Bán" : ChoThue ? "Cho thuê" : "Bán,Cho thuê";

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
    }
    return (
        <div className=" bg-body-tertiary my-5 results-section">
            {loading ? (
                 <Player
                    autoplay
                    keepLastFrame
                    src={lottieLoading}
                    style={{height: '500px', width: 'auto',backgroundColor: 'white'}}
                ></Player>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : results.length === 0 ? (
                <Player
                    autoplay
                    keepLastFrame
                    src={lottieEmpty}
                    style={{height: '800px', width: 'auto',backgroundColor: 'white'}}
                ></Player>
            ) : (
                <div className="container m-auto p-4 row">
                    <div className='mb-3'>
                        {demandType === 'Bán' ? (
                            <h3 className="fw-bold">Nhà Đất Bán</h3>
                        ) : demandType === 'Cho thuê' ? (
                            <h3 className="fw-bold">Nhà Đất Cho thuê</h3>
                        ) : (
                            <h3 className="fw-bold">Nhà Đất</h3>
                        )}</div>
                    {results.map((item, index) => (
                        <div key={index} className="col-md-3 mb-4">
                            <div className="card shadow-4 h-100">
                                <Link to={`/real-estate-detail/${item.id}`} className="text-decoration-none text-black">
                                    <div className="image-container">
                                        <img
                                            src={item.images[0]?.name || ""}
                                            alt="Real estate"
                                            className="card-img-top"
                                            style={{height: "200px", objectFit: "cover"}}
                                        />
                                    </div>
                                    {item.type === 'Nhà ở' ? (
                                        <div>
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
                                            <div
                                                className="card-footer d-flex justify-content-between align-items-center">
                                                <div>
                                                    <i className="bi bi-geo-alt me-2"></i>
                                                    <small
                                                        className="text-muted">{item.district.name}, {item.province.name}</small>
                                                </div>
                                                <button className="btn btn-outline-danger btn-sm">
                                                    <i className="bi bi-heart"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
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
                                            <div
                                                className="card-footer d-flex justify-content-between align-items-center">
                                                <div>
                                                    <i className="bi bi-geo-alt me-2"></i>
                                                    <small
                                                        className="text-muted">{item.district.name}, {item.province.name}</small>
                                                </div>
                                                <button className="btn btn-outline-danger btn-sm">
                                                    <i className="bi bi-heart"></i>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </Link>
                            </div>
                        </div>

                    ))}
                    <div className="pagination pagination--center">
                        <button
                            className="prev page-numbers"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 0}
                        >
                            <i className="fas fa-angle-left"></i>
                        </button>
                        {[...Array(totalPages).keys()].map((page) => (
                            <span
                                key={page}
                                className={`page-numbers ${page === currentPage ? 'current' : ''}`}
                                onClick={() => handlePageChange(page)}
                            >
                                    {page + 1}
                                </span>
                        ))}
                        <button
                            className="next page-numbers"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages - 1}
                        >
                            <i className="fas fa-angle-right"></i>
                        </button>
                    </div>


                </div>
            )}
            {/* Phân trang */}

        </div>
    );
};

export default ResultsList;
