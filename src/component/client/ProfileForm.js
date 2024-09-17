import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from '../../css/Profile.module.css';
import { saveUserProfile } from "../../services/BuyerService";
import {toast} from "react-toastify";
import customToast from "../../css/Toastify.module.css"
import {useNavigate} from "react-router-dom";

const ProfileForm = ({ user, onCancel }) => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: user.name || '',
            dob: user.dob || '',
            phoneNumber: user.phoneNumber || '',
            address: user.address || '',
            gender: user.gender || '',
            idCard: user.idCard || '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Tên là bắt buộc').min(3, 'Họ tên ít nhất 3 ký tự.').max(155, 'Họ tên tối đa 155 ký tự.'),
            dob: Yup.date().required('Ngày sinh là bắt buộc').nullable(),
            phoneNumber: Yup.string().required('Số điện thoại là bắt buộc').matches(/^([+0])\d{9,12}$/, 'Định dạng số điện thoại không hợp lệ.'),
            address: Yup.string().required('Địa chỉ là bắt buộc').max(155, 'Địa chỉ không được quá 155 ký tự.'),
            gender: Yup.string().oneOf(['Nam', 'Nữ', 'Giới tính thứ 3'], 'Chọn giới tính').required('Giới tính là bắt buộc'),
            idCard: Yup.string().required('CCCD/Hộ chiếu là bắt buộc').matches(/^(?:\d{12}|[A-Z0-9]{8}|[A-Z][0-9]{8})$/, 'CCCD hoặc Hộ chiếu không hợp lệ.'),
        }),
        onSubmit: async (values) => {
            try {
                await saveUserProfile({ ...values, code: user.code, email: user.email });
                toast.success('Cập nhật thông tin thành công.', {theme: "colored", className: customToast.customToast})
                onCancel();
            } catch (error) {
                toast.error(error.response?.data, {theme: "colored", className: customToast.customToast})
            }
        },
    });

    return (
        <div className={'p-3 card'}>
            <form onSubmit={formik.handleSubmit} className={'card-body'}>
                <div className="mb-4">
                    <label htmlFor="name" className="form-label">Họ tên</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('name')}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className="invalid-feedback">
                            {formik.errors.name}
                        </div>
                    ) : null}
                </div>
                <div className="row">
                    <div className="mb-4 col-6">
                        <label htmlFor="dob" className="form-label">Ngày sinh</label>
                        <input
                            id="dob"
                            name="dob"
                            type="date"
                            className={`form-control ${formik.touched.dob && formik.errors.dob ? 'is-invalid' : ''}`}
                            {...formik.getFieldProps('dob')}
                        />
                        {formik.touched.dob && formik.errors.dob ? (
                            <div className="invalid-feedback">
                                {formik.errors.dob}
                            </div>
                        ) : null}
                    </div>
                    <div className="mb-4 col-6">
                        <label htmlFor="gender" className="form-label">Giới tính</label>
                        <select
                            id="gender"
                            name="gender"
                            className={`form-select ${formik.touched.gender && formik.errors.gender ? 'is-invalid' : ''}`}
                            {...formik.getFieldProps('gender')}
                        >
                            <option value="">Chọn giới tính</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Giới tính thứ 3">Giới tính thứ ba</option>
                        </select>
                        {formik.touched.gender && formik.errors.gender ? (
                            <div className="invalid-feedback">
                                {formik.errors.gender}
                            </div>
                        ) : null}
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        value={user.email || ''}
                        readOnly
                        className={`form-control`}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="form-label">Số điện thoại</label>
                    <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        className={`form-control ${formik.touched.phoneNumber && formik.errors.phoneNumber ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('phoneNumber')}
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                        <div className="invalid-feedback">
                            {formik.errors.phoneNumber}
                        </div>
                    ) : null}
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="form-label">Địa chỉ</label>
                    <input
                        id="address"
                        name="address"
                        type="text"
                        className={`form-control ${formik.touched.address && formik.errors.address ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('address')}
                    />
                    {formik.touched.address && formik.errors.address ? (
                        <div className="invalid-feedback">
                            {formik.errors.address}
                        </div>
                    ) : null}
                </div>

                <div className="mb-4">
                    <label htmlFor="idCard" className="form-label">CCCD/Hộ chiếu</label>
                    <input
                        id="idCard"
                        name="idCard"
                        type="text"
                        className={`form-control ${formik.touched.idCard && formik.errors.idCard ? 'is-invalid' : ''}`}
                        {...formik.getFieldProps('idCard')}
                    />
                    {formik.touched.idCard && formik.errors.idCard ? (
                        <div className="invalid-feedback">
                            {formik.errors.idCard}
                        </div>
                    ) : null}
                </div>
                <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>
                        Hủy
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Lưu
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileForm;
