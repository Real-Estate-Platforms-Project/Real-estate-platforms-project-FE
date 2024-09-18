import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import * as transactionService from "..//..//..//services/TransactionService";
import { toast } from "react-toastify";
import EmployeeService, {getEmployees} from '..//..//..//services/EmployeeService';
import RealEstateService from '..//..//..//services/EmployeeService';
import Modal from 'react-bootstrap/Modal';
import Select from "react-select";
import Button from "react-bootstrap/Button";
import BuyerService from "..//..//..//services/BuyerService"
import SellerService from "..//..//..//services/SellerService"

const TransactionCreate = ({ showModal, handleClose }) => {
    const [employees, setEmployees] = useState([]);
    const [realEstates, setRealEstates] = useState([]);
    const navigate = useNavigate();
    const [buyer, setBuyer] = useState([]);
    const [seller, setSeller] = useState([]);



    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        let employeeData = await EmployeeService.getEmployees();
        setEmployees(employeeData.map(emp => ({ value: emp.id, label: emp.code })));


        let realEstateData = await RealEstateService.getEmployees();
        setRealEstates(realEstateData.map(re => ({ value: re.id, label: re.code })));

        let buyerData = await BuyerService.getAllBuyers();
        setBuyer(buyerData.map(buyer => ({ value: buyer.id, label: buyer.name })))

        let sellerData = await SellerService.getAllSellers();
        setSeller(sellerData.map(seller => ({ value: seller.id, label: seller.name })))
    };

    const validationSchema = Yup.object().shape({
        code: Yup.string()
            .required("Mã giao dịch không được để trống")
            .required("Mã giao dịch không được trùng lặp")
            .max(10, "Mã giao dịch không được quá 10 ký tự"),
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


    const saveTransaction = async (values) => {
        console.log("values", values);
    
        try {
            let dataRequest = {
                code : values.code,
                employee : values.employeeId,
                realEstate : values.realEstateId,
                buyer : values.buyerId,
                seller : values.sellerId,
                amount : values.amount,
                createAt : values.createAt,
                commissionFee : values.commissionFee,
                description : values.description,
                status : values.status,
                isDeleted : values.isDeleted,
            }
            const response = await transactionService.saveTransaction(dataRequest);
            
            if (response && response.status === "OK") {
                toast.success("Thêm mới thành công");
                navigate("/admin/homeTransactions");
            } else if (response && response.status === "BAD_REQUEST" && response.message === "Mã giao dịch đã tồn tại!") {
                toast.error("Mã giao dịch đã tồn tại. Vui lòng sử dụng mã khác.");
            } else {
                toast.error("Thêm mới thất bại");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi");
        }
    };
    

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Thêm Giao Dịch Mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                        status: "pending",
                        isDeleted: false
                    }}
                    validationSchema={validationSchema}
                    onSubmit={saveTransaction}
                    validateOnChange={true}
                    validateOnBlur={true}
                >
                    {(formik) => (
                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-group">
                                <label>Mã Giao Dịch</label>
                                <Field name="code" type="text" className="form-control" />
                                <ErrorMessage name="code" component="div" className="text-danger" />
                            </div>

                            <div className="form-group">
                                <label>Mã Nhân Viên</label>
                                <Select
                                    name="employeeId"
                                    options={employees}
                                    onChange={(option) => formik.setFieldValue("employeeId", option ? option.value : '')}
                                    value={employees.find(option => option.value === formik.values.employeeId)}
                                    placeholder="Chọn nhân viên"
                                />
                                <ErrorMessage name="employeeId" component="div" className="text-danger" />
                            </div>

                            <div className="form-group">
                                <label>Mã Bất Động Sản</label>
                                <Select
                                    name="realEstateId"
                                    options={realEstates}
                                    onChange={(option) => formik.setFieldValue("realEstateId", option.value)}
                                    value={realEstates.find(option => option.value === formik.values.realEstateId)}
                                    placeholder="Chọn bất động sản"
                                />
                                <ErrorMessage name="realEstateId" component="div" className="text-danger" />
                            </div>

                            <div className="form-group">
                                <label>Bên Mua</label>
                                <Select
                                    name="buyerId"
                                    options={buyer}
                                    onChange={(option) => formik.setFieldValue("buyerId", option.value)}
                                    value={buyer.find(option => option.value === formik.values.buyerId)}
                                    placeholder="Chọn bên mua"
                                />
                                <ErrorMessage name="buyerId" component="div" className="text-danger" />
                            </div>

                            <div className="form-group">
                                <label>Bên bán</label>
                                <Select
                                    name="sellerId"
                                    options={seller}
                                    onChange={(option) => formik.setFieldValue("sellerId", option.value)}
                                    value={seller.find(option => option.value === formik.values.sellerId)}
                                    placeholder="Chọn bên bán"
                                />
                                <ErrorMessage name="sellerId" component="div" className="text-danger" />
                            </div>

                            <div className="form-group">
                                <label>Số Tiền</label>
                                <Field name="amount" type="number" className="form-control" />
                                <ErrorMessage name="amount" component="div" className="text-danger" />
                            </div>

                            <div className="form-group">
                                <label>Ngày Giao Dịch</label>
                                <Field name="createAt" type="date" className="form-control" />
                                <ErrorMessage name="createAt" component="div" className="text-danger" />
                            </div>

                            <div className="form-group">
                                <label>Tỷ Lệ Hoa Hồng</label>
                                <Field name="commissionFee" type="number" step="0.01" className="form-control" />
                                <ErrorMessage name="commissionFee" component="div" className="text-danger" />
                            </div>

                            <div className="form-group">
                                <label>Mô Tả</label>
                                <Field name="description" as="textarea" className="form-control" />
                                <ErrorMessage name="description" component="div" className="text-danger" />
                            </div>

                            <div className="form-group">
                                <label>Trạng Thái</label>
                                <Field as="select" name="status" className="form-control">
                                    <option value="pending">Chưa hoàn thành</option>
                                    <option value="completed">Hoàn thành</option>
                                </Field>
                                <ErrorMessage name="status" component="div" className="text-danger" />
                            </div>
                            <Button type="submit" className="btn btn-primary mt-3">
                                Lưu
                            </Button>
                            <Button variant="secondary" className="btn btn-primary mt-3" onClick={handleClose}>
                                Đóng
                            </Button>
                        </form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default TransactionCreate;
