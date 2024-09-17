// import React, { useState, useEffect } from 'react';
// import * as transactionService from "../../../services/TransactionService";
// import { Button, TableRow, TableCell } from "@mui/material";
// import swal from "sweetalert2";
// import '..//..//..//css/Transaction.css'
// import TransactionUpdate from "..//transaction/TransactionUpdate";
// import { toast } from "react-toastify";
// import { Link } from 'react-router-dom';


// function TransactionDetails() {
//     const [transactions, setTransactions] = useState([]);
//     const [selectedTransactionForEdit, setSelectedTransactionForEdit] = useState(null);
//     const [showEditModal, setShowEditModal] = useState(false);
//     const [selectedTransactionForDetail, setSelectedTransactionForDetail] = useState(null);
//     const [showDetailModal, setShowDetailModal] = useState(false);
//     const [showCreateModal, setShowCreateModal] = useState(false);
//     const handleShowCreateModal = () => setShowCreateModal(true);
//     const handleCloseCreateModal = () => setShowCreateModal(false);
//     const handleShowEditModal = () => setShowEditModal(true);
//     const handleCloseEditModal = () => setShowEditModal(false);
//     const handleShowDetailModal = () => setShowDetailModal(true);
//     const handleCloseDetailModal = () => setShowDetailModal(false);

//     const getTransactionDetails = async (id) => {
//         try {
//             const data = await transactionService.findTransactionId(id);
//         } catch (error) {
//             console.error("Lỗi khi lấy chi tiết giao dịch:", error);
//         }
//     };

//     useEffect(() => {
//         getTransactionDetails();
//     }, []);


//     const handleEdit = async (id) => {
//         try {
//             const transaction = await transactionService.findTransactionId(id);
//             console.log(transaction);

//             setSelectedTransactionForEdit(transaction);
//             handleShowEditModal();
//         } catch (error) {
//             toast.error("Có lỗi xảy ra khi lấy dữ liệu giao dịch!");
//         }
//     };


//     const handleDelete = async (id) => {
//         const swalWithBootstrapButtons = swal.mixin({
//             customClass: {
//                 confirmButton: "btn btn-success",
//                 cancelButton: "btn btn-danger"
//             },
//             buttonsStyling: false
//         });

//         swalWithBootstrapButtons.fire({
//             title: "Bạn có chắc không?",
//             text: "Bạn sẽ không thể hoàn tác điều này!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonText: "Đúng rồi, xóa nó đi!",
//             cancelButtonText: "Không, hủy đi!",
//             reverseButtons: true
//         }).then(async (result) => {
//             if (result.isConfirmed) {
//                 let isDeleted = await transactionService.deleteTransaction(id);
//                 if (isDeleted) {
//                     swalWithBootstrapButtons.fire(
//                         "Đã xóa!",
//                         "Giao dịch của bạn đã được xóa.",
//                         "success"
//                     );

//                     const data = await transactionService.getAllHome();
//                     setTransactions(data.content.slice(0, 5));
//                 } else {
//                     swalWithBootstrapButtons.fire(
//                         "Lỗi",
//                         "Xóa giao dịch không thành công.",
//                         "error"
//                     );
//                 }
//             } else if (result.dismiss === swal.DismissReason.cancel) {
//                 swalWithBootstrapButtons.fire(
//                     "Đã hủy",
//                     "Giao dịch của bạn vẫn an toàn :)",
//                     "error"
//                 );
//             }
//         });
//     };

    


//     return (
//         <div className="table-transaction">
//             <h3 className="transaction-heading">Chi Tiết Giao Dịch Bất Động Sản</h3>
//             <table className="table table-hover table-bordered transaction">
//                 <thead className="thead-transaction">
//                     <tr>
//                         <th>Mã giao dịch</th>
//                         <th>Mã Nhân Viên</th>
//                         <th>Bên Mua</th>
//                         <th>Bên Bán</th>
//                         <th>Mã BĐS</th>
//                         <th>Số Tiền</th>
//                         <th>Ngày Giao Dịch</th>
//                         <th>Tỷ Lệ Hoa Hồng</th>
//                         <th>Thao Tác</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {transactions.length > 0 ? (
//                         transactions.map((transaction) => (
//                             <TableRow key={transaction.id}>
//                                 <TableCell>{transaction.code}</TableCell>
//                                 <TableCell>{transaction.employee}</TableCell>
//                                 <TableCell>{transaction.buyer}</TableCell>
//                                 <TableCell>{transaction.seller}</TableCell>
//                                 <TableCell>{transaction.realEstate}</TableCell>
//                                 <TableCell>{transaction.amount}</TableCell>
//                                 <TableCell>{transaction.createAt}</TableCell>
//                                 <TableCell>{transaction.commissionFee}</TableCell>
//                                 <TableCell>
//                                     <Button className="btn btn-info btn-sm me-2" variant="primary" onClick={() => handleEdit(transaction.id)}>
//                                         Sửa
//                                     </Button>

//                                     <Button className="btn btn-danger btn-sm" onClick={() => handleDelete(transaction.id)}> Xoá </Button>

//                                 </TableCell>
//                             </TableRow>
//                         ))
//                     ) : (
//                         <TableRow>
//                             <TableCell colSpan={9}>Không có dữ liệu</TableCell>
//                         </TableRow>
//                     )}
//                 </tbody>
//             </table>

        
//             <TransactionUpdate
//                 showModal={showEditModal}
//                 handleClose={handleCloseEditModal}
//                 transaction={selectedTransactionForEdit}
//             />


//         </div>
//     );
// }

// export default TransactionDetails;
