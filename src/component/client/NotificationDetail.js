import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as notificationService from '../../services/NotificationService';
import '../../css/NotificationDetail.css';

function NotificationDetail() {
    const [detail, setDetail] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getAllNotificationDetail(id);
        }
    }, [id]);

    const getAllNotificationDetail = async (id) => {
            let res = await notificationService.getNotificationDetail(id);
            setDetail(res);
    };

    if (!detail) {
        return <div>Loading...</div>;
    }

    return (
        <div className="notification-detail">
            <h1>{detail.title}</h1>
            <img src={detail.image} alt={detail.title} />
            <p>{detail.formattedCreateNotification}</p>
            <p>{detail.employee.name}</p>
            <p>{detail.contend}</p>
        </div>
    );
}

export default NotificationDetail;
