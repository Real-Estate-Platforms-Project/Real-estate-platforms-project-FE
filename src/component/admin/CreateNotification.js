import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import styles from '../../css/ModalCreate.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { storage } from '../../configs/ConfigFirebase';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../redux/FetchUser';
import { format } from 'date-fns';

const validationSchema = Yup.object({
    title: Yup.string().required('Tiêu đề là bắt buộc'),
    images: Yup.array()
        .of(Yup.string().required('Cần chọn một hình ảnh'))
        .min(1, 'Cần chọn ít nhất một hình ảnh')
        .max(3, 'Tối đa 3 hình ảnh'),
    contend: Yup.string().required('Mô tả là bắt buộc'),
    dateStart: Yup.date().required('Ngày bắt đầu là bắt buộc').nullable(),
});

const AddNotificationModal = ({ show, onClose, onAdd }) => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [showLargeImage, setShowLargeImage] = useState(false);
    const [largeImageUrl, setLargeImageUrl] = useState('');
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated && !user) {
            dispatch(fetchUser());
        }
    }, [isAuthenticated, user, dispatch]);

    const handleFileChange = (event, setFieldValue) => {
        const files = Array.from(event.currentTarget.files);
        if (files.length === 0) return;

        const urls = [];
        const updatedImageFiles = [];

        files.forEach(file => {
            urls.push(URL.createObjectURL(file)); // Preview the images
            updatedImageFiles.push(file);
        });

        setSelectedImages(urls);
        setImageFiles(updatedImageFiles);
        setFieldValue("images", updatedImageFiles);
    };

    const handleRemoveImage = (url) => {
        setSelectedImages(prevImages => prevImages.filter(image => image !== url));
        setImageFiles(prevFiles => prevFiles.filter(file => URL.createObjectURL(file) !== url));
    };

    const handleImageClick = (url) => {
        setLargeImageUrl(url);
        setShowLargeImage(true);
    };

    const uploadImages = async (files) => {
        const urls = [];
        for (const file of files) {
            const imageRef = storageRef(storage, `images/${file.name}`);
            try {
                const snapshot = await uploadBytes(imageRef, file);
                const url = await getDownloadURL(snapshot.ref);
                urls.push(url);
            } catch (error) {
                console.error("Error uploading file:", error);
                toast.error("Tải ảnh lên thất bại");
            }
        }
        return urls;
    };

    const handleAdd = async (values) => {
        const localDateTime = values.dateStart ? format(values.dateStart, 'yyyy-MM-dd\'T\'HH:mm:ss') : null;

        const uploadedImageUrls = await uploadImages(imageFiles);

        const newNotification = {
            title: values.title,
            contend: values.contend,
            employee: { id: values.employee },
            images: uploadedImageUrls.map(url => ({ imageUrl: url })),
            dateStart: localDateTime,
        };

        console.log(newNotification);
        onAdd(newNotification);
        resetForm();
        onClose();
    };

    const resetForm = () => {
        setSelectedImages([]);
        setImageFiles([]);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} className={styles.customModalOverlay}>
                <div className={styles.customModalContent}>
                    <Modal.Header closeButton className={styles.customModalHeader}>
                        <Modal.Title className={styles.customModalTitle}>Thêm Mới Thông Báo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            initialValues={{ title: '', images: [], contend: '', employee: user ? user.id : '', dateStart: null }}
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

                                    <Form.Group controlId="formDateStart" className={styles.customFormGroup}>
                                        <Form.Label className={styles.customModalLabel}>Ngày / giờ bắt đầu</Form.Label>
                                        <Field name="dateStart">
                                            {({ field }) => (
                                                <DatePicker
                                                    selected={field.value ? new Date(field.value) : null}
                                                    onChange={(date) => {
                                                        setFieldValue("dateStart", date);
                                                    }}
                                                    showTimeSelect
                                                    dateFormat="Pp"
                                                    placeholderText="Nhập ngày giờ"
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
                                        <Button variant="secondary" onClick={handleClose} className={`${styles.customBtn} btn-secondary`}>
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
