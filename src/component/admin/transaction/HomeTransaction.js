import React, { useState, useEffect } from 'react';
import * as transactionService from "../../../services/TransactionService";
import { Button, TableRow, TableCell } from "@mui/material";
import swal from "sweetalert2";
import '..//..//..//css/Transaction.css'
import { Link } from 'react-router-dom';


function HomeTransaction() {
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");

    const handleSearch = async () => {
        setLoading(true);
        const data = await transactionService.searchTransactionCodeAndDescription(searchKeyword);
        setTransactions(data);
        setLoading(false);
    }

    const fetchTransactions = async (page) => {
        setLoading(true);
        const data =  await transactionService.getAllHome(page);
        setTransactions(prevTransactions => [...prevTransactions , ...data.content]);
        setTotalPages(data.totalPages);
        setLoading(false);
    }

    useEffect(() => {
        fetchTransactions(page);
    }, [page]);

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

    const handleLoadMore  = () => {
        if(page < totalPages - 1) {
            setPage(prevPage =>  prevPage  + 1);
        }

        console.log('dữ liệu 3', handleLoadMore)
    }

    const handleEdit = (transaction) => {
        console.log("Sửa giao dịch:", transaction);
    };

    return (
        <div className="table-transaction">
            <h3 className="transaction-heading">Danh Sách Giao Dịch Bất Động Sản</h3>
            <div>
                <Link to="/admin/homeTransactions/create" className="btn btn-success mb-3">Thêm mới</Link>
            </div>

            <div className="search-bar-client">
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tiêu đề hoặc mô tả..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}

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
                            <TableCell>{transaction.createAt}</TableCell>
                            <TableCell>{transaction.commissionFee}</TableCell>
                            <TableCell>
                                <Button
                                    className="btn btn-info btn-sm me-2"
                                    onClick={() => handleEdit(transaction)}
                                >
                                    Sửa
                                </Button>
                                <Button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(transaction.id)}
                                >
                                    Xoá
                                </Button>

                                <Button
                                    className="btn btn-warning btn-sm"
                                    onClick={() => handleDelete(transaction.id)}
                                >
                                    xem chi tiết
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
                <Button className="btn btn-success btn-sm" onClick={handleLoadMore} disabled={loading}>
                    {loading ? "Đang tải..." : (
                        <>
                            <i className="bi bi-arrow-bar-down"></i> XEM THÊM <i className="bi bi-arrow-bar-down"></i>
                        </>
                    )}
                </Button>
            </div>

        </div>
    );
}

export default HomeTransaction;
