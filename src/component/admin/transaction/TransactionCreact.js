import {useEffect, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";
import {Navigate, useNavigate} from "react-router-dom";
import * as transactionService from "..//..//..//services/TransactionService"

function TransactionCreate () {
    const [form , setForm] = useState({
        code: "",
        employee: "",
        buyer: "",
        seller: "",
        realEstate: "",
        amount: "",
        createAt: "",
        commissionFee: ""
    })
    

    const validationSchema = Yup.object().shape({
        code: Yup.string()
            .required("Mã đơn hàng không được để trống")
            .max(10, "Mã đơn hàng không được quá 10 ký tự"),
        employeeId: Yup.number()
            .required("Mã nhân viên không được để trống")
            .positive("Mã nhân viên phải là số dương")
            .integer("Mã nhân viên phải là số nguyên"),
        realEstateId: Yup.number()
            .required("Mã bất động sản không được để trống")
            .positive("Mã bất động sản phải là số dương")
            .integer("Mã bất động sản phải là số nguyên"),
        buyerId: Yup.number()
            .required("Mã người mua không được để trống")
            .positive("Mã người mua phải là số dương")
            .integer("Mã người mua phải là số nguyên"),
        sellerId: Yup.number()
            .required("Mã người bán không được để trống")
            .positive("Mã người bán phải là số dương")
            .integer("Mã người bán phải là số nguyên"),
        amount: Yup.number()
            .required("Số tiền không được để trống")
            .min(1, "Số tiền phải lớn hơn 0"),
        createAt: Yup.date()
            .required("Ngày giao dịch không được để trống")
            .typeError("Ngày giao dịch không hợp lệ"),
        commissionFee: Yup.number()
            .required("Tỷ lệ hoa hồng không được để trống")
            .min(0, "Tỷ lệ hoa hồng phải là số dương hoặc bằng 0"),
        description: Yup.string()
            .max(255, "Mô tả không được quá 255 ký tự"),
        status: Yup.string()
            .required("Trạng thái không được để trống")
            .oneOf(["pending", "completed"], "Trạng thái không hợp lệ"),
        isDeleted: Yup.boolean()
            .required("Trường này không được để trống")
    });
    
    const saveTransaction = async (value) => {
        let isSuccess = await transactionService.saveTransaction(value);
        if(isSuccess) {
            toast.success("thêm mới thành công");
            Navigate("/api/transactions");
        } else {
            toast.success("thêm mới thất bại")
        }
    }

    return (
        <Formik
            initialValues={{
                code: "",
                employeeId: "",
                realEstateId: "",
                buyerId: "",
                sellerId: "",
                amount: "",
                createAt: "",
                commissionFee: "",
                description: "",
                status: "",
                isDeleted: false
            }}
            validationSchema={validationSchema}
            onSubmit={saveTransaction}
        >
            {formik => (
                <Form>
                    <div className="form-group">
                        <label>Mã giao dịch</label>
                        <Field name="code" type="text" className="form-control" />
                        <ErrorMessage name="code" component="div" className="text-danger" />
                    </div>

                    <div className="form-group">
                        <label>Mã giao dịch</label>
                        <Field name="code" type="text" className="form-control" />
                        <ErrorMessage name="code" component="div" className="text-danger" />
                    </div>
                    
                    <div className="form-group">
                        <label>Mã giao dịch</label>
                        <Field name="code" type="text" className="form-control" />
                        <ErrorMessage name="code" component="div" className="text-danger" />
                    </div>
                    
                    <div className="form-group">
                        <label>Mã giao dịch</label>
                        <Field name="code" type="text" className="form-control" />
                        <ErrorMessage name="code" component="div" className="text-danger" />
                    </div>
                    
                    <div className="form-group">
                        <label>Mã giao dịch</label>
                        <Field name="code" type="text" className="form-control" />
                        <ErrorMessage name="code" component="div" className="text-danger" />
                    </div>
                    
                    <div className="form-group">
                        <label>Mã giao dịch</label>
                        <Field name="code" type="text" className="form-control" />
                        <ErrorMessage name="code" component="div" className="text-danger" />
                    </div>
                    
                    <div className="form-group">
                        <label>Mã giao dịch</label>
                        <Field name="code" type="text" className="form-control" />
                        <ErrorMessage name="code" component="div" className="text-danger" />
                    </div>
                    
                    <div className="form-group">
                        <label>Mã giao dịch</label>
                        <Field name="code" type="text" className="form-control" />
                        <ErrorMessage name="code" component="div" className="text-danger" />
                    </div>
                    
                    
                    <button type="submit" className="btn btn-primary">Lưu</button>
                </Form>
            )}
        </Formik>
    );
}

    export default TransactionCreate;