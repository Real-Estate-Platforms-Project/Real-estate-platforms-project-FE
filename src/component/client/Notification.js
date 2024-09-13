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
            <div className="search-bar-client">
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tiêu đề..."
                    value={title}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="notifications-list-client">
                {notification.map((item) => (
                    <div key={item.id} className="article-client">
                        <Link to={`/notificationDetail/${item.id}`} className="article-link-client">
                            <img src={item.image} alt={item.title} className="article-image-client"/>
                        </Link>
                        <div className="article-content">
                            <Link to={`/notificationDetail/${item.id}`} className="article-link-client">
                                <h2 className="article-title-client">{item.title}</h2>
                            </Link>
                            <p className="article-date-client">
                                {item.formattedCreateNotification} · {item.employee.name}
                            </p>
                            <p className="article-description-client">{item.contend}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Notification;
