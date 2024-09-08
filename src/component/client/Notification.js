import { useEffect, useState } from "react";
import * as notificationService from '../../services/NotificationService';
import '../../css/Notification.css';
import {Link} from "react-router-dom";

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
        } else {
            setNotification([]);
        }
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
                        <Link to={`/notificationDetail/${item.id}`} className="article-link">
                            <img src={item.image} alt={item.title} className="article-image"/>
                        </Link>
                        <div className="article-content">
                            <Link to={`/notificationDetail/${item.id}`} className="article-link">
                                <h2 className="article-title">{item.title}</h2>
                            </Link>
                            <p className="article-date">
                                {item.formattedCreateNotification} · {item.employee.name}
                            </p>
                            <p className="article-description">{item.contend}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Notification;
