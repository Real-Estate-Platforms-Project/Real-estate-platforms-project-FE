import Logo from "../Logo";
import MegaMenu from "../MegaMenu";
import {Link} from "react-router-dom";
import ListingMenu from "../ListingMenu";
import {useSelector} from "react-redux";
import Logout from "../Logout";
import styles from "../../css/NavClient.module.css"
import AccountDetail from "../AccountDetail";

function Nav() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const roles = useSelector((state) => state.auth.roles);
    const user = useSelector((state) => state.auth.user);
    const isSeller = roles.some(role => ['ROLE_SELLER', 'ROLE_ADMIN', 'ROLE_EMPLOYEE'].includes(role.name));

    return (
        <div className="shadow-lg">
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link className="navbar-brand" to='/'><Logo width={'128px'}/></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="align-items-center mt-2 collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0 justify-content-center flex-grow-1">
                            <li className="nav-item me-4">
                                <Link className="nav-link text-dark fw-bold" role="button" to="/">
                                    Trang chủ
                                </Link>
                            </li>
                            <li className="nav-item dropdown me-4">
                                <Link className="nav-link dropdown-toggle text-dark fw-bold"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false" to="#">
                                    Danh sách
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to='buyernet/danh-sach-nhu-cau'>Danh sách nhu cầu</Link></li>
                                    <li><Link className="dropdown-item" to='/estate-list'>Danh sách nhà Đất</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown me-4">
                                <Link className="nav-link text-dark fw-bold" role="button"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false" to="/">
                                    Phân tích và đánh giá
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link text-dark fw-bold" aria-disabled="true" to='notification'>Tin
                                    tức</Link>
                            </li>
                        </ul>

                        {isAuthenticated && (
                            <Link className='me-2 button-orange' to='/buyernet/dang-tin'><span className='fw-bold'>Đăng tin nhu cầu</span></Link>)}
                        {isSeller && (<Link className='me-2 button-orange' to='sellernet/dang-tin'><span
                            className='fw-bold'>Đăng tin</span></Link>)}

                        {!isAuthenticated && (
                            <Link className={`${styles.loginBtn}`} to='/login'>
                                <span className='fw-bold'>Đăng nhập</span>
                            </Link>
                        )}

                        {isAuthenticated && (
                            <>
                                <div className={`d-flex ms-3 p-2 rounded-3 ${styles.notification}`}>
                                    <i className="fa-solid fa-bell fs-4"></i>
                                </div>
                                <div className={`position-relative ms-5 ${styles.user}`}>
                                    <div className={`d-flex ${styles.headerUser}`}>
                                        <p className={`me-2 fw-bold`}>{user.name}</p>
                                        <i className="fa-solid fa-user fs-4"></i>
                                    </div>
                                    <div className={`position-absolute shadow-sm rounded-1 p-3 ${styles.userList}`}>
                                        <h6 className={`text-center mt-1`}>{user.email}</h6>
                                        <hr/>
                                        <ul className="list-unstyled mb-0">
                                            <li>
                                                <Link to="/profile" className={styles.link}>
                                                    <i className="fa-solid fa-user-gear"></i>
                                                    <span>Thông tin cá nhân</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/account/danh-sach-nhu-cau" className={styles.link}>
                                                    <i className="fa-solid fa-clock-rotate-left"></i>
                                                    <span>Lịch sử nhu cầu</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={'update-password'} className={styles.link}>
                                                    <i className="fa-solid fa-key"></i>
                                                    <span>Đổi mật khẩu</span>
                                                </Link>
                                            </li>
                                            <Logout/>
                                        </ul>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Nav;
