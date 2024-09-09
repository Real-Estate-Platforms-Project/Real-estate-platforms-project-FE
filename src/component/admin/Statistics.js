import { useEffect, useState } from "react";

function Statistics() {
    const [years, setYears] = useState([]);
    const [months, setMonths] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [statisticBy, setStatisticBy] = useState('');
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const yearList = [];
        for (let year = 1975; year <= currentYear; year++) {
            yearList.push(year);
        }
        setYears(yearList);

        const monthList = [];
        for (let month = 1; month <= 12; month++) {
            monthList.push(month);
        }
        setMonths(monthList);
    }, [currentYear]);

    const handleStatisticByChange = (e) => {
        setStatisticBy(e.target.value);
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-between mt-3">
                <div className="col-md-4 d-flex mt-3 pe-3">
                    <div className="col-6 pe-3">
                        <label className="label">Thống kê:</label>
                        <select className="select form-select">
                            <option value="" disabled selected hidden>Thống kê</option>
                            <option value="transactions">Số giao dịch</option>
                            <option value="revenue">Doanh thu</option>
                            <option value="customerDemand">Nhu cầu của khách hàng</option>
                        </select>
                    </div>
                    <div className="col-6">
                        <label className="label">Thống kê theo:</label>
                        <select
                            value={statisticBy}
                            onChange={handleStatisticByChange}
                            className="select form-select"
                        >
                            <option value="" disabled hidden>Thống kê theo</option>
                            <option value="year">Năm</option>
                            <option value="month">Tháng</option>
                            <option value="day">Ngày</option>
                        </select>
                    </div>
                </div>

                <div className="col-md-8">
                    {statisticBy === 'year' && (
                        <div className="row mt-3">
                            <div className="col-md-10 pe-3">
                                <label className="label">Năm:</label>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="select form-select"
                                >
                                    <option value="" disabled hidden>Chọn năm</option>
                                    {years.map((year) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-2 mt-4">
                                <button className="btn btn-primary">Xem</button>
                            </div>
                        </div>
                    )}

                    {statisticBy === 'month' && (
                        <div className="row mt-3">
                            <div className="col-md-5">
                                <label className="label">Tháng:</label>
                                <select
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                    className="select form-select"
                                >
                                    <option value="" disabled hidden>Chọn tháng</option>
                                    {months.map((month) => (
                                        <option key={month} value={month}>Tháng {month}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-5">
                                <label className="label">Năm:</label>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="select form-select"
                                >
                                    <option value="" disabled hidden>Chọn năm</option>
                                    {years.map((year) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-2 mt-4">
                                <button className="btn btn-primary">Xem</button>
                            </div>
                        </div>
                    )}

                    {statisticBy === 'day' && (
                        <div className="row mt-3">
                            <div className="col-md-5">
                                <label className="label">Từ ngày:</label>
                                <input type="date" id="startDate" className="form-control" />
                            </div>
                            <div className="col-md-5">
                                <label className="label">Đến ngày:</label>
                                <input type="date" id="endDate" className="form-control" />
                            </div>
                            <div className="col-md-2 mt-4">
                                <button className="btn btn-primary">Xem</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Statistics;
