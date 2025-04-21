import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FaUserCog, FaEnvelope } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa6';
import axios from 'axios';
import config from '../../config';
import toast from 'react-hot-toast';

const AdminSettingsPage = () => {
    const { theme } = useTheme();
    const [showAdd, setshowAdd] = useState(false)
    const [data, setData] = useState({ role: "sub admin", firstName: "", lastName: "", email: "", password: "", });
    const [user, setUser] = useState([])
    const [platformSettings, setPlatformSettings] = useState({
        withdrawalFeePercentage: "",
        pricing: {
            student: "",
            individual: "",
            family: ""
        }
    });

    const handleContinue = async () => {
        let loader = toast.loading("Processing Request")
        try {
            const payload = { role: data.role, firstName: data.firstName, lastName: data.lastName, email: data.email, password: data.password };
            console.log(payload)
            const res = await axios.post(`${config.baseUrl}/account/register`, payload);
            if (res?.data?.data) {
                fetchData()
                toast.dismiss(loader)
                toast.success("Sub Admin Created")
                setshowAdd(false);
            }
        }
        catch (err) {
            console.error(err.response?.data?.msg || "Registration failed");
            toast.dismiss(loader)
            toast.error(err.response?.data?.msg)
        }

    };

    const fetchData = async () => {
        try {
            let res = await axios.get(`${config.baseUrl}/account/all`)
            setUser(res?.data?.data?.filter((i) => (i?.email !== "admin@owlcast.com" && i?.role == "sub admin")))
        }
        catch (error) {
            console.log(error)
        }
    }
    const fetchPlatformSettings = async () => {
        try {
            const res = await axios.get(`${config.baseUrl}/platform/get`);
            if (res?.data?.data) {
                setPlatformSettings(res.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch platform settings", error);
        }
    };

    const handleDelete = async (id) => {
        let loader = toast.loading("Processing Request")
        try {
            let res = await axios.delete(`${config.baseUrl}/account/${id}`)
            if (res?.data) {
                toast.dismiss(loader)
                toast.success("Sub Admin Deleted")
                fetchData()
            }
        }
        catch (error) {
            console.log(error)
            toast.dismiss(loader)
            toast.error(error.response?.data?.msg)

        }
    }

    const savePlatformSettings = async () => {
        let loader = toast.loading("Saving Platform Settings...");
        try {
            const payload = {
                withdrawalFeePercentage: parseFloat(platformSettings.withdrawalFeePercentage),
                pricing: {
                    student: parseFloat(platformSettings.pricing.student),
                    individual: parseFloat(platformSettings.pricing.individual),
                    family: parseFloat(platformSettings.pricing.family)
                }
            };
    
            const res = await axios.post(`${config.baseUrl}/platform/save`, payload);
            if (res?.data?.data) {
                toast.dismiss(loader);
                toast.success("Platform Settings Saved Successfully");
            }
        } catch (err) {
            console.error(err);
            toast.dismiss(loader);
            toast.error(err.response?.data?.msg || "Failed to Save Settings");
        }
    };
    

    useEffect(() => {
        fetchData()
        fetchPlatformSettings()
    }, [])

    return (
        <div className={`flex-1 overflow-x-auto mx-5 mt-8 p-6 bg-[#1D1D1F] rounded-md md:flex text-[#fff] flex-wrap`}>
            {/* Access Control Section */}
            <div className="md:w-1/2 md:pr-8">
                <div className='flex justify-between items-center mb-4'>
                    <h2 className="text-lg font-semibold mb-4">Access Control</h2>
                    <button onClick={() => setshowAdd(true)} className={`px-4 py-2 rounded-md text-white text-xs bg-blue-500  focus:outline-none focus:ring-2  focus:ring-offset-1`}>Add</button>
                </div>
                <ul>
                    {user.map((item, index) => (
                        <li key={index} className={`flex items-center flex-wrap justify-between text-xs py-3 bg-[#262628] mb-3 px-3 rounded-lg`}>
                            <div className="bg-[#828287] rounded-full p-2 mr-3">
                                <FaUser className="text-white" />
                            </div>
                            <div className="font-medium">{item.role}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{item.firstName}</div>

                            <div className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                                <FaEnvelope className="inline-block mr-1" />
                                {item.email}
                            </div>
                            <button onClick={() => handleDelete(item?._id)} className={`px-4 py-2 rounded-md text-white text-xs bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-1`}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Platform Settings Section */}
            <div className="md:w-1/2 md:pl-8 text-[#828287]">
                <h2 className="text-lg font-semibold mb-4">Platform Settings</h2>

                <div className='mt-2'>
                    <p className=' text-xs'>Set withdrawal fee percentages</p>
                    <input
                        type="number"
                        value={platformSettings.withdrawalFeePercentage}
                        onChange={(e) => setPlatformSettings({ ...platformSettings, withdrawalFeePercentage: e.target.value })}
                        className='bg-[#262628] h-[2.3rem] w-full px-3 rounded-md outline-none border-none mt-1'
                    />
                </div>

                <div className='mt-2'>
                    <p className=' text-xs'>Pricing</p>
                    <input
                        placeholder='Student'
                        type="number"
                        value={platformSettings.pricing.student}
                        onChange={(e) => setPlatformSettings({
                            ...platformSettings,
                            pricing: { ...platformSettings.pricing, student: e.target.value }
                        })}
                        className='placeholder:text-sm bg-[#262628] h-[2.3rem] w-full px-3 rounded-md outline-none border-none mt-1'
                    />
                </div>

                <div className='mt-2'>
                    <input
                        placeholder='Individual'
                        type="number"
                        value={platformSettings.pricing.individual}
                        onChange={(e) => setPlatformSettings({
                            ...platformSettings,
                            pricing: { ...platformSettings.pricing, individual: e.target.value }
                        })}
                        className='placeholder:text-sm bg-[#262628] h-[2.3rem] w-full px-3 rounded-md outline-none border-none mt-1'
                    />
                </div>

                <div className='mt-2'>
                    <input
                        placeholder='Family'
                        type="number"
                        value={platformSettings.pricing.family}
                        onChange={(e) => setPlatformSettings({
                            ...platformSettings,
                            pricing: { ...platformSettings.pricing, family: e.target.value }
                        })}
                        className='placeholder:text-sm bg-[#262628] h-[2.3rem] w-full px-3 rounded-md outline-none border-none mt-1'
                    />
                </div>

                <button onClick={savePlatformSettings} className={`mt-2 px-4 py-2 rounded-md text-white text-xs bg-blue-500  focus:outline-none focus:ring-2  focus:ring-offset-1`}>Save</button>


            </div>

            {
                showAdd && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">

                        <div className={`${theme === "dark" ? "bg-[#1A1A1B] text-gray-300" : "bg-white text-gray-700"} rounded-md shadow-lg p-6 w-full max-w-md`}>

                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-lg font-medium">Create Sub Admin</h2>
                                    <p className='text-xs text-[#8D8D8D] mt-1'>Create sub admin to monitor</p>
                                </div>
                                <button onClick={() => setshowAdd(false)} className="focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <p className='text-sm'>Metadata</p>
                            <input onChange={(e) => setData({ ...data, firstName: e.target?.value })} type="text" name="" id="" placeholder='First Name' className='w-[100%] h-[2.3rem] px-3 rounded-md border border-[#444444] bg-transparent mt-2 text-sm placeholder:text-sm' />
                            <input onChange={(e) => setData({ ...data, lastName: e.target?.value })} type="text" name="" id="" placeholder='Last Name' className='w-[100%] h-[2.3rem] px-3 rounded-md border border-[#444444] bg-transparent mt-2 text-sm placeholder:text-sm' />
                            <input onChange={(e) => setData({ ...data, email: e.target?.value })} type="text" name="" id="" placeholder='Email' className='w-[100%] h-[2.3rem] px-3 rounded-md border border-[#444444] bg-transparent mt-2 text-sm placeholder:text-sm' />
                            <input onChange={(e) => setData({ ...data, password: e.target?.value })} type="password" name="" id="" placeholder='Password' className='w-[100%] h-[2.3rem] px-3 rounded-md border border-[#444444] bg-transparent mt-2 text-sm placeholder:text-sm' />

                            <button onClick={handleContinue} className="bg-[#FF1700] text-sm w-[100%] py-2 mt-2 rounded-md">Add Now</button>

                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default AdminSettingsPage;