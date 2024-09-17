import React, { useEffect, useState } from "react";
import * as notificationService from '../../services/NotificationService';
import styles from '../../css/NotificationClient.module.css';
import { Link } from "react-router-dom";
import { format } from "date-fns";

function Notification() {
    const [notifications, setNotifications] = useState([]);
    const [title, setTitle] = useState("");
    const [visibleCount, setVisibleCount] = useState(3); // Number of notifications to show
    const [expanded, setExpanded] = useState({}); // To track expanded notifications

    useEffect(() => {
        getNotifications(title);
    }, [title]);

    const getNotifications = async (title) => {
        let res = await notificationService.getAllNotification(title);
        if (res.length > 0) {
            setNotifications(res);
            console.log(res);
        } else {
            setNotifications([]);
        }
    }

    const handleSearchChange = (event) => {
        setTitle(event.target.value);
    }

    const handleImageClick = (imageUrl) => {
        document.getElementById('mainImage').src = imageUrl;
    }

    const truncateText = (text, length) => {
        if (text.length > length) {
            return text.slice(0, length) + '...';
        }
        return text;
    }

    const formatDate = (date) => {
        return format(new Date(date), 'dd/MM/yyyy HH:mm');
    };

    const showMore = () => {
        setVisibleCount(prevCount => prevCount + 3);
    };

    const showMore1 = () => {
        setVisibleCount(prevCount => prevCount - 3);
    };

    const toggleExpand = (id) => {
        setExpanded(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <div className={`container mt-4 ${styles.notificationContainer}`}>
            <div className={`mb-4 ${styles.searchBar}`}>
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tiêu đề..."
                    value={title}
                    onChange={handleSearchChange}
                    className={`${styles.searchInput}`}
                />
            </div>
            <div className="row">
                {notifications.slice(0, visibleCount).map((item) => (
                    <div key={item.id} className="col-md-4 mb-3">
                        <div className={styles.notificationItem}>
                            <Link to={`/notificationDetail/${item.id}`} className="text-decoration-none">
                                <div className={styles.articleImages}>
                                    <img
                                        id="mainImage"
                                        src={item.images[0]?.imageUrl}
                                        alt={item.title}
                                        className={`img-fluid ${styles.articleImage}`}
                                    />
                                </div>
                                <div className={styles.articleContent}>
                                    <h5 className={styles.articleTitle}>{item.title}</h5>
                                    <p>Thời gian diễn ra : <span className={styles.articleDate}>{item.dateStart ? formatDate(item.dateStart) : 'N/A'}</span></p>
                                    <p className={styles.articleDate}>
                                        {item.formattedCreateNotification} · {item.employee.name}
                                    </p>
                                    <p className={styles.articleDescription}>
                                        {truncateText(item.contend, 100)} {/* Display first 100 characters */}
                                    </p>
                                    {item.contend.length > 100 && (
                                        <>
                                            <button
                                                className="btn btn-link"
                                                onClick={() => toggleExpand(item.id)}
                                            >
                                                {expanded[item.id] ? "Thu gọn" : "Xem thêm"}
                                            </button>
                                            {expanded[item.id] && (
                                                <div className={styles.fullContent}>
                                                    {item.contend}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                {visibleCount < notifications.length && (
                    <div className="text-center">
                        <button className="button-orange" onClick={showMore}>
                            Xem thêm
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Notification;