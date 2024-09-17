import {Link} from "react-router-dom";

export default function ListingMenu() {
    return (
        <>
            <Link className="dropdown-item text-dark" to='buyernet/danh-sach-nhu-cau'>Danh sách nhu cầu</Link>
            <Link className="dropdown-item text-dark" to='/estate-list'>Danh sách nhà Đất</Link>
        </>
    )
}