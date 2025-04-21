import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Chart from 'react-apexcharts';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import img1 from '../../assets/dashboard/admin/1.svg'
import img2 from '../../assets/dashboard/admin/2.svg'
import img3 from '../../assets/dashboard/admin/3.png'
import img4 from '../../assets/dashboard/admin/4.png'
import { useTheme } from '../../context/ThemeContext';
import axios from 'axios';
import config from '../../config';
import moment from 'moment';

const summaryCardsData = [
    { title: '$130,562', subtitle: 'Subscriptions', percentage: '-2%', isPositive: false, progress: 75, iconColor: '#9C27B0', img: img3, img2: null },
];
const summaryCardsData2 = [
    { title: '$130,562', subtitle: 'Subscriptions', percentage: '2%', isPositive: false, progress: 75, iconColor: '#9C27B0', img: img3, img2: null },
];

const AdminAnalyticsPage = () => {
    const { theme } = useTheme();
    const [transactionData, setTransactionData] = useState([])
    const [streamData, setStreamData] = useState([])
    const [userData, setUserData] = useState([])

    const [userTrendsDataState, setUserTrendsDataState] = useState({
        series: [
            { name: 'Listeners', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
            { name: 'Artists/Podcasters', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        ],
        options: {
            chart: {
                type: 'bar',
                height: 350,
                toolbar: { show: false },
                foreColor: '#A1A1AA',
            },
            plotOptions: {
                bar: {
                    groupPadding: 0.1,
                    borderRadius: 5,
                },
            },
            dataLabels: { enabled: false },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                axisTicks: { show: false },
                axisBorder: { show: false },
                labels: { style: { colors: '#A1A1AA' } },
            },
            yaxis: {
                show: false,
                max: 120, // Adjust based on your data
            },
            grid: { show: false },
            legend: {
                show: true,
                position: 'top',
                horizontalAlign: 'left',
                markers: { width: 8, height: 8, radius: 4 },
                itemMargin: { horizontal: 10 },
                labels: { colors: '#A1A1AA' },
            },
            colors: ['#F44336', '#4B5563'], // Listener (Red), Artists/Podcasters (Dark Grey)
            tooltip: { theme: 'dark' },
            annotations: {
                xaxis: [
                    {
                        x: 'Apr',
                        borderColor: '#F97316',
                        label: {
                            borderColor: '#F97316',
                            style: {
                                color: '#fff',
                                background: '#F97316',
                            },
                            text: '30 New artist\nJan 12th, 2025',
                        },
                    }
                ]
            }
        },
    });

    const [monthlyTrendsDataState, setMonthlyTrendsData] = useState({ // <--- Here's the useState definition
        series: [{ name: 'Subscriptions', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }],
        options: {
            chart: {
                id: 'monthly-trends',
                toolbar: { show: false },
                zoom: { enabled: false },
                foreColor: '#A1A1AA',
            },
            colors: ['#4CAF50'],
            dataLabels: { enabled: false },
            stroke: { curve: 'smooth', width: 2 },
            markers: { size: 0 },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                axisBorder: { show: false },
                axisTicks: { show: false },
            },
            yaxis: { show: false },
            grid: { show: true, borderColor: '#374151' },
            legend: {
                show: true,
                position: 'top',
                horizontalAlign: 'left',
                itemMargin: { horizontal: 12 },
                labels: { style: { colors: '#A1A1AA' } },
            },
            tooltip: { theme: 'dark' },
        },
    });

    const fetchData = async () => {
        try {
            let transaction = await axios.get(`${config.baseUrl}/transaction/all`);
            const stream = await axios.get(`${config.baseUrl}/music/all`);
            let user = await axios.get(`${config.baseUrl}/account/all`)
            setUserData(user?.data?.data)
            setStreamData(stream?.data?.data);
            const transactions = transaction?.data?.data;
            setTransactionData(transactions);
            const monthlyAmounts = transactions.reduce((acc, item) => {
                const month = moment(item.createdAt).month();
                acc[month] = (acc[month] || 0) + item.amount;
                return acc;
            }, {});
            setMonthlyTrendsData(prevState => ({ ...prevState, series: [{ name: 'Subscriptions', data: prevState.options.xaxis.categories.map((_, index) => monthlyAmounts[index] || 0), },], }));
            const userCountsByMonth = user?.data?.data.reduce((acc, user) => {
                const month = moment(user.createdAt).month();
                const role = user.role;
                if (!acc[month]) {
                    acc[month] = { listeners: 0, creators: 0 };
                }
                if (role === 'user') {
                    acc[month].listeners++;
                } else if (role === 'creator') {
                    acc[month].creators++;
                }
                return acc;
            }, {});

            setUserTrendsDataState(prevState => ({
                ...prevState,
                series: [
                    {
                        name: 'Listeners',
                        data: prevState.options.xaxis.categories.map((_, index) => userCountsByMonth[index]?.listeners || 0),
                    },
                    {
                        name: 'Artists/Podcasters',
                        data: prevState.options.xaxis.categories.map((_, index) => userCountsByMonth[index]?.creators || 0),
                    },
                ],
            }));

        } catch (error) {
            console.log(error);
        }
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
    const listenersCount = userTrendsDataState.series[0].data.reduce((sum, value) => sum + value, 0);
    const artistsPodcastersCount = userTrendsDataState.series[1].data.reduce((sum, value) => sum + value, 0);

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
    const processedCountryChartData = processCountryChartData(streamData);


    const sumTransaction = () => {
        return transactionData?.reduce((a, c) => { return a + c.amount }, 0)
    }


    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className='flex-1 overflow-y-auto mx-5 mt-8 text-white'>
            <div className='flex justify-between items-start gap-x-6 flex-wrap'>

                <div className='w-[122vh] bg-[#1D1D1F] rounded-md p-4 shadow-md mb-6'>
                    <div className='flex items-center justify-between mb-4'>
                        <h2 className='text-lg font-semibold'>Transactions</h2>
                        {/* <div className='flex items-center'>
              <div className='flex items-center mr-4'>
                <div className='w-2 h-2 rounded-full bg-[#E91E63] mr-2' />
                <span className='text-sm text-gray-400'>Withdrawal</span>
              </div>
              <div className='flex items-center mr-4'>
                <div className='w-2 h-2 rounded-full bg-[#9C27B0] mr-2' />
                <span className='text-sm text-gray-400'>Subscriptions</span>
              </div>
              <div className='flex items-center mr-4'>
                <div className='w-2 h-2 rounded-full bg-[#4CAF50] mr-2' />
                <span className='text-sm text-gray-400'>Withdrawal Fee</span>
              </div>
              <div className='flex items-center'>
                <div className='w-2 h-2 rounded-full bg-[#FF9800] mr-2' />
                <span className='text-sm text-gray-400'>Maintenance Fee</span>
              </div>
            </div> */}
                        <div className='relative'>
                            <select className='bg-transparent border border-gray-700 rounded-md py-2 px-3 text-sm text-gray-400 focus:outline-none focus:border-blue-500'>
                                <option>Month</option>
                            </select>
                        </div>
                    </div>
                    <ReactApexChart options={monthlyTrendsDataState.options} series={monthlyTrendsDataState.series} type="line" height={350} />
                </div>

                {/* Summary Cards */}
                <div className='w-full md:min-w-[20rem] md:max-w-[20rem] flex flex-col gap-y-4'>
                    {summaryCardsData.map((card, index) => (
                        <div key={index} className='bg-[#1D1D1F] rounded-md p-4 shadow-md'>
                            <div className='flex items-center justify-between'>
                                <span className={`text-sm font-semibold`}>
                                    <p className='text-xl font-semibold mb-2'>{sumTransaction()}</p>
                                    <h3 className='text-sm text-gray-400 '>{card.subtitle}</h3>
                                </span>

                                <div>
                                    <img src={card?.img} alt="" />
                                    {
                                        card?.img2 && (
                                            <img src={card?.img2} alt="" className='mt-[-50px]' />
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className='mt-6 flex-1 '>
                        {summaryCardsData2.map((card, index) => (
                            <div key={index} className='bg-[#1D1D1F] rounded-md p-4 shadow-md'>
                                <h3 className='text-xl font-semibold'>{sumTransaction()}</h3>
                                <p className='text-sm text-gray-400 mb-2'>{card.subtitle}</p>
                                <div className='flex items-center justify-between'>
                                    <span className={`text-sm font-semibold ${!card.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                        {!card.isPositive ? <FaArrowUp className='inline-block mr-1' /> : <FaArrowDown className='inline-block mr-1' />}
                                        {card.percentage} than last month
                                    </span>

                                    <div>
                                        <img src={card?.img} alt="" />
                                        {
                                            card?.img2 && (
                                                <img src={card?.img2} alt="" className='mt-[-50px]' />
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='flex justify-between items-start gap-x-6 flex-wrap'>

                <div className={`${theme == "dark" ? "bg-[#1D1D1F]" : "border"} mt-6 p-4 flex-1 rounded-lg`}>
                    <p className={`${theme == "dark" && "text-white"}`}>Top countries</p>
                    {/* REAL DATA HERE */}
                    <div className="mt-4"> {/* Adjust margin as needed */}
                        <Chart options={processedCountryChartData.options} series={processedCountryChartData.series} type="bar" height={180} />
                    </div>
                </div>

                <div className={`mt-6 ${theme === 'dark' ? 'bg-[#1D1D1F]' : 'border'} p-4 flex-1 rounded-lg flex flex-col mt-6 `}>
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


            <div className='flex-1 overflow-y-auto mx-5 mt-8 text-white'>
                <div className='mt-8 bg-[#1d1d1f] rounded-lg p-6 shadow-md'>
                    <h2 className='text-lg font-semibold mb-4'>User Trends</h2>
                    <div className='mb-4'>
                        <div className='flex items-center mr-6'>
                            <span className='inline-block w-3 h-3 rounded-full bg-[#F44336] mr-2'></span>
                            <span>Listeners</span>
                            <span className='ml-2 text-sm text-gray-400'>{listenersCount}</span>
                        </div>
                        <div className='flex items-center mt-2'>
                            <span className='inline-block w-3 h-3 rounded-full bg-[#4B5563] mr-2'></span>
                            <span>Artists/Podcasters</span>
                            <span className='ml-2 text-sm text-gray-400'>{artistsPodcastersCount}</span>
                        </div>
                    </div>
                    <ReactApexChart options={userTrendsDataState.options} series={userTrendsDataState.series} type="bar" height={350} />
                </div>
            </div>
        </div>
    );
};

export default AdminAnalyticsPage;