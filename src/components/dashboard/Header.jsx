import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useSidebar } from '../../context/SidebarContext';
import { useTheme } from '../../context/ThemeContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiSun, FiMoon } from "react-icons/fi";
import Bell from '../../assets/dashboard/bell.svg';
import User from '../../assets/dashboard/user.png';
import { useEffect, useState } from 'react';

// Translation data
const translations = {
    en: {
        music: "Music",
        podcast: "Podcast",
        newReleases: "New Releases",
        searchPlaceholder: "Search podcasts, books and moods",
        profile: "Profile",
    },
    sp: {
        music: "Música",
        podcast: "Podcast",
        newReleases: "Nuevos lanzamientos",
        searchPlaceholder: "Buscar podcasts, libros y estados de ánimo",
        profile: "Perfil",
    },
};

const Header = ({ location }) => {
    const { theme, toggleTheme } = useTheme();
    const { isNavOpen, toggleNav } = useSidebar();
    const nav = useNavigate();
    const currentLocation = useLocation();
    const queryParams = new URLSearchParams(currentLocation.search);
    const queryValue = queryParams.get('query');
    const [language, setLanguage] = useState('en');
    const [translationsData, setTranslationsData] = useState(translations.en);
    const [showNotifications, setShowNotifications] = useState(false);

    // Load language from localStorage
    useEffect(() => {
        const storedLang = localStorage.getItem('language');
        if (storedLang) {
            setLanguage(storedLang);
        }
    }, []);

    // Apply selected language
    useEffect(() => {
        setTranslationsData(translations[language] || translations.en);
    }, [language]);

    return (
        <div className={`w-[100%] flex justify-between py-3 items-center px-5 border-b ${theme === "dark" && "border-b-[#262628]"} flex-wrap`}>
            {location === "home" ? (
                <div className='flex items-center gap-x-5 flex-wrap'>
                    <Link to={"/dashboard/home?query=Music"} className={`${queryValue === "Music" ? "text-[#FF1700]" : "text-[#444444]"}`}>
                        {translationsData.music}
                    </Link>
                    <Link to={"/dashboard/home?query=Podcast"} className={`${queryValue === "Podcast" ? "text-[#FF1700]" : "text-[#444444]"}`}>
                        {translationsData.podcast}
                    </Link>
                    <Link to={"/dashboard/home?query=New Releases"} className={`${queryValue === "New Releases" ? "text-[#FF1700]" : "text-[#444444]"}`}>
                        {translationsData.newReleases}
                    </Link>
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder={translationsData.searchPlaceholder}
                        className={`mt-2 ${theme === "dark" ? "bg-[#262628]" : "border"} px-3 py-2 rounded-md text-sm placeholder:text-[#828282] placeholder:text-sm text-[#828282] outline-none sm:w-[20rem] w-[100%]`}
                    />
                </div>
            ) : (
                <p className='capitalize text-[#FF1700] text-[1.rem]'>{location === "single" ? translationsData.podcast : location}</p>
            )}

            {location !== "home" && (
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder={translationsData.searchPlaceholder}
                    className={`mt-2 ${theme === "dark" ? "bg-[#262628]" : "border"} px-3 py-2 rounded-md text-sm placeholder:text-[#828282] placeholder:text-sm text-[#828282] outline-none sm:w-[20rem] w-[100%]`}
                />
            )}

            <div className='flex items-center gap-x-4'>
                <GiHamburgerMenu
                    className={`lg:hidden block cursor-pointer md:mt-0 mt-2 ${theme === "dark" ? "text-white" : 'text-[#444444]'}`}
                    onClick={() => toggleNav(!isNavOpen)}
                />
                <img onClick={() => setShowNotifications(prev => !prev)} src={Bell} alt="Notification Bell" className='cursor-pointer' />
                <img
                    onClick={() => { nav("/dashboard/profile"); }}
                    src={User}
                    alt={translationsData.profile}
                    className='rounded-full w-6 h-6 cursor-pointer md:mt-0 mt-2'
                />
                {theme === "dark" ? (
                    <FiSun onClick={toggleTheme} className='text-[#FFD700] cursor-pointer text-2xl md:mt-0 mt-2' />
                ) : (
                    <FiMoon onClick={toggleTheme} className='text-[#4B6CB7] cursor-pointer text-2xl md:mt-0 mt-2' />
                )}

                {showNotifications && (
                    <div className="absolute right-16 top-[4rem] bg-[#262628] border border-[#828282] rounded shadow-md p-4 z-50 w-60">
                        <p className="text-sm text-[#828282] text-center">No notifications found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
