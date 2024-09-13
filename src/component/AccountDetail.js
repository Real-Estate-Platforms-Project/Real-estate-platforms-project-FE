import {Link} from "react-router-dom";
import AccountDemand from "./client/AcountDemand";

export default function AccountDetail() {
    return (
        <div className="d-flex text-center">
            <div>
                <Link className="dropdown-item text-dark fw-bold" to="/account/danh-sach-nhu-cau">Lịch sử đăng tin nhu cầu</Link>
            </div>
        </div>
    )
}