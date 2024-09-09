import {useNavigate, Link} from "react-router-dom";
import * as Yup from "yup";
import {Formik, Field, ErrorMessage,Form} from "formik";
import {toast} from "react-toastify";
import {updatePassword} from "../../services/AccountService";


const validationSchema = Yup.object({
    recentPassWord: Yup.string().required("Nhập mật khẩu hiện tại "),
    newPassWord: Yup.string().required("Nhập mật khẩu mới "),
    reEnterPassWord: Yup.string().required("Nhập lại mật khẩu mới "),

})

function UpdatePassWord() {

    const navigate = new useNavigate();

    const handleSubmit = (data) => {
        try {
            let isSuccess = updatePassword(data)
            if (isSuccess) {
                toast.success("Cập nhật thành công", {theme : "colored"})
                navigate("/login")
            } else {
                toast.error("Cập nhật như thất bại", {theme : "colored"})
            }
        } catch (e) {
            toast.error("Lỗi hệ thống", {theme : "colored"})
        }
    }
    return (
        <div className="form-update-account-real-estate py-4">
            <Formik initialValues={{
                recentPassword: '',
                newPassWord:'',
                reEnterPassWord:''
            }
            }
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
            >

                <Form>
                    <div className="shadow m-auto w-50 rounded p-4 bg-white">
                        <h4 className="fw-bold">Cập nhật tài khoảng</h4>
                        <div className="mt-3">
                            <label htmlFor="recentPassWord" className="form-label">Mật khẩu hiện tại <span
                                className="text-danger">*</span></label>
                            <Field className="form-control " name="recentPassWord" placeholder="Mật khẩu hiện tại của bạn"/>
                            {/*<ErrorMessage className="text-danger" name="recentPassWord" component="b" />*/}
                        </div>

                        <div className="mt-3">
                            <label htmlFor="newPassWord" className="form-label">Mật khẩu mới<span
                                className="text-danger">*</span></label>
                            <Field className="form-control " name="newPassWord" placeholder="Mật khẩu hiện tại của bạn"/>
                            {/*<ErrorMessage className="text-danger" name="newPassWord" component="b" />*/}
                        </div>
                        <div className="mt-3">
                            <label htmlFor="reEnterPassWord" className="form-label">Nhập lại mật khẩu<span
                                className="text-danger">*</span></label>
                            <Field className="form-control " name="reEnterPassWord" placeholder="Mật khẩu hiện tại của bạn"/>
                            {/*<ErrorMessage className="text-danger" name="reEnterPassWord" component="b" />*/}
                        </div>
                        <div className="text-center mt-4">
                            <button type="submit" className="btn btn-sm btn-outline-dark w-50 fw-bold">Thay đổi mật khẩu</button>
                            <Link className="btn btn-sm btn-outline-dark w-50 fw-bold" to="/">Hủy</Link>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default UpdatePassWord;