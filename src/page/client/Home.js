import {Outlet} from "react-router-dom";
import Nav from "../../component/client/Nav";
import Footer from "../../component/client/Footer";
import SearchBar from "../../component/search/SearchBar";

export default function Home() {
    return (
        <div className="main-layout">
            <Nav/>
            <main className="mt-3">
                <div className="container">
                    <SearchBar/>
                    <Outlet/>
                </div>
            </main>

            <Footer/>
        </div>
    )
}