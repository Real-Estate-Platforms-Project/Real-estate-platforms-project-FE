import { useEffect, useState } from 'react';
import { useWebSocket } from '../services/SocketNotification';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../redux/FetchUser';

const NotificationDisplay = () => {
    const dispatch = useDispatch();
    const { notifications } = useWebSocket();
    const user = useSelector(state => state.information.user);
    const isAuthenticated = useSelector(state => state.information.isAuthenticated);
    const [currentUserId, setCurrentUserId] = useState(null);

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
            toast.info("Có thông báo mới:" + notifications[0]);
        }
    }, [notifications]);

    return null;
};

export default NotificationDisplay;
