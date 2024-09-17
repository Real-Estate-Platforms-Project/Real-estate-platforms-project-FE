import { useEffect, useState } from 'react';
import { useWebSocket } from '../services/SocketNotification';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../redux/FetchUser';

const NotificationDisplay = () => {
    const dispatch = useDispatch();
    const { notifications } = useWebSocket();
    const user = useSelector(state => state.auth.user);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [currentUserId, setCurrentUserId] = useState(null);
    console.log("baoly1" + user)
    console.log("baoly1" + isAuthenticated)
    console.log("baoly1" + currentUserId)

    useEffect(() => {
        if (isAuthenticated && !user) {
            dispatch(fetchUser());
        }
    }, [isAuthenticated, user, dispatch]);

    useEffect(() => {
        if (user) {
            setCurrentUserId(user.id);
        }
    }, [user]);

    useEffect(() => {
        if (notifications.length > 0) {
            notifications.forEach(notification => {
                if (notification.id !== currentUserId) {
                    toast.info(`Có thông báo mới: ${notification.title}`);
                }
            });
        }
    }, [notifications, currentUserId]);

    return null;
};

export default NotificationDisplay;
