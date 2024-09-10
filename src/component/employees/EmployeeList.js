import React, { useState, useEffect } from 'react';
import EmployeeService from '../../services/EmployeeService';
import EmployeeForm from './EmployeeForm';
import { Modal, Button } from 'react-bootstrap';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchCriteria, setSearchCriteria] = useState({
        code: '',
        name: '',
        position: '',
        email: ''
    });

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = () => {
        EmployeeService.getEmployees().then((response) => setEmployees(response.data));
    };

    const handleDelete = (id) => {
        EmployeeService.deleteEmployee(id).then(() => loadEmployees());
    };

    const handleSearch = () => {
        EmployeeService.searchEmployees(searchCriteria).then((response) => setEmployees(response.data));
    };

    const handleBack = () => {
        setSearchCriteria({
            code: '',
            name: '',
            position: '',
            email: ''
        });
        loadEmployees();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchCriteria((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleModalClose = () => setShowModal(false);
    const handleModalShow = () => setShowModal(true);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-end mb-3">
                <Button
                    style={{ backgroundColor: '#FC650B', color: 'white' }}
                    onClick={handleModalShow}
                >
                    Thêm mới
                </Button>
            </div>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm nhân viên mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EmployeeForm onCloseModal={handleModalClose} onSave={loadEmployees} />
                </Modal.Body>
            </Modal>

            <div className="row mb-3">
                <div className="col-md-2 mb-2">
                    <input
                        type="text"
                        name="code"
                        placeholder="Mã NV"
                        value={searchCriteria.code}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="col-md-2 mb-2">
                    <input
                        type="text"
                        name="name"
                        placeholder="Tên NV"
                        value={searchCriteria.name}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="col-md-2 mb-2">
                    <select
                        name="position"
                        value={searchCriteria.position}
                        onChange={handleInputChange}
                        className="form-control"
                    >
                        <option value="">Chức vụ</option>
                        <option value="Trưởng phòng">Trưởng phòng</option>
                        <option value="Kế toán">Kế toán</option>
                        <option value="Nhân viên">Nhân viên</option>
                    </select>
                </div>
                <div className="col-md-2 mb-2">
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={searchCriteria.email}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="col-md-2 mb-2">
                    <button
                        className="btn btn-outline-dark w-100"
                        onClick={handleSearch}
                    >
                        Tìm kiếm
                    </button>
                </div>
            </div>

            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                <tr>
                    <th>Mã nhân viên</th>
                    <th>Họ tên</th>
                    <th>Ngày sinh</th>
                    <th>Giới tính</th>
                    <th>Số điện thoại</th>
                    <th>Email</th>
                    <th>Chức vụ</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {employees.map((employee) => (
                    <tr key={employee.id}>
                        <td>{employee.code}</td>
                        <td>{employee.name}</td>
                        <td>{employee.dob}</td>
                        <td>{employee.gender}</td>
                        <td>{employee.phone}</td>
                        <td>{employee.email}</td>
                        <td>{employee.position}</td>
                        <td>
                            <button
                                className="btn btn-info btn-sm me-2"
                                onClick={() => setSelectedEmployee(employee)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(employee.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
