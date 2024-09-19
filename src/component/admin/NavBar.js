import Logo from "../Logo";
import { Link } from "react-router-dom";
import ListingMenu from "../ListingMenu";
import { useSelector } from "react-redux";
import Logout from "../Logout";
import styles from "../../css/NavClient.module.css";
import AccountDetail from "../AccountDetail";

function Nav() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const roles = useSelector((state) => state.auth.roles);
    const user = useSelector((state) => state.auth.user);
    const isSeller = roles.some(role => ['ROLE_SELLER', 'ROLE_ADMIN', 'ROLE_EMPLOYEE'].includes(role.name));

    return (
        <div className="shadow-sm">
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse">
                        <div className="d-flex justify-content-between w-100">
                            {/* Left side content can go here (e.g., Logo, MegaMenu) */}

                            {/* Right side content */}
                            <div className="d-flex ms-auto align-items-center">
                                {!isAuthenticated && (
                                    <Link className={`${styles.loginBtn} me-3`} to='/login'>
                                        <span className='fw-bold'>Đăng nhập</span>
                                    </Link>
                                )}

                                {isAuthenticated && (
                                    <>
                                        <div className={`d-flex align-items-center me-3 ${styles.notification}`}>
                                            <i className="fa-solid fa-bell fs-4"></i>
                                        </div>
                                        <div className={`position-relative ${styles.user}`}>
                                            <div className={`d-flex ${styles.headerUser}`}>
                                                <p className={`me-2 fw-bold`}>{user.name}</p>
                                                <i className="fa-solid fa-user fs-4"></i>
                                            </div>
                                            <div className={`position-absolute shadow-sm rounded-1 p-3 ${styles.userList}`}>
                                                <h6 className={`text-center mt-1`}>{user.email}</h6>
                                                <hr/>
                                                <ul className="list-unstyled mb-0">
                                                    <li>
                                                        <Link to={'/update-password'} className={styles.link}>
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
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Nav;