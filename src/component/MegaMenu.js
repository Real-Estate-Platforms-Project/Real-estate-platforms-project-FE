import {Link} from "react-router-dom";

export default function MegaMenu() {
    return (
        <div className="d-flex text-center">
            <div>
                <h1 className="dropdown-header text-dark fw-bold fs-5">Title 1</h1>
                <Link className="dropdown-item" to="#">Menu 1</Link>
                <Link className="dropdown-item" to="#">Menu 2</Link>
                <Link className="dropdown-item" to="#">Menu 3</Link>
                <Link className="dropdown-item" to="#">Menu 4</Link>
                <Link className="dropdown-item" to="#">Menu 5</Link>
            </div>
            <div>
                <h6 className="dropdown-header text-dark fw-bold fs-5">Title 2</h6>
                <Link className="dropdown-item" to="#">Menu 1</Link>
                <Link className="dropdown-item" to="#">Menu 2</Link>
                <Link className="dropdown-item" to="#">Menu 3</Link>
                <Link className="dropdown-item" to="#">Menu 4</Link>
                <Link className="dropdown-item" to="#">Menu 5</Link>
            </div>
            <div>
                <h6 className="dropdown-header text-dark fw-bold fs-5">Title 3</h6>
                <Link className="dropdown-item" to="#">Menu 1</Link>
                <Link className="dropdown-item" to="#">Menu 2</Link>
                <Link className="dropdown-item" to="#">Menu 3</Link>
                <Link className="dropdown-item" to="#">Menu 4</Link>
                <Link className="dropdown-item" to="#">Menu 5</Link>
            </div>
        </div>
    )
}