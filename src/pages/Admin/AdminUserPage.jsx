import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import CoverImage from '../../assets/dashboard/cover.svg';
import { HiDotsVertical } from 'react-icons/hi';
import { FaUser, FaArrowUp, FaCalendarAlt, FaDollarSign, FaArrowDown } from 'react-icons/fa';

const AdminUserPage = () => {
  const { theme } = useTheme();

  const usersData = [
    {
      username: 'Username',
      avatar: CoverImage,
      streams: '90,876,506',
      streamChange: '0.4%',
      uploads: 30,
      lastUpload: 'Jan 15, 2025',
      earnings: '$100,543.00',
      status: 'Active',
    },
    {
      username: 'Username',
      avatar: CoverImage,
      streams: '13,985,002',
      streamChange: '-2%',
      uploads: 220,
      lastUpload: 'Last upload',
      earnings: '$1,580,119.00',
      status: 'Inactive',
    },
    {
      username: 'Username',
      avatar: CoverImage,
      streams: '11,740,044',
      streamChange: '0.6%',
      uploads: 27,
      lastUpload: 'Feb 9, 2024',
      earnings: '$652,300.99',
      status: 'Active',
    },
    {
      username: 'Username',
      avatar: CoverImage,
      streams: '12,932,044',
      streamChange: '7%',
      uploads: 31,
      lastUpload: '2 weeks ago',
      earnings: '$220,985.88',
      status: 'Active',
    },
    {
      username: 'Username',
      avatar: CoverImage,
      streams: '100,932,183',
      streamChange: '4%',
      uploads: 42,
      lastUpload: 'Dec 1, 2020',
      earnings: '$500,180.09',
      status: 'Active',
    },
    {
      username: 'Username',
      avatar: CoverImage,
      streams: '100,932,183',
      streamChange: '4%',
      uploads: 42,
      lastUpload: 'Dec 1, 2020',
      earnings: '$500,180.09',
      status: 'Active',
    },
    {
      username: 'Username',
      avatar: CoverImage,
      streams: '100,932,183',
      streamChange: '4%',
      uploads: 42,
      lastUpload: 'Dec 1, 2020',
      earnings: '$500,180.09',
      status: 'Active',
    },
    {
      username: 'Username',
      avatar: CoverImage,
      streams: '100,932,183',
      streamChange: '4%',
      uploads: 42,
      lastUpload: 'Dec 1, 2020',
      earnings: '$500,180.09',
      status: 'Active',
    },
    {
      username: 'Username',
      avatar: CoverImage,
      streams: '100,932,183',
      streamChange: '4%',
      uploads: 42,
      lastUpload: 'Dec 1, 2020',
      earnings: '$500,180.09',
      status: 'Active',
    },
  ];

  return (
    <div className={`flex-1 overflow-x-auto mx-5 mt-8 `}>

      <div className="flex items-center p-4 bg-[#1D1D1F] rounded-md">
          <FaUser className="text-yellow-500 mr-5 text-xl" />
        <div className="">
          <h2 className=" text-[#fff] text-sm">Total User</h2>
          <span className="text-2xl text-yellow-500">12.3M user</span>
        </div>
      </div>

      <div className="overflow-x-auto bg-[#1D1D1F] mt-5 rounded-md">
        <table className="min-w-full text-white">
          <tbody className="">
            {usersData.map((user, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <img src={user.avatar} alt={user.username} className="h-full w-full object-cover" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium">{user.username}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Artist / Podcaster</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm">{user.streams}</div>
                  {user.streamChange && (
                    <div className={`text-xs font-semibold ${user.streamChange.startsWith('-') ? 'text-red-500' : 'text-green-500'} flex items-center`}>
                      {user.streamChange.startsWith('-') ? <FaArrowDown className="mr-1" /> : <FaArrowUp className="mr-1" />}
                      {user.streamChange}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{user.uploads}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {user.lastUpload === 'Last upload' ? (
                    user.lastUpload
                  ) : (
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-1 text-gray-500 dark:text-gray-400 text-xs" />
                      {user.lastUpload}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center">
                    <FaDollarSign className="mr-1 text-green-500 text-xs" />
                    {user.earnings}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    <HiDotsVertical className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between p-4">
        <div className="text-sm text-gray-500 dark:text-gray-400">Showing from data</div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 disabled:opacity-50" disabled>&lt;</button>
          <span className="px-3 py-1 rounded-md bg-[#FF4500] text-white">1</span>
          <button className="px-3 py-1 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800">2</button>
          <button className="px-3 py-1 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800">&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default AdminUserPage;