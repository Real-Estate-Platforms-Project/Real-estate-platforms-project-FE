import React, {useEffect, useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import * as Yup from 'yup';
import {Formik, Field, Form as FormikForm, ErrorMessage} from 'formik';
import styles from '../../css/ModalCreate.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {storage} from '../../configs/ConfigFirebase';
import {getDownloadURL, ref as storageRef, uploadBytes} from 'firebase/storage';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUser} from '../../redux/FetchUser';

const validationSchema = Yup.object({
    title: Yup.string().required('Tiêu đề là bắt buộc'),
    images: Yup.string().required('Cần chọn một hình ảnh'),
    contend: Yup.string().required('Mô tả là bắt buộc'),
    employee: Yup.number().required('Nhân viên là bắt buộc')
});

const AddNotificationModal = ({show, onClose, onAdd}) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

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
            employee: {id: values.employee}
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
        <Modal show={show} onHide={onClose} className={styles.customModalOverlay}>
            <div className={styles.customModalContent}>
                <Modal.Header closeButton className={styles.customModalHeader}>
                    <Modal.Title className={styles.customModalTitle}>Thêm Mới Thông Báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{title: '', images: '', contend: '', employee: user ? user.id : ''}}
                        validationSchema={validationSchema}
                        onSubmit={handleAdd}
                    >
                        {({setFieldValue}) => (
                            <FormikForm className={styles.customModalForm}>
                                <Form.Group controlId="formTitle" className={styles.customFormGroup}>
                                    <Form.Label className={styles.customModalLabel}>Tiêu đề</Form.Label>
                                    <Field
                                        type="text"
                                        name="title"
                                        placeholder="Nhập tiêu đề"
                                        className={styles.customFormControl}
                                    />
                                    <ErrorMessage name="title" component="div" className="text-danger"/>
                                </Form.Group>

                                <Form.Group controlId="formImages" className={styles.customFormGroup}>
                                    <Form.Label className={styles.customModalLabel}>Hình ảnh</Form.Label>
                                    <div className={styles.customFileInputContainer}>
                                        <input
                                            type="file"
                                            id="fileInput"
                                            onChange={(event) => handleFileChange(event, setFieldValue)}
                                            className={styles.customFileInput}
                                        />
                                        <label htmlFor="fileInput" className={styles.customFileInputLabel}>
                                            <span className={styles.customFileInputText}>
                                                {selectedImage ? 'Thay đổi hình ảnh' : 'Chọn hình ảnh'}
                                            </span>
                                        </label>
                                    </div>

                                    <ErrorMessage name="images" component="div" className="text-danger"/>
                                    {selectedImage && (
                                        <div className={styles.customImagePreviewWrapper}>
                                            <img
                                                src={selectedImage}
                                                alt="Preview"
                                                className={styles.customImagePreview}
                                            />
                                            <Button
                                                variant="danger"
                                                onClick={handleRemoveImage}
                                                className={styles.customRemoveImageButton}
                                            >
                                                X
                                            </Button>
                                        </div>
                                    )}
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
                                    <ErrorMessage name="contend" component="div" className="text-danger"/>
                                </Form.Group>

                                <Modal.Footer className={styles.customModalFooter}>
                                    <Button variant="secondary" onClick={onClose}
                                            className={`${styles.customBtn} btn-secondary`}>
                                        Hủy
                                    </Button>
                                    <Button type="submit" variant="primary" className={styles.customConfirmButton}>
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
