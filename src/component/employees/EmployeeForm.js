import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import apiClient from '../../configs/AxiosConfigs';
import * as positionService from '../../services/PositionService';
import * as Yup from 'yup';


const EmployeeForm = ({ onCloseModal, onSave, employee, isEditing }) => {
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        const fetchPositions = async () => {
            try {
                const data = await positionService.getPosition();
                setPositions(data);
            } catch (error) {
                console.error("Error fetching positions:", error);
                toast.error('Không thể tải chức vụ. Vui lòng thử lại.');
            }
        };

        fetchPositions();
    }, []);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Tên nhân viên là bắt buộc'),
        dob: Yup.date().required('Ngày sinh là bắt buộc'),
        gender: Yup.string().required('Giới tính là bắt buộc'),
        phoneNumber: Yup.string()
            .matches(/^[0-9]{10}$/, 'Số điện thoại phải có 10 chữ số')
            .required('Số điện thoại là bắt buộc'),
        email: Yup.string()
            .email('Email không hợp lệ')
            .required('Email là bắt buộc')
            .test('email-exists', 'Email đã tồn tại', async value => {
                if (isEditing && value === employee.email) return true;
                try {
                    const response = await apiClient.get(`/admin/employees/check-email`, {
                        params: { email: value }
                    });
                    return !response.data;
                } catch (error) {
                    console.error('Error checking email:', error);
                    return false;
                }
            }),
        positionId: Yup.string().required('Chức vụ là bắt buộc'),
        address: Yup.string().required('Địa chỉ là bắt buộc'),
    });

    const formik = useFormik({
        initialValues: employee || {
            name: '',
            dob: '',
            gender: '',
            phoneNumber: '',
            email: '',
            positionId: '',
            address: '',
            role: 'Nhân viên',
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                if (isEditing) {
                    const response = await apiClient.put(`/admin/employees/${values.id}`, values);
                    if (response.status === 200) {
                        toast.success('Cập nhật nhân viên thành công!');
                    } else {
                        toast.error('Đã có lỗi xảy ra!');
                    }
                } else {
                    const response = await apiClient.post('/admin/employees', values);
                    if (response.status === 200 || response.status === 201) {
                        toast.success('Thêm nhân viên thành công!');
                    } else {
                        toast.error('Đã có lỗi xảy ra!');
                    }
                }
                onSave();
                onCloseModal();
            } catch (error) {
                console.error('Error saving employee:', error);
                toast.error('Không thể lưu nhân viên. Vui lòng thử lại.');
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="p-4 bg-light rounded shadow-sm">
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">Tên nhân viên</label>
                    <input
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        className={`form-control ${formik.errors.name && formik.touched.name ? 'is-invalid' : ''}`}
                        placeholder="Nhập tên nhân viên"
                    />
                    {formik.errors.name && formik.touched.name && (
                        <div className="invalid-feedback">{formik.errors.name}</div>
                    )}
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Ngày sinh</label>
                    <input
                        type="date"
                        name="dob"
                        value={formik.values.dob}
                        onChange={formik.handleChange}
                        className={`form-control ${formik.errors.dob && formik.touched.dob ? 'is-invalid' : ''}`}
                    />
                    {formik.errors.dob && formik.touched.dob && (
                        <div className="invalid-feedback">{formik.errors.dob}</div>
                    )}
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Giới tính </label>
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            id="genderMale"
                            name="gender"
                            value="Nam"
                            checked={formik.values.gender === 'Nam'}
                            onChange={formik.handleChange}
                            className="form-check-input"
                        />
                        <label htmlFor="genderMale" className="form-check-label">Nam</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            id="genderFemale"
                            name="gender"
                            value="Nữ"
                            checked={formik.values.gender === 'Nữ'}
                            onChange={formik.handleChange}
                            className="form-check-input"
                        />
                        <label htmlFor="genderFemale" className="form-check-label">Nữ</label>
                    </div>
                    {formik.errors.gender && formik.touched.gender && (
                        <div className="invalid-feedback d-block">{formik.errors.gender}</div>
                    )}
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Số điện thoại</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        className={`form-control ${formik.errors.phoneNumber && formik.touched.phoneNumber ? 'is-invalid' : ''}`}
                        placeholder="Nhập số điện thoại"
                    />
                    {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                        <div className="invalid-feedback">{formik.errors.phoneNumber}</div>
                    )}
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        className={`form-control ${formik.errors.email && formik.touched.email ? 'is-invalid' : ''}`}
                        placeholder="Nhập email"
                        readOnly={isEditing}  // Make email read-only if editing
                    />
                    {formik.errors.email && formik.touched.email && (
                        <div className="invalid-feedback">{formik.errors.email}</div>
                    )}
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Chức vụ</label>
                    <select
                        name="positionId"
                        value={formik.values.positionId}
                        onChange={formik.handleChange}
                        className={`form-select ${formik.errors.positionId && formik.touched.positionId ? 'is-invalid' : ''}`}
                    >
                        <option value="">Chọn chức vụ</option>
                        {positions.map((position, index) => (
                            <option key={index} value={position.id}>
                                {position.name}
                            </option>
                        ))}
                    </select>
                    {formik.errors.positionId && formik.touched.positionId && (
                        <div className="invalid-feedback">{formik.errors.positionId}</div>
                    )}
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Địa chỉ</label>
                    <input
                        type="text"
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        className={`form-control ${formik.errors.address && formik.touched.address ? 'is-invalid' : ''}`}
                        placeholder="Nhập địa chỉ"
                    />
                    {formik.errors.address && formik.touched.address && (
                        <div className="invalid-feedback">{formik.errors.address}</div>
                    )}
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Phân quyền</label>
                    <div className="form-check">
                        <input
                            type="radio"
                            id="roleEmployee"
                            name="role"
                            value="Nhân viên"
                            checked={formik.values.role === 'Nhân viên'}
                            onChange={formik.handleChange}
                            className="form-check-input"
                        />
                        <label htmlFor="roleEmployee" className="form-check-label">Nhân viên</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            id="roleManager"
                            name="role"
                            value="Quản lý"
                            checked={formik.values.role === 'Quản lý'}
                            onChange={formik.handleChange}
                            className="form-check-input"
                        />
                        <label htmlFor="roleManager" className="form-check-label">Quản lý</label>
                    </div>
                </div>
                <div className="col-12 text-end">
                    <button type="submit" className="btn" style={{ backgroundColor: '#FC650B', color: 'white' }}>
                        {isEditing ? 'Cập nhật' : 'Thêm mới'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default EmployeeForm;
