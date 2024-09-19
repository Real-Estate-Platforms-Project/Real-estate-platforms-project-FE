import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import * as transactionService from "../../../services/TransactionService";
import { toast } from "react-toastify";
import EmployeeService from '../../../services/EmployeeService';
import RealEstateService from '..//..//..//services/RealEstateService';
import Modal from 'react-bootstrap/Modal';
import Select from "react-select";
import Button from "react-bootstrap/Button";
import BuyerService from "..//..//..//services/BuyerService"
import SellerService from "..//..//..//services/SellerService"

const TransactionUpdate = ({ showModal, handleClose, transaction }) => {
    const [employees, setEmployees] = useState([]);
    const [realEstates, setRealEstates] = useState([]);
    const [buyer, setBuyer] = useState([]);
    const [seller, setSeller] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        const employeeData = await EmployeeService.getEmployees();
        setEmployees(employeeData.map(emp => ({ value: emp.id, label: emp.code })));

        const realEstateData = await RealEstateService.findRealEstate();
        setRealEstates(realEstateData.map(re => ({ value: re.id, label: re.code })));

        const buyerData = await BuyerService.getAllBuyers();
        setBuyer(buyerData.map(buyer => ({ value: buyer.id, label: buyer.name })));

        const sellerData = await SellerService.getAllSellers();
        setSeller(sellerData.map(seller => ({ value: seller.id, label: seller.name })));
    };

    const validationSchema = Yup.object().shape({
        code: Yup.string().required("Mã giao dịch không được để trống").max(10, "Mã giao dịch không được quá 10 ký tự"),
        employeeId: Yup.number().required("Mã nhân viên không được để trống").positive().integer(),
        realEstateId: Yup.number().required("Mã bất động sản không được để trống").positive().integer(),
        buyerId: Yup.number().required("Mã người mua không được để trống").positive().integer(),
        sellerId: Yup.number().required("Mã người bán không được để trống").positive().integer(),
        amount: Yup.number().required("Số tiền không được để trống").min(1),
        createAt: Yup.date().required("Ngày giao dịch không được để trống").typeError("Ngày giao dịch không hợp lệ"),
        commissionFee: Yup.number().required("Tỷ lệ hoa hồng không được để trống").min(0),
        description: Yup.string().max(255),
        status: Yup.string().required("Trạng thái không được để trống").oneOf(["pending", "completed"]),
        isDeleted: Yup.boolean().required("Trường này không được để trống")
    });


    const updateTransaction = async (values) => {
        console.log("Submit values: ", values);
        try {
            let dataRequest = {
                id: values.id,
                code: values.code,
                employee: values.employeeId,
                realEstate: values.realEstateId,
                buyer: values.buyerId,
                seller: values.sellerId,
                amount: values.amount,
                createAt: values.createAt,
                commissionFee: values.commissionFee,
                description: values.description,
                status: values.status,
                isDeleted: values.isDeleted,
            }
            console.log("dataRequest", dataRequest)
            const isSuccess = await transactionService.updateTransaction(values.id, dataRequest);
            console.log("isSuccess", isSuccess);
            if (isSuccess) {
                toast.success("Cập nhật thành công");
                handleClose();
            } else {
                toast.error("Cập nhật thất bại");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi cập nhật giao dịch");
        }
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cập Nhật Giao Dịch</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        id: transaction?.id || "",
                        code: transaction?.code || "",
                        employee: transaction?.employee?.id || "",
                        realEstate: transaction?.realEstate?.id || "",
                        buyer: transaction?.buyer?.id || "",
                        seller: transaction?.seller?.id || "",
                        amount: transaction?.amount || "",
                        createAt: transaction?.createAt || "",
                        commissionFee: transaction?.commissionFee || "",
                        description: transaction?.description || "",
                        status: transaction?.status || "pending",
                        isDeleted: transaction?.isDeleted || false,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={updateTransaction}
                    validateOnChange={true}
                    validateOnBlur={true}
                >
                    {({ setFieldValue, values, handleSubmit, setTouched }) => (
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            setTouched({
                                code: true,
                                employeeId: true,
                                realEstateId: true,
                                buyerId: true,
                                sellerId: true,
                                amount: true,
                                createAt: true,
                                commissionFee: true,
                                description: true,
                                status: true,
                            });  // Đánh dấu tất cả các trường là touched để kiểm tra
                            handleSubmit(e);
                        }}>
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
                                    onChange={(option) => setFieldValue("employeeId", option ? option.value : '')}
                                    value={employees.find(option => option.value === values.employeeId)}
                                    placeholder="Chọn nhân viên"
                                    onBlur={() => setTouched({ employeeId: true })}  // Đánh dấu touched khi blur
                                />
                                <ErrorMessage name="employeeId" component="div" className="text-danger" />
                            </div>

                            <div className="form-group">
                                <label>Mã Bất Động Sản</label>
                                <Select
                                    name="realEstateId"
                                    options={realEstates}
                                    onChange={(option) => setFieldValue("realEstateId", option.value)}
                                    value={realEstates.find(option => option.value === values.realEstateId)}
                                    placeholder="Chọn bất động sản"
                                    onBlur={() => setTouched({ realEstateId: true })}  // Đánh dấu touched khi blur
                                />
                                <ErrorMessage name="realEstateId" component="div" className="text-danger" />
                            </div>

                            <div className="form-group">
                                <label>Bên Mua</label>
                                <Select
                                    name="buyerId"
                                    options={buyer}
                                    onChange={(option) => setFieldValue("buyerId", option.value)}
                                    value={buyer.find(option => option.value === values.buyerId)}
                                    placeholder="Chọn bên mua"
                                    onBlur={() => setTouched({ buyerId: true })}  // Đánh dấu touched khi blur
                                />
                                <ErrorMessage name="buyerId" component="div" className="text-danger" />
                            </div>

                            <div className="form-group">
                                <label>Bên bán</label>
                                <Select
                                    name="sellerId"
                                    options={seller}
                                    onChange={(option) => setFieldValue("sellerId", option.value)}
                                    value={seller.find(option => option.value === values.sellerId)}
                                    placeholder="Chọn bên bán"
                                    onBlur={() => setTouched({ sellerId: true })}  // Đánh dấu touched khi blur
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

                            <Button type="button" onClick={() => updateTransaction(values)}>
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

export default TransactionUpdate;


