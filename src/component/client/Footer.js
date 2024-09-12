import Logo from "../Logo";
import "bootstrap-icons/font/bootstrap-icons.css";
import {Link} from "react-router-dom";

function Footer() {
    return (
        <footer className='bg-body-tertiary py-4 mt-2'>
            <div className="container mt-3">
                <div className='row justify-content-between'>
                    <div className='mb-2'>
                        <Link className="navbar-brand" to="/"><Logo width={'125px'}/></Link>
                    </div>
                    <div className='col-3 mb-5 mt-3'>
                        <div className="contact-info">
                            <span className="icon pb-4"><i className="bi bi-geo-alt"></i></span>
                            <span
                                className="text">Tầng 31, Keangnam Hanoi Landmark, Phạm Hùng, Nam Từ Liêm, Hà Nội</span>
                        </div>
                        <div className="contact-info">
                            <span className="icon"><i className="bi bi-telephone"></i></span>
                            <span className="text">(024) 3562 5939 - (024) 3562 5940</span>
                        </div>

                        <div className='d-flex gap-2 mt-4'>
                            <a href="#" className="text-orange"><i className="bi bi-facebook"></i></a>
                            <a href="#" className="text-orange"><i className="bi bi-twitter"></i></a>
                            <a href="#" className="text-orange"><i className="bi bi-instagram"></i></a>
                            <a href="#" className="text-orange"><i className="bi bi-linkedin"></i></a>
                            <a href="#" className="text-orange"><i className="bi bi-youtube"></i></a>
                        </div>
                    </div>
                    <div className='col-2'>
                        <h6 className='fs-5'><small>HƯỚNG DẪN</small></h6>
                        <ul className='list-unstyled footer-list'>
                            <li><a href="#">Về chúng tôi</a></li>
                            <li><a href="#">Báo giá và hỗ trợ</a></li>
                            <li><a href="#">câu hỏi thường gặp</a></li>
                            <li><a href="#">Liên hệ</a></li>
                            <li><a href="#">Góp ý báo lỗi</a></li>
                        </ul>
                    </div>
                    <div className='col-2'>
                        <h6 className='fs-5'>QUY ĐỊNH</h6>
                        <ul className='list-unstyled footer-list'>
                            <li><a href="#">Quy định đăng tin</a></li>
                            <li><a href="#">Quy chế hoạt động</a></li>
                            <li><a href="#">Điều khoản thỏa thuận</a></li>
                            <li><a href="#">Chính sách bảo mật</a></li>
                            <li><a href="#">Giải quyết khiếu nại</a></li>
                        </ul>
                    </div>
                    <div className='col-4'>
                        <div className="contend-section">
                            <strong>Chi nhánh TP. Hồ Chí Minh</strong>
                            <span>Tầng 3, Tháp B tòa nhà Viettel Complex, 285 Cách Mạng Tháng</span>
                            <span>Tám, Phường 12, Quận 10, TP. Hồ Chí Minh</span>
                            <span>Hotline: 1900 1881 - Mobile: 0904 893 279</span>
                        </div>
                        <div className="contend-section">
                            <strong>Chi nhánh Đà Nẵng</strong>
                            <span>Tầng 9, tòa nhà Vĩnh Trung Plaza, số 255 – 257 Hùng Vương,</span>
                            <span>phường Vĩnh Trung, quận Thanh Khê, TP. Đà Nẵng</span>
                            <span>Hotline: 1900 1881 - Mobile: 0904 907 279</span>
                        </div>
                    </div>
                </div>
                <div className='text-start mt-3'>
                    <small>© 2024. All rights reserved.</small>
                </div>
            </div>

        </footer>
    );
}

export default Footer;