import './App.css';
import './css/custom.css'
import "./css/SearchBar.css"
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Client from './page/layout/Client';
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NotFound from "./component/client/404";
import Home from "./page/client/Home";
import CreateRealEstate from "./page/client/CreateRealEstate";
import Carousel from "./component/carousel/Carousel";
import Notification from "./component/client/Notification";
import NotificationDetail from "./component/client/NotificationDetail";
import DemandList from "./component/client/DemandList";



function App() {
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
}

export default App;
