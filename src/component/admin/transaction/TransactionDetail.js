import React, {useState} from 'react';
import {TableCell, TableRow} from "@mui/material";

function TransactionDetail() {
    const [transactions, setTransactions] = useState([]);

    return (
        <div className="table-transaction">
            <h3 className="transaction-heading">Chi Tiết Giao Dịch Bất Động Sản</h3>

            <table className="table table-hover table-bordered transaction">
                <thead className="thead-transaction">
                <tr>
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
                                {/*<Button className="btn btn-info btn-sm me-2" variant="primary" onClick={() => handleEdit(transaction)}>*/}
                                {/*    Sửa*/}
                                {/*</Button>*/}


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


            {/*<TransactionUpdate showModal={showEditModal} handleClose={handleCloseEditModal} transaction={selectedTransactionForEdit} />*/}

        </div>
    );
};

export default TransactionDetail;
