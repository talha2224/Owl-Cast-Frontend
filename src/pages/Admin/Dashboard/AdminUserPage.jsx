import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../../config';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LineChart, Line, Tooltip } from 'recharts';
import toast from 'react-hot-toast';

const genderData = [
    { name: 'Male', value: 55, color: '#9370DB' },
    { name: 'Female', value: 45, color: '#E91E63' },
];

const ageData = [
    { age: '17-20', male: 70, female: 95 },
    { age: '21-25', male: 45, female: 60 },
    { age: '26-30', male: 30, female: 35 },
    { age: '31-35', male: 25, female: 30 },
    { age: '36-40', male: 18, female: 22 },
    { age: '41-45', male: 65, female: 70 },
    { age: '50+', male: 50, female: 55 },
];

const newUsersData = [
    { name: 'Jan', users: 120 },
    { name: 'Feb', users: 150 },
    { name: 'Mar', users: 100 },
    { name: 'Apr', users: 180 },
    { name: 'May', users: 160 },
    { name: 'Jun', users: 200 },
];

const activeUsersData = [
    { name: 'Male', value: 123456, color: '#9370DB' },
    { name: 'Female', value: 100789, color: '#E91E63' },
    { name: 'Inactive', value: 75789, color: '#FFCE56' },
];


