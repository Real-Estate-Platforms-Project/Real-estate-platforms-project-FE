import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ErrorMessage, Field} from "formik";
import Select from "react-select";
import {Link} from "react-router-dom";

function Component({ formik, employees, realEstates }) {

        return (
            <form onSubmit={formik.handleSubmit} className="form-create-transaction">
                <div className="form-group">
                    <label>Mã Giao Dịch</label>
                    <Field name="code" type="text" className="form-control"/>
                    <ErrorMessage name="code" component="div" className="text-danger"/>
                </div>

                <div className="form-group">
                    <label>Mã Nhân Viên</label>
                    <Select
                        name="employeeId"
                        options={employees}
                        onChange={(option) => formik.setFieldValue("employeeId", option.value)}
                        value={employees.find(option => option.value === formik.values.employeeId)}
                        placeholder="Chọn nhân viên"
                    />
                    <ErrorMessage name="employeeId" component="div" className="text-danger"/>
                </div>

                <div className="form-group">
                    <label>Mã Bất Động Sản</label>
                    <Select
                        name="realEstateId"
                        options={realEstates}
                        onChange={(option) => formik.setFieldValue("realEstateId", option.value)}
                        value={realEstates.find(option => option.value === formik.values.realEstateId)}
                        placeholder="Chọn bất động sản"
                    />
                    <ErrorMessage name="realEstateId" component="div" className="text-danger"/>
                </div>

                {/* Các trường khác */}
                <div className="form-group">
                    <label>Số Tiền</label>
                    <Field name="amount" type="number" className="form-control"/>
                    <ErrorMessage name="amount" component="div" className="text-danger"/>
                </div>

                <div className="form-group">
                    <label>Ngày Giao Dịch</label>
                    <Field name="createAt" type="date" className="form-control"/>
                    <ErrorMessage name="createAt" component="div" className="text-danger"/>
                </div>

                <div className="form-group">
                    <label>Tỷ Lệ Hoa Hồng</label>
                    <Field name="commissionFee" type="number" step="0.01" className="form-control"/>
                    <ErrorMessage name="commissionFee" component="div" className="text-danger"/>
                </div>

                <div className="form-group">
                    <label>Mô Tả</label>
                    <Field name="description" as="textarea" className="form-control"/>
                    <ErrorMessage name="description" component="div" className="text-danger"/>
                </div>

                <div className="form-group">
                    <label>Trạng Thái</label>
                    <Field as="select" name="status" className="form-control">
                        <option value="pending">Chưa hoàn thành</option>
                        <option value="completed">Hoàn thành</option>
                    </Field>
                    <ErrorMessage name="status" component="div" className="text-danger"/>
                </div>

                <button type="submit" className="btn btn-primary">Lưu</button>
            </form>
        );

}


export default New;