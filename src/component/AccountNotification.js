import {useEffect, useState} from "react";
import * as accountNotificationService from "../services/AccountNotificationService";
import styles from "../css/NavClient.module.css";
import authentication from "../page/auth/Authentication";


function AccountNotification() {
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotificationData = async () => {

            try {
                const data = await accountNotificationService.getNotificationByAccountId();
                setNotifications(data);
            } catch (error) {
                setError("Lỗi khi tải dữ liệu");
            } finally {
                setLoading(false);
            }
        };
        fetchNotificationData();
    }, []);

    console.log(notifications)
    return (
        <>
            <div className={`d-flex ms-3 p-2 rounded-3 position-relative ${styles.notification}`}
                 onClick={() => setOpen(!open)}>
                <i className="fa-solid fa-bell fs-4"></i>
                <div className={`${open ? "d-block" : "d-none"} position-absolute shadow ${styles.notificationList}`}>
                    <h2>Thông báo</h2>
                    {notifications.map((notification) => (
                        <div key={notification.id}>{notification.name}</div>
                    ))}
                </div>
            </div>
        </>

    )
        ;
}

export default AccountNotification;