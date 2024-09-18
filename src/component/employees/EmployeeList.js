import React, { useState, useEffect } from 'react';
import * as employeeService from '../../services/EmployeeService';
import * as positionService from '../../services/PositionService';
import EmployeeForm from './EmployeeForm';
import ModalDeleteEmployee from "../admin/ModalDeleteEmployee";
import { Modal, Button, Card, Row, Col, InputGroup } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import styles from '../../css/PaginationStyles.module.css';
import '../../css/nhat.css';
import { FaSearch, FaUser, FaAt, FaBriefcase, FaIdBadge, FaTrash, FaSync } from 'react-icons/fa';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [positions, setPositions] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    useEffect(() => {
        loadEmployees();
        fetchPositions();
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
            setPositions(positionsData);
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

    const handleDeleteModalShow = (employee) => {
        setSelectedEmployee(employee);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (selectedEmployee) {
            try {
                await employeeService.deleteEmployee(selectedEmployee.id);
                toast.success('Xóa thành công!');
                await loadEmployees();
            } catch (error) {
                console.error("Lỗi khi xóa nhân viên:", error);
                toast.error('Có lỗi xảy ra khi xóa nhân viên!');
            }
            setShowDeleteModal(false);
        }
    };

    const totalPages = Math.ceil(employees.length / itemsPerPage);
    const currentEmployees = employees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePrevClick = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
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

            <ModalDeleteEmployee
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                message="Bạn có chắc chắn muốn xóa nhân viên này không?"
            />

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
                    {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <Card className="shadow-sm p-4 mb-4 bg-white rounded">
                                <Row className="d-flex align-items-center justify-content-between flex-wrap">
                                    <Col md="auto" className="mb-2">
                                        <InputGroup size="lg">
                                            <InputGroup.Text className="bg-white border-end-0">
                                                <FaIdBadge className="text-secondary" />
                                            </InputGroup.Text>
                                            <Field
                                                type="text"
                                                name="code"
                                                placeholder="Mã NV"
                                                className="form-control border-start-0 form-control-lg"
                                            />
                                        </InputGroup>
                                    </Col>
                                    <Col md="auto" className="mb-2">
                                        <InputGroup size="lg">
                                            <InputGroup.Text className="bg-white border-end-0">
                                                <FaUser className="text-secondary" />
                                            </InputGroup.Text>
                                            <Field
                                                type="text"
                                                name="name"
                                                placeholder="Tên NV"
                                                className="form-control border-start-0 form-control-lg"
                                            />
                                        </InputGroup>
                                    </Col>
                                    <Col md="auto" className="mb-2">
                                        <InputGroup size="lg">
                                            <InputGroup.Text className="bg-white border-end-0">
                                                <FaBriefcase className="text-secondary" />
                                            </InputGroup.Text>
                                            <Field as="select" name="position" className="form-select border-start-0 form-control-lg">
                                                <option value="">Chức vụ</option>
                                                {positions.map((position) => (
                                                    <option key={position.id} value={position.name}>
                                                        {position.name}
                                                    </option>
                                                ))}
                                            </Field>
                                        </InputGroup>
                                    </Col>
                                    <Col md="auto" className="mb-2">
                                        <InputGroup size="lg">
                                            <InputGroup.Text className="bg-white border-end-0">
                                                <FaAt className="text-secondary" />
                                            </InputGroup.Text>
                                            <Field
                                                type="text"
                                                name="email"
                                                placeholder="Email"
                                                className="form-control border-start-0 form-control-lg"
                                            />
                                        </InputGroup>
                                    </Col>
                                    <Col md="auto" className="mb-2">
                                        <Button
                                            size="lg"
                                            type="submit"
                                            style={{ backgroundColor: '#ff6b35', borderColor: '#ff6b35', padding: '10px 20px' }}
                                            className="text-white"
                                        >
                                            <FaSearch className="me-2" /> Tìm kiếm
                                        </Button>
                                    </Col>
                                </Row>
                            </Card>
                        </Form>
                    )}
                </Formik>

                <h4 className="mt-3 mb-4" style={{ color: '#ff6b35', textAlign: 'left', fontSize: '2rem' }}>Quản lý Nhân Viên</h4>

                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="thead-dark nhat">
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
                        {currentEmployees.length > 0 ? (
                            currentEmployees.map((employee) => (
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
                                            variant="outline"
                                            size="sm"
                                            style={{ color: '#ff6b35', borderColor: '#ff6b35', marginRight: '5px' }}
                                            onClick={() => handleModalShow({
                                                ...employee,
                                                positionId: employee.position.id,
                                                role: employee.isAdmin ? "Admin" : "Nhân viên"
                                            })}
                                        >
                                            <FaSync /> Cập nhật
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            style={{ color: '#ff6b35', borderColor: '#ff6b35', marginRight: '5px' }}
                                            onClick={() => handleDeleteModalShow(employee)}
                                        >
                                            <FaTrash /> Xóa
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center">Không tìm thấy nhân viên</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                <div className={styles.paginationCustom}>
                    <div
                        className={`${styles.pageItem} ${currentPage === 1 ? styles.pageItemDisabled : ''}`}
                        onClick={handlePrevClick}
                    >
                        &lt;
                    </div>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <div
                            key={i + 1}
                            className={`${styles.pageItem} ${i + 1 === currentPage ? styles.pageItemActive : ''}`}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </div>
                    ))}
                    <div
                        className={`${styles.pageItem} ${currentPage === totalPages ? styles.pageItemDisabled : ''}`}
                        onClick={handleNextClick}
                    >
                        &gt;
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;