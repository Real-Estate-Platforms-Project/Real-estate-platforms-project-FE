class CurrencyHelper {
    static formatCurrency(amount) {
        if (typeof amount !== 'number' || isNaN(amount)) {
            return 'Giá trị không hợp lệ';
        }

        if (amount >= 1e9) {
            return (amount / 1e9).toFixed(2).replace(".", ",") + ' tỷ'; // Thay đổi dấu . thành dấu ,
        } else if (amount >= 1e6) {
            return (amount / 1e6).toFixed(2).replace(".", ",") + ' triệu'; // Thay đổi dấu . thành dấu ,
        } else {
            return amount.toLocaleString() + ' đồng';
        }
    }
}
export default CurrencyHelper;
