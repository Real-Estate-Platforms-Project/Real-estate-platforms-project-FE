import { useEffect, useState } from "react";
import * as notificationService from '../../services/NotificationService';
import '../../css/Notification.css';

function Notification() {
    const [notification, setNotification] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotification(title);
    }, [title]);

    const getNotification = async (title) => {
        let res = await notificationService.getAllNotification(title);
        setNotification(res);
    }

    const handleSearchChange = (event) => {
        setTitle(event.target.value);
    }

    return (
        <div className="notification-container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tiêu đề..."
                    value={title}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="notifications-list">
                {notification.map((item) => (
                    <div key={item.id} className="article">
                        <img src={item.image} alt={item.title} className="article-image" />
                        <div className="article-content">
                            <h2 className="article-title">{item.title}</h2>
                            <p className="article-date">{item.formattedCreateNotification} · {item.employee.name}</p>
                            <p className="article-description">{item.contend}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Notification;
