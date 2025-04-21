import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import CoverImage from '../../assets/dashboard/cover.svg'; // Assuming you have a default image
import axios from 'axios';
import config from '../../config';

const AdminTransactionsPage = () => {
    const { theme } = useTheme();
    const [transactionsData, setTransactionData] = useState([])


    const fetchData = async () => {
        try {
            let transaction = await axios.get(`${config.baseUrl}/transaction/all`)
            setTransactionData(transaction?.data?.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className={`flex-1 overflow-x-auto mx-5 mt-8  rounded-md shadow-md text-[#fff]`}>
            <div className="p-4 bg-[#1D1D1F] rounded-md">
                <h2 className="text-lg font-semibold mb-4">Transactions</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="text-left text-xs text-gray-500">
                            <tr>
                                <th className="py-2 pr-4 font-medium text-nowrap"># Id</th>
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
                            {transactionsData?.map((item, index) => (
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
    );
};

export default AdminTransactionsPage;