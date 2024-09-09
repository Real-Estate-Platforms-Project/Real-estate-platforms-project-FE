import './App.css';
import './css/custom.css'
import "./css/SearchBar.css"
import {ToastContainer} from "react-toastify";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Client from './page/layout/Client';
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NotFound from "./component/client/404";
import Home from "./page/client/Home";
import CreateRealEstate from "./page/client/CreateRealEstate";
import Carousel from "./component/carousel/Carousel";
import Notification from "./component/client/Notification";
import NotificationDetail from "./component/client/NotificationDetail";
<<<<<<< HEAD
import DemandList from "./component/client/DemandList";
=======
import Login from "./page/auth/Login";
import Register from "./page/auth/Register";
import ActivationSuccess from "./page/auth/ConfirmEmail";
import Statistics from "./component/admin/Statistics";
>>>>>>> 6f72fd5af2b8c5c6ab6ed3faa81f4221a033dc08



function App() {
<<<<<<< HEAD
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Client />}>
            {/*<Route path="/" element={<Home/>} />*/}
            <Route path="/sellernet/dang-tin" element={<CreateRealEstate/>} />
            <Route path="buyernet/danh-sach-nhu-cau" element={<DemandList/>} />
            <Route path="*" element={<NotFound/>} />
            <Route path="/" element={<Carousel/>} />
            <Route path="/notification" element={<Notification/>} />
            <Route path="/notificationDetail/:id" element={<NotificationDetail />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
=======
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/activation-success" element={<ActivationSuccess />} />
                <Route path="/" element={<Client/>}>
                    {/*<Route path="/" element={<Home/>} />*/}
                    <Route path="/sellernet/dang-tin" element={<CreateRealEstate/>}/>
                    <Route path="*" element={<NotFound/>}/>
                    <Route path="/" element={<Carousel/>}/>
                    <Route path="/notification" element={<Notification/>}/>
                    <Route path="/notificationDetail/:id" element={<NotificationDetail/>}/>
                </Route>
            </Routes>
            <ToastContainer/>
        </BrowserRouter>
    );
>>>>>>> 6f72fd5af2b8c5c6ab6ed3faa81f4221a033dc08
}

export default App;
