import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useEffect, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { FaCreditCard } from "react-icons/fa";


const translations = {
    en: {
        accountSummary: "Account Summary",
        paymentType: "Payment Type",
        managePayments: "Manage Payments",
        billingAddress: "Billing address",
        countryRegion: "Country / Region",
        accountBalance: "Account Balance",
        viewManageSubscriptions: "View and manage your subscriptions",
        manage: "Manage",
        paymentMethods: "Payment Methods",
        mediaPurchasesSubscriptions: "Media Purchases & Subscriptions",
        noPaymentMethods: "No payment methods",
        noPaymentMethodsDescription:
            "You do not have any payment methods set up for your media purchases and subscriptions.",
        addPaymentMethod: "Add a payment method",
        newPaymentMethod: "New Payment Method",
        newPaymentMethodDescription:
            "This will be saved as your new default payment method.",
        cardNumber: "Card number",
        mmYyyy: "MM/YYYY",
        cvv: "CVV",
        agreeTermsConditions: "Agree to Terms & Conditions",
        saveChanges: "Save Changes",
    },
    sp: {
        accountSummary: "Resumen de la cuenta",
        paymentType: "Tipo de pago",
        managePayments: "Administrar pagos",
        billingAddress: "Dirección de facturación",
        countryRegion: "País / Región",
        accountBalance: "Saldo de la cuenta",
        viewManageSubscriptions: "Ver y administrar sus suscripciones",
        manage: "Administrar",
        paymentMethods: "Métodos de pago",
        mediaPurchasesSubscriptions: "Compras y suscripciones de medios",
        noPaymentMethods: "Sin métodos de pago",
        noPaymentMethodsDescription:
            "No tiene ningún método de pago configurado para sus compras y suscripciones de medios.",
        addPaymentMethod: "Agregar un método de pago",
        newPaymentMethod: "Nuevo método de pago",
        newPaymentMethodDescription:
            "Esto se guardará como su nuevo método de pago predeterminado.",
        cardNumber: "Número de tarjeta",
        mmYyyy: "MM/AAAA",
        cvv: "CVV",
        agreeTermsConditions: "Aceptar los Términos y condiciones",
        saveChanges: "Guardar cambios",
    },
};

