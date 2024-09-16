import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as notificationService from '../../services/NotificationService';
import styles from '../../css/NotificationDetail.module.css';

function NotificationDetail() {
    const [detail, setDetail] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getAllNotificationDetail(id);
        }
    }, [id]);

    const getAllNotificationDetail = async (id) => {
        let res = await notificationService.getNotificationDetail(id);
        setDetail(res);
        // Set the first image as the selected image by default
        if (res.images.length > 0) {
            setSelectedImage(res.images[0].imageUrl);
        }
    };

    const handleThumbnailClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    if (!detail) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.notificationDetail}>
            <div className={styles.largeImageContainer}>
                <img
                    src={selectedImage}
                    alt={detail.title}
                    className={styles.largeImage}
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
            <p>{detail.formattedCreateNotification}</p>
            <p>{detail.employee.name}</p>
            <p>{detail.contend}</p>
        </div>
    );
}

export default NotificationDetail;
