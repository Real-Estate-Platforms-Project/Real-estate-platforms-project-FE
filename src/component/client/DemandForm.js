import {Link} from "react-router-dom";
import {Field, ErrorMessage} from "formik";

const RealEstateForm = ({
                            formik,
                            buyer,
                            selectedDemandType,
                            handleDemandTypeChange,
                        }) => (
    <form onSubmit={formik.handleSubmit} className="form-create-real-estate pt-4">
        <div className="shadow-sm m-auto w-50 rounded p-4 bg-white">
            <h4 className="fw-bold">Thông tin cơ bản</h4>
            <div className="text-center mt-4">
                <button
                    type="button"
                    className={`btn btn-sm w-50 fw-bold sale ${selectedDemandType === "<Mua>" ? "btn-dark" : "btn-outline-dark"}`}
                    onClick={() => {
                        formik.setFieldValue("demandType", "Mua");
                        handleDemandTypeChange("Mua");
                    }}
                >
                    Mua
                </button>
                <button
                    type="button"
                    className={`btn btn-sm w-50 fw-bold lease ${selectedDemandType === "Thuê" ? "btn-dark" : "btn-outline-dark"}`}
                    onClick={() => {
                        formik.setFieldValue("demandType", "Thuê");
                        handleDemandTypeChange("Thuê");
                    }}
                >
                    Cho thuê
                </button>
            </div>
            <div className="mt-3">
                <label htmlFor="customerCode" className="form-label">Mã khách hàng</label>
                <Field type="text" className="form-control" id="customerCode" value={buyer.code || ''} disabled/>
            </div>
            <div className="mt-3">
                <label htmlFor="title" className="form-label">Tiêu đề</label>
                <Field as="text" name="note" id="title" className="form-control"/>
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
                    <label htmlFor="location" className="form-label">Khu vực</label>
                    <Field as="select" name="location" id="location" className="form-select">
                        <option value="">Chọn</option>
                        <option value="Trung tâm">Trung tâm</option>
                        <option value="Ngoại ô">Ngoại ô</option>
                        <option value="Nông thôn">Nông thôn</option>
                    </Field>
                    <ErrorMessage name="location" component="div" className="text-danger"/>
                </div>
            </div>

        </div>

        <div className="mt-3">
            <label htmlFor="title" className="form-label">Diện tích tối thiểu</label>
            <Field as="text" name="minArea" id="title" className="form-control"/>
        </div>
        <div className="mt-3">
            <label htmlFor="title" className="form-label">Diện tích tối đa</label>
            <Field as="text" name="maxArea" id="title" className="form-control"/>
        </div>

        <div className="mt-3">
            <label htmlFor="note" className="form-label">Ghi chú thêm</label>
            <Field as="textarea" name="note" id="note" className="form-control" style={{height: 125, fontSize: 15}}
                   placeholder="Nhập mô tả chung về bất động sản của bạn. Ví dụ: Khu nhà có vị trí thuận lợi, gần công viên, gần trường học,..."/>
        </div>

        <div className="w-50 mx-auto p-0 bg-white handle-submit" style={{marginTop: -65}}>
            <div className="d-flex justify-content-between shadow-sm p-4 mt-4">
                <Link to="/" className="btn btn-secondary me-2 fw-bold back-to-home">Quay lại</Link>
                <button type="submit" className="btn button-search text-white fw-bold">Hoàn thành</button>
            </div>
        </div>
    </form>
);

export default RealEstateForm;
