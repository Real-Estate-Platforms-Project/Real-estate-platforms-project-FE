import Logo from "../Logo";
import MegaMenu from "../MegaMenu";
import {Link} from "react-router-dom";
import ListingMenu from "../ListingMenu";
import {useSelector} from "react-redux";
import Logout from "../Logout";

function Nav() {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

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
                    <div className="align-items-baseline mt-2 collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0 justify-content-center flex-grow-1">
                            <li className="nav-item dropdown me-4">
                                <Link className="nav-link dropdown-toggle text-dark" role="button"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false" to="#">
                                    Home
                                </Link>
                                <ul className="dropdown-menu">
                                    <MegaMenu/>
                                </ul>
                            </li>
                            <li className="nav-item dropdown me-4">
                                <Link className="nav-link dropdown-toggle text-dark" role="button"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false" to="#">
                                    Listing
                                </Link>
                                <ul className="dropdown-menu">
                                    <ListingMenu/>
                                </ul>
                            </li>
                            <li className="nav-item dropdown me-4">
                                <Link className="nav-link dropdown-toggle text-dark" role="button"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false" to='#'>
                                    Agents
                                </Link>
                                <ul className="dropdown-menu">
                                    <MegaMenu/>
                                </ul>
                            </li>
                            <li className="nav-item me-4">
                                <Link className="nav-link text-dark" aria-disabled="true" to="#">Property</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-dark" aria-disabled="true" to='notification'>Tin
                                    tức</Link>
                            </li>
                        </ul>
                        <Link className='me-2 button-orange' to='buyernet/danh-sach-nhu-cau'><span className='fw-bold'>Danh sach nhu cau</span></Link>
                        <Link className='me-2 button-orange' to='sellernet/dang-tin'><span
                            className='fw-bold'>Đăng tin</span></Link>

                        {!isAuthenticated && (
                            <Link className='button-black' to='/login'>
                                <span className='fw-bold'>Đăng nhập</span>
                            </Link>
                        )}
                        {isAuthenticated && (
                            <div>
                                <Link className='me-2 button-orange' to='update-password'><span className='fw-bold'>Đổi mật khẩu</span></Link>
                                <Logout />
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Nav;
