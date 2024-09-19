import React, { useState, useEffect } from 'react';
import * as employeeService from '../../../services/EmployeeService';
import { getAllSellers } from '../../../services/SellerService';
import { getAllBuyers } from "../../../services/BuyerService";
import { getAllNotification } from "../../../services/NotificationService";
import RevenueChart from './ChartNhucaukhachhang'; // Import component biểu đồ

const Dashboard = () => {
    const [employeeCount, setEmployeeCount] = useState(0);
    const [buyerCount, setBuyerCount] = useState(0);
    const [sellerCount, setSellerCount] = useState(0);
    const [notificationCount, setNotificationCount] = useState(0);
    const [revenueData, setRevenueData] = useState([]); // Dữ liệu doanh thu theo năm

    useEffect(() => {
        const fetchEmployeeCount = async () => {
            try {
                const employees = await employeeService.getEmployees();
                setEmployeeCount(employees.length);
            } catch (error) {
                console.error("Error fetching employee count:", error);
            }
        };

        const fetchBuyerCount = async () => {
            try {
                const buyers = await getAllBuyers();
                setBuyerCount(buyers.length);
            } catch (error) {
                console.error("Error fetching buyer count:", error);
            }
        };

        const fetchSellerCount = async () => {
            try {
                const sellers = await getAllSellers();
                setSellerCount(sellers.length);
            } catch (error) {
                console.error("Error fetching seller count:", error);
            }
        }

        const fetchNotificationCount = async () => {
            try {
                const notifications = await getAllNotification();
                setNotificationCount(notifications.length);
            } catch (error) {
                console.error("Error fetching notification count:", error);
            }
        };

        const fetchRevenueData = async () => {
            // Giả sử bạn có một API để lấy dữ liệu doanh thu theo năm
            try {
                const revenue = await fetch('/api/revenue'); // Thay đổi URL theo API của bạn
                const data = await revenue.json();
                setRevenueData(data);
            } catch (error) {
                console.error("Error fetching revenue data:", error);
            }
        };

        fetchEmployeeCount();
        fetchBuyerCount();
        fetchSellerCount();
        fetchNotificationCount();
        fetchRevenueData();
    }, []);

    return (

            <div className="container mt-5">
                <h1 className="text-start mb-4">Tổng quan</h1>

                <RevenueChart data={revenueData} />
                <div className="row">
                    <div className="col-md-3">
                        <div className="card text-white bg-primary mb-4 shadow-sm">
                            <div className="card-body text-center">
                                <i className="fas fa-users fa-3x mb-3"></i>
                                <h5 className="card-title">Nhân viên</h5>
                                <p className="card-text">Số lượng: {employeeCount}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-white bg-success mb-4 shadow-sm">
                            <div className="card-body text-center">
                                <i className="fas fa-shopping-cart fa-3x mb-3"></i>
                                <h5 className="card-title">Người mua</h5>
                                <p className="card-text">Số lượng: {buyerCount}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-white bg-warning mb-4 shadow-sm">
                            <div className="card-body text-center">
                                <i className="fas fa-store fa-3x mb-3"></i>
                                <h5 className="card-title">Người bán</h5>
                                <p className="card-text">Số lượng: {sellerCount}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-white bg-info mb-4 shadow-sm">
                            <div className="card-body text-center">
                                <i className="fas fa-bell fa-3x mb-3"></i>
                                <h5 className="card-title">Thông báo</h5>
                                <p className="card-text">Số lượng: {notificationCount}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Dashboard;
