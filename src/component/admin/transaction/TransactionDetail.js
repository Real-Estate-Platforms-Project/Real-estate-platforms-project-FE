import React from "react";
import { Formik, Field } from "formik";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";

const TransactionDetail = ({ showModal, handleClose, transaction }) => {

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Chi Tiết Giao Dịch</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        id: transaction?.id || "",
                        code: transaction?.code || "",
                        employeeId: transaction?.employee?.code || "",
                        employeeName: transaction?.employee?.name || "",
                        employeeEmail: transaction?.employee?.email || "",
                        realEstateId: transaction?.realEstate?.code || "",
                        realEstateTitle: transaction?.realEstate?.title || "",
                        buyerId: transaction?.buyer?.name || "",
                        buyerEmail: transaction?.buyer?.email || "",
                        sellerId: transaction?.seller?.name || "",
                        sellerEmail: transaction?.seller?.email || "",
                        amount: transaction?.amount || "",
                        createAt: transaction?.createAt || "",
                        commissionFee: transaction?.commissionFee || "",
                        description: transaction?.description || "",
                        status: transaction?.status || "pending",
                    }}
                >
                    {() => (
                        <form>
                            {/* Phần Transaction */}
                            <h5>Thông Tin Giao Dịch</h5>
                            <div className="form-group">
                                <label>Mã Giao Dịch</label>
                                <Field name="code" type="text" className="form-control" disabled/>
                            </div>
                            <div className="form-group">
                                <label>Số Tiền</label>
                                <Field name="amount" type="number" className="form-control" disabled/>
                            </div>
                            <div className="form-group">
                                <label>Ngày Giao Dịch</label>
                                <Field name="createAt" type="date" className="form-control" disabled/>
                            </div>
                            <div className="form-group">
                                <label>Tỷ Lệ Hoa Hồng</label>
                                <Field name="commissionFee" type="number" step="0.01" className="form-control"
                                       disabled/>
                            </div>
                            <div className="form-group">
                                <label>Mô Tả</label>
                                <Field name="description" as="textarea" className="form-control" disabled/>
                            </div>
                            <div className="form-group">
                                <label>Trạng Thái</label>
                                <Field as="select" name="status" className="form-control" disabled>
                                    <option value="pending">Chưa hoàn thành</option>
                                    <option value="completed">Hoàn thành</option>
                                </Field>
                            </div>

                            {/* Phần Employee */}
                            <h5>Thông Tin Nhân Viên</h5>
                            <div className="form-group">
                                <label>Mã Nhân Viên</label>
                                <Field name="employeeId" type="text" className="form-control" disabled/>
                            </div>
                            <div className="form-group">
                                <label>Tên Nhân Viên</label>
                                <Field name="employeeName" type="text" className="form-control" disabled/>
                            </div>
                            <div className="form-group">
                                <label>Email Nhân Viên</label>
                                <Field name="employeeEmail" type="email" className="form-control" disabled/>
                            </div>

                            {/* Phần RealEstate */}
                            <h5>Thông Tin Bất Động Sản</h5>
                            <div className="form-group">
                                <label>Mã Bất Động Sản</label>
                                <Field name="realEstateId" type="text" className="form-control" disabled/>
                            </div>
                            <div className="form-group">
                                <label>Tiêu Đề Bất Động Sản</label>
                                <Field name="realEstateTitle" type="text" className="form-control" disabled/>
                            </div>

                            {/* Phần Buyer */}
                            <h5>Thông Tin Người Mua</h5>
                            <div className="form-group">
                                <label>Tên Người Mua</label>
                                <Field name="buyerId" type="text" className="form-control" disabled/>
                            </div>
                            <div className="form-group">
                                <label>Email Người Mua</label>
                                <Field name="buyerEmail" type="email" className="form-control" disabled/>
                            </div>

                            {/* Phần Seller */}
                            <h5>Thông Tin Người Bán</h5>
                            <div className="form-group">
                                <label>Tên Người Bán</label>
                                <Field name="sellerId" type="text" className="form-control" disabled/>
                            </div>
                            <div className="form-group">
                                <label>Email Người Bán</label>
                                <Field name="sellerEmail" type="email" className="form-control" disabled/>
                            </div>

                            <Button variant="secondary" className="btn btn-primary mt-3" onClick={handleClose}>
                                Đóng
                            </Button>
                        </form>
                    )}
                </Formik>

            </Modal.Body>
        </Modal>
    );
};

export default TransactionDetail;
