// ResultsList.js
import React from 'react';
import {Link} from "react-router-dom";

const ResultsList = ({results, loading, error, currentPage, totalPages, handlePageChange}) => {
    const demandType = results.length > 0 ? results[0].demandType : null;

    return (
        <div className="results-section">
            {loading ? (
                <p>Đang tìm kiếm...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : results.length === 0 ? (
                <p>Không tìm thấy kết quả nào phù hợp với tiêu chí tìm kiếm.</p>
            ) : (
                <div className="card">
                    <div className="container row">
                        <div> {/* Hiển thị tiêu đề theo demandType */}
                            {demandType === 'Bán' ? (
                                <h3>Nhà Đất Bán</h3>
                            ) : demandType === 'Cho thuê' ? (
                                <h3>Nhà Đất Cho thuê</h3>
                            ) : null}</div>
                        {results.map((item, index) => (

                            <div key={index} className="box col-3">
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

                        ))}
                        <div className="pagination">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 0}
                            >
                                Trang trước
                            </button>
                            <span>Trang {currentPage + 1} / {totalPages}</span>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages - 1}
                            >
                                Trang sau
                            </button>
                        </div>
                    </div>

                </div>
            )}
            {/* Phân trang */}

        </div>
    );
};

export default ResultsList;
