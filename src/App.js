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
import UpdatePassWord from "./component/login/UpdatePassWord";
import DemandList from "./component/client/DemandList";
import Authentication from "./page/auth/Authentication";
import ActivationSuccess from "./page/auth/ConfirmEmail";
import Admin from "./page/layout/Admin";
import EmployeeList from "./component/employees/EmployeeList";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Authentication/>}/>
                <Route path="/activation-success" element={<ActivationSuccess />} />
                <Route path="/" element={<Client/>}>
                    {/*<Route path="/" element={<Home/>} />*/}
                    <Route path="/buyernet/danh-sach-nhu-cau" element={<DemandList/>}/>
                    <Route path="/sellernet/dang-tin" element={<CreateRealEstate/>}/>
                    <Route path="*" element={<NotFound/>}/>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/notification" element={<Notification/>}/>
                    <Route path="/notificationDetail/:id" element={<NotificationDetail/>}/>
                    <Route path="/update-password" element={<UpdatePassWord/>}/>
                </Route>
                <Route path="/admin" element={<Admin/>}>

                    <Route path="/admin/employees" element={<EmployeeList />} />

                </Route>
            </Routes>
            <ToastContainer/>

        </BrowserRouter>
    );
}

export default App;
