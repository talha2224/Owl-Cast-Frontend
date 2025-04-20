import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { BsBarChartFill, BsThreeDotsVertical } from 'react-icons/bs';
import { FaStopwatch, FaUsers } from 'react-icons/fa6';
import { AiFillDollarCircle } from 'react-icons/ai';
import Chart from 'react-apexcharts';
import axios from 'axios';
import config from '../../config';

const generateRandomData = (count) => {
    return Array.from({ length: count }, () => Math.floor(Math.random() * 1500));
};

const CreatorAnalyticsPage = () => {
    const { theme } = useTheme();
    const cardStyle = `${theme == "dark" ? "bg-[#262628]" : "border"} p-3 max-w-[20rem] min-w-[20rem] rounded-lg flex items-center gap-x-4`

    const areaChartData = {
        series: [
            {
                name: 'Paris',
                data: [100, 110, 150, 130, 160], // Example data
            },
            {
                name: 'America',
                data: [150, 160, 140, 170, 190], // Example data
            },
            {
                name: 'Portugal',
                data: [50, 70, 90, 100, 120], // Example data
            },
        ],
        options: {
            chart: {
                type: 'area',
                height: 250,
                toolbar: {
                    show: false,
                },
                background: 'transparent',
                foreColor: theme === 'dark' ? '#f1f1f1' : '#374151',
                animations: {
                    enabled: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            xaxis: {
                categories: ['2016', '2017', '2018', '2019', '2020'], // Assuming 5 data points correspond to these years
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                labels: {
                    style: {
                        colors: theme === 'dark' ? '#a1a1aa' : '#4b5563',
                    },
                },
            },
            yaxis: {
                show: false,
                max: 707, // Based on the "Total" value in the image
                labels: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
            },
            grid: {
                show: true,
                borderColor: theme === 'dark' ? '#262628' : '#e5e7eb',
                strokeDashArray: 5,
                yaxis: {
                    lines: {
                        show: true,
                    },
                },
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
            },
            colors: ['#FFB067', '#30BEA6', '#A056D7'], // Matching the colors in the image
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.9,
                    stops: [0, 100],
                },
            },
            legend: {
                show: true,
                position: 'bottom',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 10,
                    vertical: 0,
                },
                markers: {
                    width: 12,
                    height: 12,
                    radius: 6,
                },
                textAnchor: 'start',
                labels: {
                    colors: theme === 'dark' ? '#f1f1f1' : '#374151',
                },
            },
            tooltip: {
                theme: theme === 'dark' ? 'dark' : 'light',
                x: {
                    format: 'yyyy', // Assuming x-axis represents years
                },
            },
        },
    };
    const deviceSplitData = {
        series: [123456, 100789, 75789],
        options: {
            chart: {
                type: 'donut',
                height: 280,
                background: 'transparent',
            },
            colors: ['#34C759', '#0090FF', '#FFDD55'], // Green, Blue, Yellow
            stroke: {
                width: 0,
            },
            labels: ['Desktop', 'Mobile', 'Tablet'],
            legend: {
                show: false,
            },
            dataLabels: {
                enabled: false,
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '70%',
                        labels: {
                            show: false,
                        },
                    },
                },
            },
            tooltip: {
                enabled: true,
                y: {
                    formatter: function (val) {
                        return val.toLocaleString();
                    },
                },
            },
        },
    };

    const [data, setData] = useState([])
    const [durations, setDurations] = useState({});
    const fetchData = async () => {
        try {
            const res = await axios.get(`${config.baseUrl}/music/creator/${localStorage.getItem("id")}`);
            const fetchedData = res?.data?.data;
            // processChartData(fetchedData)
            setData(fetchedData);
        } catch (error) {
            console.error(error);
        }
    };
    const count = () => {
        return data?.reduce((a, c) => {
            return a + (c?.listeners?.length || 0);
        }, 0);
    };

    useEffect(() => {
        fetchData()
    }, []);


    const processChartData = (data) => {
        // Create a map to store the count of items for each date
        const dateCounts = {};

        // Iterate through your data and count items by their creation date
        data.forEach(item => {
            const createdAtDate = new Date(item.createdAt).toLocaleDateString(); // Extract date part
            dateCounts[createdAtDate] = (dateCounts[createdAtDate] || 0) + 1;
        });

        // Sort the dates for the xaxis and prepare the series data
        const sortedDates = Object.keys(dateCounts).sort((a, b) => new Date(a) - new Date(b));
        const seriesData = sortedDates.map(date => dateCounts[date]);

        return {
            series: [{
                name: 'Content Created',
                data: seriesData,
            }],
            options: {
                chart: {
                    type: 'bar',
                    height: 250,
                    toolbar: { show: false },
                    background: 'transparent',
                    foreColor: theme === 'dark' ? '#f1f1f1' : '#374151',
                    animations: { enabled: false },
                    events: {
                        mouseMove: (event, chartContext, config) => {
                            if (config.dataPointIndex !== undefined) {
                                const date = sortedDates[config.dataPointIndex];
                                const count = chartData.series[0].data[config.dataPointIndex];
                                const tooltip = document.querySelector('.apexcharts-tooltip');
                                if (tooltip) {
                                    tooltip.innerHTML = `<div class="bg-[#262628] text-white rounded py-2 px-3 text-xs shadow-md"> <p class="font-semibold">${date}</p> <p>${count} item(s) created</p></div>`;
                                }
                            }
                        },
                    },
                },
                plotOptions: {
                    bar: {
                        columnWidth: '60%',
                        borderRadius: 4,
                    },
                },
                dataLabels: { enabled: false },
                xaxis: {
                    categories: sortedDates,
                    axisBorder: { show: false },
                    axisTicks: { show: false },
                    labels: {
                        style: {
                            colors: theme === 'dark' ? '#a1a1aa' : '#4b5563',
                        },
                    },
                },
                yaxis: {
                    show: false,
                    labels: { show: false },
                    axisBorder: { show: false },
                    axisTicks: { show: false },
                },
                grid: { show: false },
                colors: ['#1AFF79'],
                tooltip: {
                    enabled: true,
                    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                        const date = w.config.xaxis.categories[dataPointIndex];
                        const count = series[seriesIndex][dataPointIndex];
                        return `<div class="bg-[#262628] text-white rounded py-2 px-3 text-xs shadow-md"><p class="font-semibold">${date}</p><p>${count} item(s) created</p></div>`;
                    },
                    style: { fontSize: '10px' },
                    fixed: { enabled: false },
                    x: { show: false },
                    y: {
                        formatter: (val) => `${val} item(s) created`,
                    },
                    marker: { show: false },
                },
            },
        };
    };

    const processCountryChartData = (data) => {
        const countryCounts = {};

        data.forEach(item => {
            if (item.listeners && Array.isArray(item.listeners)) {
                item.listeners.forEach(listener => {
                    if (listener.country) {
                        countryCounts[listener.country] = (countryCounts[listener.country] || 0) + 1;
                    }
                });
            }
        });

        // Sort countries by listener count in descending order
        const sortedCountries = Object.entries(countryCounts)
            .sort(([, countA], [, countB]) => countB - countA)
            .slice(0, 5); // Get the top 5 countries

        const countries = sortedCountries.map(([country]) => country);
        const listenerCounts = sortedCountries.map(([, count]) => count);

        return {
            series: [{
                name: 'Listeners',
                data: listenerCounts,
            }],
            options: {
                chart: {
                    type: 'bar', // Changed to bar chart for better readability of countries
                    height: 350, // Adjust height as needed
                    toolbar: { show: false },
                    background: 'transparent',
                    foreColor: theme === 'dark' ? '#f1f1f1' : '#374151',
                    animations: { enabled: false },
                },
                plotOptions: {
                    bar: {
                        columnWidth: '60%',
                        borderRadius: 4,
                    },
                },
                dataLabels: {
                    enabled: true,
                    style: {
                        colors: [theme === 'dark' ? '#f1f1f1' : '#374151'],
                    },
                },
                xaxis: {
                    categories: countries,
                    axisBorder: { show: false },
                    axisTicks: { show: false },
                    labels: {
                        style: {
                            colors: theme === 'dark' ? '#a1a1aa' : '#4b5563',
                        },
                    },
                },
                yaxis: {
                    show: false,
                    axisBorder: { show: false },
                    axisTicks: { show: false },
                    labels: { show: false },
                },
                grid: { show: false },
                colors: ['#A056D7'], // Use one of the colors from your original area chart
                tooltip: {
                    enabled: true,
                    y: {
                        formatter: (val) => `${val} listeners`,
                    },
                },
            },
        };
    };

    const processedCountryChartData = processCountryChartData(data);

    const processedChartData = processChartData(data);




    return (
        <div className='flex-1 overflow-x-auto mx-5 mt-8'>


            <div className='flex justify-between items-center gap-x-8 overflow-x-auto'>

                <div className={cardStyle}>
                    <BsBarChartFill className='text-[2rem] text-[#FF543E]' />
                    <div>
                        <p className={`${theme == "dark" && "text-white"} text-sm`}>Total Streams</p>
                        <p className='text-[#FF543E]'>{count()}</p>
                    </div>
                </div>

                <div className={cardStyle}>
                    <FaUsers className='text-[2rem] text-[#FFDD55]' />
                    <div>
                        <p className={`${theme == "dark" && "text-white"} text-sm`}>Total Listeners</p>
                        <p className='text-[#FFDD55]'>{count()}</p>
                    </div>
                </div>

                <div className={cardStyle}>
                    <AiFillDollarCircle className='text-[2rem] text-[#34C759]' />
                    <div>
                        <p className={`${theme == "dark" && "text-white"} text-sm`}>Total Earnings</p>
                        <p className='text-[#34C759]'>{count() * 0.001}</p>
                    </div>
                </div>

                <div className={cardStyle}>
                    <FaStopwatch className='text-[2rem] text-[#0090FF]' />
                    <div>
                        <p className={`${theme == "dark" && "text-white"} text-sm`}>Avg. Listening Duration</p>
                        <p className='text-[#0090FF]'>3 mins per session</p>
                    </div>
                </div>

            </div>

            <div className='flex items-start gap-x-10 flex-wrap mt-10'>

                <div className={`${theme == "dark" ? "bg-[#1D1D1F]" : "border"} p-4 sm:w-[25rem] w-[100%] rounded-lg`}>

                    <div className='flex justify-between items-center'>
                        <p className={`${theme == "dark" && "text-white"}`}>Stream Over Time</p>
                        <button className={`${theme == "dark" ? "bg-[#262628] text-white" : "border"} px-4 py-1 text-xs rounded-full`}>7 days</button>
                    </div>
                    {/* REAL DATA HERE  */}
                    <div className="mt-0">
                        <Chart options={processedChartData.options} series={processedChartData.series} type="bar" height={180} />
                    </div>

                </div>

                <div className={`${theme === 'dark' ? 'bg-[#1D1D1F]' : 'border'} p-4 flex-1 rounded-lg`}>
                    <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} mb-4 font-semibold`}>Content Performance</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="text-left text-xs text-gray-500">
                                <tr>
                                    <th className="py-2 pr-4">Title</th>
                                    <th className="py-2 pr-4">Streams</th>
                                    <th className="py-2 pr-4">Completion Rate</th>
                                    <th className="py-2 pr-4">Earnings</th>
                                    <th className="py-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} py-2 pr-4 text-sm`}>{item.title}</td>
                                        <td className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} py-2 pr-4 text-sm`}>{item.listeners?.length.toLocaleString()}</td>
                                        <td className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} py-2 pr-4 text-sm`}>  {Math.floor(Math.random() * (95 - 50 + 1)) + 50}%</td>
                                        <td className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} py-2 pr-4 text-sm`}>${(item.listeners?.length * 0.001)}</td>
                                        <td className="py-2 text-gray-500">
                                            <BsThreeDotsVertical />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>


            <div className='flex items-start gap-x-10 flex-wrap mt-10'>

                <div className={`${theme == "dark" ? "bg-[#1D1D1F]" : "border"} p-4 sm:w-[25rem] w-[100%] rounded-lg`}>
                    <p className={`${theme == "dark" && "text-white"}`}>Top countries</p>
                    {/* REAL DATA HERE */}
                    <div className="mt-4"> {/* Adjust margin as needed */}
                        <Chart options={processedCountryChartData.options} series={processedCountryChartData.series} type="bar" height={180} />
                    </div>
                </div>


                {/*NO NEED OF REAL DATA HERE  */}

                <div className={`${theme === 'dark' ? 'bg-[#1D1D1F]' : 'border'} p-4 flex-1 rounded-lg flex flex-col`}>
                    <p className={`${theme === 'dark' && 'text-white'} font-semibold mb-4`}>Device Split</p>

                    <div className='flex justify-between items-center flex-wrap'>
                        <div className="flex items-center justify-center relative mt-2">
                            <Chart options={deviceSplitData.options} series={deviceSplitData.series} type="donut" height={180} />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                                <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} text-lg font-semibold`}>
                                    {(deviceSplitData.series.reduce((sum, value) => sum + value, 0)).toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-500">Total</p>
                            </div>
                        </div>
                        <div className="mt-2 flex flex-col gap-y-2">
                            <div className="flex items-center gap-x-2">
                                <div className="w-2 h-2 rounded-full bg-[#34C759]"></div>
                                <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} text-sm`}>Desktop</p>
                                <p className="text-sm text-gray-500 ml-auto">{deviceSplitData.series[0].toLocaleString()}</p>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <div className="w-2 h-2 rounded-full bg-[#0090FF]"></div>
                                <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} text-sm`}>Mobile</p>
                                <p className="text-sm text-gray-500 ml-auto">{deviceSplitData.series[1].toLocaleString()}</p>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <div className="w-2 h-2 rounded-full bg-[#FFDD55]"></div>
                                <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} text-sm`}>Tablet</p>
                                <p className="text-sm text-gray-500 ml-auto">{deviceSplitData.series[2].toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default CreatorAnalyticsPage