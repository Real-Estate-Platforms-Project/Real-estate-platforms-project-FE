import React, {useState} from 'react';
import {toast} from 'react-toastify';

const EmployeeForm = ({onCloseModal, onSave}) => {
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        dob: '',
        gender: '',
        phone: '',
        email: '',
        position: '',
        address: '',
        role: 'Nhân viên'
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted Data:', formData);
        onSave();
        toast.success('Thêm mới thành công!');
        onCloseModal();
    };

    return (

        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Mã nhân viên</label>
                        <input
                            type="text"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Nhập mã nhân viên"
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Họ tên</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Nhập họ tên"
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Ngày sinh</label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Giới tính</label>
                        <div>
                            <input
                                type="radio"
                                name="gender"
                                value="Nam"
                                checked={formData.gender === 'Nam'}
                                onChange={handleChange}
                            /> Nam
                            <input
                                type="radio"
                                name="gender"
                                value="Nữ"
                                checked={formData.gender === 'Nữ'}
                                onChange={handleChange}
                                className="ms-3"
                            /> Nữ
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Số điện thoại</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Nhập số điện thoại"
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Nhập email"
                        />
                    </div>
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label">Chức vụ </label>
                <select
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="form-control"
                >
                    <option value="">Chọn chức vụ</option>
                    <option value="Trưởng phòng">Trưởng phòng</option>
                    <option value="Kế toán">Kế toán</option>
                    <option value="Nhân viên">Nhân viên</option>
                </select>
            </div>


            <div className="mb-3">
                <label className="form-label">Địa chỉ</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Nhập địa chỉ"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Phân quyền</label>
                <div>
                    <input
                        type="radio"
                        name="role"
                        value="Nhân viên"
                        checked={formData.role === 'Nhân viên'}
                        onChange={handleChange}
                    /> Nhân viên
                    <input
                        type="radio"
                        name="role"
                        value="Admin"
                        checked={formData.role === 'Admin'}
                        onChange={handleChange}
                        className="ms-3"
                    /> Admin
                </div>
            </div>


            <button type="submit" className="btn" style={{backgroundColor: '#FC650B', color: 'white'}}>Lưu</button>
        </form>
    );
};

export default EmployeeForm;
