import {useEffect, useState} from "react";
import {ErrorMessage, Field, Formik, Form} from "formik";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from "yup";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import * as demandService from "../../services/DemandService";



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
            .min(10, "diện tích tối thiểu không được nhỏ hơn 10m2")
            .max(10000, "diện tích không được lớn hơn 10000m2")
            .integer("diện tích phải là số nguyên"),
        maxArea: Yup.number().required("Diện tích tối đa không được để trống")
            .min(10, "diện tích tối đa không được nhỏ hơn 10m2")
            .max(10000, "diện tích tối thiểu không được lớn hơn 10000m2")
            .integer("diện tích phải là số nguyên")
    }

    const saveDemand = async (value) => {
        let isSuccess = await demandService.saveDemand(value)
        if(isSuccess) {
            toast.success("Thêm mới nhu cầu thành công")
            navigate("/")
        } else {
            toast.error("Thêm mới nhu cầu thất bại.")
        }

    }
    
    return (
        <>
            <Formik initialValues={form} onSubmit={saveDemand} validationSchema={Yup.object(objectValid)}>
                <Form className='container mt-5 shadow-sm p-3 rounded w-50 bg-white'>
                    <h4 className="fw-bold text-center">Thông tin nhu cầu bất động sản</h4>
                    <div className="row mt-3">
                        <div className="col">
                            <label htmlFor="type" className="form-label">Loại nhu cầu</label>
                            <Field as="select" name="type" id="type" className="form-select">
                                <option>Chọn</option>
                                <option value="Mua">Mua</option>
                                <option value="Thue">Thuê</option>
                            </Field>
                            <ErrorMessage name="type" component="div" className="text-danger"/>
                        </div>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="title" className="form-label">Tiêu đề</label>
                        <Field type="text" name="title" id="title" className="form-control"/>
                        <ErrorMessage name="title" component="div" className="text-danger"/>

                    </div>
                    <div className="mt-4 d-flex">
                        <label className="form-label me-3 m-0">Loại bất động sản: </label>
                        <div role="group" className="d-flex">
                            <div className="form-check me-5 my-0">
                                <Field type="radio" name="realEstateType" value="Nha o" id="typeHouse"
                                       className="form-check-input"/>
                                <label htmlFor="typeHouse" className="form-check-label">Nhà ở</label>
                            </div>
                            <div className="form-check my-0">
                                <Field type="radio" name="realEstateType" value="Dat" id="typeLand"
                                       className="form-check-input"/>
                                <label htmlFor="typeLand" className="form-check-label">Dat</label>
                            </div>
                        </div>
                        <ErrorMessage name="realEstateType" component="div" className="text-danger"/>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <label htmlFor="region" className="form-label">Khu vực</label>
                            <Field as="select" name="region" id="region" className="form-select" placeholder="Chọn">
                                <option>Chọn</option>
                                <option value="Trung tam">Trung tâm</option>
                                <option value="Ngoai o">Ngoại ô</option>
                                <option value="Nông thôn">Nông thôn</option>
                            </Field>
                            <ErrorMessage name="region" component="div" className="text-danger"/>
                        </div>
                    </div>

                    <div className="mt-3">
                        <label htmlFor="minArea" className="form-label">Diện tích tối thiểu</label>
                        <Field type="number" name="minArea" id="title" className="form-control"/>
                        <ErrorMessage name="minArea" component="div" className="text-danger"/>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="maxArea" className="form-label">Diện tích tối đa</label>
                        <Field type="number" name="maxArea" id="title" className="form-control"/>
                        <ErrorMessage name="maxArea" component="div" className="text-danger"/>
                    </div>

                    <div className="mt-3">
                        <label htmlFor="notes" className="form-label">Ghi chú thêm</label>
                        <Field as="textarea" name="notes" id="notes" className="form-control"
                               style={{height: 125, fontSize: 15}}
                               placeholder="Nhập mô tả chi tiết về nhu cầu của bạn. Ví dụ: Khu nhà có vị trí thuận lợi, gần công viên, gần trường học,..."/>
                        <ErrorMessage name="note" component="div" className="text-danger"/>
                    </div>
                    <div className="d-flex justify-content-between shadow-sm p-4 mt-4">
                        <Link to="/" className="btn btn-secondary me-2 fw-bold back-to-home">Quay lại</Link>
                        <button type="submit" className="btn button-search text-white fw-bold">Hoàn thành</button>
                    </div>
                </Form>
            </Formik>

        </>
    )
}

export default CreateDemand