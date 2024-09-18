import './App.css';
import './css/custom.css';
import "./css/SearchBar.css";
import {ToastContainer} from "react-toastify";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Client from './page/layout/Client';
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NotFound from "./component/client/404";
import CreateRealEstate from "./page/client/CreateRealEstate";
import Notification from "./component/client/Notification";
import NotificationDetail from "./component/client/NotificationDetail";
import DemandList from "./component/client/DemandList";
import Authentication from "./page/auth/Authentication";
import ActivationSuccess from "./page/auth/ConfirmEmail";
import Admin from "./page/layout/Admin";
import EmployeeList from "./component/employees/EmployeeList";
import TermsAndPolicies from "./page/client/TermsAndPolicies";
import Forbidden from "./component/client/Forbidden";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import Statistics from "./component/admin/Statistics";
import NotificationAdmin from "./component/admin/NotificationAdmin";
import {WebSocketProvider} from './services/SocketNotification';
import NotificationDisplay from "./component/NotificationDisplay";
import BuyerList from "./component/customer/BuyerList";
import CustomerAddForm from "./component/customer/CustomerAddForm";
import RealEstateDetail from "./page/client/RealEstateDetail";
import CreateDemand from "./page/client/CreateDemand";
import Home from "./page/client/Home";
import PostingRegulations from "./page/client/PostingRegulations";
import UpdatePassWord from "./component/password/UpdatePassWord";
import GetAndConfirmEmail from "./component/password/GetAndConfirmEmail";
import ConfirmEmail from "./component/password/ConfirmEmail";
import UpdateForgetPassword from "./component/password/UpdateForgetPassword";
import SellerList from "./component/customer/SellerList";
import EstateListing from "./page/client/EstateListing";
import ProtectedRoute from "./component/ProtectedRoute";
import Dashboard from "./page/admin/dashboard/Dashboard";
import EditDemand from "./page/client/EditDemand";
import AccountDemand from "./component/client/AcountDemand";
import Loading from "./component/Loading";
import {fetchUser} from "./redux/UserReducer";
import ProfilePage from "./page/client/Profile";
import ManagePostings from "./page/client/ManagePostings";


// import ManagePostings from "./page/client/ManagePostings";
import TransactionCreate from "./component/admin/transaction/TransactionCreact";
import HomeTransaction from "./component/admin/transaction/HomeTransaction"
import TransactionDetail from "./component/admin/transaction/TransactionDetail";


function App() {
    const dispatch = useDispatch();
    const {status, token} = useSelector(state => state.auth);

    useEffect(() => {
        if (token !== null) {
            dispatch(fetchUser());
        }
    }, [dispatch, token]);

    return (
        <BrowserRouter>
            <WebSocketProvider>
                <NotificationDisplay/>
                {
                    token !== null && status === 'idle' ? <Loading/> :
                        <Routes>

                            <Route path="/confirm-email" element={<ConfirmEmail/>}/>
                            <Route path="/login" element={<Authentication/>}/>
                            <Route path="/activation-success" element={<ActivationSuccess/>}/>
                            <Route path="/terms-and-polocies" element={<TermsAndPolicies/>}/>
                            <Route path="/" element={<Client/>}>
                                <Route element={<ProtectedRoute/>}>
                                    <Route path="/profile" element={<ProfilePage/>}/>
                                    <Route path="/buyernet/dang-tin" element={<CreateDemand/>}/>
                                    <Route path="/demand/edit/:id" element={<EditDemand/>}/>
                                    {/*<Route path="/update-password" element={<UpdatePassWord/>}/>*/}
                                    <Route path="/account/danh-sach-nhu-cau" element={<AccountDemand/>}/>
                                </Route>
                                <Route element={<ProtectedRoute
                                    requiredRoles={['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_SELLER']}/>}>
                                    <Route path="/sellernet/dang-tin" element={<CreateRealEstate/>}/>
                                </Route>
                                <Route path="/real-estate-detail/:id" element={<RealEstateDetail/>}/>
                                <Route path="/buyernet/danh-sach-nhu-cau" element={<DemandList/>}/>
                                <Route path="*" element={<NotFound/>}/>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/docs/quy-dinh-dang-tin-chung" element={<PostingRegulations/>}/>
                                <Route path="/notification" element={<Notification/>}/>
                                <Route path="/notificationDetail/:id" element={<NotificationDetail/>}/>
                                <Route path="/403" element={<Forbidden/>}/>
                                <Route path="/estate-list" element={<EstateListing
                                />}/>
                                <Route path="/forget-password" element={<GetAndConfirmEmail/>}/>
                                <Route path="/update-forget-password" element={<UpdateForgetPassword/>}/>
                                <Route path="/sellernet/quan-ly-tin-rao-ban-cho-thue" element={<ManagePostings/>}/>
                            </Route>

                            <Route element={<ProtectedRoute requiredRoles={['ROLE_ADMIN', 'ROLE_EMPLOYEE']}/>}>
                                <Route
                                    path="/admin"
                                    element={
                                        <>
                                            <Admin/>
                                        </>
                                }
                                >
                                    <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
                                    <Route path="/admin/dashboard" element={<Dashboard />} />

                                    <Route element={<ProtectedRoute requiredRoles={['ROLE_ADMIN']}/>}>
                                        <Route path={"/admin/employee"} element={<EmployeeList/>}/>
                                    </Route>
                                    <Route path={"/admin/notification"} element={<NotificationAdmin/>}/>
                                    <Route path="/admin/danh-sach-nhu-cau" element={<DemandList/>}/>
                                    <Route path={"/admin/buyers"} element={<BuyerList/>}/>
                                    <Route path="/admin/customers/add" element={<CustomerAddForm/>}/>
                                    <Route path="/admin/statics" element={<Statistics/>}/>
                                    <Route path="/admin/sellers" element={<SellerList/>}/>
                                    <Route path="/admin/homeTransactions" element={<HomeTransaction/>}/>
                                    <Route path="/admin/homeTransactions/create" element={<TransactionCreate/>}/>

                                </Route>
                            </Route>
                        </Routes>

                }
                <ToastContainer/>
            </WebSocketProvider>

        </BrowserRouter>
    );
}

export default App;
