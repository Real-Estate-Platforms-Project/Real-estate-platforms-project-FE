import {useEffect, useState} from "react";
import * as statisticsService from "../../services/StatisticsService";
import "../../css/Statistic.css";
import Chart from "react-apexcharts";

function Statistics() {
    const [years, setYears] = useState([]);
    const [months, setMonths] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [statistic, setStatistic] = useState('');
    const [statisticBy, setStatisticBy] = useState('');
    const currentYear = new Date().getFullYear();
    const [monthlyStatistics, setMonthlyStatistics] = useState([]);
    const [dailyStatistics, setDailyStatistics] = useState([]);
    const [dailyStatisticsByDay, setDailyStatisticsByDay] = useState([]);
    const getDaysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate();
    };

    const getDaysInBetween = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const timeDifference = end - start;
        // Cộng 1 để bao gồm ngày kết thúc
        return Math.ceil(timeDifference / (1000 * 3600 * 24) + 1);
    }

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

    const handleStatisticChange = (e) => {
        setStatistic(e.target.value);
    };

    const handleStatisticByChange = (e) => {
        setStatisticBy(e.target.value);
    };

    const handleViewClick = () => {
        if (statistic === "demand" && statisticBy === "year" && selectedYear) {
            getStatisticDataByYear();
        }

        if (statistic === "demand" && statisticBy === "month" && selectedYear && selectedMonth) {
            getStatisticDataByMonth();
        }

        if (statistic === "demand" && statisticBy === "day" && startDate && endDate) {
            getStatisticDataByDay();
        }

        if (statistic === "transaction" && statisticBy === "year" && selectedYear) {
            getStatisticDataByYear();
        }

        if (statistic === "transaction" && statisticBy === "month" && selectedYear && selectedMonth) {
            getStatisticDataByMonth();
        }

        // if (statistic === "" || statisticBy === "" || selectedYear === "" || selectedMonth === "") {
        //     alert("Vui lòng chọn đầy đủ loại thống kê và thời gian thống kê");
        // }
    };

    const getStatisticDataByYear = async () => {
        try {
            if (statistic === "demand") {
                let res = await statisticsService.getStatisticDemandByYear(selectedYear);
                const statisticsByYear = Array(12).fill(0);

                res.forEach(item => {
                    const month = new Date(item.createdAt).getMonth();
                    statisticsByYear[month] += 1;
                });

                setMonthlyStatistics(statisticsByYear);
            } else if (statistic === "transaction") {
                let res = await statisticsService.getStatisticTransactionByYear(selectedYear);
                const statisticsByYear = Array(12).fill(0);

                res.forEach(item => {
                    const month = new Date(item.createdAt).getMonth();
                    statisticsByYear[month] += 1;
                });

                setMonthlyStatistics(statisticsByYear);
            }


        } catch (error) {
            console.error("Không thể lấy dữ liệu", error);
        }
    }

    const getStatisticDataByMonth = async () => {
        try {
            if (statistic === "demand") {
                let res = await statisticsService.getStatisticDemandByMonth(selectedYear, selectedMonth);

                const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
                const statisticsByDay = Array(daysInMonth).fill(0);

                res.forEach(item => {
                    const day = new Date(item.createdAt).getDate();
                    statisticsByDay[day - 1] += 1;
                });

                setDailyStatistics(statisticsByDay);
            } else if (statistic === "transaction") {
                let res = await statisticsService.getStatisticTransactionByMonth(selectedYear, selectedMonth);

                const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
                const statisticsByDay = Array(daysInMonth).fill(0);

                res.forEach(item => {
                    const day = new Date(item.createdAt).getDate();
                    statisticsByDay[day - 1] += 1;
                });

                setDailyStatistics(statisticsByDay);
            }
        } catch (error) {
            console.error("Không thể lấy dữ liệu", error);
        }
    };

    const getStatisticDataByDay = async () => {
        try {
            let res = await statisticsService.getStatisticDemandByDay(startDate, endDate);

            const daysInBetween = getDaysInBetween(startDate, endDate);
            const statisticsByDay = Array(daysInBetween).fill(0);

            console.log(startDate + "      " + endDate)
            console.log(daysInBetween)
            let count = 0;

            res.forEach(item => {
                const day = new Date(item.createdAt).getDate();
                count += 1;

                if (day > 0 && day <= daysInBetween) {
                    statisticsByDay[day - 1] += 1;
                }
            });
            console.log(statisticsByDay)

            setDailyStatisticsByDay(statisticsByDay);
        } catch (error) {
            console.error("Không thể lấy dữ liệu", error);
        }
    };


    const maxYStatisticByYear = Math.max(...monthlyStatistics) + 1;

    const titleTextByYear = statistic === "demand" ? `Thống kê nhu cầu trong năm ${selectedYear}` : `Thống kê số giao dịch trong năm ${selectedYear}`;

    const chartStatisticByYear = {
        chart: {
            id: "yearly-statistical-chart",
        },
        xaxis: {
            categories: [
                "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
                "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
            ]
        },
        yaxis: {
            tickAmount: (function () {
                if (maxYStatisticByYear < 5) {
                    return 5;
                } else if (maxYStatisticByYear <= 10) {
                    return 5;
                } else if (maxYStatisticByYear <= 15) {
                    return 5;
                } else if (maxYStatisticByYear <= 20) {
                    return 5;
                } else if (maxYStatisticByYear <= 25) {
                    return 5;
                } else {
                    return Math.ceil(maxYStatisticByYear / 5);
                }
            })(),
            min: 0,
            max: (function () {
                if (maxYStatisticByYear < 5) {
                    return 5;
                } else if (maxYStatisticByYear <= 10) {
                    return 10;
                } else if (maxYStatisticByYear <= 15) {
                    return 15;
                } else if (maxYStatisticByYear <= 20) {
                    return 20;
                } else if (maxYStatisticByYear <= 25) {
                    return 25;
                } else {
                    return Math.ceil(maxYStatisticByYear / 5) * 5;
                }
            })(),
            labels: {
                formatter: function (val) {
                    return Math.floor(val);
                }
            },
            forceNiceScale: true,
        },
        title: {
            text: titleTextByYear,
            align: "center",
            margin: 10,
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
            }
        }
    };

    const nameSeries = statistic === "demand" ? "Số lượng nhu cầu" : "Số lượng giao dịch";

    const chartSeriesStatisticByYear = [{
        name: nameSeries,
        data: monthlyStatistics
    }];


    const maxYStatisticByMonth = Math.max(...dailyStatistics) + 1;

    const titleTextByMonth = statistic === "demand" ? `Thống kê nhu cầu trong tháng ${selectedMonth}-${selectedYear}` : `Thống kê số giao dịch trong tháng ${selectedMonth}-${selectedYear}`;

    const chartOptionsStatisticByMonth = {
        chart: {
            id: "yearly-statistical-chart",
        },
        xaxis: {
            categories: Array.from({length: getDaysInMonth(selectedMonth, selectedYear)}, (_, i) => `Ngày ${i + 1}`)
        },
        yaxis: {
            tickAmount: (function () {
                if (maxYStatisticByMonth < 5) {
                    return 5;
                } else if (maxYStatisticByMonth <= 10) {
                    return 5;
                } else if (maxYStatisticByMonth <= 15) {
                    return 5;
                } else if (maxYStatisticByMonth <= 20) {
                    return 5;
                } else if (maxYStatisticByMonth <= 25) {
                    return 5;
                } else {
                    return Math.ceil(maxYStatisticByMonth / 5);
                }
            })(),
            min: 0,
            max: (function () {
                if (maxYStatisticByMonth < 5) {
                    return 5;
                } else if (maxYStatisticByMonth <= 10) {
                    return 10;
                } else if (maxYStatisticByMonth <= 15) {
                    return 15;
                } else if (maxYStatisticByMonth <= 20) {
                    return 20;
                } else if (maxYStatisticByMonth <= 25) {
                    return 25;
                } else {
                    return Math.ceil(maxYStatisticByMonth / 5) * 5;
                }
            })(),
            labels: {
                formatter: function (val) {
                    return Math.floor(val);
                }
            },
            forceNiceScale: true,
        },
        title: {
            text: titleTextByMonth,
            align: "center",
            margin: 10,
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
            }
        }
    };

    const chartSeriesStatisticByMonth = [{
        name: nameSeries,
        data: dailyStatistics
    }];

    const groupSize = 5;
    const groupedDays = [];
    const groupedStatistics = [];

    for (let i = 0; i < dailyStatistics.length; i += groupSize) {
        const startDay = i + 1;
        const endDay = Math.min(i + groupSize, dailyStatistics.length);
        groupedDays.push(`${startDay}-${endDay}`);

        const groupSum = dailyStatistics.slice(i, i + groupSize).reduce((total, count) => total + count, 0);
        groupedStatistics.push(groupSum);
    }


    const maxYDemandByDay = Math.max(...dailyStatisticsByDay) + 1;

    const getDaysBetweenDates = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const dates = [];

        while (start <= end) {
            dates.push(start.toLocaleDateString('vi-VN', {day: '2-digit', month: '2-digit'}));
            start.setDate(start.getDate() + 1);
        }

        return dates;
    };

    const daysBetween = getDaysBetweenDates(startDate, endDate);

    const filteredDays = daysBetween.filter((_, index) => dailyStatisticsByDay[index] !== 0);

    const filteredDemandCounts = filteredDays.map((_, index) => dailyStatisticsByDay[daysBetween.indexOf(filteredDays[index])]);

    const chartOptionsDemandByDay = {
        chart: {
            id: "daily-demand-by-day-chart",
        },
        xaxis: {
            categories: getDaysBetweenDates(startDate, endDate)
        },
        yaxis: {
            tickAmount: maxYDemandByDay < 5 ? maxYDemandByDay : 5,
            min: 0,
            max: maxYDemandByDay,
            labels: {
                formatter: function (val) {
                    return Math.floor(val);
                }
            },
            forceNiceScale: true,
        },
        title: {
            text: `Thống kê nhu cầu trong khoảng từ ngày ${startDate} đến ngày ${endDate}`,
            align: "center",
            margin: 10,
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
            }
        }
    };

    const chartSeriesDemandByDay = [{
        name: "Số lượng nhu cầu",
        data: dailyStatisticsByDay
    }];


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
                            <option value="transaction">Số giao dịch</option>
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
                                <input type="date" id="startDate" className="form-control"
                                       value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                            </div>
                            <div className="col-md-5">
                                <label className="label">Đến ngày:</label>
                                <input type="date" id="endDate" className="form-control"
                                       value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                            </div>
                            <div className="col-md-2 mt-4">
                                <button className="btn btn-primary" onClick={handleViewClick}>Xem</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {(statistic === 'demand' || statistic === 'transaction') && statisticBy === 'year' && monthlyStatistics.length > 0 && (
                <div className="row mt-4">
                    <div className="col-md-12">
                        <Chart
                            options={chartStatisticByYear}
                            series={chartSeriesStatisticByYear}
                            type="line"
                            height={350}
                        />
                    </div>

                    <div className="col-md-12 pt-5">
                        <h5>
                            {statistic === 'demand'
                                ? `Số lượng nhu cầu trong năm ${selectedYear}`
                                : `Số lượng giao dịch trong năm ${selectedYear}`}
                        </h5>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <td>Tháng</td>
                                {monthlyStatistics.map((_, index) => (
                                    <th key={index}>{index + 1}</th>
                                ))}
                                <td>Tổng</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{statistic === 'demand' ? 'Nhu cầu' : 'Giao dịch'}</td>
                                {monthlyStatistics.map((count, index) => (
                                    <td key={index}>{count}</td>
                                ))}

                                <td>
                                    {monthlyStatistics.reduce((total, count) => total + count, 0)}
                                </td>

                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {(statistic === 'demand' || statistic === 'transaction') && statisticBy === 'month' && dailyStatistics.length > 0 && (
                <div className="row mt-4">
                    <div className="col-md-12">
                        <Chart
                            options={chartOptionsStatisticByMonth}
                            series={chartSeriesStatisticByMonth}
                            type="line"
                            height={350}
                        />
                    </div>

                    <div className="col-md-12 pt-5">
                        <h5>
                            {statistic === 'demand'
                                ? `Số lượng nhu cầu trong tháng ${selectedMonth}-${selectedYear}`
                                : `Số lượng giao dịch trong tháng ${selectedMonth}-${selectedYear}`}
                        </h5>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <td>Ngày</td>
                                {groupedDays.map((group, index) => (
                                    <th key={index}>{group}</th>
                                ))}
                                <td>Tổng</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{statistic === 'demand' ? 'Nhu cầu' : 'Giao dịch'}</td>
                                {groupedStatistics.map((groupCount, index) => (
                                    <td key={index}>{groupCount}</td>
                                ))}
                                <td>
                                    {dailyStatistics.reduce((total, count) => total + count, 0)}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}


            {statistic === 'demand' && statisticBy === 'day' && dailyStatisticsByDay.length > 0 && (
                <div className="row mt-4">

                    <div className="col-md-12">
                        <Chart
                            options={chartOptionsDemandByDay}
                            series={chartSeriesDemandByDay}
                            type="line"
                            height={350}
                        />
                    </div>

                    <div className="col-md-12 pt-5">
                        <h5>Số lượng nhu cầu trong khoảng từ ngày {startDate} đến ngày {endDate}</h5>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <td>Ngày</td>
                                {filteredDays.map((day, index) => (
                                    <th key={index}>{day}</th>
                                ))}
                                <td>Tổng</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Nhu cầu</td>
                                {filteredDemandCounts.map((demandCount, index) => (
                                    <td key={index}>{demandCount}</td>
                                ))}
                                <td>
                                    {filteredDemandCounts.reduce((total, count) => total + count, 0)}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}


        </div>
    );
}

export default Statistics;