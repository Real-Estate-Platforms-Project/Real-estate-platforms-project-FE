import React, { useEffect, useState } from 'react';
import * as notificationService from '../../services/NotificationService';
import '../../css/Notification.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import Modal from './Modal';
import CreateNotification from './CreateNotification';
import EditNotificationModal from './EditNotification';
import { toast } from "react-toastify";
import { Modal as BootstrapModal } from 'react-bootstrap';
import {format} from "date-fns";

function NotificationAdmin() {
    const [title, setTitle] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [notificationToDelete, setNotificationToDelete] = useState(null);
    const [notificationToEdit, setNotificationToEdit] = useState(null);
    const [notificationsList, setNotificationsList] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [deleteNotificationTitle, setDeleteNotificationTitle] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

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

    const totalPages = Math.ceil(notificationsList.length / itemsPerPage);

    const paginatedNotifications = notificationsList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSearchChange = (event) => {
        setTitle(event.target.value);
    };

    const handleEdit = (id) => {
        const notification = notificationsList.find(n => n.id === id);
        setNotificationToEdit(notification);
        setShowEditModal(true);
    };

    const handleDelete = async () => {
        try {
            await notificationService.deleteNotification(notificationToDelete.id);
            getNotifications(title);
            setShowModal(false);
            toast.success("Xóa thông báo thành công!");
        } catch (error) {
            console.error('Failed to delete notification', error);
            toast.error("Xóa thông báo thất bại!");
        }
    };

    const openDeleteModal = (id) => {
        const notification = notificationsList.find(n => n.id === id);
        setNotificationToDelete(notification);
        setDeleteNotificationTitle(notification.title);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setNotificationToDelete(null);
        setDeleteNotificationTitle("");
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

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };

    const formatDate = (date) => {
        return format(new Date(date), 'dd/MM/yyyy HH:mm');
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="notification-container-ky">
            <div>
                <h2>Thông báo đến khách hàng</h2>
            </div>
            <div className="d-flex align-items-center gap-2">
                <input
                    type="text"
                    className="form-control search-bar-ky"
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
                        <th>Ngày diễn ra</th>
                        <th>Thời gian tạo</th>
                        <th>Người tạo</th>
                        <th>Mô tả</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedNotifications.map((item) => (
                        <tr key={item.id}>
                            <td>
                                {item.images && item.images.length > 0 ? (
                                    <div className="image-container">
                                        {item.images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image.imageUrl}
                                                alt={`Image ${index}`}
                                                className="article-image"
                                                onClick={() => handleImageClick(image.imageUrl)}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    'Chưa có hình ảnh'
                                )}
                            </td>
                            <td>
                                <Link to={`/notificationDetail/${item.id}`} className="article-link">
                                    {item.title}
                                </Link>
                            </td>
                            <td>{item.dateStart ? formatDate(item.dateStart) : 'N/A'}</td>
                            <td>{item.formattedCreateNotification}</td>
                            <td>{item.employee ? item.employee.name : 'N/A'}</td>
                            <td>{item.contend}</td>
                            <td>
                                <div className="d-flex gap-2">
                                    <button className='me-2 button-orange' onClick={() => handleEdit(item.id)}>Sửa
                                    </button>
                                    <button className='me-2 button-orange'
                                            onClick={() => openDeleteModal(item.id)}>Xóa
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination-controls d-flex justify-content-center mt-3">
                <button
                    className="button-orange me-2"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {Array.from({length: totalPages}, (_, index) => (
                    <button
                        key={index}
                        className={`button-orange me-2 ${currentPage === index + 1 ? 'active' : ''}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className="button-orange ms-2"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>


            <Modal
                show={showModal}
                onClose={closeModal}
                onConfirm={handleDelete}
                message={`Bạn có chắc chắn muốn xóa thông báo có tiêu đề "${deleteNotificationTitle}"?`}
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

            <BootstrapModal show={selectedImage !== null} onHide={closeImageModal} size="lg">
                <BootstrapModal.Header closeButton>
                    <BootstrapModal.Title>Xem Ảnh</BootstrapModal.Title>
                </BootstrapModal.Header>
                <BootstrapModal.Body>
                    {selectedImage && (
                        <img
                            src={selectedImage}
                            alt="Selected"
                            className="img-fluid"
                            style={{maxWidth: '100%'}}
                        />
                    )}
                </BootstrapModal.Body>
            </BootstrapModal>
        </div>
    );
}


export default NotificationAdmin;
