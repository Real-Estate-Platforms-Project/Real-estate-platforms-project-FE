import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import * as transactionService from "../../../services/TransactionService";
import { toast } from "react-toastify";
import TransactionForm from "../transaction/TransactionForm";
import EmployeeService from '../../../services/EmployeeService';
import RealEstateService from '../../../services/RealEstateService';

const TransactionCreate = () => {
    const [employees, setEmployees] = useState([]);
    const [realEstates, setRealEstates] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        console.log("dhfgdh");
            let employeeData = await EmployeeService.ListEmployees();
            setEmployees(employeeData.map(emp => ({ value: emp.id, label: emp.code })));
            const realEstateData = await RealEstateService.getRealEstates();
            setRealEstates(realEstateData.map(re => ({ value: re.id, label: re.code })));
    };

    const validationSchema = Yup.object().shape({
        code: Yup.string()
            .required("Mã giao dịch không được để trống")
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

    const saveTransaction = async (value) => {
        console.log("Dữ liệu gửi đi:", value);  

        try {
            const isSuccess = await transactionService.saveTransaction(value);
            console.log("Kết quả:", isSuccess); 
            if (isSuccess) {
                toast.success("Thêm mới thành công");
                navigate("/admin/homeTransactions"); 
            } else {
                toast.error("Thêm mới thất bại");
            }
        } catch (error) {
            console.error("Error saving transaction:", error);
            toast.error("Đã xảy ra lỗi");
        }
    };



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
                status: "pending",
                isDeleted: false
            }}
            validationSchema={validationSchema}
            onSubmit={saveTransaction}

        >
            {formik => (
                <TransactionForm
                    formik={formik}
                    employees={employees}  
                    realEstates={realEstates}

                />
            )}
        </Formik>
    );
};

export default TransactionCreate;
