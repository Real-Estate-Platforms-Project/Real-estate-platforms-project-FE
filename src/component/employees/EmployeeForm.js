import React, {useState, useEffect} from 'react';
import {useFormik} from 'formik';
import {toast} from 'react-toastify';
import apiClient from '../../configs/axiosConfigs';
import * as positionService from '../../services/PositionService';

const EmployeeForm = ({onCloseModal, onSave, employee, isEditing}) => {
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

    const formik = useFormik({
        initialValues: employee || {
            code: '',
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
        <form onSubmit={formik.handleSubmit}>
            <div className="row">
                <div className="mb-3 col-6">
                    <label className="form-label">Mã nhân viên</label>
                    <input
                        type="text"
                        name="code"
                        value={formik.values.code}
                        onChange={formik.handleChange}
                        className="form-control"
                        placeholder="Nhập mã nhân viên"
                    />
                </div>
                <div className="mb-3 col-6">
                    <label className="form-label">Tên nhân viên</label>
                    <input
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        className="form-control"
                        placeholder="Nhập tên nhân viên"
                    />
                </div>
                <div className="mb-3 col-6">
                    <label className="form-label">Ngày sinh</label>
                    <input
                        type="date"
                        name="dob"
                        value={formik.values.dob}
                        onChange={formik.handleChange}
                        className="form-control"
                    />
                </div>
                <div className="mb-3 col-6">
                    <label className="form-label">Giới tính</label>
                    <div className="form-check">
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
                    <div className="form-check">
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

                </div>
                <div className="mb-3 col-6">
                    <label className="form-label">Số điện thoại</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        className="form-control"
                        placeholder="Nhập số điện thoại"
                    />
                </div>
                <div className="mb-3 col-6">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        className="form-control"
                        placeholder="Nhập email"
                    />
                </div>
                <div className="mb-3 col-6">
                    <label className="form-label">Chức vụ</label>
                    <select
                        name="positionId"
                        value={formik.values.positionId}
                        onChange={formik.handleChange}
                        className="form-select"
                    >
                        <option value="">Chọn chức vụ</option>
                        {positions.map((position, index) => (
                            <option key={index} value={position.id}>
                                {position.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3 col-6">
                    <label className="form-label">Địa chỉ</label>
                    <input
                        type="text"
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        className="form-control"
                        placeholder="Nhập địa chỉ"
                    />
                </div>
                <div className="mb-3 col-6">
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
                            id="roleAdmin"
                            name="role"
                            value="Admin"
                            checked={formik.values.role === 'Admin'}
                            onChange={formik.handleChange}
                            className="form-check-input"
                        />
                        <label htmlFor="roleAdmin" className="form-check-label">Admin</label>
                    </div>
                </div>
            </div>
            <div className="text-end">
                <button type="submit" className="btn btn-primary me-2">
                    {isEditing ? 'Cập nhật' : 'Thêm'}
                </button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onCloseModal}
                >
                    Đóng
                </button>
            </div>
        </form>
    );
};

export default EmployeeForm;
