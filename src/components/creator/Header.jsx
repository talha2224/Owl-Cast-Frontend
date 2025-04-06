import { GiHamburgerMenu } from 'react-icons/gi';
import { useSidebar } from '../../context/SidebarContext';
import { useTheme } from '../../context/ThemeContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiSun, FiMoon } from "react-icons/fi";
import Bell from '../../assets/dashboard/bell.svg'
import User from '../../assets/dashboard/user.png'

const Header = ({ location }) => {
    const { theme, toggleTheme } = useTheme();
    const { isNavOpen, toggleNav } = useSidebar();
    const nav = useNavigate()
    const currentLocation = useLocation();
    const queryParams = new URLSearchParams(currentLocation.search);
    const queryValue = queryParams.get('query');

    return (

        <div className={`w-[100%] flex justify-between py-3 items-center px-5 border-b ${theme == "dark" && "border-b-[#262628]"} flex-wrap`}>


            {
                location == "home" ? (
                    <div className='flex items-center gap-x-5 flex-wrap'>
                        <Link to={"/dashboard/home?query=Music"} className={`${queryValue == "Music" ? "text-[#FF1700]" : "text-[#444444]"}`}>Music</Link>
                        <Link to={"/dashboard/home?query=Podcast"} className={`${queryValue == "Podcast" ? "text-[#FF1700]" : "text-[#444444]"}`}>Podcast</Link>
                        <Link to={"/dashboard/home?query=New Releases"} className={`${queryValue == "New Releases" ? "text-[#FF1700]" : "text-[#444444]"}`}>New Releases</Link>
                        <input type="text" name="" id="" placeholder='Search podcasts, books and moods' className={`mt-2 ${theme == "dark" ? "bg-[#262628]" : "border"} px-3 py-2 rounded-md text-sm placeholder:text-[#828282] placeholder:text-sm text-[#828282] outline-none sm:w-[20rem] w-[100%]`} />
                    </div>
                ) :
                    
                (
                    <p className='capitalize text-[#FF1700] text-[1.rem]'>{location=="single"?"Podcast":location}</p>
                )
            }

            {
                location!=="home" && (
                    <input type="text" name="" id="" placeholder='Search podcasts, books and moods' className={`mt-2 ${theme == "dark" ? "bg-[#262628]" : "border"} px-3 py-2 rounded-md text-sm placeholder:text-[#828282] placeholder:text-sm text-[#828282] outline-none sm:w-[20rem] w-[100%]`} />

                )
            }

            <div className='flex items-center gap-x-4'>
                <GiHamburgerMenu className={`lg:hidden block cursor-pointer md:mt-0 mt-2 ${theme == "dark" ? "text-white" : 'text-[#444444]'}`} onClick={() => toggleNav(!isNavOpen)} />
                <img src={Bell} alt="" />
                <img onClick={()=>{nav("/creator/dashboard/profile")}} src={User} alt="" className='rounded-full w-6 h-6 cursor-pointer md:mt-0 mt-2' />
                {
                    theme === "dark" ? (<FiSun onClick={toggleTheme} className='text-[#FFD700] cursor-pointer text-2xl md:mt-0 mt-2' />)
                        : (<FiMoon onClick={toggleTheme} className='text-[#4B6CB7] cursor-pointer text-2xl md:mt-0 mt-2' />)
                }
            </div>


        </div>

    )
}

export default Header