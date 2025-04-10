import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import CoverImage from '../../assets/dashboard/cover.svg'; // Assuming you have a default image

const AdminTransactionsPage = () => {
    const { theme } = useTheme();

    const transactionsData = [
        {
            transactionId: '79122083',
            username: 'Username',
            avatar: CoverImage,
            totalAmount: '$200,000',
            status: 'Successful',
            lastTransaction: '2023-03-07 07:31:06',
        },
        {
            transactionId: '79214204',
            username: 'Username',
            avatar: CoverImage,
            totalAmount: '$400,000',
            status: 'Successful',
            lastTransaction: '2023-03-05 19:16:28',
        },
        // Add more transaction data here
    ];

    return (
        <div className={`flex-1 overflow-x-auto mx-5 mt-8  rounded-md shadow-md text-[#fff]`}>
            <div className="p-4 bg-[#1D1D1F] rounded-md">
                <h2 className="text-lg font-semibold mb-4">Transactions</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className={`sticky top-0`}>
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Transaction ID
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Username
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Total amount
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Last transaction
                                </th>
                            </tr>
                        </thead>

                        <tbody className="">
                            {transactionsData.map((transaction) => (
                                <tr key={transaction.transactionId}>
                                    <td colSpan={5} className="py-1">
                                        <div className="flex items-center bg-[#262628] rounded-lg px-6 py-4 mb-3">
                                            <div className="w-1/5 text-sm font-medium">{transaction.transactionId}</div>
                                            <div className="w-1/5 flex items-center">
                                                <div className="h-8 w-8 rounded-full overflow-hidden">
                                                    <img src={transaction.avatar} alt={transaction.username} className="h-full w-full object-cover" />
                                                </div>
                                                <div className="ml-2 text-sm">{transaction.username}</div>
                                            </div>
                                            <div className="w-1/5 text-sm">{transaction.totalAmount}</div>
                                            <div className="w-1/5 text-sm">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${transaction.status === 'Successful' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'}`}>
                                                    {transaction.status}
                                                </span>
                                            </div>
                                            <div className="w-1/5 text-sm">{transaction.lastTransaction}</div>
                                        </div>
                                    </td>
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