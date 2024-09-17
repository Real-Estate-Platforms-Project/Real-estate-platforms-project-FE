import {useEffect, useState} from "react";
import * as accountNotificationService from "../services/AccountNotificationService";
import styles from "../css/NavClient.module.css";
import {useDispatch, useSelector} from "react-redux";
import {setNotificationsA} from "../redux/NotificationReducer";

function AccountNotification() {
    const { notifications } = useSelector((state) => state.notification);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotificationData = async () => {
            try {
                const data = await accountNotificationService.getNotificationByAccountId();
                dispatch(setNotificationsA([...data]));
            } catch (error) {
                setError("Lỗi khi tải dữ liệu");
            } finally {
                setLoading(false);
            }
        };
        fetchNotificationData();
    }, []);

    return (
        <>
            <div className={`d-flex ms-3 p-2 rounded-3 position-relative ${styles.notification}`}
                 onClick={() => setOpen(!open)}>
                <i className="fa-solid fa-bell fs-4"></i>
                <div
                    className={`${open ? "d-block" : "d-none"} position-absolute shadow text-black ${styles.notificationList}`}>
                    <h2>Thông báo</h2>
                    <hr/>
                    <div className="mb-2">

                        {loading ? (
                            <div>Đang tải...</div>
                        ) : error ? (
                            <div>{error}</div>
                        ) : notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <div key={notification.id}>{notification.name}</div>
                            ))
                        ) : (
                            <div>Không có thông báo</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
        ;
}

export default AccountNotification;