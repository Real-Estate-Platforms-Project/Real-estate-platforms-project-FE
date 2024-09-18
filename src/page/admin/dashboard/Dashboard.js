import React, { useState, useEffect } from "react";
import * as employeeService from '../../../services/EmployeeService';

const Dashboard = () => {
    const [employeeCount, setEmployeeCount] = useState(0);

    useEffect(() => {
        const fetchEmployeeCount = async () => {
            try {
                const employees = await employeeService.getEmployees();
                setEmployeeCount(employees.length);
            } catch (error) {
                console.error("Error fetching employee count:", error);
            }
        };

        fetchEmployeeCount();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Tổng quan</h2>
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
            </div>
        </div>
    );
};

export default Dashboard;
