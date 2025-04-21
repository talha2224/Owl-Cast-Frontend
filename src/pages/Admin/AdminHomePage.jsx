import React, { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext';
import { LuCirclePlus } from "react-icons/lu";
import Chart from 'react-apexcharts';
import Cards from '../../assets/dashboard/creator/cards.svg'
import CoverImage from '../../assets/dashboard/cover.svg'
import { HiDotsVertical } from 'react-icons/hi';
import axios from 'axios';
import config from '../../config';
import { formatTimeAgo } from '../../utils';

const generateRandomData = (count) => {
    return Array.from({ length: count }, () => Math.floor(Math.random() * 1500));
};


const AdminHomePage = () => {
    const { theme } = useTheme();
    const [transactionData, setTransactionData] = useState([])
    const [streamData, setStreamData] = useState([])
    const chartData = {
        series: [{ name: 'Streams', data: [generateRandomData(1)[0], generateRandomData(1)[0] * 0.7, 1243, generateRandomData(1)[0] * 0.3, generateRandomData(1)[0] * 0.8,], },],
        options: {
            chart: {
                type: 'bar',
                height: 250,
                toolbar: { show: false, },
                background: 'transparent',
                foreColor: theme === 'dark' ? '#f1f1f1' : '#374151',
                animations: { enabled: false, },
                events: {
                    mouseMove: (event, chartContext, config) => {
                        if (config.dataPointIndex !== undefined) {
                            const date = ['Mar 3', 'Mar 4', 'Mar 30', 'Apr 5', 'Apr 12'][config.dataPointIndex];
                            const streams = chartData.series[0].data[config.dataPointIndex];
                            const tooltip = document.querySelector('.apexcharts-tooltip');
                            if (tooltip) { tooltip.innerHTML = `<div class="bg-[#262628] text-white rounded py-2 px-3 text-xs shadow-md"> <p class="font-semibold">${date}</p> <p>${streams} streams</p></div>`; }
                        }
                    },
                },
            },
            plotOptions: { bar: { columnWidth: '60%', borderRadius: 4, }, },
            dataLabels: { enabled: false, },
            xaxis: { categories: ['Mar 3', 'Mar 4', 'Mar 30', 'Apr 5', 'Apr 12'], axisBorder: { show: false, }, axisTicks: { show: false, }, labels: { style: { colors: theme === 'dark' ? '#a1a1aa' : '#4b5563', }, }, },
            yaxis: { show: false, labels: { show: false, }, axisBorder: { show: false, }, axisTicks: { show: false, }, },
            grid: { show: false, },
            colors: ['#1AFF79'],
            tooltip: {
                enabled: true,
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                    const date = w.config.xaxis.categories[dataPointIndex];
                    const streams = series[seriesIndex][dataPointIndex];
                    return `<div class="bg-[#262628] text-white rounded py-2 px-3 text-xs shadow-md"><p class="font-semibold">${date}</p><p>${streams} streams</p></div>`;
                },
                style: { fontSize: '10px', }, fixed: { enabled: false, }, x: { show: false, }, y: { formatter: (val) => `${val} streams`, }, marker: { show: false, },
            },
        },
    };


    const fetchData = async () => {
        try {
            let transaction = await axios.get(`${config.baseUrl}/transaction/all`)
            const stream = await axios.get(`${config.baseUrl}/music/all`);
            setStreamData(stream?.data?.data)
            setTransactionData(transaction?.data?.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    const sumTransaction = () => {
        return transactionData?.reduce((a, c) => { return a + c.amount }, 0)
    }

    const processStreamData = (data) => {
        const dateCounts = {};
        data.forEach(item => {
            const createdAtDate = new Date(item.createdAt).toLocaleDateString();
            dateCounts[createdAtDate] = (dateCounts[createdAtDate] || 0) + 1;
        });

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
                plotOptions: { bar: { columnWidth: '60%', borderRadius: 4, }, },
                dataLabels: { enabled: false },
                xaxis: {
                    categories: sortedDates,
                    axisBorder: { show: false },
                    axisTicks: { show: false },
                    labels: { style: { colors: theme === 'dark' ? '#a1a1aa' : '#4b5563', }, },
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
    const processedChartData = processStreamData(streamData);


    const transactionTypeCounts = transactionData.reduce((acc, transaction) => {
        acc[transaction.type] = (acc[transaction.type] || 0) + 1;
        return acc;
    }, {});
    const processTransactionData = {
        series: Object.values(transactionTypeCounts),
        options: {
            labels: Object.keys(transactionTypeCounts),
            chart: { type: 'donut', height: 100, },
            colors: ['#34C759', '#0090FF', '#FFDD55'],
            stroke: { width: 0, },
            legend: { show: false, },
            dataLabels: { enabled: false, },
            plotOptions: {
                pie: { donut: { size: '70%', labels: { show: false, }, }, },
            },
            tooltip: {
                enabled: true,
                y: { formatter: function (val) { return val.toLocaleString(); }, },
            },
        },
    };


    useEffect(() => {
        fetchData()
    }, [])

    const groupDataByCreatorId = (data) => {
        return Object.values(data.reduce((acc, item) => {
            const creatorId = item.creatorId?._id;
            if (creatorId) {
                if (!acc[creatorId]) {
                    acc[creatorId] = {
                        creatorId: creatorId,
                        otherInfo: item.creatorId, // Taking the entire creatorId object as otherInfo
                        uploads: []
                    };
                }
                acc[creatorId].uploads.push(item);
            }
            return acc;
        }, {}));
    }

    const sumOfViews = (data) =>{
        return data?.reduce((a, c) => { return a + c.listeners?.length }, 0)
    }

    const groupedByCreator = groupDataByCreatorId(streamData);

    return (

        <div className='flex-1 overflow-x-auto mx-5 mt-8'>

            <div className={`flex items-start gap-x-5 overflow-x-auto`}>

                <div className={`${theme === "dark" ? "bg-[#262628]" : "border"} p-5 rounded-lg max-w-[20rem] min-w-[20rem]`}>

                    <h1 className={`${theme === "dark" && "text-[#828287]"} text-xs`}>Total Balance</h1>
                    <div className='flex justify-between items-center mt-3'>
                        <p className={`${theme === "dark" && "text-[#fff]"}`}>${sumTransaction()}</p>
                        <LuCirclePlus className={`${theme === "dark" && "text-[#fff]"}`} />
                    </div>

                    <div className='flex items-center mt-10 gap-x-4'>
                        <button className='flex-1 py-3 rounded-md bg-[#444444] text-white text-xs'>Details</button>
                        {/* <button className='flex-1 py-3 rounded-full bg-[#E4E4E8] text-xs'>Send</button> */}
                    </div>

                </div>

                <div className={`${theme == "dark" ? "bg-[#1D1D1F]" : "border"} p-5 sm:w-[25rem] w-[100%] rounded-lg`}>

                    <div className='flex justify-between items-center'>
                        <p className={`${theme == "dark" && "text-white"}`}>Stream Over Time</p>
                        <button className={`${theme == "dark" ? "bg-[#262628] text-white" : "border"} px-4 py-1 text-xs rounded-full`}>7 days</button>
                    </div>

                    <div className="mt-0">
                        <Chart options={processedChartData.options} series={processedChartData.series} type="bar" height={140} />
                    </div>

                </div>

                <div className={`${theme === 'dark' ? 'bg-[#1D1D1F]' : 'border'} p-4 sm:w-[20rem] w-[100%] rounded-lg flex flex-col`}>

                    <div className='flex justify-between items-center flex-wrap'>
                        <p className={`${theme === 'dark' && 'text-white'} font-semibold mb-2`}>Income</p>
                        <Chart options={processTransactionData.options} series={processTransactionData.series} type="donut" height={100} />
                    </div>

                    <p className={`${theme === "dark" && "text-white"} text-[1.5rem] font-medium`}>+${sumTransaction()}</p>
                </div>

                {/* <div className={`${theme === "dark" ? "bg-[#1D1D1F]" : "border"} p-5 rounded-lg max-w-[20rem] min-w-[20rem]`}>

                    <div className='flex justify-between items-center'>
                        <p className={`${theme === "dark" && "text-[#fff]"}`}>Your Cards</p>
                        <LuCirclePlus className={`${theme === "dark" && "text-[#fff]"}`} />
                    </div>

                    <div className='flex items-center mt-10 justify-center'>
                        <img src={Cards} alt="" />
                    </div>

                </div> */}

            </div>

            <div className={`flex items-start gap-x-5 flex-wrap mt-10`}>

                <div className={`${theme === 'dark' ? 'bg-[#1D1D1F]' : 'border'} p-4 flex-1 rounded-lg mt-4 overflow-x-auto`}>
                    <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} mb-4 font-semibold`}>Transaction History</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="text-left text-xs text-gray-500">
                                <tr>
                                    <th className="py-2 pr-4 font-medium text-nowrap">#</th>
                                    <th className="py-2 pr-4 font-medium text-nowrap">Amount</th>
                                    <th className="py-2 pr-4 font-medium text-nowrap">Username</th>
                                    <th className="py-2 pr-4 font-medium text-nowrap">User Role</th>
                                    <th className="py-2 pr-4 font-medium text-nowrap">User Email</th>
                                    <th className="py-2 font-medium text-nowrap">Type</th>
                                    <th className="py-2 font-medium text-nowrap">Plan Name</th>
                                    <th className="py-2 pr-4 font-medium text-nowrap">Status</th>
                                    <th className="py-2 pr-4 font-medium text-nowrap">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactionData?.map((item, index) => (
                                    <tr key={index}>
                                        <td className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} py-2 pr-4 text-sm text-nowrap`}>{item?._id}</td>
                                        <td className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} py-2 pr-4 text-sm text-nowrap`}>$ {item?.amount}</td>
                                        <td className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} py-2 pr-4 text-sm text-nowrap`}>{item?.userId?.firstName}</td>
                                        <td className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} py-2 pr-4 text-sm text-nowrap`}>{item?.userId?.role}</td>
                                        <td className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} py-2 pr-4 text-sm text-nowrap`}>{item?.userId?.email}</td>
                                        <td className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} py-2 pr-4 text-sm text-nowrap`}>{item?.type}</td>
                                        <td className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} py-2 pr-4 text-sm text-nowrap`}>{item?.userId?.planName}</td>
                                        <td className={`${theme === 'dark' ? 'text-[#34C759]' : 'text-gray-800'} py-2 pr-4 text-sm text-nowrap`}>Active</td>
                                        <td className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} py-2 pr-4 text-sm text-nowrap`}>{item?.createdAt}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            <div className={`${theme == "dark" ? "bg-[#1D1D1F]" : "border"} mt-5 p-5 rounded-md`}>
                <p className={`${theme == "dark" && "text-white"} font-medium text-lg`}>Top Hits</p>
                <div className="w-[100%]">
                    {
                        groupedByCreator?.map((i) => (
                            <div key={i?._id} className={`cursor-pointer ${theme == "dark" ? "text-[#C9C9C9]" : "text-black"} flex justify-between items-center flex-wrap rounded-[1rem] py-2 px-3 my-3 ${theme == "dark" ? "bg-[#202022]" : "border"}`}>
                                <div className="flex items-center flex-wrap">
                                    <img src={i?.uploads?.[0]?.image?i?.uploads?.[0]?.image:CoverImage} alt="" className='mr-2 rounded-lg w-[3rem] h-[3rem]' />
                                    <div className="ml-3">
                                        <p className={`${theme == "dark" ? "text-white" : "text-black"} font-medium text-sm`}>{i?.otherInfo?.firstName}</p>
                                        <p className={`${theme == "dark" ? "text-[#828287]" : "text-black"} text-xs mt-1`}>Artist/podcaster</p>
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <p className={`${theme == "dark" ? "text-[#828287]" : "text-black"} text-xs mt-1`}>{sumOfViews(i?.uploads)}</p>
                                    <p className={`${theme == "dark" ? "text-white" : "text-black"} font-medium text-sm`}>Streams</p>
                                </div>
                                <p className='text-red-600'>0.4%</p>
                                <div className="ml-3">
                                    <p className={`${theme == "dark" ? "text-white" : "text-black"} font-medium text-sm`}>Uploads</p>
                                    <p className={`${theme == "dark" ? "text-[#828287]" : "text-black"} text-xs mt-1`}>{i?.uploads?.length}</p>
                                </div>
                                <div className="ml-3">
                                    <p className={`${theme == "dark" ? "text-white" : "text-black"} font-medium text-sm`}>Last Upload</p>
                                    <p className={`${theme == "dark" ? "text-[#828287]" : "text-black"} text-xs mt-1`}>{formatTimeAgo(i?.otherInfo?.createdAt)}</p>
                                </div>
                                <button className={`${theme == "dark" ? "text-[#fff]" : "text-black"} ${theme == "dark" ? "bg-[#303332]" : "border"} text-xs px-3 py-1 rounded-md `}>{sumOfViews(i?.uploads)*0.001}</button>
                                <button className={`${theme == "dark" ? "text-[#fff]" : "text-[#ffff]"} ${theme == "dark" ? "bg-[#3771C8]" : "bg-[#3771C8]"} text-xs px-3 py-1 rounded-md `}>Active</button>
                                <HiDotsVertical />
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>

    )
}

export default AdminHomePage