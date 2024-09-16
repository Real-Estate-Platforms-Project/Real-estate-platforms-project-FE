import { useEffect, useState } from "react";
import * as notificationService from '../../services/NotificationService';
import styles from '../../css/NotificationClient.module.css';
import { Link } from "react-router-dom";

function Notification() {
    const [notification, setNotification] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotification(title);
    }, [title]);

    const getNotification = async (title) => {
        let res = await notificationService.getAllNotification(title);
        if (res.length > 0) {
            setNotification(res);
            console.log(res)
        } else {
            setNotification([]);
        }
    }

    const handleSearchChange = (event) => {
        setTitle(event.target.value);
    }

    return (
        <div className={styles.notificationContainer}>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tiêu đề..."
                    value={title}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                />
            </div>
            <div className={styles.notificationsList}>
                {notification.map((item) => (
                    <div key={item.id} className={styles.notificationItem}>
                        <Link to={`/notificationDetail/${item.id}`} className={styles.articleLink}>
                            <div className={styles.articleImages}>
                                {item.images.map((image) => (
                                    <img
                                        src={image.imageUrl}
                                        alt={item.title}
                                        className={styles.articleImage}
                                        key={image.imageUrl}
                                    />
                                ))}
                            </div>
                        </Link>
                        <div className={styles.articleContent}>
                            <Link to={`/notificationDetail/${item.id}`} className={styles.articleLink}>
                                <h2 className={styles.articleTitle}>{item.title}</h2>
                            </Link>
                            <p className={styles.articleDate}>
                                {item.formattedCreateNotification} · {item.employee.name}
                            </p>
                            <p className={styles.articleDescription}>{item.contend}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Notification;
