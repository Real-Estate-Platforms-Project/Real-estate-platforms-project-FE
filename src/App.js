import './App.css';
import './css/custom.css';
import "./css/SearchBar.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Client from './page/layout/Client';
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NotFound from "./component/client/404";
import CreateRealEstate from "./page/client/CreateRealEstate";
import LandingPage from "./component/carousel/LandingPage";
import Notification from "./component/client/Notification";
import NotificationDetail from "./component/client/NotificationDetail";


import DemandList from "./component/client/DemandList";
import Login from "./page/auth/Login";
import Register from "./page/auth/Register";
import ActivationSuccess from "./page/auth/ConfirmEmail";
import Statistics from "./component/admin/Statistics";
import UpdatePassWord from "./component/login/UpdatePassWord";




function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/activation-success" element={<ActivationSuccess />} />
                <Route path="/" element={<Client/>}>
                    {/*<Route path="/" element={<Home/>} />*/}
                    <Route path="/buyernet/danh-sach-nhu-cau" element={<DemandList/>}/>
                    <Route path="/sellernet/dang-tin" element={<CreateRealEstate/>}/>
                    <Route path="*" element={<NotFound/>}/>
                    <Route path="/update-password" element={<UpdatePassWord/>}/>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/notification" element={<Notification/>}/>
                    <Route path="/notificationDetail/:id" element={<NotificationDetail/>}/>
                </Route>
            </Routes>
            <ToastContainer/>
        </BrowserRouter>
    );
}

export default App;
