import React from 'react';
import '../../css/ModalDelete.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Modal = ({ show, onClose, onConfirm, message }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Xác nhận</h2>
                <p>{message}</p>
                <div className="modal-buttons">
                    <button className="btn" id="confirm-button" onClick={onConfirm}>Xóa</button>
                    <button className="btn btn-secondary" onClick={onClose}>Hủy</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
