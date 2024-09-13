import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import '../../css/ModalCreate.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { storage } from '../../configs/ConfigFirebase';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../redux/FetchUser';

const validationSchema = Yup.object({
    title: Yup.string().required('Tiêu đề là bắt buộc'),
    images: Yup.string().required('Cần chọn một hình ảnh'),
    contend: Yup.string().required('Mô tả là bắt buộc'),
    employee: Yup.number().required('Nhân viên là bắt buộc')
});

const AddNotificationModal = ({ show, onClose, onAdd }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const user = useSelector(state => state.information.user);
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.information.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated && !user) {
            dispatch(fetchUser());
        }
    }, [isAuthenticated, user, dispatch]);

    const handleAdd = (values) => {
        const newNotification = {
            title: values.title,
            image: values.images,
            contend: values.contend,
            employee: { id: values.employee }
        };
        onAdd(newNotification);
        onClose();
    };

    const handleFileChange = (event, setFieldValue) => {
        const file = event.currentTarget.files[0];
        if (!file) return;

        setImageFile(file);

        const imageRef = storageRef(storage, `images/${file.name}`);
        uploadBytes(imageRef, file)
            .then(snapshot => getDownloadURL(snapshot.ref))
            .then(url => {
                setSelectedImage(url);
                setFieldValue("images", url);
                toast.success("Tải ảnh lên thành công");
            })
            .catch((error) => {
                console.error("Error uploading file:", error);
                toast.error("Tải ảnh lên thất bại");
            });
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
        setImageFile(null);
    };

    return (
        <Modal show={show} onHide={onClose} className="custom-modal-overlay">
            <div className="custom-modal-content">
                <Modal.Header closeButton className="custom-modal-header">
                    <Modal.Title className="custom-modal-title">Thêm Mới Thông Báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{ title: '', images: '', contend: '', employee: user ? user.id : '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleAdd}
                    >
                        {({ setFieldValue }) => (
                            <FormikForm className="custom-modal-form">
                                <Form.Group controlId="formTitle" className="custom-form-group">
                                    <Form.Label className="custom-modal-label">Tiêu đề</Form.Label>
                                    <Field
                                        type="text"
                                        name="title"
                                        placeholder="Nhập tiêu đề"
                                        className="custom-form-control"
                                    />
                                    <ErrorMessage name="title" component="div" className="text-danger" />
                                </Form.Group>

                                <Form.Group controlId="formImages" className="custom-form-group">
                                    <Form.Label className="custom-modal-label">Hình ảnh</Form.Label>
                                    <input
                                        type="file"
                                        onChange={(event) => handleFileChange(event, setFieldValue)}
                                        className="custom-form-control"
                                    />
                                    <ErrorMessage name="images" component="div" className="text-danger" />
                                    {selectedImage && (
                                        <div className="custom-image-preview-wrapper">
                                            <img
                                                src={selectedImage}
                                                alt="Preview"
                                                className="custom-image-preview"
                                            />
                                            <Button
                                                variant="danger"
                                                onClick={handleRemoveImage}
                                                className="custom-remove-image-button"
                                            >
                                                Xóa
                                            </Button>
                                        </div>
                                    )}
                                </Form.Group>

                                <Form.Group controlId="formContend" className="custom-form-group">
                                    <Form.Label className="custom-modal-label">Mô tả</Form.Label>
                                    <Field
                                        as="textarea"
                                        name="contend"
                                        rows={3}
                                        placeholder="Nhập mô tả"
                                        className="custom-form-control"
                                    />
                                    <ErrorMessage name="contend" component="div" className="text-danger" />
                                </Form.Group>

                                <Modal.Footer className="custom-modal-footer">
                                    <Button variant="secondary" onClick={onClose} className="custom-btn btn-secondary">
                                        Hủy
                                    </Button>
                                    <Button type="submit" variant="primary" className="custom-confirm-button">
                                        Thêm
                                    </Button>
                                </Modal.Footer>
                            </FormikForm>
                        )}
                    </Formik>
                </Modal.Body>
            </div>
        </Modal>
    );
};

export default AddNotificationModal;
