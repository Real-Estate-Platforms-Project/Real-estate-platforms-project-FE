import React, { useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import '../../css/ModalCreate.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const validationSchema = Yup.object({
    title: Yup.string().required('Tiêu đề là bắt buộc'),
    image: Yup.string().required('URL hình ảnh là bắt buộc'),
    contend: Yup.string().required('Mô tả là bắt buộc'),
});

const EditNotificationModal = ({ show, onClose, onUpdate, notification }) => {

    const initialValues = {
        title: notification?.title || '',
        image: notification?.image || '',
        contend: notification?.contend || '',
        createAt: notification?.createAt || '',
        employee: notification?.employee || ''
    };

    const handleUpdate = (values) => {
        const updatedNotification = {
            id: notification.id,
            title: values.title,
            image: values.image,
            contend: values.contend,
            createAt: notification.createAt,
            employee: notification.employee
        };
        onUpdate(updatedNotification);
        onClose();
    };

    return (
        <Modal show={show} onHide={onClose} className="modal-overlay">
            <div className="modal-content">
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">Chỉnh Sửa Thông Báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleUpdate}
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
                            <Modal.Footer className="modal-footer">
                                <Button variant="secondary" onClick={onClose} className="btn btn-secondary">
                                    Hủy
                                </Button>
                                <Button type="submit" variant="primary" className="confirm-button">
                                    Cập Nhật
                                </Button>
                            </Modal.Footer>
                        </FormikForm>
                    </Formik>
                </Modal.Body>
            </div>
        </Modal>
    );
};

export default EditNotificationModal;
