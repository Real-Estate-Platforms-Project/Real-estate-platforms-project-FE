import {useState} from 'react';
import {Link} from 'react-router-dom';

function ContentAward() {
    const [isContentVisible, setIsContentVisible] = useState(false);

    const toggleContent = (e) => {
        e.preventDefault();
        setIsContentVisible(prevState => !prevState);
    };

    return (
        <>
            <div className="bg-body-tertiary my-3">
                <div className="container d-flex justify-content-between text-center py-4" style={{padding: '0 170px'}}>
                    <div>
                        <Link to="https://www.asiapropertyawards.com/en/">
                            <img src="/images/apagf-horizontal.svg" alt=""/>
                        </Link>
                    </div>
                    <div>
                        <Link to="https://www.propertyguruforbusiness.com/">
                            <img src="/images/PG-Business.svg" alt=""/>
                        </Link>
                    </div>
                    <div>
                        <Link to="https://www.asiapropertyawards.com/en/newsroom/">
                            <img src="/images/property-report.svg" alt=""/>
                        </Link>
                    </div>
                    <div>
                        <Link to="https://www.asiarealestatesummit.com/">
                            <img src="/images/ares-horizontal.svg" alt=""/>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="content container text-black my-5">
                <p className="paragraph">
                    Batdongsan.com.vn là trang web hàng đầu tại Việt Nam chuyên cung cấp giải pháp toàn diện cho việc
                    mua, bán, và cho thuê bất động sản, bao gồm cả đất và nhà ở. Chúng tôi mang đến một nền tảng đáng
                    tin cậy với dữ liệu tin rao phong phú, giúp bạn dễ dàng tìm kiếm và lựa chọn các loại hình bất động
                    sản phù hợp với nhu cầu của mình.
                </p>
                <p className="paragraph">
                    Trong phân khúc nhà đất, chúng tôi cung cấp các dịch vụ bán <span className="text-danger">căn hộ chung cư</span>,<span
                    className="text-danger"> nhà riêng</span>, nhà mặt
                    tiền, biệt thự, liền kề, và đất nền dự án. Các loại hình bất động sản đang được quan tâm như
                    condotel, shophouse và khu nghỉ dưỡng cũng có sẵn. Đối với nhu cầu cho thuê, chúng tôi cung cấp
                    nhiều lựa chọn từ <span className="text-danger">nhà nguyên căn</span>, <span
                    className="text-danger">phòng trọ giá rẻ</span> đến văn phòng và mặt bằng kinh doanh.
                    {!isContentVisible && <span className="toggle-text">..</span>}
                    <a href="#" className="toggle-button text-danger fw-bold" onClick={(e) => toggleContent(e)}>
                        {isContentVisible ? '' : 'Xem thêm'}
                    </a>
                </p>
                <div className="toggle-content">
                    {isContentVisible && (
                        <div >
                            <p className="paragraph">
                                Với bộ lọc chi tiết theo khoảng giá, vị trí, diện tích, bạn có thể dễ dàng tìm kiếm bất
                                động
                                sản phù hợp trong hàng ngàn tin rao được cập nhật hàng ngày. Chúng tôi cũng cung cấp
                                thông tin
                                về các dự án <span className="text-danger">căn hộ chung cư</span> và đánh giá từ các
                                chuyên gia, giúp bạn đưa ra quyết định
                                mua sắm
                                thông minh.
                            </p>
                            <p>
                                Ngoài ra, Batdongsan.com.vn còn hỗ trợ quản lý bất động sản, giúp bạn dễ dàng theo dõi
                                và
                                quản lý tài sản của mình. Truy cập Batdongsan.com.vn để trải nghiệm dịch vụ mua, bán,
                                cho
                                thuê và quản lý bất động sản hiệu quả tại Việt Nam. {!isContentVisible &&
                                <span className="toggle-text">..</span>}
                                <a href="#" className="toggle-button text-danger fw-bold"
                                   onClick={(e) => toggleContent(e)}>
                                    {isContentVisible ? 'Thu gọn' : ''}
                                </a>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default ContentAward;