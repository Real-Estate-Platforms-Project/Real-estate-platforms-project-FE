import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import '../../css/ModalCreate.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const validationSchema = Yup.object({
    title: Yup.string().required('Tiêu đề là bắt buộc'),
    image: Yup.string().required('URL hình ảnh là bắt buộc'),
    contend: Yup.string().required('Mô tả là bắt buộc'),
    employee: Yup.number().required('Nhân viên là bắt buộc')
});

const AddNotificationModal = ({ show, onClose, onAdd }) => {

    const handleAdd = (values) => {
        const newNotification = {
            title: values.title,
            image: values.image,
            contend: values.contend,
            employee: { id: values.employee }
        };
        onAdd(newNotification);
        onClose();
    };

    return (
        <Modal show={show} onHide={onClose} className="modal-overlay">
            <div className="modal-content">
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">Thêm Mới Thông Báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{ title: '', image: '', contend: '', employee: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleAdd}
                    >
                        <FormikForm className="modal-form">
                            <Form.Group controlId="formTitle">
                                <Form.Label className="modal-label">Tiêu đề</Form.Label>
                                <Field
                                    type="text"
                                    name="title"
                                    placeholder="Nhập tiêu đề"
                                    className="form-control"
                                />
                                <ErrorMessage name="title" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group controlId="formImage">
                                <Form.Label className="modal-label">URL Hình ảnh</Form.Label>
                                <Field
                                    type="text"
                                    name="image"
                                    placeholder="Nhập URL hình ảnh"
                                    className="form-control"
                                />
                                <ErrorMessage name="image" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group controlId="formContend">
                                <Form.Label className="modal-label">Mô tả</Form.Label>
                                <Field
                                    as="textarea"
                                    name="contend"
                                    rows={3}
                                    placeholder="Nhập mô tả"
                                    className="form-control"
                                />
                                <ErrorMessage name="contend" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group controlId="formEmployee">
                                <Form.Label className="modal-label">Nhân viên</Form.Label>
                                <Field
                                    type="number"
                                    name="employee"
                                    placeholder="Nhập ID nhân viên"
                                    className="form-control"
                                />
                                <ErrorMessage name="employee" component="div" className="text-danger" />
                            </Form.Group>
                            <Modal.Footer className="modal-footer">
                                <Button variant="secondary" onClick={onClose} className="btn btn-secondary">
                                    Hủy
                                </Button>
                                <Button type="submit" variant="primary" className="confirm-button">
                                    Thêm
                                </Button>
                            </Modal.Footer>
                        </FormikForm>
                    </Formik>
                </Modal.Body>
            </div>
        </Modal>
    );
};

export default AddNotificationModal;
