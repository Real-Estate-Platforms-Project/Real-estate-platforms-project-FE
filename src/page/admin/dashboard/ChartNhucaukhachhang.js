import React from 'react';
import ApexCharts from 'react-apexcharts';

const RevenueChart = ({ data }) => {
    const chartOptions = {
        chart: {
            type: 'line',
            height: 350
        },
        title: {
            text: 'Doanh thu Theo Năm',
            align: 'center'
        },
        xaxis: {
            categories: data.map(item => item.year),
            title: {
                text: 'Năm'
            }
        },
        yaxis: {
            title: {
                text: 'Doanh thu (VNĐ)'
            },
            labels: {
                formatter: function (value) {
                    return value.toLocaleString();
                }
            }
        },
        tooltip: {
            y: {
                formatter: function (value) {
                    return `${value.toLocaleString()} VNĐ`;
                }
            }
        }
    };

    const chartSeries = [
        {
            name: 'Doanh thu',
            data: data.map(item => item.revenue)
        }
    ];

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Biểu đồ Doanh thu Theo Năm</h2>
            <div className="row">
                <div className="col-md-12">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <ApexCharts
                                options={chartOptions}
                                series={chartSeries}
                                type="line"
                                height={350}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueChart;
