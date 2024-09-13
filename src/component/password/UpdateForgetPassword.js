import {Link, useLocation, useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {Formik, Field, ErrorMessage, Form} from "formik";
import {toast} from "react-toastify";
import {UpdateForgetPassword} from "../../services/AccountService";
import Logo from "../Logo";
import React from "react";


const validationSchema = Yup.object({
    newPassWord: Yup.string().required("Nhập mật khẩu mới ").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/," Mật khẩu yêu có độ tối thiểu 6 ký tự bao gồm chữ , số, ký tự đặc biệt"),
    reEnterPassWord: Yup.string().required("Nhập lại mật khẩu mới "),
})

function UpdateForgetPassWord() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const navigate = useNavigate();
    const handleSubmit = async (data) => {
        let status = await UpdateForgetPassword(data,token)
        if (status) {
            toast.success("Cập nhật thành công", {theme: "colored"})
            navigate("/login")
        } else {
            toast.success("Cập nhật lỗi", {theme: "colored"})
        }
    }

    return (
        <div className="form-update-account-real-estate py-4">
            <Formik initialValues={{
                recentPassword: '',
                newPassWord: '',
                reEnterPassWord: ''
            }
            }
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
            >

                <Form>
                    <div className="shadow m-auto w-50 rounded p-4 bg-white">
                        <Link to="/" className="d-flex justify-content-center">
                            <Logo width="200px"/>.
                        </Link>
                        <h4 className="fw-bold">Cập nhật tài khoản</h4>


                        <div className="mt-3">
                            <label htmlFor="newPassWord" className="form-label">Mật khẩu mới<span
                                className="text-danger">*</span></label>
                            <Field type="password" className="form-control " name="newPassWord"
                                   placeholder="VD : Abc#123"/>
                            <ErrorMessage className="text-danger" name="newPassWord" component="b"/>
                        </div>

                        <div className="mt-3">
                            <label htmlFor="reEnterPassWord" className="form-label">Nhập lại mật khẩu<span
                                className="text-danger">*</span></label>
                            <Field type="password" className="form-control " name="reEnterPassWord"
                                   placeholder="VD : Abc#123"/>
                            <ErrorMessage className="text-danger" name="reEnterPassWord" component="b"/>
                        </div>

                        <div className="text-center mt-4">
                            <button type="submit" className="btn btn-sm btn-outline-dark w-50 fw-bold">Thay đổi mật
                                khẩu
                            </button>
                            <Link className="btn btn-sm btn-outline-dark w-50 fw-bold" to="/">Hủy</Link>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default UpdateForgetPassWord;