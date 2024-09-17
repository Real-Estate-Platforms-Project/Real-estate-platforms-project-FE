import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import styles from '../../css/ModalCreate.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import { storage } from '../../configs/ConfigFirebase';
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import {format} from "date-fns";

const validationSchema = Yup.object({
    title: Yup.string().required('Tiêu đề là bắt buộc'),
    images: Yup.array().of(Yup.string().required('Cần chọn một hình ảnh'))
        .min(1, 'Cần chọn ít nhất một hình ảnh')
        .max(3,'Tối đa 3 hình ảnh'),
    contend: Yup.string().required('Mô tả là bắt buộc'),
    dateStart: Yup.date().required('Ngày bắt đầu là bắt buộc').nullable(),
});

const EditNotificationModal = ({ show, onClose, onUpdate, notification }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);

    const initialValues = {
        title: notification?.title || '',
        images: notification?.images.map(item => item.imageUrl.replace(/\"/g, '')) || [],
        contend: notification?.contend || '',
        createAt: notification?.createAt || '',
        employee: notification?.employee || '',
        dateStart: notification?.dateStart || ''
    };

    const handleUpdate = (values) => {

        const localDateTime = values.dateStart ? format(values.dateStart, 'yyyy-MM-dd\'T\'HH:mm:ss') : null;

        const updatedNotification = {
            id: notification.id,
            title: values.title,
            images: values.images.map(url => ({ imageUrl: url })),
            contend: values.contend,
            createAt: notification.createAt,
            employee: notification.employee,
            dateStart: localDateTime
        };
        onUpdate(updatedNotification);
        onClose();
    };

    const handleFileChange = async (event, setFieldValue, images) => {
        const files = Array.from(event.currentTarget.files);
        if (files.length === 0) return;

        const newUrls = [];

        for (const file of files) {
            const imageRef = storageRef(storage, `images/${file.name}`);
            try {
                const snapshot = await uploadBytes(imageRef, file);
                let url = await getDownloadURL(snapshot.ref);
                url = url.replace(/\"/g, '');
                newUrls.push(url);
            } catch (error) {
                console.error("Error uploading file:", error);
                toast.error("Tải ảnh lên thất bại");
            }
        }

        // Combine old and new images, ensure no duplicates
        const allImages = [...new Set([...images, ...newUrls])];
        setFieldValue("images", allImages);
        toast.success("Tải ảnh lên thành công");
    };

    const handleRemoveImage = (setFieldValue, images, index) => {
        setFieldValue('images', images.filter((_, i) => i !== index));
    };

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        setShowImageModal(true);
    };

    return (
        <>
            <Modal show={show} onHide={onClose} className={styles.customModalOverlay}>
                <div className={styles.customModalContent}>
                    <Modal.Header closeButton>
                        <Modal.Title className={styles.customModalTitle}>Chỉnh Sửa Thông Báo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleUpdate}
                        >
                            {({ setFieldValue, values }) => (
                                <FormikForm className={styles.customModalForm}>
                                    <Form.Group controlId="formTitle" className={styles.customFormGroup}>
                                        <Form.Label className={styles.customModalLabel}>Tiêu đề</Form.Label>
                                        <Field
                                            type="text"
                                            name="title"
                                            placeholder="Nhập tiêu đề"
                                            className={styles.customFormControl}
                                        />
                                        <ErrorMessage name="title" component="div" className="text-danger" />
                                    </Form.Group>
                                    <Form.Group controlId="formImage" className={styles.customFormGroup}>
                                        <Form.Label className={styles.customModalLabel}>Hình ảnh</Form.Label>
                                        <div>
                                            {values.images.length > 0 ? (
                                                <div className={styles.customImagePreviewContainer}>
                                                    {values.images.map((image, index) => (
                                                        <div key={index} className={styles.customImageWrapper}>
                                                            <img
                                                                src={image}
                                                                alt={`Image ${index}`}
                                                                className={styles.customImagePreview}
                                                                onClick={() => handleImageClick(image)}
                                                            />
                                                            <Button
                                                                variant="danger"
                                                                className={styles.customRemoveImageButton}
                                                                onClick={() => handleRemoveImage(setFieldValue, values.images, index)}
                                                            >
                                                                X
                                                            </Button>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p>Chưa có hình ảnh</p>
                                            )}
                                            <input
                                                type="file"
                                                id="fileInput"
                                                multiple
                                                onChange={(event) => handleFileChange(event, setFieldValue, values.images)}
                                                className={styles.customFileInput}
                                            />
                                            <label htmlFor="fileInput" className={styles.customFileInputLabel}>
                                                <span className={styles.customFileInputText}>
                                                    {values.images.length > 0 ? 'Thay đổi hình ảnh' : 'Chọn hình ảnh'}
                                                </span>
                                            </label>
                                        </div>
                                        <ErrorMessage name="images" component="div" className="text-danger" />
                                    </Form.Group>

                                    <Form.Group controlId="formDateStart" className={styles.customFormGroup}>
                                        <Form.Label className={styles.customModalLabel}>Ngày / giờ bắt đầu</Form.Label>
                                        <Field name="dateStart">
                                            {({ field, form }) => (
                                                <DatePicker
                                                    selected={field.value ? new Date(field.value) : null}
                                                    onChange={(date) => {
                                                        setFieldValue("dateStart", date);
                                                    }}
                                                    showTimeSelect
                                                    dateFormat="Pp"
                                                    className={styles.customFormControl}
                                                />
                                            )}
                                        </Field>
                                        <ErrorMessage name="dateStart" component="div" className="text-danger" />
                                    </Form.Group>
                                    <Form.Group controlId="formContend" className={styles.customFormGroup}>
                                        <Form.Label className={styles.customModalLabel}>Mô tả</Form.Label>
                                        <Field
                                            as="textarea"
                                            name="contend"
                                            rows={3}
                                            placeholder="Nhập mô tả"
                                            className={styles.customFormControl}
                                        />
                                        <ErrorMessage name="contend" component="div" className="text-danger" />
                                    </Form.Group>
                                    <Modal.Footer className={styles.customModalFooter}>
                                        <Button variant="secondary" onClick={onClose} className={styles.customBtn}>
                                            Hủy
                                        </Button>
                                        <Button type="submit" variant="primary" className={styles.customConfirmButton}>
                                            Cập Nhật
                                        </Button>
                                    </Modal.Footer>
                                </FormikForm>
                            )}
                        </Formik>
                    </Modal.Body>
                </div>
            </Modal>

            <Modal show={showImageModal} onHide={() => setShowImageModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Xem Ảnh</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedImage && (
                        <img
                            src={selectedImage}
                            alt="Selected"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowImageModal(false)}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditNotificationModal;
