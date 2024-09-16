import React, { useState } from 'react';
import { Form, Button, Col, Row, Card, Container, FloatingLabel } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { addCustomer, checkEmailExists } from '../../services/CustomerService';
import { storage } from '../../configs/ConfigFirebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import styles from '../../css/CustomerAddForm.module.css';

const validationSchema = yup.object().shape({
    name: yup.string()
        .min(2, 'Tên phải có ít nhất 2 ký tự')
        .max(155, 'Tên không được vượt quá 155 ký tự')
        .required('Tên không được để trống'),
    email: yup.string()
        .email('Email không đúng định dạng')
        .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Email phải có đuôi @gmail.com')
        .max(100, 'Email không được vượt quá 100 ký tự')
        .required('Email không được để trống'),
    dob: yup.date()
        .max(new Date(), 'Ngày sinh phải là một ngày trong quá khứ')
        .required('Ngày sinh không được để trống'),
    gender: yup.string()
        .max(10, 'Giới tính không được vượt quá 10 ký tự')
        .required('Giới tính không được để trống'),
    phoneNumber: yup.string()
        .matches(/^[0-9]{10}$/, 'Số điện thoại phải có đúng 10 chữ số')
        .required('Số điện thoại không được để trống'),
    address: yup.string()
        .max(255, 'Địa chỉ không được vượt quá 255 ký tự')
        .required('Địa chỉ không được để trống'),
    idCard: yup.string()
        .matches(/^[0-9]{9,12}$/, 'ID card phải có từ 9 đến 12 chữ số')
        .required('ID card không được để trống'),
    customerType: yup.string()
        .matches(/^(buyer|seller)$/, 'Loại khách hàng phải là Người mua hoặc Người bán')
        .required('Loại khách hàng không được để trống'),
    imageUrl: yup.string().nullable() // Đổi thành string để lưu URL
});

const CustomerAddForm = () => {
    const [emailExists, setEmailExists] = useState(false);
    const [imagePreview, setImagePreview] = useState('');

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
            imageUrl: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                if (!emailExists) {
                    await addCustomer(values); // Gửi đối tượng JSON trực tiếp
                    resetForm();
                    setImagePreview(null);
                    setEmailExists(false);
                    toast.success('Thêm khách hàng thành công!', {
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
                console.error('Error adding customer:', error.response ? error.response.data : error.message);
                toast.error(`Lỗi khi thêm khách hàng: ${error.response ? error.response.data.message : error.message}`, {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        },
    });

    const handleImageChange = async (event) => {
        const file = event.currentTarget.files[0];
        if (!file) return;

        const imageRef = storageRef(storage, `images/${file.name}`);

        try {
            const snapshot = await uploadBytes(imageRef, file);
            const url = await getDownloadURL(snapshot.ref);
            console.log(url);
            setImagePreview(url);
            formik.setFieldValue("imageUrl", url);
            toast.success("Tải ảnh lên thành công", {
                position: "top-right",
                autoClose: 3000,
            });
        } catch (error) {
            console.error("Error uploading file:", error);
            toast.error("Tải ảnh lên thất bại", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    return (
        <Container className={`my-5 ${styles.customerAddForm}`}>
            <ToastContainer />
            <Card className={`shadow-lg border-0 ${styles.customCard}`}>
                <Card.Header className={`text-center ${styles.customCardHeader}`}>
                    <h4 className="mb-0" style={{ color: '#ff6b35' }}>✨ Thêm Khách Hàng Mới ✨</h4>
                </Card.Header>
                <Card.Body className="p-5">
                    <Form onSubmit={formik.handleSubmit}>
                        <Row className="g-4 mb-5 justify-content-between">
                            <Col md={5}>
                                <FloatingLabel controlId="formName" label="Họ tên" className={styles.formFloating}>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={formik.touched.name && formik.errors.name}
                                        placeholder="Họ tên"
                                    />
                                    <Form.Control.Feedback type="invalid" className={styles.feedback}>
                                        {formik.errors.name}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                            <Col md={5}>
                                <FloatingLabel controlId="formEmail" label="Email" className={styles.formFloating}>
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
                                    <Form.Control.Feedback type="invalid" className={styles.feedback}>
                                        {formik.errors.email || (emailExists && 'Email đã tồn tại')}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="g-4 mb-5 justify-content-between">
                            <Col md={5}>
                                <FloatingLabel controlId="formDob" label="Ngày sinh" className={styles.formFloating}>
                                    <Form.Control
                                        type="date"
                                        name="dob"
                                        value={formik.values.dob}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={formik.touched.dob && formik.errors.dob}
                                        placeholder="Ngày sinh"
                                    />
                                    <Form.Control.Feedback type="invalid" className={styles.feedback}>
                                        {formik.errors.dob}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                            <Col md={5}>
                                <FloatingLabel controlId="formGender" label="Giới tính" className={styles.formFloating}>
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
                                    <Form.Control.Feedback type="invalid" className={styles.feedback}>
                                        {formik.errors.gender}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="g-4 mb-5 justify-content-between">
                            <Col md={5}>
                                <FloatingLabel controlId="formPhoneNumber" label="Số điện thoại" className={styles.formFloating}>
                                    <Form.Control
                                        type="text"
                                        name="phoneNumber"
                                        value={formik.values.phoneNumber}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                        placeholder="Số điện thoại"
                                    />
                                    <Form.Control.Feedback type="invalid" className={styles.feedback}>
                                        {formik.errors.phoneNumber}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                            <Col md={5}>
                                <FloatingLabel controlId="formAddress" label="Địa chỉ" className={styles.formFloating}>
                                    <Form.Control
                                        type="text"
                                        name="address"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={formik.touched.address && formik.errors.address}
                                        placeholder="Địa chỉ"
                                    />
                                    <Form.Control.Feedback type="invalid" className={styles.feedback}>
                                        {formik.errors.address}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="g-4 mb-5 justify-content-between">
                            <Col md={5}>
                                <FloatingLabel controlId="formIdCard" label="ID Card" className={styles.formFloating}>
                                    <Form.Control
                                        type="text"
                                        name="idCard"
                                        value={formik.values.idCard}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={formik.touched.idCard && formik.errors.idCard}
                                        placeholder="ID Card"
                                    />
                                    <Form.Control.Feedback type="invalid" className={styles.feedback}>
                                        {formik.errors.idCard}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                            <Col md={5}>
                                <FloatingLabel controlId="formCustomerType" label="Loại khách hàng" className={styles.formFloating}>
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
                                    <Form.Control.Feedback type="invalid" className={styles.feedback}>
                                        {formik.errors.customerType}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="g-4 mb-5 justify-content-between">
                            <Col md={5}>
                                <FloatingLabel controlId="formImage" label="Ảnh đại diện" className={styles.formFloating}>
                                    <Form.Control
                                        type="file"
                                        name="imageUrl"
                                        onChange={handleImageChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={formik.touched.imageUrl && formik.errors.imageUrl}
                                    />
                                    <Form.Control.Feedback type="invalid" className={styles.feedback}>
                                        {formik.errors.imageUrl}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                            {imagePreview && (
                                <Col md={5} className="d-flex align-items-center justify-content-center">
                                    <img src={imagePreview} alt="Preview" style={{ maxHeight: '200px', maxWidth: '100%' }} />
                                </Col>
                            )}
                        </Row>
                        <div className="d-flex justify-content-end mt-4">
                            <Button variant="primary" type="submit" className={styles.customSubmitBtn}>
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