const AdminUserPage = () => {

    const [data, setData] = useState([]);
    const [currentView, setCurrentView] = useState("table")

    const fetchDashboardData = async () => {
        try {
            const totalUser = await axios.get(`${config.baseUrl}/account/all`);
            setData(totalUser?.data?.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleAccountSuspend = async (userId)=>{
        let loader = toast.loading("Processing Request")
        try {
            const res = await axios.delete(`${config.baseUrl}/account/delete/account/${userId}`);
            if(res?.data){
                toast.dismiss(loader)
                toast.success("Account Suspended")
                fetchDashboardData()
            }


        } 
        catch (error) {
            
        }
    }

    const handleReactivateAccount = async (userId)=>{
        let loader = toast.loading("Processing Request")
        try {
            const res = await axios.put(`${config.baseUrl}/account/reactivate/account/${userId}`);
            if(res?.data){
                toast.dismiss(loader)
                toast.success("Account Reactivated")
                fetchDashboardData()
            }
        } 
        catch (error) {
            
        }
    }

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <div>

            <div className="flex justify-between items-center mb-4 bg-white p-2 rounded-md">
                <div className="flex items-center space-x-2">
                    <button className="bg-[#F2F2F2] rounded-md px-5 py-2 text-sm">Filter</button>
                    <input type="text" placeholder="Search..." className="rounded-md bg-[#F9F9F9] px-3 w-[15rem] py-2 outline-none border" />
                </div>
                <div className="flex items-center space-x-2">
                    <div className='flex items-center gap-x-3 bg-[#FBFBFB] rounded-full p-2'>
                        <button onClick={() => setCurrentView("table")} className={`${currentView === "table" ? "bg-white border" : "text-[#616161]"} py-1 px-6 rounded-full text-sm`}>Table</button>
                        <button onClick={() => setCurrentView("charts")} className={`${currentView === "charts" ? "bg-white border" : "text-[#616161]"} py-1 px-6 rounded-full text-sm`}>Charts</button>
                    </div>
                    <button className="bg-[#F2F2F2] rounded-md px-5 py-2 text-sm">Sort</button>
                </div>
            </div>



            {
                currentView === "table" ?
                    <div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border rounded-md">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b text-left font-normal text-sm text-nowrap">Username</th>
                                        <th className="py-2 px-4 border-b text-left font-normal text-sm text-nowrap">Contact Info</th>
                                        <th className="py-2 px-4 border-b text-left font-normal text-sm text-nowrap">Registration Date</th>
                                        <th className="py-2 px-4 border-b text-left font-normal text-sm text-nowrap">IP Address</th>
                                        <th className="py-2 px-4 border-b text-left font-normal text-sm text-nowrap">Account Type</th>
                                        <th className="py-2 px-4 border-b text-left font-normal text-sm text-nowrap">Status</th>
                                        <th className="py-2 px-4 border-b text-left font-normal text-sm text-nowrap">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((user) => (
                                        <tr key={user._id}>
                                            <td className="text-[#616161] py-2 px-4 border-b text-nowrap">{`${user.firstName} ${user.lastName}`}</td>
                                            <td className="text-[#616161] py-2 px-4 border-b text-nowrap">{user.email}</td>
                                            <td className="text-[#616161] py-2 px-4 border-b text-nowrap">{new Date(user.createdAt).toLocaleDateString()}</td>
                                            <td className="text-[#616161] py-2 px-4 border-b text-nowrap">17.172.224.47</td>
                                            <td className="text-[#616161] py-2 px-4 border-b text-nowrap">User</td>
                                            <td className="py-2 px-4 border-b">
                                                <span className={`px-2 py-1 rounded-md text-xs text-nowrap ${user.accountBlocked ? 'bg-red-200 text-red-700' : 'bg-[#DCEDFF] text-[#007AFF]'}`}>{user.accountBlocked ? 'Suspended' : 'Active'}</span>
                                            </td>
                                            <td className="py-2 px-4 border-b">
                                                {
                                                    !user.accountBlocked ?<span onClick={()=>handleAccountSuspend(user?._id)} className={`px-2 py-1 cursor-pointer text-nowrap rounded-md text-xs bg-red-200 text-red-700`}>Suspend Account</span>:
                                                    <span onClick={()=>handleReactivateAccount(user?._id)} className={`px-2 py-1 cursor-pointer text-nowrap rounded-md text-xs bg-[#DCEDFF] text-[#007AFF]`}>Reactivate Account</span>
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                            <p className="text-sm text-gray-600">Showing 1-5 from {data.length} data</p>
                            <div className="flex space-x-2">
                                <button className="border rounded p-2">1</button>
                                <button className="border rounded p-2">2</button>
                                <button className="border rounded p-2">3</button>
                                <button className="border rounded p-2">...</button>
                            </div>
                        </div>
                    </div>
                    :

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-md p-4">
                            <h2 className="text-lg font-semibold mb-4">User Gender</h2>
                            <div className='flex justify-center items-center'>
                                <PieChart width={300} height={250}>
                                    <Pie data={genderData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${(percent * 100).toFixed(0)}% ${name}`} outerRadius={80} fill="#8884d8" dataKey="value">
                                        {genderData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                                    </Pie>
                                    <Legend />
                                </PieChart>
                            </div>
                        </div>

                        <div className="bg-white rounded-md p-4">
                            <h2 className="text-lg font-semibold mb-4">Ages</h2>
                            <BarChart width={670} height={250} data={ageData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="age" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="male" fill="#9370DB" />
                                <Bar dataKey="female" fill="#E91E63" />
                            </BarChart>
                        </div>

                        <div className="bg-white rounded-md p-4">
                            <h2 className="text-lg font-semibold mb-4">New Users</h2>
                            <LineChart width={670} height={250} data={newUsersData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="users" stroke="#9370DB" strokeWidth={2} />
                            </LineChart>
                            <div className="flex justify-around mt-4">
                                <div>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 rounded-full bg-[#9370DB] mr-2"></div>
                                        <span>New Users</span>
                                    </div>
                                    <span className="font-semibold">123,656</span>
                                </div>
                                <div>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 rounded-full bg-[#E91E63] mr-2"></div>
                                        <span>Returning User</span>
                                    </div>
                                    <span className="font-semibold">100,987</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-md p-4">
                            <h2 className="text-lg font-semibold mb-4">Active Users</h2>

                            <div className='flex justify-between items-center mt-4'>
                                <div className='flex justify-center items-center'>
                                    <PieChart width={300} height={250}>
                                        <Pie data={activeUsersData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${(percent * 100).toFixed(0)}% ${name}`} outerRadius={80} fill="#8884d8" dataKey="value">
                                            {activeUsersData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                                        </Pie>
                                        <Legend />
                                    </PieChart>
                                </div>
                                <div className="">

                                    <div className='flex items-center gap-x-8'>
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 rounded-full bg-[#9370DB] mr-2"></div>
                                            <span className='text-[#616161]'>Male</span>
                                        </div>
                                        <span className="">123,456</span>
                                    </div>
                                    
                                    <div className='flex items-center gap-x-8'>
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 rounded-full bg-[#E91E63] mr-2"></div>
                                            <span className='text-[#616161]'>Female</span>
                                        </div>
                                        <span className="">100,789</span>
                                    </div>

                                    <div className='flex items-center gap-x-8'>
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 rounded-full bg-[#FFCE56] mr-2"></div>
                                            <span className='text-[#616161]'>Inactive</span>
                                        </div>
                                        <span className="">75,789</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
            }



        </div>
    );
};

export default AdminUserPage;