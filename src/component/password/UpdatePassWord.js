import {useNavigate, Link} from "react-router-dom";
import * as Yup from "yup";
import {Formik, Field, ErrorMessage, Form} from "formik";
import {toast} from "react-toastify";
import {UpdatePassword} from "../../services/AccountService";
import Logo from "../Logo";
import React from "react";


const validationSchema = Yup.object({
    recentPassWord: Yup.string().required("Nhập mật khẩu hiện tại "),
    newPassWord: Yup.string().required("Nhập mật khẩu mới ").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/," Mật khẩu yêu có độ tối thiểu 6 ký tự bao gồm chữ , số, ký tự đặc biệt"),
    reEnterPassWord: Yup.string().required("Nhập lại mật khẩu mới "),
})

function UpdatePassWord() {
    const navigate = useNavigate();
    const handleSubmit = async (data) => {
        let status = await UpdatePassword(data)
        if (status) {
            toast.success("Cập nhật thành công", {theme: "colored"})
            navigate("/login")
        } else {
            toast.success("Mật khẩu không đúng", {theme: "colored"})
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
                    <div className="">
                        {/*<Link to="/" className="d-flex justify-content-center">*/}
                        {/*    <Logo width="200px"/>.*/}
                        {/*</Link>*/}
                        <h4 className="fw-bold">Cập nhật tài khoản</h4>
                        <div className="mt-3">
                            <label htmlFor="recentPassWord" className="form-label">Mật khẩu hiện tại <span
                                className="text-danger">*</span></label>
                            <Field type="password" className="form-control " name="recentPassWord"
                                   placeholder="***********"/>
                            <ErrorMessage className="text-danger" name="recentPassWord" component="b"/>
                        </div>

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
                        <div className=" d-flex justify-content-between mt-4">
                            <div><Link className="btn btn-secondary me-2 fw-bold back-to-home" to="/">Hủy</Link></div>
                            <div>
                                <button type="submit" className="btn button-search text-white fw-bold fw-bold">Thay đổi
                                    mật
                                    khẩu
                                </button>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default UpdatePassWord;