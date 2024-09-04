import Logo from "../Logo";
import MegaMenu from "../MegaMenu";


function Nav() {
    return (
        <div className="container py-18px">
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"><Logo width={'128px'}/></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0 justify-content-center flex-grow-1">
                            <li className="nav-item dropdown me-4">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                    Home
                                </a>
                                <ul className="dropdown-menu">
                                    <MegaMenu/>
                                </ul>
                            </li>
                            <li className="nav-item dropdown me-4">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                    Listing
                                </a>
                                <ul className="dropdown-menu">
                                    <MegaMenu/>
                                </ul>
                            </li>
                            <li className="nav-item dropdown me-4">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                    Agents
                                </a>
                                <ul className="dropdown-menu">
                                    <MegaMenu/>
                                </ul>
                            </li>
                            <li className="nav-item me-4">
                                <a className="nav-link" aria-disabled="true">Property</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" aria-disabled="true">Blog</a>
                            </li>
                        </ul>
                        <a href="" className='btn btn-dark px-4 button-black'>Log in</a>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Nav;
