import './App.css';
import './css/custom.css'
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Client from './page/layout/Client';
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NotFound from "./component/client/404";
import Home from "./page/client/Home";
import CreateRealEstate from "./page/client/CreateRealEstate";
import Carousel from "./component/carousel/Carousel";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Client />}>
            {/*<Route path="/" element={<Home/>} />*/}
            <Route path="/sellernet/dang-tin" element={<CreateRealEstate/>} />
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Carousel/>} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
