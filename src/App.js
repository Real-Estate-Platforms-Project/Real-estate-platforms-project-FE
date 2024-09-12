import './App.css';
import './css/custom.css';
import "./css/SearchBar.css";
import {ToastContainer} from "react-toastify";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Client from './page/layout/Client';
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NotFound from "./component/client/404";
import CreateRealEstate from "./page/client/CreateRealEstate";
import LandingPage from "./component/carousel/LandingPage";
import Notification from "./component/client/Notification";
import NotificationDetail from "./component/client/NotificationDetail";
import DemandList from "./component/client/DemandList";
import Authentication from "./page/auth/Authentication";
import ActivationSuccess from "./page/auth/ConfirmEmail";
import Admin from "./page/layout/Admin";
import EmployeeList from "./component/employees/EmployeeList";
import TermsAndPolicies from "./page/client/TermsAndPolicies";
import Forbidden from "./component/client/Forbidden";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchUser} from "./redux/FetchUser";
import Statistics from "./component/admin/Statistics";
import NotificationAdmin from "./component/admin/NotificationAdmin";

import { WebSocketProvider } from './services/SocketNotification';
import NotificationDisplay from "./component/NotificationDisplay";
import BuyerList from "./component/customer/BuyerList";
import CustomerAddForm from "./component/customer/CustomerAddForm";
import RealEstateDetail from "./page/client/RealEstateDetail";
import CreateDemand from "./page/client/CreateDemand";
import UpdatePassWord from "./component/password/UpdatePassWord";
import GetAndConfirmEmail from "./component/password/GetAndConfirmEmail";
import ConfirmEmail from "./component/password/ConfirmEmail";
import UpdateForgetPassword from "./component/password/UpdateForgetPassword";
import EstateListing from "./page/client/EstateListing";
import ProtectedRoute from "./component/ProtectedRoute";


function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <WebSocketProvider>
                <NotificationDisplay/>
                <Routes>
                    <Route path="/confirm-email" element={<ConfirmEmail/>}/>
                    <Route path="/login" element={<Authentication/>}/>
                    <Route path="/activation-success" element={<ActivationSuccess/>}/>
                    <Route path="/terms-and-polocies" element={<TermsAndPolicies/>}/>
                    <Route path="/" element={<Client/>}>
                        <Route path="/real-estate-detail/:id" element={<RealEstateDetail/>}/>
                        <Route path="/buyernet/danh-sach-nhu-cau" element={<DemandList/>}/>
                        <Route path="/buyernet/dang-tin" element={<CreateDemand/>}/>
                        <Route path="/sellernet/dang-tin" element={<CreateRealEstate/>}/>
                        <Route path="*" element={<NotFound/>}/>
                        <Route path="/" element={<LandingPage/>}/>
                        <Route path="/notification" element={<Notification/>}/>
                        <Route path="/notificationDetail/:id" element={<NotificationDetail/>}/>
                        <Route path="/update-password" element={<UpdatePassWord/>}/>
                        <Route path="/403" element={<Forbidden/>}/>
                        <Route path="/estate-list" element={<EstateListing/>}/>
                        <Route path="/forget-password" element={<GetAndConfirmEmail/>}/>
                        <Route path="/update-forget-password" element={<UpdateForgetPassword/>}/>
                    </Route>
                    <Route element={<ProtectedRoute requiredRoles={['ROLE_ADMIN', 'ROLE_EMPLOYEE']}/>}>
                        <Route path="/admin" element={<Admin/>}>
                            <Route path={"/admin/employee"} element={<EmployeeList/>}/>
                            <Route path={"/admin/notification"} element={<NotificationAdmin/>}/>
                            <Route path="/admin/danh-sach-nhu-cau" element={<DemandList/>}/>
                            <Route path={"/admin/buyers"} element={<BuyerList/>}/>
                            <Route path="/admin/customers/add" element={<CustomerAddForm/>}/>
                            <Route path="/admin/statistics" element={<Statistics/>}/>
                        </Route>
                    </Route>
                </Routes>
                <ToastContainer/>
            </WebSocketProvider>

        </BrowserRouter>
    );
}

export default App;
