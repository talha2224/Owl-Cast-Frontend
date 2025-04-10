import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FaUserCog, FaEnvelope } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa6';

const AdminSettingsPage = () => {
    const { theme } = useTheme();

    const accessControlData = [
        {
            role: 'Admin',
            type: 'Super Admin',
            email: 'john.doe@email.com',
            buttonText: 'Create session',
            buttonColor: 'bg-blue-500',
        },
        {
            role: 'Admin',
            type: 'Support Admin',
            email: 'jane.doe@email.com',
            buttonText: 'Reset password',
            buttonColor: 'bg-red-500',
        },
        {
            role: 'Admin',
            type: 'Support Admin',
            email: 'david.smith@email.com',
            buttonText: 'Deactivate',
            buttonColor: 'bg-red-500',
        },
    ];

    const platformSettingsLabels = [
        'Set withdrawal percentage',
        'Fee percentage',
        'Pricing',
        'Standard',
        'Individual',
        'Family',
    ];

    return (
        <div className={`flex-1 overflow-x-auto mx-5 mt-8 p-6 bg-[#1D1D1F] rounded-md md:flex text-[#fff] flex-wrap`}>
            {/* Access Control Section */}
            <div className="md:w-1/2 md:pr-8">
                <h2 className="text-lg font-semibold mb-4">Access Control</h2>
                <ul>
                    {accessControlData.map((item, index) => (
                        <li key={index} className={`flex items-center flex-wrap justify-between text-xs py-3 bg-[#262628] mb-3 px-3 rounded-lg`}>
                            <div className="bg-[#828287] rounded-full p-2 mr-3">
                                <FaUser className="text-white" />
                            </div>
                            <div className="font-medium">{item.role}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{item.type}</div>

                            <div className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                                <FaEnvelope className="inline-block mr-1" />
                                {item.email}
                            </div>
                            <button className={`px-4 py-2 rounded-md text-white text-xs ${item.buttonColor} hover:${item.buttonColor}-700 focus:outline-none focus:ring-2 focus:ring-${item.buttonColor}-500 focus:ring-offset-1`}>{item.buttonText}</button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Platform Settings Section */}
            <div className="md:w-1/2 md:pl-8 text-[#828287]">
                <h2 className="text-lg font-semibold mb-4">Platform Settings</h2>

                <div className='mt-2'>
                    <p className=' text-xs'>Set withdrawal fee percentages</p>
                    <input type="text" name="" id="" className='bg-[#262628] h-[2.3rem] w-full px-3 rounded-md outline-none border-none mt-1' />
                </div>
                <div className='mt-2'>
                    <p className=' text-xs'>Pricing</p>
                    <input placeholder='Student' type="text" name="" id="" className=' placeholder:text-sm bg-[#262628] h-[2.3rem] w-full px-3 rounded-md outline-none border-none mt-1' />
                </div>
                <div className='mt-2'>
                    <input placeholder='Individual' type="text" name="" id="" className=' placeholder:text-sm bg-[#262628] h-[2.3rem] w-full px-3 rounded-md outline-none border-none mt-1' />
                </div>
                <div className='mt-2'>
                    <input placeholder='Family' type="text" name="" id="" className=' placeholder:text-sm bg-[#262628] h-[2.3rem] w-full px-3 rounded-md outline-none border-none mt-1' />
                </div>

            </div>
        </div>
    );
};

export default AdminSettingsPage;