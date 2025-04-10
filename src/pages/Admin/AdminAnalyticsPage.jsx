import React from 'react';
import ReactApexChart from 'react-apexcharts';
import Chart from 'react-apexcharts';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import img1 from '../../assets/dashboard/admin/1.svg'
import img2 from '../../assets/dashboard/admin/2.svg'
import img3 from '../../assets/dashboard/admin/3.png'
import img4 from '../../assets/dashboard/admin/4.png'
import { useTheme } from '../../context/ThemeContext';


const AdminAnalyticsPage = () => {
    const { theme } = useTheme();

    const monthlyTrendsData = {
        series: [
            { name: 'Withdrawal', data: [45, 52, 38, 60, 70, 48, 55, 62, 50, 58, 65, 72] },
            { name: 'Subscriptions', data: [30, 40, 35, 50, 45, 60, 70, 55, 40, 50, 60, 65] },
            { name: 'Withdrawal Fee', data: [15, 20, 10, 25, 30, 18, 22, 28, 15, 20, 25, 30] },
            { name: 'Maintenance Fee', data: [20, 25, 30, 35, 40, 28, 32, 38, 25, 30, 35, 40] },
        ],
        options: {
            chart: {
                id: 'monthly-trends',
                toolbar: { show: false },
                zoom: { enabled: false },
                foreColor: '#A1A1AA',
            },
            colors: ['#E91E63', '#9C27B0', '#4CAF50', '#FF9800'],
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
    };

    const summaryCardsData = [
        { title: '$120,345', subtitle: 'Withdrawal', percentage: '+0.5%', isPositive: true, iconColor: '#E91E63', img: img1, img2: img2 },
        { title: '$32,345', subtitle: 'Withdrawal Fee', percentage: '+0.5%', isPositive: true, iconColor: '#4CAF50', img: img1, img2: img2 },
        { title: '$130,562', subtitle: 'Subscriptions', percentage: '-2%', isPositive: false, progress: 75, iconColor: '#9C27B0', img: img3, img2: null },
        { title: '$53,562', subtitle: 'Maintenance Fee', percentage: '-2%', isPositive: false, iconColor: '#FF9800', img: img4, img2: null },
    ];
    const summaryCardsData2 = [
        { title: '$32,345', subtitle: 'Withdrawal Fee', percentage: '+0.5%', isPositive: true, iconColor: '#4CAF50', img: img1, img2: img2 },
        { title: '$130,562', subtitle: 'Subscriptions', percentage: '-2%', isPositive: false, progress: 75, iconColor: '#9C27B0', img: img3, img2: null },
    ];
    const topCountriesData = [
        { country: 'Indonesia', users: 64967, change: '+12%' },
        { country: 'Australia', users: 34567, change: '-5%' },
        { country: 'United States', users: 22456, change: '+8%' },
        { country: 'Japan', users: 11567, change: '-2%' },
        { country: 'France', users: 10567, change: '-1%' },
    ];

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

    const userTrendsData = {
        series: [
            { name: 'Listeners', data: [90, 55, 70, 95, 30, 98, 92, 60, 75, 80, 95, 98] },
            { name: 'Artists/Podcasters', data: [110, 45, 60, 120, 25, 115, 100, 40, 55, 130, 110, 50] },
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
    };

    const listenersCount = userTrendsData.series[0].data.reduce((sum, value) => sum + value, 0);
    const artistsPodcastersCount = userTrendsData.series[1].data.reduce((sum, value) => sum + value, 0);


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
                    <ReactApexChart options={monthlyTrendsData.options} series={monthlyTrendsData.series} type="line" height={350} />
                </div>

                {/* Summary Cards */}
                <div className='w-full md:min-w-[22rem] md:max-w-[22rem] flex flex-col gap-y-4'>
                    {summaryCardsData.map((card, index) => (
                        <div key={index} className='bg-[#1D1D1F] rounded-md p-4 shadow-md'>
                            <h3 className='text-xl font-semibold'>{card.title}</h3>
                            <p className='text-sm text-gray-400 mb-2'>{card.subtitle}</p>
                            <div className='flex items-center justify-between'>
                                <span className={`text-sm font-semibold ${card.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                    {card.isPositive ? <FaArrowUp className='inline-block mr-1' /> : <FaArrowDown className='inline-block mr-1' />}
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

            <div className='flex justify-between items-start gap-x-6 flex-wrap'>

                <div className='bg-[#1d1d1f] p-5 rounded-md mt-6 shadow-md flex-1 min-w-[300px]'>
                    <h2 className='text-lg font-semibold mb-4'>Top Country</h2>
                    <div className='text-sm text-gray-400 mb-2'>
                        <div className='flex justify-between'>
                            <span>Country</span>
                            <span>Users</span>
                        </div>
                    </div>
                    <div>
                        {topCountriesData.map((country, index) => (
                            <div className='flex justify-between items-center mb-2'>
                                <div className='flex items-center'>
                                    <span className={`inline-block w-2 h-2 rounded-full bg-[#EC4899] mr-2`}></span>
                                    <span>{country.country}</span>
                                </div>
                                <div className='flex items-center'>
                                    <span className={`mr-1 ${country.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                        {country.change.startsWith('+') ? <FaArrowUp className='inline-block mr-0.5' /> : <FaArrowDown className='inline-block mr-0.5' />}
                                        {country.change}
                                    </span>
                                    <span className='font-semibold'>{country.users.toLocaleString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='mt-6 flex-1 '>
                    {summaryCardsData2.map((card, index) => (
                        <div key={index} className='bg-[#1D1D1F] rounded-md p-4 shadow-md mb-2'>
                            <h3 className='text-xl font-semibold'>{card.title}</h3>
                            <p className='text-sm text-gray-400 mb-2'>{card.subtitle}</p>
                            <div className='flex items-center justify-between'>
                                <span className={`text-sm font-semibold ${card.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                    {card.isPositive ? <FaArrowUp className='inline-block mr-1' /> : <FaArrowDown className='inline-block mr-1' />}
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

                <div className={`${theme === 'dark' ? 'bg-[#1D1D1F]' : 'border'} p-4 flex-1 rounded-lg flex flex-col mt-6 `}>
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
                    <ReactApexChart options={userTrendsData.options} series={userTrendsData.series} type="bar" height={350} />
                </div>
            </div>
        </div>
    );
};

export default AdminAnalyticsPage;