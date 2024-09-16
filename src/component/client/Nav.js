import Logo from "../Logo";
import MegaMenu from "../MegaMenu";
import {Link} from "react-router-dom";
import ListingMenu from "../ListingMenu";
import {useSelector} from "react-redux";
import Logout from "../Logout";
import AccountDetail from "../AccountDetail";

function Nav() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const roles = useSelector((state) => state.auth.roles);
    const isSeller = roles.some(role => role.name === 'ROLE_SELLER' || role.name === 'ROLE_ADMIN' ||role.name === 'ROLE_EMPLOYEE')
    console.log(isSeller)


    return (
        <div>
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
                            <li className="nav-item dropdown me-4">
                                <Link className="nav-link dropdown-toggle text-dark" role="button"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false" to="#">
                                    Trang chủ
                                </Link>
                                <ul className="dropdown-menu">
                                    <MegaMenu/>
                                </ul>
                            </li>
                            <li className="nav-item dropdown me-4">
                                <Link className="nav-link dropdown-toggle text-dark" role="button"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false" to="#">
                                    Danh sách
                                </Link>
                                <ul className="dropdown-menu">
                                    <ListingMenu/>
                                </ul>
                            </li>
                            <li className="nav-item dropdown me-4">
                                <Link className="nav-link dropdown-toggle text-dark" role="button"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false" to="#">
                                    Tài khoản
                                </Link>
                                <ul className="dropdown-menu">
                                    <AccountDetail/>
                                </ul>
                            </li>

                            <li className="nav-item me-4">
                                <Link className="nav-link text-dark" aria-disabled="true" to="#">Tài khoản</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-dark" aria-disabled="true" to='notification'>Tin
                                    tức</Link>
                            </li>
                        </ul>
                        <div className="me-2">
                            <i className="bi bi-bell fs-4"></i>
                        </div>
                        <Link className='me-2 button-orange' to='/buyernet/dang-tin'><span className='fw-bold'>Đăng tin nhu cầu</span></Link>
                        {isSeller && (<Link className='me-2 button-orange' to='sellernet/dang-tin'><span
                            className='fw-bold'>Đăng tin</span></Link>)}

                        {!isAuthenticated && (
                            <Link className='button-black' to='/login'>
                                <span className='fw-bold'>Đăng nhập</span>
                            </Link>
                        )}
                        {isAuthenticated && (
                            <Link className='me-2 button-orange' to='update-password'><span className='fw-bold'>Đổi mật khẩu</span></Link>
                        )}
                        {isAuthenticated && (
                            <Logout/>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Nav;
