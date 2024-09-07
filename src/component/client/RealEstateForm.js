import React from 'react';
import { Field, ErrorMessage } from 'formik';
import Select from 'react-select';
import AddressSelect from '../AddressSelect';
import ImagePreview from '../ImagePreview';
import Helper from "../../utils/Helper";
import { Link } from "react-router-dom";

const RealEstateForm = ({
                            formik,
                            provinceOptions,
                            districtOptions,
                            wardOptions,
                            imagePreviews,
                            handleImageChange,
                            handleDemandTypeChange,
                            selectedDemandType,
                            setImagePreviews, // Accept this prop
                        }) => (
    <form onSubmit={formik.handleSubmit} className="form-create-real-estate py-4">
        <div className="shadow m-auto w-50 rounded p-4 bg-white">
            <h4 className="fw-bold">Thông tin cơ bản</h4>
            <div className="text-center mt-4">
                <button
                    type="button"
                    className={`btn btn-sm w-50 fw-bold sale ${selectedDemandType === "Bán" ? "btn-dark" : "btn-outline-dark"}`}
                    onClick={() => {
                        formik.setFieldValue("demandType", "Bán");
                        handleDemandTypeChange("Bán");
                    }}
                >
                    Bán
                </button>
                <button
                    type="button"
                    className={`btn btn-sm w-50 fw-bold lease ${selectedDemandType === "Cho thuê" ? "btn-dark" : "btn-outline-dark"}`}
                    onClick={() => {
                        formik.setFieldValue("demandType", "Cho thuê");
                        handleDemandTypeChange("Cho thuê");
                    }}
                >
                    Cho thuê
                </button>
            </div>
            <div className="mt-3">
                <label htmlFor="customerCode" className="form-label">Mã khách hàng</label>
                <Field type="text" className="form-control" id="customerCode" value={formik.values.sellerCode || ''} disabled />
            </div>
            <div className="mt-4 d-flex">
                <label className="form-label me-3 m-0">Loại bất động sản: </label>
                <div role="group" className="d-flex">
                    <div className="form-check me-5 my-0">
                        <Field type="radio" name="type" value="Nhà ở" id="typeHouse" className="form-check-input" />
                        <label htmlFor="typeHouse" className="form-check-label">Nhà ở</label>
                    </div>
                    <div className="form-check my-0">
                        <Field type="radio" name="type" value="Đất" id="typeLand" className="form-check-input" />
                        <label htmlFor="typeLand" className="form-check-label">Đất</label>
                    </div>
                </div>
                <ErrorMessage name="type" component="div" className="text-danger" />
            </div>
            <div className="row">
                <AddressSelect
                    label="Tỉnh/Thành phố"
                    name="provinceCode"
                    options={Helper.createOptions(provinceOptions, 'code', 'name')}
                    onChange={option => {
                        formik.setFieldValue("provinceCode", option?.value || "");
                        formik.setFieldValue("districtCode", "");
                        formik.setFieldValue("wardCode", "");
                    }}
                    value={formik.values.provinceCode}
                />
                <AddressSelect
                    label="Quận/Huyện"
                    name="districtCode"
                    options={Helper.createOptions(districtOptions, 'code', 'name')}
                    onChange={option => {
                        formik.setFieldValue("districtCode", option?.value || "");
                        formik.setFieldValue("wardCode", "");
                    }}
                    value={formik.values.districtCode}
                />
            </div>
            <div className="row">
                <AddressSelect
                    label="Phường/Xã"
                    name="wardCode"
                    options={Helper.createOptions(wardOptions, 'code', 'name')}
                    onChange={option => formik.setFieldValue("wardCode", option?.value || "")}
                    value={formik.values.wardCode}
                />
                <div className="col-6 mt-3">
                    <label htmlFor="address" className="form-label">Số nhà/Đường/Ấp/Khu <span className="text-danger">*</span></label>
                    <Field type="text" name="address" id="address" className="form-control" placeholder="VD: 12/5 Núi Thành" />
                    <ErrorMessage name="address" component="div" className="text-danger" />
                </div>
            </div>
            <div className="row">
                <div className="col-6 mt-3">
                    <label htmlFor="location" className="form-label">Vị trí</label>
                    <Select
                        id="location"
                        options={[
                            { value: "Trung tâm", label: "Trung tâm" },
                            { value: "Ngoại ô", label: "Ngoại ô" },
                            { value: "Nông thôn", label: "Nông thôn" },
                        ]}
                        onChange={option => formik.setFieldValue("location", option?.value || "")}
                        value={formik.values.location ? { value: formik.values.location, label: formik.values.location } : null}
                        placeholder="Chọn"
                    />
                    <ErrorMessage name="location" component="div" className="text-danger" />
                </div>
                <div className="col-6 mt-3">
                    <label htmlFor="direction" className="form-label">Hướng</label>
                    <Select
                        id="direction"
                        options={[
                            { value: "Hướng Bắc", label: "Hướng Bắc" },
                            { value: "Hướng Nam", label: "Hướng Nam" },
                            { value: "Hướng Đông", label: "Hướng Đông" },
                            { value: "Hướng Tây", label: "Hướng Tây" },
                            { value: "Hướng Đông Bắc", label: "Hướng Đông Bắc" },
                            { value: "Hướng Đông Nam", label: "Hướng Đông Nam" },
                            { value: "Hướng Tây Bắc", label: "Hướng Tây Bắc" },
                            { value: "Hướng Tây Nam", label: "Hướng Tây Nam" },
                        ]}
                        onChange={option => formik.setFieldValue("direction", option?.value || "")}
                        value={formik.values.direction ? { value: formik.values.direction, label: formik.values.direction } : null}
                        placeholder="Chọn"
                    />
                    <ErrorMessage name="direction" component="div" className="text-danger" />
                </div>
            </div>
            <div className="mt-3">
                <label htmlFor="area" className="form-label">Diện tích <span className="text-danger">*</span></label>
                <Field type="number" name="area" id="area" className="form-control" placeholder="VD: 100 m2" />
                <ErrorMessage name="area" component="div" className="text-danger" />
            </div>
            <div className="mt-3">
                <label htmlFor="price" className="form-label">Giá kì vọng <span className="text-danger">*</span></label>
                <Field type="number" name="price" id="price" className="form-control" placeholder="VD: 1.000.000 VNĐ/m2" />
                <ErrorMessage name="price" component="div" className="text-danger" />
            </div>
            <div className="mt-3">
                <label htmlFor="status" className="form-label">Tình Trạng <span className="text-danger">*</span></label>
                <Select
                    id="status"
                    options={[
                        { value: "Có sẵn", label: "Có sẵn" },
                        { value: "Đang cải tạo", label: "Đang cải tạo" },
                        { value: "Đã qua sử dụng", label: "Đã qua sử dụng" },
                        { value: "Mới xây", label: "Mới xây" },
                    ]}
                    onChange={option => formik.setFieldValue("status", option?.value || "")}
                    value={formik.values.status ? { value: formik.values.status, label: formik.values.status } : null}
                    placeholder="Chọn"
                />
                <ErrorMessage name="status" component="div" className="text-danger" />
            </div>
            <div className="mt-3">
                <label htmlFor="images" className="form-label">Ảnh <span className="text-danger">*</span></label>
                <input
                    type="file"
                    id="images"
                    name="images"
                    className="form-control"
                    accept="image/jpeg, image/png"
                    multiple
                    onChange={handleImageChange}
                />
                <ErrorMessage name="images" component="div" className="text-danger" />
                <div className="image-previews mt-3">
                    {imagePreviews.map((url, index) => (
                        <ImagePreview
                            key={index}
                            imageUrl={url}
                            onRemove={() => {
                                setImagePreviews(prev => prev.filter((_, i) => i !== index)); // Use setImagePreviews from props
                            }}
                        />
                    ))}
                </div>
            </div>
            <div className="mt-3">
                <label htmlFor="note" className="form-label">Ghi chú thêm</label>
                <Field as="textarea" name="note" id="note" className="form-control" />
                <ErrorMessage name="note" component="div" className="text-danger" />
            </div>
            <div className="text-end mt-4">
                <Link to="/" className="btn btn-secondary me-2 fw-bold">Quay lại</Link>
                <button type="submit" className="btn button-search text-white fw-bold">Hoàn thành</button>
            </div>
        </div>
    </form>
);

export default RealEstateForm;
