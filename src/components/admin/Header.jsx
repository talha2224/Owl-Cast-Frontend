import { GiHamburgerMenu } from 'react-icons/gi';
import { useSidebar } from '../../context/SidebarContext';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { FiSun, FiMoon } from "react-icons/fi";

const Header = ({ location }) => {
    const { theme, toggleTheme } = useTheme();
    const { isNavOpen, toggleNav } = useSidebar();
    const nav = useNavigate()

    return (

        <div className={`w-[100%] flex justify-between py-5 items-center px-5 border-b ${theme == "dark" && "border-b-[#262628]"} flex-wrap`}>

            <p className='capitalize text-[#FF1700] text-[1.rem]'>{location == "single" ? "Podcast" : location}</p>
            <div className='flex items-center gap-x-4'>
                <GiHamburgerMenu className={`lg:hidden block cursor-pointer md:mt-0 mt-2 ${theme == "dark" ? "text-white" : 'text-[#444444]'}`} onClick={() => toggleNav(!isNavOpen)} />
                {
                    theme === "dark" ?
                        (<FiSun onClick={toggleTheme} className='text-[#FFD700] cursor-pointer text-2xl md:mt-0 mt-2' />)
                        : (<FiMoon onClick={toggleTheme} className='text-[#4B6CB7] cursor-pointer text-2xl md:mt-0 mt-2' />)
                }
            </div>


        </div>

    )
}

export default Header