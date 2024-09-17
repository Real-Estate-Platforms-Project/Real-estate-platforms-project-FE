import {Link} from "react-router-dom";
import {Field, ErrorMessage} from "formik";
import Select from "react-select";

const RealEstateForm = ({
                            formik,
                            seller,
                            provinces,
                            filteredDistricts,
                            filteredWards,
                            selectedProvince,
                            selectedDistrict,
                            selectedWard,
                            formattedPrice,
                            selectedDemandType,
                            handleProvinceChange,
                            handleDistrictChange,
                            handleWardChange,
                            handleDemandTypeChange,
                            handleUploadFiles,
                            handlePriceChange,
                            uploadedFiles,
                            handleRemoveFile
                        }) => (
    <form onSubmit={formik.handleSubmit} className="form-create-real-estate pt-4">
        <div className="shadow-sm m-auto w-50 rounded p-4 bg-white">
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
                <Field type="text" className="form-control" id="customerCode" value={seller.code || ''} disabled/>
            </div>
            <div className="mt-3">
                <label htmlFor="title" className="form-label">Tiêu đề <span className="text-danger">*</span></label>
                <Field type="text" name="title" id="title" className="form-control"
                       placeholder="Nhà cho thuê khu Thảo Điền quận 2 siêu hot"/>
                <ErrorMessage name="title" component="div" className="text-danger"/>
            </div>
            <div className="mt-4 d-flex">
                <label className="form-label me-3 m-0">Loại bất động sản: </label>
                <div role="group" className="d-flex">
                    <div className="form-check me-5 my-0">
                        <Field type="radio" name="type" value="Nhà ở" id="typeHouse" className="form-check-input"/>
                        <label htmlFor="typeHouse" className="form-check-label">Nhà ở</label>
                    </div>
                    <div className="form-check my-0">
                        <Field type="radio" name="type" value="Đất" id="typeLand" className="form-check-input"/>
                        <label htmlFor="typeLand" className="form-check-label">Đất</label>
                    </div>
                </div>
                <ErrorMessage name="type" component="div" className="text-danger"/>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <label htmlFor="provinceCode" className="form-label">Tỉnh/Thành phố</label>
                    <Select
                        id="provinceCode"
                        options={provinces}
                        onChange={(option) => {
                            handleProvinceChange(option);
                            formik.setFieldValue("provinceCode", option ? option.value : "");
                        }}
                        value={selectedProvince}
                        placeholder="Chọn"
                    />
                    <ErrorMessage name="provinceCode" component="div" className="text-danger"/>
                </div>
                <div className="col">
                    <label htmlFor="districtCode" className="form-label">Quận/Huyện</label>
                    <Select
                        id="districtCode"
                        options={filteredDistricts}
                        onChange={(option) => {
                            handleDistrictChange(option);
                            formik.setFieldValue("districtCode", option ? option.value : "");
                        }}
                        value={selectedDistrict}
                        placeholder="Chọn"
                    />
                    <ErrorMessage name="districtCode" component="div" className="text-danger"/>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <label htmlFor="wardCode" className="form-label">Phường/Xã</label>
                    <Select
                        id="wardCode"
                        options={filteredWards}
                        onChange={(option) => {
                            handleWardChange(option);
                            formik.setFieldValue("wardCode", option ? option.value : "");
                        }}
                        value={selectedWard}
                        placeholder="Chọn"
                    />
                    <ErrorMessage name="wardCode" component="div" className="text-danger"/>
                </div>
                <div className="col">
                    <label htmlFor="address" className="form-label">Số nhà/Đường/Ấp/Khu</label>
                    <Field type="text" name="address" id="address" className="form-control"
                           placeholder="VD: 12/5 Núi Thành"/>
                    <ErrorMessage name="address" component="div" className="text-danger"/>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <label htmlFor="location" className="form-label">Vị trí</label>
                    <Field as="select" name="location" id="location" className="form-select">
                        <option value="">Chọn</option>
                        <option value="Trung tâm">Trung tâm</option>
                        <option value="Ngoại ô">Ngoại ô</option>
                        <option value="Nông thôn">Nông thôn</option>
                    </Field>
                    <ErrorMessage name="location" component="div" className="text-danger"/>
                </div>
                <div className="col">
                    <label htmlFor="direction" className="form-label">Hướng</label>
                    <Field as="select" name="direction" id="direction" className="form-select">
                        <option value="">Chọn</option>
                        <option value="Hướng Bắc">Hướng Bắc</option>
                        <option value="Hướng Nam">Hướng Nam</option>
                        <option value="Hướng Đông">Hướng Đông</option>
                        <option value="Hướng Tây">Hướng Tây</option>
                        <option value="Hướng Đông Bắc">Hướng Đông Bắc</option>
                        <option value="Hướng Đông Nam">Hướng Đông Nam</option>
                        <option value="Hướng Tây Bắc">Hướng Tây Bắc</option>
                        <option value="Hướng Tây Nam">Hướng Tây Nam</option>
                    </Field>
                    <ErrorMessage name="direction" component="div" className="text-danger"/>
                </div>
            </div>

        </div>
        <div className="shadow-sm m-auto w-50 rounded p-4 bg-white mt-2">
            <h4 className="fw-bold">Thông tin bất động sản</h4>
            <div className="mt-4">
                <label htmlFor="area" className="form-label">Diện tích <span className="text-danger">*</span></label>
                <Field
                    type="text"
                    name="area"
                    id="area"
                    className="form-control"
                    placeholder="Nhập diện tích, VD: 80 m²"
                    maxLength={8}
                />
                <ErrorMessage name="area" component="div" className="text-danger"/>
            </div>

            <div className="mt-3">
                <label htmlFor="price" className="form-label">
                    Giá kì vọng <span className="text-danger">*</span>
                </label>
                <Field
                    type="text"
                    name="price"
                    id="price"
                    className="form-control"
                    placeholder="Nhập giá, VD 12000000"
                    value={formattedPrice}
                    onChange={handlePriceChange}
                    maxLength={19}
                />
                <ErrorMessage name="price" component="div" className="text-danger"/>
            </div>
            <div className="mt-3">
                <label htmlFor="status" className="form-label">Tình Trạng <span className="text-danger">*</span></label>
                <Select
                    id="status"
                    options={[
                        {value: "Có sẵn", label: "Có sẵn"},
                        {value: "Đang cải tạo", label: "Đang cải tạo"},
                        {value: "Đã qua sử dụng", label: "Đã qua sử dụng"},
                        {value: "Mới xây", label: "Mới xây"},
                    ]}
                    onChange={option => formik.setFieldValue("status", option?.value || "")}
                    value={formik.values.status ? {
                        value: formik.values.status,
                        label: formik.values.status
                    } : null}
                    placeholder="Chọn"
                />
                <ErrorMessage name="status" component="div" className="text-danger"/>
            </div>
            {formik.values.type === "Nhà ở" && (
                <div className="mt-4">
                    <div className="row">
                        <div className="col">
                            <label htmlFor="floor" className="form-label">Số tầng <span className="text-danger">*</span></label>
                            <Field type="number" name="floor" id="floor" className="form-control" placeholder="VD: 2"/>
                            <ErrorMessage name="floor" component="div" className="text-danger"/>
                        </div>
                        <div className="col">
                            <label htmlFor="toilet" className="form-label">Số phòng vệ sinh <span
                                className="text-danger">*</span></label>
                            <Field type="number" name="toilet" id="toilet" className="form-control"
                                   placeholder="VD: 3"/>
                            <ErrorMessage name="toilet" component="div" className="text-danger"/>
                        </div>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="bedroom" className="form-label">Số phòng ngủ <span
                            className="text-danger">*</span></label>
                        <Field type="number" name="bedroom" id="bedroom" className="form-control" placeholder="VD: 4"/>
                        <ErrorMessage name="bedroom" component="div" className="text-danger"/>
                    </div>
                </div>
            )}
            <div className="mt-3">
                <label htmlFor="note" className="form-label">Ghi chú thêm</label>
                <Field as="textarea" name="note" id="note" className="form-control" style={{height: 125, fontSize: 15}}
                       placeholder="Nhập mô tả chung về bất động sản của bạn. Ví dụ: Khu nhà có vị trí thuận lợi, gần công viên, gần trường học,..."/>
            </div>
        </div>
        <div className="shadow-sm m-auto w-50 rounded p-4 bg-white mt-2">
            <h4 className="fw-bold">Hình ảnh & Video</h4>
            <input
                type="file"
                accept="image/png, image/jpeg"
                multiple
                onChange={(e) => handleUploadFiles(e.target.files)}
            />
            <div className="image-preview mt-3 d-flex">
                {uploadedFiles.map((fileData, index) => (
                    <div key={index} className="position-relative me-2">
                        <img
                            src={fileData.preview}
                            alt={`preview-${index}`}
                            className="img-thumbnail"
                            style={{width: "150px", height: "150px"}}
                        />
                        <button
                            type="button"
                            className="btn btn-danger btn-sm position-absolute"
                            style={{top: "7px", right: "7px"}}
                            onClick={() => handleRemoveFile(index)}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>
            <ErrorMessage name="imageUrls" component="div" className="text-danger"/>
        </div>
        <div className="shadow-sm m-auto w-50 rounded p-4 bg-white mt-2">
            <h4 className="fw-bold">Thông tin liên hệ</h4>
            <div className="row mt-4">
                <div className="col-6 ">
                    <label htmlFor="name" className="form-label">Tên liên hệ</label>
                    <Field name="name" id="name" className="form-control" value={seller.name || ''} disabled/>
                </div>
                <div className="col-6">
                    <label htmlFor="phone_number" className="form-label">Số điện thoại</label>
                    <Field name="phone_number" id="phone_number" className="form-control"
                           value={seller.phoneNumber || ''} disabled/>
                </div>
            </div>
            <div className="row mt-3 mb-5">
                <div className="col-6">
                    <label htmlFor="email" className="form-label">Email</label>
                    <Field name="email" id="email" className="form-control" value={seller.email || ''} disabled/>
                </div>
            </div>
        </div>
        <div className="w-50 mx-auto p-0 bg-white handle-submit" style={{marginTop: -65}}>
            <div className="d-flex justify-content-between shadow-sm p-4 mt-4">
                <Link to="/" className="btn me-2 fw-bold back-to-home">Quay lại</Link>
                <button type="submit" className="btn button-search text-white fw-bold">Hoàn thành</button>
            </div>
        </div>
    </form>
);

export default RealEstateForm;