// ResultsList.js
import React from 'react';
import {Link} from "react-router-dom";

const ResultsList = ({results, loading, error, currentPage, totalPages, handlePageChange}) => {

    const Ban = results.some(item => item.demandType === 'Bán');
    const ChoThue = results.some(item => item.demandType === 'Cho thuê');

    const demandType = Ban && ChoThue ? "Bán,Cho thuê" : Ban ? "Bán" : ChoThue ? "Cho thuê" : "Bán,Cho thuê";

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
    }
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
                            ) : (
                                <h3>Nhà Đất</h3>

                            )}</div>
                        {results.map((item, index) => (

                            <div key={index} className="box row-cols-auto">
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
                                                        <span>{item?.realEstateDetail?.bedroom || 'N/A'}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <span>Nhà tắm</span>
                                                    <div>
                                                        <i className="fas fa-shower"></i>
                                                        <span>{item?.realEstateDetail?.toilet || 'N/A'}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <span>Diện tích</span>
                                                    <div>
                                                        <i className="fas fa-vector-square"></i>
                                                        <span>{item?.area || 'N/A'} m²</span>
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
                                                        <span>{item?.area || 'N/A'} m²</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <span>Giá trên m²</span>
                                                    <div>
                                                        <i className="fas fa-vector-square"></i>
                                                        <span>{formatPrice(item?.price / item.area) || 'N/A'} /m²</span>
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

                </div>
            )}
            {/* Phân trang */}

        </div>
    );
};

export default ResultsList;
