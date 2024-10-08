import {useEffect, useState} from "react";
import * as statisticsService from "../../services/StatisticsService";
import "../../css/Statistic.css";
import Chart from "react-apexcharts";
import {toast} from "react-toastify";

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
        if (!statistic) {
            toast.error("Vui lòng chọn đầy đủ loại thống kê");
            return;
        }

        if (statisticBy === "year" && selectedYear) {
            if (statistic === "demand" || statistic === "transaction" || statistic === "revenue") {
                getStatisticDataByYear();
            }
        } else if (statisticBy === "month" && selectedYear && selectedMonth) {
            if (statistic === "demand" || statistic === "transaction" || statistic === "revenue") {
                getStatisticDataByMonth();
            }
        } else if (statisticBy === "day" && startDate && endDate) {
            const daysDifference = getDaysInBetween(startDate, endDate);

            if (daysDifference < 0) {
                toast.error("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
            } else if (daysDifference > 14) {
                toast.error("Khoảng cách giữa ngày bắt đầu và ngày kết thúc không được vượt quá 14 ngày");
            } else {
                if (statistic === "demand" || statistic === "transaction" || statistic === "revenue") {
                    getStatisticDataByDay();
                }
            }
        } else {
            toast.error("Vui lòng chọn đầy đủ thời gian thống kê");
        }
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
            } else if (statistic === "revenue") {
                let res = await statisticsService.getStatisticTransactionByYear(selectedYear);
                const statisticsByYear = Array(12).fill(0);

                res.forEach(item => {
                    const month = new Date(item.createdAt).getMonth();
                    statisticsByYear[month] += item.amount;
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
            } else if (statistic === "revenue") {
                let res = await statisticsService.getStatisticTransactionByMonth(selectedYear, selectedMonth);

                const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
                const statisticsByDay = Array(daysInMonth).fill(0);

                res.forEach(item => {
                    const day = new Date(item.createdAt).getDate();
                    statisticsByDay[day - 1] += item.amount;
                });

                setDailyStatistics(statisticsByDay);
            }
        } catch (error) {
            console.error("Không thể lấy dữ liệu", error);
        }
    };

    const getStatisticDataByDay = async () => {
        try {
            if (statistic === "demand") {
                let res = await statisticsService.getStatisticDemandByDay(startDate, endDate);

                const daysInBetween = getDaysInBetween(startDate, endDate);
                const statisticsByDay = Array(daysInBetween).fill(0);

                res.forEach(item => {
                    const day = new Date(item.createdAt).getDate();

                    if (day > 0 && day <= daysInBetween) {
                        statisticsByDay[day - 1] += 1;
                    }
                });

                setDailyStatisticsByDay(statisticsByDay);
            } else if (statistic === "transaction") {
                let res = await statisticsService.getStatisticTransactionByDay(startDate, endDate);

                const daysInBetween = getDaysInBetween(startDate, endDate);
                const statisticsByDay = Array(daysInBetween).fill(0);

                res.forEach(item => {
                    const day = new Date(item.createdAt).getDate();

                    if (day > 0 && day <= daysInBetween) {
                        statisticsByDay[day - 1] += 1;
                    }
                });

                setDailyStatisticsByDay(statisticsByDay);
            } else if (statistic === "revenue") {
                let res = await statisticsService.getStatisticTransactionByDay(startDate, endDate);

                const daysInBetween = getDaysInBetween(startDate, endDate);
                const statisticsByDay = Array(daysInBetween).fill(0);

                res.forEach(item => {
                    const day = new Date(item.createdAt).getDate();

                    if (day > 0 && day <= daysInBetween) {
                        statisticsByDay[day - 1] += item.amount;
                    }
                });

                setDailyStatisticsByDay(statisticsByDay);
            }
        } catch (error) {
            console.error("Không thể lấy dữ liệu", error);
        }
    };

    const maxYStatisticByYear = Math.max(...monthlyStatistics) + 1;

    const titleTextByYear = statistic === "demand"
        ? `Thống kê nhu cầu trong năm ${selectedYear}`
        : `Thống kê số giao dịch trong năm ${selectedYear}`;

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

    const maxYRevenueByYear = Math.max(...monthlyStatistics);

    const scaleFactor = 1_000_000_000;

    const scaledMaxYRevenueByYear = Math.ceil(maxYRevenueByYear / scaleFactor / 30) * 30 * scaleFactor;

    const chartStatisticRevenueByYear = {
        chart: {
            id: "yearly-revenue-chart",
            offsetX: -54,
        },
        xaxis: {
            categories: [
                "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
                "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
            ],
            axisBorder: {
                show: true,
                color: '#000',
            },
            axisTicks: {
                show: true,
                color: '#000',
            },
        },
        yaxis: {
            tickAmount: Math.ceil(scaledMaxYRevenueByYear / scaleFactor / 30),
            min: 0,
            max: scaledMaxYRevenueByYear,
            labels: {
                formatter: function (val) {
                    return (val / scaleFactor).toLocaleString();
                }
            },
            title: {
                text: 'Tỷ VNĐ',
                rotate: 0,
                offsetX: 30,
                offsetY: -140,
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#000',
                },
            },
            forceNiceScale: true,
        },
        plotOptions: {
            bar: {
                columnWidth: '60%',
                dataLabels: {
                    position: 'top',
                }
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                if (val > 0) {
                    return (val / scaleFactor).toFixed(1) + " tỷ";
                } else {
                    return '';
                }
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ["#304758"]
            }
        },
        title: {
            text: `Thống kê doanh thu trong năm ${selectedYear}`,
            align: "center",
            margin: 10,
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
            }
        }
    };

    const chartSeriesStatisticRevenueByYear = [{
        name: "Doanh thu (tỷ)",
        data: monthlyStatistics
    }];

    const maxYStatisticByMonth = Math.max(...dailyStatistics) + 1;

    const titleTextByMonth = statistic === "demand" ? `Thống kê nhu cầu trong tháng ${selectedMonth}/${selectedYear}`
        : `Thống kê số giao dịch trong tháng ${selectedMonth}/${selectedYear}`;

    const chartOptionsStatisticByMonth = {
        chart: {
            id: "yearly-statistical-chart",
        },
        xaxis: {
            categories: Array.from({length: getDaysInMonth(selectedMonth, selectedYear)}, (_, i) => ` ${i + 1}`)
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

    const maxYRevenueByMonth = Math.max(...dailyStatistics);

    const scaledMaxYRevenueByMonth = Math.ceil(maxYRevenueByMonth / scaleFactor / 10) * 10 * scaleFactor;

    const chartStatisticRevenueByMonth = {
        chart: {
            id: "monthly-revenue-chart",
            offsetX: -54,
        },
        xaxis: {
            categories: Array.from({length: getDaysInMonth(selectedMonth, selectedYear)}, (_, i) => ` ${i + 1}`),
            axisBorder: {
                show: true,
                color: '#000',
            },
            axisTicks: {
                show: true,
                color: '#000',
            },
        },
        yaxis: {
            tickAmount: Math.ceil(scaledMaxYRevenueByMonth / scaleFactor / 10),
            min: 0,
            max: scaledMaxYRevenueByMonth,
            labels: {
                formatter: function (val) {
                    return (val / scaleFactor).toLocaleString();
                }
            },
            title: {
                text: 'Tỷ VNĐ',
                rotate: 0,
                offsetX: 30,
                offsetY: -140,
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#000',
                },
            },
            forceNiceScale: true,
        },
        plotOptions: {
            bar: {
                columnWidth: '60%',
                dataLabels: {
                    position: 'top',
                }
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                if (val > 0) {
                    return (val / scaleFactor).toFixed(1) + " tỷ";
                } else {
                    return '';
                }
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ["#304758"]
            }
        },
        title: {
            text: `Thống kê doanh thu trong tháng ${selectedMonth}/${selectedYear}`,
            align: "center",
            margin: 10,
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
            }
        }
    }
    const chartSeriesStatisticRevenueByMonth = [{
        name: "Doanh thu (tỷ)",
        data: dailyStatistics
    }];

    const maxYStatisticByDay = Math.max(...dailyStatisticsByDay) + 1;

    const getDaysBetweenDates = (startDate, endDate) => {
        const dateRegex = /^\d{4}([./-])\d{2}\1\d{2}$/;
        const dates = [];

        if (startDate.match(dateRegex) && endDate.match(dateRegex)) {
            const start = new Date(startDate);
            const end = new Date(endDate);

            while (start <= end) {
                dates.push(start.toLocaleDateString('vi-VN', {day: '2-digit', month: '2-digit'}));
                start.setDate(start.getDate() + 1);
            }
        }
        return dates;
    };

    const formatStartDate = (startDate) => {
        const dateRegex = /^\d{4}([./-])\d{2}\1\d{2}$/;
        if (startDate.match(dateRegex)) {
            let start = new Date(startDate);
            return start.toLocaleDateString('vi-VN', {day: '2-digit', month: '2-digit', year: 'numeric'});
        }

    }
    const formatEndDate = (endDate) => {
        const dateRegex = /^\d{4}([./-])\d{2}\1\d{2}$/;
        if (endDate.match(dateRegex)) {
            let end = new Date(endDate);
            return end.toLocaleDateString('vi-VN', {day: '2-digit', month: '2-digit', year: 'numeric'});
        }
    }

    const titleTextByDay = statistic === "demand"
        ? `Thống kê nhu cầu trong khoảng từ ngày ${formatStartDate(startDate)} đến ngày ${formatEndDate(endDate)}`
        : `Thống kê sô giao dịch trong khoảng từ ngày ${formatStartDate(startDate)} đến ngày ${formatEndDate(endDate)}`;

    const chartOptionsStatisticByDay = {
        chart: {
            id: "daily-demand-by-day-chart",
        },
        xaxis: {
            categories: getDaysBetweenDates(startDate, endDate)
        },
        yaxis: {
            tickAmount: (function () {
                if (maxYStatisticByDay < 5) {
                    return 5;
                } else if (maxYStatisticByDay <= 10) {
                    return 5;
                } else if (maxYStatisticByDay <= 15) {
                    return 5;
                } else if (maxYStatisticByDay <= 20) {
                    return 5;
                } else if (maxYStatisticByDay <= 25) {
                    return 5;
                } else {
                    return Math.ceil(maxYStatisticByDay / 5);
                }
            })(),
            min: 0,
            max: (function () {
                if (maxYStatisticByDay < 5) {
                    return 5;
                } else if (maxYStatisticByDay <= 10) {
                    return 10;
                } else if (maxYStatisticByDay <= 15) {
                    return 15;
                } else if (maxYStatisticByDay <= 20) {
                    return 20;
                } else if (maxYStatisticByDay <= 25) {
                    return 25;
                } else {
                    return Math.ceil(maxYStatisticByDay / 5) * 5;
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
            text: titleTextByDay,
            align: "center",
            margin: 10,
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
            }
        }
    };

    const chartSeriesStatisticByDay = [{
        name: nameSeries,
        data: dailyStatisticsByDay
    }];

    const maxYRevenueByDay = Math.max(...dailyStatisticsByDay);

    const scaledMaxYRevenueByDay = Math.ceil(maxYRevenueByDay / scaleFactor / 10) * 10 * scaleFactor;

    const chartStatisticRevenueByDay = {
        chart: {
            id: "monthly-revenue-chart",
            offsetX: -54,
        },
        xaxis: {
            categories: getDaysBetweenDates(startDate, endDate),
            axisBorder: {
                show: true,
                color: '#000',
            },
            axisTicks: {
                show: true,
                color: '#000',
            },
        },
        yaxis: {
            tickAmount: Math.ceil(scaledMaxYRevenueByDay / scaleFactor / 10),
            min: 0,
            max: scaledMaxYRevenueByDay,
            labels: {
                formatter: function (val) {
                    return (val / scaleFactor).toLocaleString();
                }
            },
            title: {
                text: 'Tỷ VNĐ',
                rotate: 0,
                offsetX: 30,
                offsetY: -140,
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#000',
                },
            },
            forceNiceScale: true,
        },
        plotOptions: {
            bar: {
                columnWidth: '60%',
                dataLabels: {
                    position: 'top',
                }
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                if (val > 0) {
                    return (val / scaleFactor).toFixed(1) + " tỷ";
                } else {
                    return '';
                }
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ["#304758"]
            }
        },
        title: {
            text: `Thống kê doanh thu trong khoảng từ ngày ${formatStartDate(startDate)} đến ngày ${formatEndDate(endDate)}`,
            align: "center",
            margin: 10,
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
            }
        }
    }
    const chartSeriesStatisticRevenueByDay = [{
        name: "Doanh thu (tỷ)",
        data: dailyStatisticsByDay
    }];

    function handleSelectStartDate(e) {
        console.log(typeof e.target.value)
        setStartDate(e.target.value)
    }

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
                                       value={startDate} onChange={(e) => handleSelectStartDate(e)}/>
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
                                ? `Số lượng nhu cầu trong tháng ${selectedMonth}/${selectedYear}`
                                : `Số lượng giao dịch trong tháng ${selectedMonth}/${selectedYear}`}
                        </h5>
                        <div style={{overflowX: 'auto'}}>
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <td>Ngày</td>
                                    {dailyStatistics.map((_, index) => (
                                        <th key={index}>{index + 1}</th>
                                    ))}
                                    <td>Tổng</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{statistic === 'demand' ? 'Nhu cầu' : 'Giao dịch'}</td>
                                    {dailyStatistics.map((demandCount, index) => (
                                        <td key={index}>{demandCount}</td>
                                    ))}
                                    <td>
                                        {dailyStatistics.reduce((total, count) => total + count, 0)}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {(statistic === 'demand' || statistic === 'transaction') && statisticBy === 'day' && dailyStatisticsByDay.length > 0 && (
                <div className="row mt-4">

                    <div className="col-md-12">
                        <Chart
                            options={chartOptionsStatisticByDay}
                            series={chartSeriesStatisticByDay}
                            type="line" height={350}
                        />
                    </div>

                    <div className="col-md-12 pt-5">
                        <h5>
                            {statistic === 'demand'
                                ? `Số lượng nhu cầu trong khoảng từ ngày ${formatStartDate(startDate)} đến ngày ${formatEndDate(endDate)}`
                                : `Số lượng giao dịch trong khoảng từ ngày ${formatStartDate(startDate)} đến ngày ${formatEndDate(endDate)}`}
                        </h5>
                        <div style={{overflowX: 'auto'}}>
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <td>Ngày</td>
                                    {getDaysBetweenDates(startDate, endDate).map((date, index) => (
                                        <th key={index}>{date}</th>
                                    ))}
                                    <td>Tổng</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{statistic === 'demand' ? 'Nhu cầu' : 'Giao dịch'}</td>
                                    {dailyStatisticsByDay.map((demandCount, index) => (
                                        <td key={index}>{demandCount}</td>
                                    ))}
                                    <td>
                                        {dailyStatisticsByDay.reduce((total, count) => total + count, 0)}

                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {statistic === 'revenue' && statisticBy === 'year' && monthlyStatistics.length > 0 && (
                <div className="row mt-4">
                    <div className="col-md-12">
                        <Chart
                            options={chartStatisticRevenueByYear}
                            series={chartSeriesStatisticRevenueByYear}
                            type="bar" height={350}
                        />
                    </div>

                    <div className="col-md-12 pt-5">
                        <h5>Doanh thu trong năm {selectedYear}</h5>
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
                                <td>Doanh thu (tỷ)</td>
                                {monthlyStatistics.map((count, index) => (
                                    <td key={index}>{(count / scaleFactor).toFixed(2)}</td>
                                ))}
                                <td>
                                    {((monthlyStatistics.reduce((total, count) => total + count, 0)) / scaleFactor).toFixed(2)}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {statistic === 'revenue' && statisticBy === 'month' && dailyStatistics.length > 0 && (
                <div className="row mt-4">
                    <div className="col-md-12">
                        <Chart
                            options={chartStatisticRevenueByMonth}
                            series={chartSeriesStatisticRevenueByMonth}
                            type="bar" height={350}
                        />
                    </div>

                    <div className="col-md-12 pt-5">
                        <h5>Doanh thu trong tháng {selectedMonth}/{selectedYear}</h5>
                        <div style={{overflowX: 'auto'}}>
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <td>Ngày</td>
                                    {dailyStatistics.map((_, index) => (
                                        <th key={index}>{index + 1}</th>
                                    ))}
                                    <td>Tổng</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Doanh thu (tỷ)</td>
                                    {dailyStatistics.map((count, index) => (
                                        <td key={index}>{(count / scaleFactor).toFixed(2)}</td>
                                    ))}
                                    <td>
                                        {((dailyStatistics.reduce((total, count) => total + count, 0)) / scaleFactor).toFixed(2)}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {statistic === 'revenue' && statisticBy === 'day' && dailyStatisticsByDay.length > 0 && (
                <div className="row mt-4">
                    <div className="col-md-12">
                        <Chart
                            options={chartStatisticRevenueByDay}
                            series={chartSeriesStatisticRevenueByDay}
                            type="bar" height={350}
                        />
                    </div>


                    <div className="col-md-12 pt-5">
                        <h5>Doanh thu trong khoảng từ ngày {formatStartDate(startDate)} đến ngày {formatEndDate(endDate)}</h5>
                        <div style={{overflowX: 'auto'}}>
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <td>Ngày</td>
                                    {getDaysBetweenDates(startDate, endDate).map((date, index) => (
                                        <th key={index}>{date}</th>
                                    ))}
                                    <td>Tổng</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Doanh thu (tỷ)</td>
                                    {dailyStatisticsByDay.map((count, index) => (
                                        <td key={index}>{(count / scaleFactor).toFixed(2)}</td>
                                    ))}
                                    <td>
                                        {((dailyStatisticsByDay.reduce((total, count) => total + count, 0)) / scaleFactor).toFixed(2)}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Statistics;