const ProfilePage = () => {
    const { theme } = useTheme();
    const [isPaymentMethodsOpen, setIsPaymentMethodsOpen] = useState(false);
    const [isAddPaymentMethodOpen, setIsAddPaymentMethodOpen] = useState(false);
    const [language, setLanguage] = useState('en');
    const [translationsData, setTranslationsData] = useState(translations.en);


    let containerStyle = `${theme === "dark" ? "text-gray-300 bg-[#1A1A1B] hover:bg-[#262628]" : "text-gray-700 bg-gray-100 hover:bg-gray-200"} flex items-center justify-between rounded-md px-3 py-3 text-sm cursor-pointer`;
    let containerStyle2 = `w-full md:w-[25rem] ${theme === "dark" ? "text-gray-300 bg-[#1A1A1B] hover:bg-[#262628]" : "text-gray-700 bg-gray-100 hover:bg-gray-200"} flex items-center justify-between rounded-md px-3 py-3 text-sm cursor-pointer`;

    const openPaymentMethods = () => {
        setIsPaymentMethodsOpen(true);
        setIsAddPaymentMethodOpen(false);
    };

    const closePaymentMethods = () => {
        setIsPaymentMethodsOpen(false);
        setIsAddPaymentMethodOpen(false);
    };

    const openAddPaymentMethod = () => {
        setIsAddPaymentMethodOpen(true);
    };

    const closeAddPaymentMethod = () => {
        setIsAddPaymentMethodOpen(false);
    };


    useEffect(() => {
        const storedLang = localStorage.getItem('language');
        if (storedLang) {
            setLanguage(storedLang);
        }
    }, []);

    useEffect(() => {
        setTranslationsData(translations[language] || translations.en);
    }, [language]);

    return (
        <div className="flex-1 overflow-x-auto p-5 relative">
            <p className={`${theme === "dark" && "text-white"} font-medium text-lg`}>
                {translationsData.accountSummary}
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
                        <p className="text-sm">{translationsData.paymentType}</p>
                    </div>
                    <button className="text-[#FF1700] text-sm focus:outline-none">
                        {translationsData.managePayments}
                    </button>
                </div>

                <div className={containerStyle}>
                    <div>
                        <p className="text-sm">{translationsData.billingAddress}</p>
                    </div>
                    <p className="text-[#FF1700] text-sm">Gregg Edward</p>
                </div>

                <div className={containerStyle}>
                    <p className="text-sm mr-2">{translationsData.countryRegion}</p>
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
                        <p className="text-sm">{translationsData.accountBalance}</p>
                    </div>
                    <p className="text-[#50C878] text-sm">$0.00</p>
                </div>

                <div className={containerStyle2} onClick={openPaymentMethods}>
                    <div>
                        <p className="text-sm">
                            {translationsData.viewManageSubscriptions}
                        </p>
                    </div>
                    <button className="text-[#FF1700] text-sm focus:outline-none">
                        {translationsData.manage}
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
                            <h2 className="text-lg font-semibold">{translationsData.paymentMethods}</h2>
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
                                {translationsData.mediaPurchasesSubscriptions}
                            </h3>
                            <div className="py-4">
                                <p className="text-sm mb-2">{translationsData.noPaymentMethods}</p>
                                <p className="text-xs text-gray-500 mb-2">
                                    {translationsData.noPaymentMethodsDescription}
                                </p>
                                <button
                                    onClick={openAddPaymentMethod}
                                    className="text-[#FF1700] text-sm font-semibold focus:outline-none"
                                >
                                    {translationsData.addPaymentMethod}
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
                            <FaCreditCard className="text-[#3771C8]" />
                            <RxCross2 onClick={closeAddPaymentMethod} className="cursor-pointer" />
                        </div>

                        <p className="text-center">{translationsData.newPaymentMethod}</p>
                        <p className="text-sm text-gray-500 mb-4 mt-1 text-center">
                            {translationsData.newPaymentMethodDescription}
                        </p>

                        <div className="mb-3">
                            <label htmlFor="paymentType" className="block text-sm font-medium"> Payment type</label>
                            <select id="paymentType" className={`h-[2.4rem] px-2 outline-none border-none mt-2 ${theme === "dark" ? "bg-[#262628] text-gray-300 border-gray-600" : "bg-gray-100 text-gray-700 border-gray-300"} mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}>
                                <option>Credit Card</option>
                                <option>Debit Card</option>
                                <option>Master Card</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="cardNumber" className="block text-sm font-medium">{translationsData.cardNumber}</label>
                            <input type="text" id="cardNumber" className={`h-[2.4rem] px-2 outline-none border-none mt-2 ${theme === "dark" ? "bg-[#262628] text-gray-300 border-gray-600" : "bg-gray-100 text-gray-700 border-gray-300"} mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`} />
                        </div>

                        <div className="flex gap-2 mb-3">
                            <div>
                                <label htmlFor="expiryDate" className="block text-sm font-medium">{translationsData.mmYyyy}</label>
                                <input type="text" id="expiryDate" className={`h-[2.4rem] px-2 outline-none border-none mt-2 ${theme === "dark" ? "bg-[#262628] text-gray-300 border-gray-600" : "bg-gray-100 text-gray-700 border-gray-300"} mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`} />
                            </div>
                            <div>
                                <label htmlFor="cvv" className="block text-sm font-medium">{translationsData.cvv}</label>
                                <input type="text" id="cvv" className={`h-[2.4rem] px-2 outline-none border-none mt-2 ${theme === "dark" ? "bg-[#262628] text-gray-300 border-gray-600" : "bg-gray-100 text-gray-700 border-gray-300"} mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`} />
                            </div>
                        </div>

                        <div className="flex items-center mb-4">
                            <input type="checkbox" id="terms" className={`${theme === "dark" ? "bg-[#262628] text-gray-300 border-gray-600 focus:ring-indigo-500" : "bg-gray-100 text-gray-700 border-gray-300 focus:ring-indigo-500"} h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-2`} />
                            <label htmlFor="terms" className="ml-2 block text-sm">{translationsData.agreeTermsConditions}</label>
                        </div>

                        <button onClick={() => { closeAddPaymentMethod(); closePaymentMethods() }} className={`${theme === "dark" ? "bg-[#3A3A3C] text-white hover:bg-[#4A4A4D]" : "bg-gray-300 text-gray-700 hover:bg-gray-400"} w-full py-2 rounded-md outline-none`}>{translationsData.saveChanges}</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
