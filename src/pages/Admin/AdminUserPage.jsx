import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import CoverImage from '../../assets/dashboard/cover.svg';
import { HiDotsVertical } from 'react-icons/hi';
import { FaUser, FaArrowUp, FaCalendarAlt, FaDollarSign, FaArrowDown } from 'react-icons/fa';
import axios from 'axios';
import config from '../../config';

const AdminUserPage = () => {

  const [data, setData] = useState([])

  const fetchData = async () => {
    try {
      let res = await axios.get(`${config.baseUrl}/account/all`)
      setData(res?.data?.data?.filter((i) => (i?.email !== "admin@owlcast.com")))
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <div className={`flex-1 overflow-x-auto mx-5 mt-8 `}>

      <div className="flex items-center p-4 bg-[#1D1D1F] rounded-md">
        <FaUser className="text-yellow-500 mr-5 text-xl" />
        <div className="">
          <h2 className=" text-[#fff] text-sm">Total User</h2>
          <span className="text-2xl text-yellow-500 mt-1">{data?.length} user</span>
        </div>
      </div>

      <div className="overflow-x-auto bg-[#1D1D1F] mt-5 rounded-md">
        <table className="min-w-full text-white">
          <tbody className="">
            {data.map((user, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {/* <div className="h-10 w-10 rounded-full overflow-hidden">
                      <img src={user.avatar} alt={user.username} className="h-full w-full object-cover" />
                    </div> */}
                    <div>
                      <div className="text-sm font-medium">{user?.firstName}</div>
                      <div className="mt-2 text-gray-500 dark:text-gray-400">{user?.role}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{user.uploads}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-1 text-gray-500 dark:text-gray-400 text-xs" />
                    {user.dob}
                  </div>
                </td>
                <td>
                  <div className="text-sm font-medium">Created At</div>
                  <div className="mt-2 text-gray-500 dark:text-gray-400">{user?.createdAt}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm">{user.country}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded-md text-xs font-semibold ${user.planName!="free" ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'}`}>
                    {user.planName}
                  </span>
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    <HiDotsVertical className="h-5 w-5" />
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <div className="flex items-center justify-between p-4">
        <div className="text-sm text-gray-500 dark:text-gray-400">Showing from data</div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 disabled:opacity-50" disabled>&lt;</button>
          <span className="px-3 py-1 rounded-md bg-[#FF4500] text-white">1</span>
          <button className="px-3 py-1 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800">2</button>
          <button className="px-3 py-1 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800">&gt;</button>
        </div>
      </div> */}
    </div>
  );
};

export default AdminUserPage;