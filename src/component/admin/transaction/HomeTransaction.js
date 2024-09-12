import React, {useState, useEffect} from 'react';
import * as transactionService from "..//..//..//services/TransactionService";
import { Link } from 'react-router-dom'; // Thêm import này để dùng Link



import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Paper,
} from "@mui/material";


function HomeTransaction() {
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        const fetchTransactions = async () => {
            const data = await transactionService.getAllHome();
            setTransactions(data.content);
        };

        fetchTransactions();
    }, []);

    return (
        <div class=" py-5">
            <div>
                <h2>Quản lý giao dịch</h2>
                <Link to="/admin/employees/create" className="btn btn-success mb-3">Thêm mới</Link> {/* Nút Thêm mới */}

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Mã giao dịch</TableCell>
                                <TableCell>Mã nhân viên</TableCell>
                                <TableCell>Bên mua</TableCell>
                                <TableCell>Bên bán</TableCell>
                                <TableCell>Mã BĐS</TableCell>
                                <TableCell>Số tiền</TableCell>
                                <TableCell>Ngày giao dịch</TableCell>
                                <TableCell>Tỷ lệ hoa hồng</TableCell>
                                <TableCell>Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* Kiểm tra nếu transactions là mảng và có dữ liệu */}
                            {Array.isArray(transactions) && transactions.length > 0 ? (
                                transactions.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell>{transaction.code}</TableCell>
                                        <TableCell>{transaction.employee}</TableCell> {/* Hiển thị tên nhân viên */}
                                        <TableCell>{transaction.buyer}</TableCell> {/* Hiển thị tên bên mua */}
                                        <TableCell>{transaction.seller}</TableCell> {/* Hiển thị tên bên bán */}
                                        <TableCell>{transaction.realEstate}</TableCell> {/* Hiển thị mã BĐS */}
                                        <TableCell>{transaction.amount}</TableCell> {/* Hiển thị số tiền */}
                                        <TableCell>{transaction.createAt}</TableCell> {/* Hiển thị ngày giao dịch */}
                                        <TableCell>{transaction.commissionFee}</TableCell> {/* Hiển thị hoa hồng */}
                                        <TableCell>
                                            <Button variant="outlined" color="primary">
                                                Xem thêm
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={9}>Không có dữ liệu</TableCell>
                                </TableRow>
                            )}
                        </TableBody>

                    </Table>
                </TableContainer>
            </div>
        </div>

    );
}

export default HomeTransaction;
