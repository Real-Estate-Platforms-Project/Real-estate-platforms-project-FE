import React, { createContext, useContext, useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const WebSocketContext = createContext();

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
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
            },
            onStompError: (error) => {
                console.log('STOMP error: ' + error);
            },
        });

        stompClient.activate();

        return () => {
            stompClient.deactivate();
        };
    }, []);

    return (
        <WebSocketContext.Provider value={{ notifications }}>
            {children}
        </WebSocketContext.Provider>
    );
};
