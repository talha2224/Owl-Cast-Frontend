import React from 'react'
import Sidebar from './sidebar/Sidebar'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import { useTheme } from '../../context/ThemeContext'


const Layout = () => {
  const location = useLocation().pathname.split("/")[3];
  const { theme} = useTheme();

  return (

    <div className={`flex items-start  ${theme=="dark"?"bg-[#1b1b1d]":"bg-[#ffff]"} w-screen h-screen`}>
      <Sidebar />

      <div className='flex-1 h-[100vh] overflow-auto'>
        <Header location={location} />
        <div className='flex-1 overflow-x-auto overflow-y-auto h-[90%]'>
          <Outlet />
        </div>
      </div>
    </div>

  )
}

export default Layout