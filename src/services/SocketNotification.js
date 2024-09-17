import React, {createContext, useContext, useEffect, useReducer, useState} from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {addNotification} from "../redux/NotificationReducer";
import employee from "sockjs-client/lib/transport/receiver/jsonp";
const WebSocketContext = createContext();

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
    const { user } = useSelector((state) => state.auth);
    const [notifications, setNotifications] = useState([]);
    const  roles = useSelector(state => state.auth.roles);
    const isRole = roles.some(role => ['ROLE_ADMIN', 'ROLE_EMPLOYEE'].includes(role.name));
    const notificationsList = useSelector((state) => state.notification.notifications);
    const dispatch = useDispatch();
    useEffect(() => {
        if(roles.length === 0) {
            return;
        }
        const socket = new SockJS('http://localhost:8080/ws/notifications');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            onConnect: (frame) => {
                console.log('Connected: ' + frame);
                stompClient.subscribe('/topic/notifications', (notification) => {
                    const parsedMessage = JSON.parse(notification.body);
                    console.log('Notification received:', parsedMessage);
                    setNotifications(prev => [parsedMessage]);
                });

                if(isRole) {
                    console.log('Received role:');
                    console.log(user)
                    stompClient.subscribe(`/topic/seller-notifications/${user.id}`, (notification) => {
                        const parsedMessage = JSON.parse(notification.body);

                        toast.info(`Có thông báo mới: ${parsedMessage.name}`);
                        console.log(notificationsList);
                        dispatch(addNotification(parsedMessage))
                    });
                }
            },
            onStompError: (error) => {
                console.log('STOMP error: ' + error);
            },
        });

        stompClient.activate();

        return () => {
            stompClient.deactivate();
        };
    }, [roles]);

    return (
        <WebSocketContext.Provider value={{ notifications }}>
            {children}
        </WebSocketContext.Provider>
    );
};