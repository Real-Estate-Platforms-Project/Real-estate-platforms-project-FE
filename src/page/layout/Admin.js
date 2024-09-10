import React from 'react';
import {Outlet} from 'react-router-dom';
import AdminNav from '../../component/admin/Nav';

const Admin = () => {
    return (
        <div className="admin-layout">
            <AdminNav/>
            <div className="admin-content">
                <Outlet/>
            </div>
        </div>
    );
};

export default Admin;
