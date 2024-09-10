import {useEffect, useState} from "react";
import {ErrorMessage, Field, Formik, Form} from "formik";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from "yup";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import * as demandService from "../../services/DemandService";
import * as buyerService from "../../services/BuyerInfor";
import * as sellerService from "../../services/SellerInfor";



function CreateDemand() {
    const [form, setForm] = useState({
        title:"",
        type:"",
        realEstateType:"",
        region:"",
        minArea:0,
        maxArea:0,
        notes:"",
    });

    const[buyer,setBuyer]=useState(null)

    useEffect(()=>{
        fetchBuyer()}
    , []);

    const navigate = useNavigate()
    const objectValid = {
        title: Yup.string().required("Tiêu đề không được để trống")
            .min(3, "Tiêu đề không được ngắn hơn 3 ký tự"),
        type: Yup.string().required("Loại nhu cầu không được để trống"),
        realEstateType: Yup.string().required("Loại bất động sản không được để trống"),
        region: Yup.string().required("Khu vực bất động sản không được để trống"),
        notes: Yup.string().required("Ghi chú không được để trống")
            .min(3, "Ghi chú không được ngắn hơn 3 ký tự"),
        minArea: Yup.number().required("Diện tích tối thiểu không được để trống")
            .min(10, "diện tích không được nhỏ hơn 10m2")
            .max(10000, "diện tích không được lớn hơn 10000m2")
            .integer("diện tích phải là số nguyên")
    }

    const fetchBuyer = async () => {
        try {
            const buyer = await buyerService.BuyerInfor();
            setBuyer(buyer)
        } catch (error) {
            toast.error("Không thể tải thông tin khách hàng.");
        }
    };
    const saveDemand = async (value) => {
        let isSuccess = await demandService.saveDemand(value)
        if(isSuccess) {
            toast.success("Thêm mới nhu cầu thành công")
            navigate("/home")
        } else {
            toast.error("Thêm mới nhu cầu thất bại.")
        }

    }

    if(buyer){return <>Loading...</>}
    return (
        <>
            <Formik initialValues={form} onSubmit={saveDemand} validationSchema={Yup.object(objectValid)}>
                <Form className='container mt-5 shadow-sm p-3 rounded w-25 bg-white'>
                    <h4 className="fw-bold">Thông tin nhu cầu bất động sản</h4>
                    <div className="mt-3">
                        <label htmlFor="customerCode" className="form-label">Mã khách hàng</label>
                        <Field type="text" className="form-control" id="customerCode" value={buyer.code || ''}
                               disabled/>
                        <Field type="hiden" className="form-control" name="buyer_id" value={buyer.id}
                               disabled/>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <label htmlFor="type" className="form-label">Loại nhu cầu</label>
                            <Field as="select" name="type" id="type" className="form-select" placeholder="Chọn">
                                <option value="Mua">Mua</option>
                                <option value="Thuê">Thuê</option>
                            </Field>
                            <ErrorMessage name="location" component="div" className="text-danger"/>
                        </div>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="title" className="form-label">Tiêu đề</label>
                        <Field as="text" name="note" id="title" className="form-control"/>
                    </div>
                    <div className="mt-4 d-flex">
                        <label className="form-label me-3 m-0">Loại bất động sản: </label>
                        <div role="group" className="d-flex">
                            <div className="form-check me-5 my-0">
                                <Field type="radio" name="type" value="Nhà ở" id="typeHouse"
                                       className="form-check-input"/>
                                <label htmlFor="typeHouse" className="form-check-label">Nhà ở</label>
                            </div>
                            <div className="form-check my-0">
                                <Field type="radio" name="type" value="Đất" id="typeLand"
                                       className="form-check-input"/>
                                <label htmlFor="typeLand" className="form-check-label">Đất</label>
                            </div>
                        </div>
                        <ErrorMessage name="type" component="div" className="text-danger"/>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <label htmlFor="region" className="form-label">Khu vực</label>
                            <Field as="select" name="region" id="region" className="form-select" placeholder="Chọn">
                                <option value="Trung tâm">Trung tâm</option>
                                <option value="Ngoại ô">Ngoại ô</option>
                                <option value="Nông thôn">Nông thôn</option>
                            </Field>
                            <ErrorMessage name="location" component="div" className="text-danger"/>
                        </div>
                    </div>

                    <div className="mt-3">
                        <label htmlFor="title" className="form-label">Diện tích tối thiểu</label>
                        <Field as="text" name="minArea" id="title" className="form-control"/>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="title" className="form-label">Diện tích tối đa</label>
                        <Field as="text" name="maxArea" id="title" className="form-control"/>
                    </div>

                    <div className="mt-3">
                        <label htmlFor="note" className="form-label">Ghi chú thêm</label>
                        <Field as="textarea" name="note" id="note" className="form-control"
                               style={{height: 125, fontSize: 15}}
                               placeholder="Nhập mô tả chi tiết về nhu cầu của bạn. Ví dụ: Khu nhà có vị trí thuận lợi, gần công viên, gần trường học,..."/>
                    </div>

                    <div className="w-50 mx-auto p-0 bg-white handle-submit" style={{marginTop: -65}}>
                        <div className="d-flex justify-content-between shadow-sm p-4 mt-4">
                            <Link to="/" className="btn btn-secondary me-2 fw-bold back-to-home">Quay lại</Link>
                            <button type="submit" className="btn button-search text-white fw-bold">Hoàn thành</button>
                        </div>
                    </div>
                </Form>
            </Formik>

        </>
    )
}

export default CreateDemand