// NotificationAdmin.jsx
import React, { useEffect, useState } from 'react';
import * as notificationService from '../../services/NotificationService';
import '../../css/Notification.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import Modal from './Modal';
import CreateNotification from './CreateNotification';
import EditNotificationModal from './EditNotification';
import { toast } from "react-toastify";

function NotificationAdmin() {
    const [title, setTitle] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [notificationToDelete, setNotificationToDelete] = useState(null);
    const [notificationToEdit, setNotificationToEdit] = useState(null);
    const [notificationsList, setNotificationsList] = useState([]);

    useEffect(() => {
        getNotifications(title);
    }, [title]);

    const getNotifications = async (title) => {
        try {
            let res = await notificationService.getAllNotification(title);
            setNotificationsList(res.length > 0 ? res : []);
        } catch (error) {
            console.error('Lỗi', error);
        }
    };

    const handleSearchChange = (event) => {
        setTitle(event.target.value);
    };

    const handleEdit = (id) => {
        const notification = notificationsList.find(n => n.id === id);
        setNotificationToEdit(notification);
        setShowEditModal(true);
    };

    const handleDelete = async (id) => {
        try {
            await notificationService.deleteNotification(id);
            getNotifications(title);
            setShowModal(false);
            toast.success("Xóa thông báo thành công!");
        } catch (error) {
            console.error('Failed to delete notification', error);
            toast.error("Xóa thông báo thất bại!");
        }
    };

    const openDeleteModal = (id) => {
        setNotificationToDelete(id);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setNotificationToDelete(null);
    };

    const openAddModal = () => {
        setShowAddModal(true);
    };

    const closeAddModal = () => {
        setShowAddModal(false);
    };

    const handleAddNotification = async (newNotification) => {
        try {
            await notificationService.addNotification(newNotification);
            getNotifications(title);
            toast.success("Thêm thông báo thành công!");
            closeAddModal();
        } catch (error) {
            console.error('Failed to add notification', error);
            toast.error("Thêm thông báo thất bại!");
        }
    };

    const handleUpdateNotification = async (updatedNotification) => {
        try {
            await notificationService.updateNotification(updatedNotification);
            getNotifications(title);
            toast.success("Cập nhật thông báo thành công!");
            setShowEditModal(false);
        } catch (error) {
            console.error('Failed to update notification', error);
            toast.error("Cập nhật thông báo thất bại!");
        }
    };

    return (
        <div className="notification-container">
            <div>
                <h2>Thông báo đến khách hàng</h2>
            </div>
            <div className="d-flex align-items-center gap-2">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm kiếm theo tiêu đề..."
                    value={title}
                    onChange={handleSearchChange}
                />
                <button onClick={openAddModal} className="btn" id="color-button-btn">Thêm Mới</button>
            </div>
            <div className="notifications-table">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Hình ảnh</th>
                        <th>Tiêu đề</th>
                        <th>Ngày</th>
                        <th>Người tạo</th>
                        <th>Mô tả</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {notificationsList.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <img src={item.image} alt={item.title} className="article-image"/>
                            </td>
                            <td>
                                <Link to={`/notificationDetail/${item.id}`} className="article-link">
                                    {item.title}
                                </Link>
                            </td>
                            <td>{item.formattedCreateNotification}</td>
                            <td>{item.employee ? item.employee.name : 'N/A'}</td>
                            <td>{item.contend}</td>
                            <td>
                                <div className="d-flex gap-2">
                                    <button className='me-2 button-orange' onClick={() => handleEdit(item.id)}>Sửa</button>
                                    <button className='me-2 button-orange' onClick={() => openDeleteModal(item.id)}>Xóa</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <Modal
                show={showModal}
                onClose={closeModal}
                onConfirm={() => handleDelete(notificationToDelete)}
                message="Bạn có chắc chắn muốn xóa thông báo này?"
            />

            <CreateNotification
                show={showAddModal}
                onClose={closeAddModal}
                onAdd={handleAddNotification}
            />

            <EditNotificationModal
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                onUpdate={handleUpdateNotification}
                notification={notificationToEdit}
            />
        </div>
    );
}

export default NotificationAdmin;
