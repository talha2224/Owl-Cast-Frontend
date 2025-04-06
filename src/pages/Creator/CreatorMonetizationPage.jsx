import React from 'react'
import { useTheme } from '../../context/ThemeContext';
import { LuCirclePlus } from "react-icons/lu";
import { BsThreeDotsVertical } from 'react-icons/bs';
import Chart from 'react-apexcharts';
import Cards from '../../assets/dashboard/creator/cards.svg'

const generateRandomData = (count) => {
    return Array.from({ length: count }, () => Math.floor(Math.random() * 1500));
};
const tableData = [
    { title: 'Withdraw',date:"10 Apr, 2025", charges: 78, Amount: 42.50,status:"Successful"},
    { title: 'Fund', date:"10 Apr, 2025", charges: 82, Amount: 31.20,status:"Successful" },
    { title: 'Withdraw', date:"10 Apr, 2025", charges: 44, Amount: 114.00,status:"Successful" },
    { title: 'Fund', date:"10 Apr, 2025", charges: 49, Amount: 28.00,status:"Successful" },
];


const CreatorMonetizationPage = () => {
    const { theme } = useTheme();

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
    return (

        <div className='flex-1 overflow-x-auto mx-5 mt-8'>

            <div className={`flex items-start gap-x-5 overflow-x-auto`}>

                <div className={`${theme === "dark" ? "bg-[#262628]" : "border"} p-5 rounded-lg max-w-[20rem] min-w-[20rem]`}>

                    <h1 className={`${theme === "dark" && "text-[#828287]"} text-xs`}>Total Balance</h1>
                    <div className='flex justify-between items-center'>
                        <p className={`${theme === "dark" && "text-[#fff]"}`}>$20,670</p>
                        <LuCirclePlus className={`${theme === "dark" && "text-[#fff]"}`} />
                    </div>

                    <div className='flex items-center mt-10 gap-x-4'>
                        <button className='flex-1 py-3 rounded-full bg-[#444444] text-white text-xs'>Deposit</button>
                        <button className='flex-1 py-3 rounded-full bg-[#E4E4E8] text-xs'>Send</button>
                    </div>

                </div>

                <div className={`${theme == "dark" ? "bg-[#1D1D1F]" : "border"} p-5 sm:w-[25rem] w-[100%] rounded-lg`}>

                    <div className='flex justify-between items-center'>
                        <p className={`${theme == "dark" && "text-white"}`}>Stream Over Time</p>
                        <button className={`${theme == "dark" ? "bg-[#262628] text-white" : "border"} px-4 py-1 text-xs rounded-full`}>7 days</button>
                    </div>

                    <div className="mt-0">
                        <Chart options={chartData.options} series={chartData.series} type="bar" height={140} />
                    </div>

                </div>

                <div className={`${theme === "dark" ? "bg-[#1D1D1F]" : "border"} p-5 rounded-lg max-w-[20rem] min-w-[20rem]`}>

                    <div className='flex justify-between items-center'>
                        <p className={`${theme === "dark" && "text-[#fff]"}`}>Your Cards</p>
                        <LuCirclePlus className={`${theme === "dark" && "text-[#fff]"}`} />
                    </div>

                    <div className='flex items-center mt-10 justify-center'>
                        <img src={Cards} alt="" />
                    </div>

                </div>

            </div>

            <div className={`flex items-start gap-x-5 flex-wrap mt-10`}>

                <div className={`${theme === 'dark' ? 'bg-[#1D1D1F]' : 'border'} p-4 sm:w-[20rem] w-[100%] rounded-lg flex flex-col mt-4`}>

                    <div className='flex justify-between items-center flex-wrap'>
                        <p className={`${theme === 'dark' && 'text-white'} font-semibold mb-2`}>Income</p>
                        <Chart options={deviceSplitData.options} series={deviceSplitData.series} type="donut" height={100} />
                    </div>

                    <p className={`${theme === "dark" && "text-white"} text-[1.5rem] font-medium`}>+$2,921</p>



                </div>

                <div className={`${theme === 'dark' ? 'bg-[#1D1D1F]' : 'border'} p-4 flex-1 rounded-lg mt-4 overflow-x-auto`}>
                    <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} mb-4 font-semibold`}>Transaction History</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="text-left text-xs text-gray-500">
                                <tr>
                                    <th className="py-2 pr-4 font-medium text-nowrap">#</th>
                                    <th className="py-2 pr-4 font-medium text-nowrap">Date</th>
                                    <th className="py-2 pr-4 font-medium text-nowrap">Platform cut</th>
                                    <th className="py-2 font-medium text-nowrap">Amount</th>
                                    <th className="py-2 pr-4 font-medium text-nowrap">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((item, index) => (
                                    <tr key={index}>
                                        <td className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} py-2 pr-4 text-sm text-nowrap`}>{item.title}</td>
                                        <td className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} py-2 pr-4 text-sm text-nowrap`}>{item.date}</td>
                                        <td className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} py-2 pr-4 text-sm text-nowrap`}>{item.charges}%</td>
                                        <td className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} py-2 pr-4 text-sm text-nowrap`}>${item.Amount}</td>
                                        <td className={`${theme === 'dark' ? 'text-[#34C759]' : 'text-gray-800'} py-2 pr-4 text-sm text-nowrap`}>{item.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        </div>

    )
}

export default CreatorMonetizationPage