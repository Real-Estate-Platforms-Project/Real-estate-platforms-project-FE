import {useEffect, useState} from "react";
import * as statisticsService from "../../services/StatisticsService";

function Statistics() {
    const [years, setYears] = useState([]);
    const [months, setMonths] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [statistic, setStatistic] = useState('');
    const [statisticBy, setStatisticBy] = useState('');
    const currentYear = new Date().getFullYear();
    const [resultStatistics, setResultStatistics] = useState([]);

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

    const getStatisticData = async () => {
        try {
            let res;
            if (statistic === "demand" && statisticBy === "year" && selectedYear) {
                res = await statisticsService.getStatisticDemandByYear(selectedYear);
            }

            if (statistic === "demand" && statisticBy === "month" && selectedYear && selectedMonth) {
                res = await statisticsService.getStatisticDemandByMonth(selectedYear, selectedMonth);
            }

            if (statistic === "demand" && statisticBy === "day" && selectedYear && selectedMonth) {
                res = await statisticsService.getStatisticDemandByMonth(selectedYear, selectedMonth);
            }
            console.log(res);
            setResultStatistics(res);
        } catch (error) {
            console.error("Failed to fetch data", error);
        }
    }

    const handleViewClick = () => {
        if (statistic && statisticBy) {
            getStatisticData();
        } else {
            alert("Vui lòng chọn đầy đủ loại thống kê và thời gian thống kê");
        }
    };

    const handleStatisticChange = (e) => {
        setStatistic(e.target.value);
    };

    const handleStatisticByChange = (e) => {
        setStatisticBy(e.target.value);
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-between mt-3">
                <div className="col-md-4 d-flex mt-3 pe-3">
                    <div className="col-6 pe-3">
                        <label className="label">Thống kê:</label>
                        <select
                            className="select form-select"
                            value={statistic}
                            onChange={handleStatisticChange}
                        >
                            <option value="" disabled hidden>Thống kê</option>
                            <option value="transactions">Số giao dịch</option>
                            <option value="revenue">Doanh thu</option>
                            <option value="demand">Nhu cầu của khách hàng</option>
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
                                <button className="btn btn-primary" onClick={handleViewClick}>Xem</button>
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
                                <button className="btn btn-primary" onClick={handleViewClick}>Xem</button>
                            </div>
                        </div>
                    )}

                    {statisticBy === 'day' && (
                        <div className="row mt-3">
                            <div className="col-md-5">
                                <label className="label">Từ ngày:</label>
                                <input type="date" id="startDate" className="form-control"/>
                            </div>
                            <div className="col-md-5">
                                <label className="label">Đến ngày:</label>
                                <input type="date" id="endDate" className="form-control"/>
                            </div>
                            <div className="col-md-2 mt-4">
                                <button className="btn btn-primary" onClick={handleViewClick}>Xem</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {statistic === 'demand' && (
                <div>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã Code</th>
                            <th>Tiêu Đề</th>
                            <th>Người Yêu Cầu</th>
                            <th>Loại Dịch Vụ</th>
                            <th>Loại Bất Động Sản</th>
                            <th>Khu Vực</th>
                            <th>Diện Tích</th>
                            <th>Ngày Tạo</th>
                            <th>Ghi Chú</th>
                            <th>Xác Nhận</th>
                            <th>Trạng Thái</th>
                        </tr>
                        </thead>
                        <tbody>
                        {resultStatistics.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.code}</td>
                                    <td>{item.title}</td>
                                    <td>{item.nameBuyer}</td>
                                    <td>{item.type}</td>
                                    <td>{item.realEstateType}</td>
                                    <td>{item.region}</td>
                                    <td>{item.minArea} - {item.maxArea} m2</td>
                                    <td>{item.createdAt}</td>
                                    <td>{item.notes}</td>
                                    <td>{item.isVerify ? "Đã xác nhận" : "Chưa xác nhận"}</td>
                                    <td>{item.isDeleted ? "Đã xóa" : "Hoạt động"}</td>
                                </tr>
                            )
                        )}
                        </tbody>
                    </table>
                </div>
            )}
            {statistic === 'transactions' && (
                <div>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã Giao Dịch</th>
                            <th>Mã Nhân Viên</th>
                            <th>Bên Mua</th>
                            <th>Bên Bán</th>
                            <th>Mã Bất Động Sản</th>
                            <th>Số tiền</th>
                            <th>Ngày Giao Dịch</th>
                            <th>Tỷ Lệ Hoa Hồng</th>
                            {/*<th>Ghi Chú</th>*/}
                            {/*<th>Xác Nhận</th>*/}
                            {/*<th>Trạng Thái</th>*/}
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Statistics;
