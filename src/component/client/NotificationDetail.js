import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as notificationService from '../../services/NotificationService';
import styles from '../../css/NotificationDetail.module.css';
import { format } from "date-fns";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function NotificationDetail() {
    const [detail, setDetail] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showLargeImageModal, setShowLargeImageModal] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getAllNotificationDetail(id);
        }
    }, [id]);

    const getAllNotificationDetail = async (id) => {
        let res = await notificationService.getNotificationDetail(id);
        setDetail(res);
        if (res.images.length > 0) {
            setSelectedImage(res.images[0].imageUrl);
        }
    };

    const handleThumbnailClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const handleImageClick = () => {
        setShowLargeImageModal(true);
    };

    const handleCloseLargeImageModal = () => {
        setShowLargeImageModal(false);
    };

    if (!detail) {
        return <div>Loading...</div>;
    }

    const formatDate = (date) => {
        return format(new Date(date), 'dd/MM/yyyy HH:mm');
    };

    return (
        <div className={styles.notificationDetail}>
            <div className={styles.largeImageContainer}>
                <img
                    src={selectedImage}
                    alt={detail.title}
                    className={styles.largeImage}
                    onClick={handleImageClick}
                />
            </div>
            <div className={styles.thumbnailContainer}>
                {detail.images.map((image, index) => (
                    <img
                        key={index}
                        src={image.imageUrl}
                        alt={`Thumbnail ${index}`}
                        className={styles.thumbnail}
                        onClick={() => handleThumbnailClick(image.imageUrl)}
                    />
                ))}
            </div>
            <h1>{detail.title}</h1>
            <h3>Thời gian diễn ra : <span>{detail.dateStart ? formatDate(detail.dateStart) : 'N/A'}</span></h3>
            <p><span>{detail.formattedCreateNotification}</span> - Người đăng : {detail.employee.name}</p>
            <p>{detail.contend}</p>

            <Modal show={showLargeImageModal} onHide={handleCloseLargeImageModal} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Ảnh Phóng To</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img
                        src={selectedImage}
                        alt="Large"
                        className={styles.largeImageInModal}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseLargeImageModal}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default NotificationDetail;