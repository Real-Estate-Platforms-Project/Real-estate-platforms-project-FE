import React, { useState, useEffect } from 'react';
import * as employeeService from '../../services/EmployeeService';
import * as positionService from '../../services/PositionService'; // Assuming your position API is in a separate service
import EmployeeForm from './EmployeeForm';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [positions, setPositions] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        loadEmployees();
        fetchPositions();  // Fetch positions when component mounts
    }, []);

    const loadEmployees = async (filters = {}) => {
        try {
            const response = await employeeService.getEmployees(filters);
            setEmployees(response);
        } catch (error) {
            console.error("Error loading employees:", error);
        }
    };

    const fetchPositions = async () => {
        try {
            const positionsData = await positionService.getPosition();
            setPositions(positionsData);  // Save the positions in state
        } catch (error) {
            console.error("Error fetching positions:", error);
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedEmployee(null);
        setIsEditing(false);
    };

    const handleModalShow = (employee = null) => {
        setSelectedEmployee(employee);
        setIsEditing(!!employee);
        setShowModal(true);
    };

    const handleSearch = async (values) => {
        try {
            const filters = {
                code: values.code || '',
                name: values.name || '',
                email: values.email || '',
                position: values.position || ''
            };
            await loadEmployees(filters);
        } catch (error) {
            console.error("Error searching employees:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này không?")) {
            try {
                await employeeService.deleteEmployee(id);
                toast.success('Xóa thành công!');
                await loadEmployees();
            } catch (error) {
                console.error("Lỗi khi xóa nhân viên:", error);
                toast.error('Có lỗi xảy ra khi xóa nhân viên!');
            }
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-end mb-3">
                <Button
                    style={{ backgroundColor: '#FC650B', color: 'white' }}
                    onClick={() => handleModalShow()}
                >
                    Thêm mới
                </Button>
            </div>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? "Cập nhật nhân viên" : "Thêm nhân viên mới"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EmployeeForm
                        onCloseModal={handleModalClose}
                        onSave={loadEmployees}
                        employee={selectedEmployee}
                        isEditing={isEditing}
                    />
                </Modal.Body>
            </Modal>

            <div className="shadow-sm p-4 rounded">
                <Formik
                    initialValues={{
                        code: '',
                        name: '',
                        position: '',
                        email: '',
                    }}
                    onSubmit={handleSearch}
                >
                    {() => (
                        <Form>
                            <div className="row align-items-center mb-3">
                                <div className="col-md-2">
                                    <Field
                                        type="text"
                                        name="code"
                                        placeholder="Mã NV"
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-md-2">
                                    <Field
                                        type="text"
                                        name="name"
                                        placeholder="Tên NV"
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-md-2">
                                    <Field as="select" name="position" className="form-select">
                                        <option value="">Chức vụ</option>
                                        {positions.map((position) => (
                                            <option key={position.id} value={position.name}>
                                                {position.name}
                                            </option>
                                        ))}
                                    </Field>
                                </div>
                                <div className="col-md-2">
                                    <Field
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-md-2">
                                    <Button
                                        type="submit"
                                        className="btn btn-outline-dark w-100"
                                    >
                                        Tìm kiếm
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className="table-responsive">
                    <table className="table table-hover ">
                        <thead className="thead-dark" style={{backgroundColor: '#FF6B35'}}>

                        <tr>
                            <th>Mã nhân viên</th>
                            <th>Họ tên</th>
                            <th>Ngày sinh</th>
                            <th>Giới tính</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>Chức vụ</th>
                            <th>Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.code}</td>
                                <td>{employee.name}</td>
                                <td>{employee.dob}</td>
                                <td>{employee.gender}</td>
                                <td>{employee.phoneNumber}</td>
                                <td>{employee.email}</td>
                                <td>{employee.position.name || 'N/A'}</td>
                                <td>
                                    <Button
                                        className="btn btn-info btn-sm me-2"
                                        onClick={() => handleModalShow({
                                            ...employee,
                                            positionId: employee.position.id,
                                            role: employee.isAdmin ? "Admin" : "Nhân viên"
                                        })}
                                    >
                                        Sửa
                                    </Button>
                                    <Button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(employee.id)}
                                    >
                                        Xoá
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;