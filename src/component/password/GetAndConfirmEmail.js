import React from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import styles from '../../css/Toastify.module.css';
import Logo from '../../component/Logo.js'
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {createToken} from "../../services/AccountService";

function GetAndConfirmEmail() {

    const validationSchema = Yup.object({
        email: Yup.string().required("Nhập email của bạn ").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
            "Email không tồn tại"),
    })


    const onSubmit = async (values) => {
        try {
            await createToken(values.email);
            toast.success(' Vui lòng kiểm tra email để tiến hành cập nhật tài khoản.', {
                theme: "colored",
                className: styles.customToast
            });
        } catch (error) {
            toast.error('Xác thực thất bại! Vui lòng kiểm tra lại tên email.', {
                theme: "colored",
                className: styles.customToast
            });
        }
    }


    return (
        <div className="m-auto mt-5 mb-10 w-25 border-bottom">
            {/*<Link to="/" className="d-flex justify-content-center mt-5">*/}
            {/*    <Logo width="200px"/>.*/}
            {/*</Link>*/}
            <Formik initialValues={{email: ''}}
                    validationSchema={validationSchema}

                    onSubmit={onSubmit}>
                <Form>
                    <div className="shadow p-4 mt-2 rounded ">
                        <div className="mt-2 border-bottom"><h5>Tìm tài khoản của bạn</h5></div>
                        <div className="mt-2">
                            <p>Vui lòng nhập email để chúng tôi tìm kiếm tài khoản của bạn.</p>
                        </div>
                        <div className="mt-2">
                            <div className="mt-3">
                                <Field type="email" className="form-control " name="email"
                                       placeholder="VD : abc@gmail.com"/>
                                <ErrorMessage className="text-danger" name="email" component="b"/>
                            </div>
                            <div className="mt-2 border-top d-flex justify-content-end">
                                <div className="mt-2 me-1"><a href="/login"
                                                              className="btn btn-outline-warning">Hủy</a></div>
                                <div className="mt-2">
                                    <button type="submit" className="btn btn-outline-warning">Tìm kiếm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>


        </div>

    );
}

export default GetAndConfirmEmail;
