import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { FaCreditCard } from "react-icons/fa";

const ProfilePage = () => {
    const { theme } = useTheme();
    const nav = useNavigate();
    const [isPaymentMethodsOpen, setIsPaymentMethodsOpen] = useState(false);
    const [isAddPaymentMethodOpen, setIsAddPaymentMethodOpen] = useState(false);

    let containerStyle = `${theme === "dark"
            ? "text-gray-300 bg-[#1A1A1B] hover:bg-[#262628]"
            : "text-gray-700 bg-gray-100 hover:bg-gray-200"
        } flex items-center justify-between rounded-md px-3 py-3 text-sm cursor-pointer`;
    let containerStyle2 = `w-full md:w-[25rem] ${theme === "dark"
            ? "text-gray-300 bg-[#1A1A1B] hover:bg-[#262628]"
            : "text-gray-700 bg-gray-100 hover:bg-gray-200"
        } flex items-center justify-between rounded-md px-3 py-3 text-sm cursor-pointer`;

    const openPaymentMethods = () => {
        setIsPaymentMethodsOpen(true);
        setIsAddPaymentMethodOpen(false); // Close the add payment method modal if open
    };

    const closePaymentMethods = () => {
        setIsPaymentMethodsOpen(false);
        setIsAddPaymentMethodOpen(false); // Close the add payment method modal as well
    };

    const openAddPaymentMethod = () => {
        setIsAddPaymentMethodOpen(true);
    };

    const closeAddPaymentMethod = () => {
        setIsAddPaymentMethodOpen(false);
    };

    return (
        <div className="flex-1 overflow-x-auto p-5 relative">
            <p className={`${theme === "dark" && "text-white"} font-medium text-lg`}>
                Account Summary
            </p>

            <div className="mt-6 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
                <div className={containerStyle}>
                    <div>
                        <p className="text-sm">{localStorage.getItem("email")}</p>
                    </div>
                    <button className="text-[#FF1700] text-sm focus:outline-none">
                        Edit
                    </button>
                </div>

                <div className={containerStyle} onClick={openPaymentMethods}>
                    <div>
                        <p className="text-sm">Payment Type</p>
                    </div>
                    <button className="text-[#FF1700] text-sm focus:outline-none">
                        Manage Payments
                    </button>
                </div>

                <div className={containerStyle}>
                    <div>
                        <p className="text-sm">Billing address</p>
                    </div>
                    <p className="text-[#FF1700] text-sm">Gregg Edward</p>
                </div>

                <div className={containerStyle}>
                    <p className="text-sm mr-2">Country / Region</p>
                    <div className="flex items-center gap-x-3">
                        <img
                            src="https://cdn.britannica.com/79/4479-050-6EF87027/flag-Stars-and-Stripes-May-1-1795.jpg"
                            alt=""
                            className="h-[1rem] w-[1rem] rounded-full"
                        />
                        <div className="text-sm">United States</div>
                    </div>
                </div>

                <div className={containerStyle}>
                    <div>
                        <p className="text-sm">Account Balance</p>
                    </div>
                    <p className="text-[#50C878] text-sm">$0.00</p>
                </div>

                <div className={containerStyle2} onClick={openPaymentMethods}>
                    <div>
                        <p className="text-sm">View and manage your subscriptions</p>
                    </div>
                    <button className="text-[#FF1700] text-sm focus:outline-none">
                        Manage
                    </button>
                </div>
            </div>

            {isPaymentMethodsOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div
                        className={`${theme === "dark" ? "bg-[#1A1A1B] text-gray-300" : "bg-white text-gray-700"
                            } rounded-md shadow-lg p-6 w-full max-w-md`}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Payment Methods</h2>
                            <button onClick={closePaymentMethods} className="focus:outline-none">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div>
                            <h3 className="text-md font-semibold mb-2">
                                Media Purchases & Subscriptions
                            </h3>
                            <div className="py-4">
                                <p className="text-sm mb-2">No payment methods</p>
                                <p className="text-xs text-gray-500 mb-2">
                                    You do not have any payment methods set up for your media
                                    purchases and subscriptions.
                                </p>
                                <button
                                    onClick={openAddPaymentMethod}
                                    className="text-[#FF1700] text-sm font-semibold focus:outline-none"
                                >
                                    Add a payment method
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isAddPaymentMethodOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className={`${theme === "dark" ? "bg-[#1A1A1B] text-gray-300" : "bg-white text-gray-700"} rounded-md shadow-lg p-6 w-full max-w-sm`}>
                        <div className="flex justify-between items-center mb-4">
                            <IoChevronBackOutline onClick={closeAddPaymentMethod} className="cursor-pointer" />
                            <FaCreditCard className="text-[#3771C8]"/>
                            <RxCross2 onClick={closeAddPaymentMethod} className="cursor-pointer" />
                        </div>

                        <p className="text-center">New Payment Method</p>
                        <p className="text-sm text-gray-500 mb-4 mt-1 text-center">This will be saved as your new default payment method.</p>

                        <div className="mb-3">
                            <label htmlFor="paymentType" className="block text-sm font-medium"> Payment type</label>
                            <select id="paymentType" className={`h-[2.4rem] px-2 outline-none border-none mt-2 ${theme === "dark" ? "bg-[#262628] text-gray-300 border-gray-600" : "bg-gray-100 text-gray-700 border-gray-300"} mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}>
                                <option>Credit Card</option>
                                <option>Debit Card</option>
                                <option>Master Card</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="cardNumber" className="block text-sm font-medium">Card number</label>
                            <input type="text" id="cardNumber" className={`h-[2.4rem] px-2 outline-none border-none mt-2 ${theme === "dark" ? "bg-[#262628] text-gray-300 border-gray-600" : "bg-gray-100 text-gray-700 border-gray-300"} mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}/>
                        </div>

                        <div className="flex gap-2 mb-3">
                            <div>
                                <label htmlFor="expiryDate" className="block text-sm font-medium">MM/YYYY</label>
                                <input type="text"id="expiryDate"className={`h-[2.4rem] px-2 outline-none border-none mt-2 ${theme === "dark" ? "bg-[#262628] text-gray-300 border-gray-600" : "bg-gray-100 text-gray-700 border-gray-300"} mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}/>
                            </div>
                            <div>
                                <label htmlFor="cvv" className="block text-sm font-medium">CVV</label>
                                <input type="text"id="cvv" className={`h-[2.4rem] px-2 outline-none border-none mt-2 ${theme === "dark" ? "bg-[#262628] text-gray-300 border-gray-600" : "bg-gray-100 text-gray-700 border-gray-300"} mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}/>
                            </div>
                        </div>

                        <div className="flex items-center mb-4">
                            <input type="checkbox" id="terms" className={`${theme === "dark" ? "bg-[#262628] text-gray-300 border-gray-600 focus:ring-indigo-500" : "bg-gray-100 text-gray-700 border-gray-300 focus:ring-indigo-500"} h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-2`}/>
                            <label htmlFor="terms" className="ml-2 block text-sm">Agree to Terms & Conditions</label>
                        </div>

                        <button onClick={()=>{closeAddPaymentMethod();closePaymentMethods()}} className={`${theme === "dark" ? "bg-[#3A3A3C] text-white hover:bg-[#4A4A4D]" : "bg-gray-300 text-gray-700 hover:bg-gray-400"} w-full py-2 rounded-md outline-none`}>Save Changes</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;