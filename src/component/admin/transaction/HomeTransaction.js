import React, { useState, useEffect } from 'react';
import * as transactionService from "../../../services/TransactionService";
import { Button, TableRow, TableCell } from "@mui/material";
import swal from "sweetalert2";
import '..//..//..//css/Transaction.css'
import TransactionCreate from "..//transaction/TransactionCreact";
import TransactionUpdate from "..//transaction/TransactionUpdate";
import TransactionDetail from "..//transaction/TransactionDetail";
import { toast } from "react-toastify";
import { tr } from 'date-fns/locale';

function HomeTransaction() {
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedTransactionForEdit, setSelectedTransactionForEdit] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedTransactionForDetail, setSelectedTransactionForDetail] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const handleShowCreateModal = () => setShowCreateModal(true);
    const handleCloseCreateModal = () => setShowCreateModal(false);
    const handleShowEditModal = () => setShowEditModal(true);
    const handleCloseEditModal = () => setShowEditModal(false);
    const handleShowDetailModal = () => setShowDetailModal(true);
    const handleCloseDetailModal = () => setShowDetailModal(false);



    const fetchTransactions = async (page) => {
        setLoading(true);
        try {
            const data = await transactionService.getAllHome(page);

            if (page === 0) {
                setTransactions(data.content);
                console.log(setTransactions)
            } else {
                setTransactions(prevTransactions => [...prevTransactions, ...data.content]);
            }
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách giao dịch:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        setLoading(true);

        if (searchKeyword.trim() === "") {
            fetchTransactions(0);
        } else {
            try {
                const data = await transactionService.searchTransactionCodeAndDescription(searchKeyword);

                if (!data || data.length === 0) {
                    toast.info("Không có dữ liệu phù hợp.");
                    setTransactions([]);
                } else {
                    setTransactions(data);

                    setTimeout(() => {
                        fetchTransactions(0);
                    }, 3000);
                }
            } catch (error) {
                toast.error("Đã xảy ra lỗi khi tìm kiếm.");
            }
        }

        setLoading(false);
    };



    useEffect(() => {
        fetchTransactions(page);

    }, [page]);

    const handleEdit = async (id) => {
        try {
            const transaction = await transactionService.findTransactionId(id);
            console.log(transaction);

            setSelectedTransactionForEdit(transaction);
            handleShowEditModal();
        } catch (error) {
            toast.error("Có lỗi xảy ra khi lấy dữ liệu giao dịch!");
        }
    };

    const TransactionDetails = async (id) => {
        try {
            const transaction = await transactionService.findTransactionId(id)
            console.log("transaction",transaction)
            setSelectedTransactionForDetail(transaction);
            handleShowDetailModal()
        } catch (error) {
            toast.error("Lỗi khi lấy chi tiết giao dịch!");
        }
    };


    const handleDelete = async (id) => {
        const swalWithBootstrapButtons = swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: "Bạn có chắc không?",
            text: "Bạn sẽ không thể hoàn tác điều này!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Đúng rồi, xóa nó đi!",
            cancelButtonText: "Không, hủy đi!",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                let isDeleted = await transactionService.deleteTransaction(id);
                if (isDeleted) {
                    swalWithBootstrapButtons.fire(
                        "Đã xóa!",
                        "Giao dịch của bạn đã được xóa.",
                        "success"
                    );

                    const data = await transactionService.getAllHome();
                    setTransactions(data.content.slice(0, 5));
                } else {
                    swalWithBootstrapButtons.fire(
                        "Lỗi",
                        "Xóa giao dịch không thành công.",
                        "error"
                    );
                }
            } else if (result.dismiss === swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                    "Đã hủy",
                    "Giao dịch của bạn vẫn an toàn :)",
                    "error"
                );
            }
        });
    };

    const handleLoadMore = () => {
        if (page < totalPages - 1) {
            setPage(prevPage => prevPage + 1);
        }
    };


    return (
        <div className="table-transaction">
            <h3 className="transaction-heading">Danh Sách Giao Dịch Bất Động Sản</h3>

            <Button className="btn btn-success mb-3" variant="primary" onClick={handleShowCreateModal}>
                Thêm Giao Dịch
            </Button>

            <div className="search-bar-client">
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tiêu đề hoặc mô tả..."
                    value={searchKeyword}
                    onChange={(e) => {
                        setSearchKeyword(e.target.value);

                        if (e.target.value.trim() === "") {
                            fetchTransactions(0);
                        } else {
                            setTimeout(() => {
                                fetchTransactions(0);
                            }, 3000);
                        }
                    }}
                />

                <button className="btn btn-outline-info btn-sm" onClick={handleSearch}>
                    <i className="bi bi-search"></i>
                </button>
            </div>

            <table className="table table-hover table-bordered transaction">
                <thead className="thead-transaction">
                <tr>
                    <th>STT</th>
                    <th>Mã giao dịch</th>
                    <th>Mã Nhân Viên</th>
                    <th>Bên Mua</th>
                    <th>Bên Bán</th>
                    <th>Mã BĐS</th>
                    <th>Số Tiền</th>
                    <th>Ngày Giao Dịch</th>
                    <th>Tỷ Lệ Hoa Hồng</th>
                    <th>Miêu Tả</th>
                    <th>Thao Tác</th>
                </tr>
                </thead>
                <tbody>
                    {transactions.length > 0 ? (
                        transactions.map((transaction, index) => (
                            <TableRow key={transaction.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{transaction.code}</TableCell>
                                <TableCell>{transaction.employee}</TableCell>
                                <TableCell>{transaction.buyer}</TableCell>
                                <TableCell>{transaction.seller}</TableCell>
                                <TableCell>{transaction.realEstate}</TableCell>
                                <TableCell>{transaction.amount}</TableCell>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell>{transaction.createAt}</TableCell>
                                <TableCell>{transaction.commissionFee}</TableCell>
                                <TableCell>
                                    <Button className="btn btn-info btn-sm me-2" variant="primary" onClick={() => handleEdit(transaction.id)}>
                                        Sửa
                                    </Button>

                                    <Button className="btn btn-danger btn-sm" onClick={() => handleDelete(transaction.id)}> Xoá </Button>

                                    <Button className="btn btn-info btn-sm" variant="primary" onClick={() => TransactionDetails(transaction.id)}>
                                        Xem chi tiết
                                    </Button>

                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={9}>Không có dữ liệu</TableCell>
                        </TableRow>
                    )}
                </tbody>
            </table>

            <div className="text-center mt-3">
                <Button
                    className="btn btn-success btn-sm"
                    onClick={handleLoadMore}
                    disabled={loading || page >= totalPages - 1}
                    style={{ display: page >= totalPages - 1 ? 'none' : 'block' }}
                >
                    {loading ? "Đang tải..." : (
                        <>
                            <i className="bi bi-arrow-bar-down"></i> XEM THÊM <i className="bi bi-arrow-bar-down"></i>
                        </>
                    )}
                </Button>

            </div>

            <TransactionCreate showModal={showCreateModal} handleClose={handleCloseCreateModal} />
            <TransactionUpdate
                showModal={showEditModal}
                handleClose={() => {
                    handleCloseEditModal();
                    fetchTransactions(0);
                }}
                transaction={selectedTransactionForEdit}
            />
            * <TransactionDetail
                showModal={showDetailModal}
                handleClose={handleCloseDetailModal}
                transaction={selectedTransactionForDetail}
            />


        </div>
    );
}

export default HomeTransaction;
