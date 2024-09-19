import React, { createContext, useContext, useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {useSelector} from "react-redux";

const WebSocketContext = createContext();

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const  roles = useSelector(state => state.auth.roles);
    const isRole = roles.some(role => ['ROLE_ADMIN', 'ROLE_EMPLOYEE'].includes(role.name));
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
                    stompClient.subscribe('/topic/seller-notifications', (notification) => {
                        const parsedMessage = JSON.parse(notification.body);
                        console.log(notification.body)
                        setNotifications(prev => [parsedMessage]);
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