import React, { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const CustomerAddForm = () => {
    const [customer, setCustomer] = useState({
        name: '',
        email: '',
        dob: '',
        gender: '',
        phoneNumber: '',
        address: '',
        idCard: '',
        customerType: 'buyer'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer({
            ...customer,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/customers/add', customer)
            .then(response => {
                toast.success('Khách hàng đã được thêm thành công.', {
                    position: "top-right",
                    autoClose: 3000,
                });
                setCustomer({
                    name: '',
                    email: '',
                    dob: '',
                    gender: '',
                    phoneNumber: '',
                    address: '',
                    idCard: '',
                    customerType: 'buyer',
                });
            })
            .catch(error => {
                console.error('Error adding customer:', error);
                toast.error('Lỗi khi thêm khách hàng. Vui lòng thử lại.', {
                    position: "top-right",
                    autoClose: 3000,
                });
            });
    };

    return (
        <div className="container mt-4">
            <ToastContainer />
            <h2>Thêm Khách Hàng Mới</h2>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Họ tên</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={customer.name}
                                onChange={handleChange}
                                required
                                placeholder="Nhập họ tên"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={customer.email}
                                onChange={handleChange}
                                required
                                placeholder="Nhập email"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="formDob">
                            <Form.Label>Ngày sinh</Form.Label>
                            <Form.Control
                                type="date"
                                name="dob"
                                value={customer.dob}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="formGender">
                            <Form.Label>Giới tính</Form.Label>
                            <Form.Select
                                name="gender"
                                value={customer.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Chọn giới tính</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="formPhoneNumber">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control
                                type="text"
                                name="phoneNumber"
                                value={customer.phoneNumber}
                                onChange={handleChange}
                                required
                                placeholder="Nhập số điện thoại"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="formAddress">
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={customer.address}
                                onChange={handleChange}
                                required
                                placeholder="Nhập địa chỉ"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="formIdCard">
                            <Form.Label>ID Card</Form.Label>
                            <Form.Control
                                type="text"
                                name="idCard"
                                value={customer.idCard}
                                onChange={handleChange}
                                required
                                placeholder="Nhập ID Card"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3" controlId="formCustomerType">
                    <Form.Label>Loại khách hàng</Form.Label>
                    <Form.Select
                        name="customerType"
                        value={customer.customerType}
                        onChange={handleChange}
                        required
                    >
                        <option value="buyer">Người mua</option>
                        <option value="seller">Người bán</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Thêm Khách Hàng
                </Button>
            </Form>
        </div>
    );
};

export default CustomerAddForm;