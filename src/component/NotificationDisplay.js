import { useEffect } from 'react';
import { useWebSocket } from '../services/SocketNotification';
import { toast } from 'react-toastify';

const NotificationDisplay = () => {
    const { notifications } = useWebSocket();

    useEffect(() => {
        if (notifications.length > 0) {
            toast.info(`Có thông báo mới: ${notifications[0]}`);
        }
    }, [notifications]);

    return null;
};

export default NotificationDisplay;
