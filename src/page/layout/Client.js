import {Outlet} from "react-router-dom";
import Nav from "../../component/client/Nav";
import Footer from "../../component/client/Footer";

export default function Client() {
    return (
        <div className="main-layout">
            <Nav/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}