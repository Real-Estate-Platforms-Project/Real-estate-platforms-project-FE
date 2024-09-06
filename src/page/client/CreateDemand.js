import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import Select from "react-select";
import * as realEstateService from "../../services/RealEstate";
import { toast } from "react-toastify";

const validationSchema  = Yup.object({
    demandType: Yup.string().required("Cần nhập thông tin này"),
    type: Yup.string().required("Cần nhập thông tin này"),
    address: Yup.string().required("Cần nhập thông tin này"),
    location: Yup.string().required("Cần nhập thông tin này"),
    direction: Yup.string().required("Cần nhập thông tin này"),
    area: Yup.number().required("Cần nhập thông tin này"),
    price: Yup.number().required("Cần nhập thông tin này"),
    status: Yup.string().required("Cần nhập thông tin này"),
    note: Yup.string().required("Cần nhập thông tin này")
})

function createDemand() {
    return (
        <div className="form-create-real-estate py-4">
            <div className="shadow m-auto w-50 rounded p-4 bg-white">
                <h4 className="fw-bold">Thêm nhu cầu bất động sản</h4>
                <div className="mt-3">
                    <label htmlFor="" className="form-label">Mã khách hàng</label>
                    <input type="text" className="form-control" disabled/>
                </div>
                <div className="text-center mt-4">
                    <button className="btn btn-sm btn-outline-dark w-50 fw-bold">Mua</button>
                    <button className="btn btn-sm btn-outline-dark w-50 fw-bold">Thuê</button>
                </div>
                <div className="mt-3">
                    <label htmlFor="" className="form-label">Loại bất động <span
                        className="text-danger">*</span></label>
                    <button className="btn btn-sm btn-outline-dark w-50 fw-bold">Đất</button>
                    <button className="btn btn-sm btn-outline-dark w-50 fw-bold">Nhà ở</button>
                </div>
                <div className="mt-3 row">
                <div className="col-6">
                        <label htmlFor="" className="form-label">Vị trí <span
                            className="text-danger">*</span></label>
                        <input type="radio" />
                    </div>
                </div>
                <div className="mt-3">
                    <label htmlFor="" className="form-label">Địa chỉ hiển thị trên tin đăng <span
                        className="text-danger">*</span></label>
                    <input type="text" className="form-control" placeholder="Bạn có thể bổ sung hẻm, ngách, ngõ"/>
                </div>
            </div>
        </div>

    );
}

export default createDemand;