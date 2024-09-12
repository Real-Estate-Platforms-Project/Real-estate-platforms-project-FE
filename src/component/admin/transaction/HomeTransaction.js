import React, { useState, useEffect } from 'react';
import * as transactionService from "..//..//..//services/TransactionService";
import { Link } from 'react-router-dom'; 
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Paper,
    Menu,
    MenuItem,
    IconButton
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert'
import swal from "sweetalert2";


function HomeTransaction() {
    const [transactions, setTransactions] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);  // Menu anchor
    const [selectedTransaction, setSelectedTransaction] = useState(null); // Selected transaction

    useEffect(() => {
        const fetchTransactions = async () => {
            const data = await transactionService.getAllHome();
            setTransactions(data.content);
        };

        fetchTransactions();
    }, []);

    const handleMenuOpen = (event, transaction) => {
        setAnchorEl(event.currentTarget);  // Set the anchor for the menu
        setSelectedTransaction(transaction);  // Save the selected transaction
    };

    const handleMenuClose = () => {
        setAnchorEl(null);  // Close the menu
        setSelectedTransaction(null);  // Clear the selected transaction
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
                        "Sản phẩm của bạn đã được xóa.",
                        "success"
                    );
                    setTransactions(transactions.filter(product => product.id !== id));
                } else {
                    swalWithBootstrapButtons.fire(
                        "Lỗi",
                        "Xóa sản phẩm không thành công.",
                        "error"
                    );
                }
            } else if (result.dismiss === swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                    "Đã hủy",
                    "Sản phẩm của bạn vẫn an toàn :)",
                    "error"
                );
            }
        });
    };


    const handleEdit = (transaction) => {
        console.log("Sửa giao dịch:", transaction);
        handleMenuClose();
    };

    const handleViewDetails = (transaction) => {
        console.log("Xem chi tiết giao dịch:", transaction);
        handleMenuClose();
    };

    return (
        <div className="col-md-10">
            <div>
                <h2>Quản lý giao dịch</h2>
                <Link to="/admin/homeTransactions/create" className="btn btn-success mb-3">Thêm mới</Link>

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
                            {Array.isArray(transactions) && transactions.length > 0 ? (
                                transactions.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell>{transaction.code}</TableCell>
                                        <TableCell>{transaction.employee}</TableCell>
                                        <TableCell>{transaction.buyer}</TableCell>
                                        <TableCell>{transaction.seller}</TableCell>
                                        <TableCell>{transaction.realEstate}</TableCell>
                                        <TableCell>{transaction.amount}</TableCell>
                                        <TableCell>{transaction.createAt}</TableCell>
                                        <TableCell>{transaction.commissionFee}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={(event) => handleMenuOpen(event, transaction)}>
                                                <MoreVertIcon />
                                            </IconButton>

                                            <Menu
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl)}
                                                onClose={handleMenuClose}
                                            >
                                                <MenuItem onClick={() => handleViewDetails(selectedTransaction)}>
                                                    Xem chi tiết
                                                </MenuItem>
                                                <MenuItem onClick={() => handleEdit(selectedTransaction)}>
                                                    Sửa
                                                </MenuItem>
                                                <MenuItem onClick={() => handleDelete(selectedTransaction.id)}>
                                                    Xóa
                                                </MenuItem>
                                            </Menu>
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
