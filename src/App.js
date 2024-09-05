import './App.css';
import './css/custom.css'
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './page/client/Home';
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NotFound from "./component/client/404";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home />} >
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
            <ToastContainer />
        </BrowserRouter>
    );
}

export default App;
