import React, { useState } from 'react';
import { Form, Button, Col, Row, Card, Container, FloatingLabel } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { addCustomer, checkEmailExists } from '../../services/CustomerService';
import '../../css/CustomerAddForm.css';

const validationSchema = yup.object().shape({
    name: yup.string().min(2, 'Tên phải có ít nhất 2 ký tự').max(155, 'Tên không được vượt quá 155 ký tự').required('Tên không được để trống'),
    email: yup.string().email('Email không đúng định dạng').matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Email phải có đuôi @gmail.com').max(100, 'Email không được vượt quá 100 ký tự').required('Email không được để trống'),
    dob: yup.date().max(new Date(), 'Ngày sinh phải là một ngày trong quá khứ').required('Ngày sinh không được để trống'),
    gender: yup.string().max(10, 'Giới tính không được vượt quá 10 ký tự').required('Giới tính không được để trống'),
    phoneNumber: yup.string().matches(/^[0-9]{10}$/, 'Số điện thoại phải có đúng 10 chữ số').required('Số điện thoại không được để trống'),
    address: yup.string().max(255, 'Địa chỉ không được vượt quá 255 ký tự').required('Địa chỉ không được để trống'),
    idCard: yup.string().matches(/^[0-9]{9,12}$/, 'ID card phải có từ 9 đến 12 chữ số').required('ID card không được để trống'),
    customerType: yup.string().matches(/^(buyer|seller)$/, 'Loại khách hàng phải là Người mua hoặc Người bán').required('Loại khách hàng không được để trống'),
});

const CustomerAddForm = () => {
    const [emailExists, setEmailExists] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            dob: '',
            gender: '',
            phoneNumber: '',
            address: '',
            idCard: '',
            customerType: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                if (!emailExists) {
                    await addCustomer(values);
                    resetForm();
                    setEmailExists(false);
                    toast.success('Email đăng ký thành công đã được gửi về mail người dùng!', {
                        position: "top-right",
                        autoClose: 3000,
                    });
                } else {
                    toast.error('Email đã tồn tại. Vui lòng sử dụng email khác.', {
                        position: "top-right",
                        autoClose: 3000,
                    });
                }
            } catch (error) {
                console.error('Error adding customer:', error);
                toast.error('Lỗi khi thêm khách hàng. Vui lòng thử lại.', {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        },
    });

    return (
        <Container className="my-5">
            <ToastContainer />
            <Card className="shadow-sm border-0 custom-card">
                <Card.Header className="text-white text-center custom-card-header">
                    <h4 className="mb-0">Thêm Khách Hàng Mới</h4>
                </Card.Header>
                <Card.Body className="p-5">
                    <Form onSubmit={formik.handleSubmit}>
                        <Row className="g-4">
                            <Col md={6}>
                                <FloatingLabel controlId="formName" label="Họ tên">
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={formik.touched.name && formik.errors.name}
                                        placeholder="Họ tên"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.name}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                            <Col md={6}>
                                <FloatingLabel controlId="formEmail" label="Email">
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={async (e) => {
                                            formik.handleBlur(e);
                                            const exists = await checkEmailExists(e.target.value);
                                            setEmailExists(exists);
                                        }}
                                        isInvalid={formik.touched.email && (formik.errors.email || emailExists)}
                                        placeholder="Email"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.email || (emailExists && 'Email đã tồn tại')}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="g-4 mt-3">
                            <Col md={4}>
                                <FloatingLabel controlId="formDob" label="Ngày sinh">
                                    <Form.Control
                                        type="date"
                                        name="dob"
                                        value={formik.values.dob}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={formik.touched.dob && formik.errors.dob}
                                        placeholder="Ngày sinh"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.dob}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                            <Col md={4}>
                                <FloatingLabel controlId="formGender" label="Giới tính">
                                    <Form.Select
                                        name="gender"
                                        value={formik.values.gender}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={formik.touched.gender && formik.errors.gender}
                                    >
                                        <option value="">Chọn giới tính</option>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.gender}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                            <Col md={4}>
                                <FloatingLabel controlId="formPhoneNumber" label="Số điện thoại">
                                    <Form.Control
                                        type="text"
                                        name="phoneNumber"
                                        value={formik.values.phoneNumber}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                        placeholder="Số điện thoại"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.phoneNumber}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="g-4 mt-3">
                            <Col md={6}>
                                <FloatingLabel controlId="formAddress" label="Địa chỉ">
                                    <Form.Control
                                        type="text"
                                        name="address"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={formik.touched.address && formik.errors.address}
                                        placeholder="Địa chỉ"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.address}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                            <Col md={6}>
                                <FloatingLabel controlId="formIdCard" label="ID Card">
                                    <Form.Control
                                        type="text"
                                        name="idCard"
                                        value={formik.values.idCard}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={formik.touched.idCard && formik.errors.idCard}
                                        placeholder="ID Card"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.idCard}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <FloatingLabel controlId="formCustomerType" label="Loại khách hàng" className="mt-3">
                            <Form.Select
                                name="customerType"
                                value={formik.values.customerType}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.customerType && formik.errors.customerType}
                            >
                                <option value="">Chọn loại khách hàng</option>
                                <option value="buyer">Người mua</option>
                                <option value="seller">Người bán</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.customerType}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        <div className="d-flex justify-content-end mt-4">
                            <Button variant="primary" type="submit" className="custom-submit-btn">
                                Thêm Khách Hàng
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CustomerAddForm;