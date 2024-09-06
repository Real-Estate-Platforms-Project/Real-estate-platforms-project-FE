import {Outlet} from "react-router-dom";
import Nav from "../../component/client/Nav";
import Footer from "../../component/client/Footer";
import SearchBar from "../../component/search/SearchBar";
import "../../css/SearchBar.css"
import Carousel from "../../component/carousel/Carousel";

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