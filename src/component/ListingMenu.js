import {Link} from "react-router-dom";

export default function ListingMenu() {
    return (
        <div className="d-flex text-center">
            <div>
                <Link className="dropdown-item text-dark fw-bold" to='buyernet/danh-sach-nhu-cau'>Danh sach nhu cau</Link>
                <Link className="dropdown-item text-dark fw-bold" to='/estate-list'>Danh sach nhà Đất</Link>
            </div>
        </div>
    )
}