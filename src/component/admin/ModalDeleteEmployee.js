import React from 'react';
import styles from '../../css/ModalDelete.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ModalDeleteEmployee = ({ show, onClose, onConfirm, message }) => {
    if (!show) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={`${styles.modalContent} ${show ? styles.show : ''}`}>
                <h2 className="mb-3">Xác nhận</h2>
                <p>{message}</p>
                <div className={styles.modalButtons}>
                    <button className={`${styles.btn} ${styles.confirmButton}`} onClick={onConfirm}>Xóa</button>
                    <button className={`${styles.btn} ${styles.cancelButton}`} onClick={onClose}>Hủy</button>
                </div>
            </div>
        </div>
    );
}

export default ModalDeleteEmployee;

