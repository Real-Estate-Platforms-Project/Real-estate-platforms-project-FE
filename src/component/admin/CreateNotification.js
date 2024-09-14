import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import styles from '../../css/ModalCreate.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { storage } from '../../configs/ConfigFirebase';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../redux/FetchUser';

const validationSchema = Yup.object({
    title: Yup.string().required('Tiêu đề là bắt buộc'),
    images: Yup.array().of(Yup.string().required('Cần chọn một hình ảnh')).min(1, 'Cần chọn ít nhất một hình ảnh'),
    contend: Yup.string().required('Mô tả là bắt buộc'),
});

const AddNotificationModal = ({ show, onClose, onAdd }) => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [showLargeImage, setShowLargeImage] = useState(false);
    const [largeImageUrl, setLargeImageUrl] = useState('');
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
            contend: values.contend,
            employee: { id: values.employee },
            images: selectedImages.map(url => ({ imageUrl: url }))
        };
        onAdd(newNotification);
        onClose();
    };

    const handleFileChange = async (event, setFieldValue) => {
        const files = Array.from(event.currentTarget.files);
        if (files.length === 0) return;

        const urls = [];
        const updatedImageFiles = [];

        for (const file of files) {
            const imageRef = storageRef(storage, `images/${file.name}`);
            try {
                const snapshot = await uploadBytes(imageRef, file);
                const url = await getDownloadURL(snapshot.ref);
                urls.push(url);
                updatedImageFiles.push(file);
            } catch (error) {
                console.error("Error uploading file:", error);
                toast.error("Tải ảnh lên thất bại");
            }
        }

        setSelectedImages(prevImages => [...prevImages, ...urls]);
        setImageFiles(prevFiles => [...prevFiles, ...updatedImageFiles]);
        setFieldValue("images", [...selectedImages, ...urls]);
        toast.success("Tải ảnh lên thành công");
    };

    const handleRemoveImage = (url) => {
        setSelectedImages(prevImages => prevImages.filter(image => image !== url));
        setImageFiles(prevFiles => prevFiles.filter(file => file.name !== url));
    };

    const handleImageClick = (url) => {
        setLargeImageUrl(url);
        setShowLargeImage(true);
    };

    return (
        <>
            <Modal show={show} onHide={onClose} className={styles.customModalOverlay}>
                <div className={styles.customModalContent}>
                    <Modal.Header closeButton className={styles.customModalHeader}>
                        <Modal.Title className={styles.customModalTitle}>Thêm Mới Thông Báo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            initialValues={{ title: '', images: [], contend: '', employee: user ? user.id : '' }}
                            validationSchema={validationSchema}
                            onSubmit={handleAdd}
                        >
                            {({ setFieldValue }) => (
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

                                    <Form.Group controlId="formImages" className={styles.customFormGroup}>
                                        <Form.Label className={styles.customModalLabel}>Hình ảnh</Form.Label>
                                        <div className={styles.customFileInputContainer}>
                                            <input
                                                type="file"
                                                id="fileInput"
                                                multiple
                                                onChange={(event) => handleFileChange(event, setFieldValue)}
                                                className={styles.customFileInput}
                                            />
                                            <label htmlFor="fileInput" className={styles.customFileInputLabel}>
                                                <span className={styles.customFileInputText}>
                                                    {selectedImages.length > 0 ? 'Thay đổi hình ảnh' : 'Chọn hình ảnh'}
                                                </span>
                                            </label>
                                        </div>

                                        <ErrorMessage name="images" component="div" className="text-danger" />
                                        {selectedImages.length > 0 && (
                                            <div className={styles.customImagePreviewWrapper}>
                                                {selectedImages.map((image, index) => (
                                                    <div key={index} className={styles.customImageWrapper}>
                                                        <img
                                                            src={image}
                                                            alt={`Preview ${index}`}
                                                            className={styles.customImagePreview}
                                                            onClick={() => handleImageClick(image)}
                                                        />
                                                        <Button
                                                            variant="danger"
                                                            onClick={() => handleRemoveImage(image)}
                                                            className={styles.customRemoveImageButton}
                                                        >
                                                            X
                                                        </Button>
                                                    </div>
                                                ))}
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
                                        <ErrorMessage name="contend" component="div" className="text-danger" />
                                    </Form.Group>

                                    <Modal.Footer className={styles.customModalFooter}>
                                        <Button variant="secondary" onClick={onClose} className={`${styles.customBtn} btn-secondary`}>
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

            <Modal show={showLargeImage} onHide={() => setShowLargeImage(false)} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Xem Ảnh</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img
                        src={largeImageUrl}
                        alt="Large Preview"
                        className={styles.largeImage}
                        style={{ width: '500px', height: '500px' }}
                    />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AddNotificationModal;
