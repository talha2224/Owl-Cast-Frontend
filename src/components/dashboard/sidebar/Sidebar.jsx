import React, { useEffect, useRef, useState } from 'react';
import { navData } from '../../../constants/sidebarData';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoLogOut } from 'react-icons/io5';
import { useSidebar } from '../../../context/SidebarContext';
import LightModeLogo from '../../../assets/logo.svg'
import DarkModeLogo from '../../../assets/w-logo.svg'
import { FiPlus } from "react-icons/fi";

import { useTheme } from '../../../context/ThemeContext';
import config from '../../../config';
import axios from 'axios';

const Sidebar = () => {
  const { theme } = useTheme();
  const location = useLocation().pathname.split("/")[2];
  const { isNavOpen, toggleNav } = useSidebar();
  const sidebarRef = useRef(null);
  const nav = useNavigate()
  const [playlistData, setPlaylistData] = useState([]);


  const fetchAllPlaylist = async () => {
    try {
      let playlist = await axios.get(`${config.baseUrl}/user/playlist/${localStorage.getItem("id")}`)
      if (playlist?.data) {
        setPlaylistData(playlist?.data?.data)
      }
    }
    catch (error) {

    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleNav();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleNav]);

  useEffect(() => {
    fetchAllPlaylist()
  }, [])






  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`lg:block hidden w-[15rem] h-[100vh] ${theme == "dark" ? "bg-[#1D1D1F]" : "bg-[#1D1D1F]"} relative border-r border-r-[#262628]`}>

        <div className="flex-shrink-0 flex items-center gap-x-2 p-5">
          <img src={theme == "dark" ? DarkModeLogo : LightModeLogo} alt="" className='h-8' />
        </div>

        <div className='mt-7'>
          <p className='text-sm text-[#8D8D8D] pl-5 mb-2'>Menu</p>
          {navData?.map((i) => (
            <Link to={`/dashboard/${i.link}`} key={i.id} className={`flex pl-5 justify-between items-center gap-x-3 mb-1 cursor-pointer ${(location == i.link || (location == "home" && i.link == "home?query=Music")) ? "text-[#FF1700]" : "text-[#C9C9C9]"}`}>
              <div className='flex items-center gap-x-3 '>
                <div>{i.icon}</div>
                <p className='text-sm'>{i.name}</p>
              </div>
              <div className={`w-1 h-8 ${(location == i.link || (location == "home" && i.link == "home?query=Music")) ? "bg-[#FF1700]" : "bg-transparent"} rounded-tl-md rounded-bl-md`}></div>
            </Link>
          ))}
          <p className='text-sm text-[#8D8D8D] pl-5 mt-4 mb-4'>Playlist</p>

          {
            playlistData?.map((i) => {
              const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

              return (
                <div onClick={() => nav("/dashboard/library")} key={i?._id} className={`flex items-center gap-x-3 pl-5 text-white text-sm mb-2 cursor-pointer`}>
                  <span className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: randomColor }}></span>
                  {i.title}
                </div>
              );
            })
          }
          {/* 
          <div className='flex items-center gap-x-3 pl-5 text-white text-sm mb-2'>
            <div className='w-2 h-2 rounded-full bg-[#FF4500]'></div>
            <p>My Vibes</p>
          </div>
          <div className='flex items-center gap-x-3 pl-5 text-white text-sm mb-2'>
            <div className='w-2 h-2 rounded-full bg-[#3771C8]'></div>
            <p>Late Night</p>
          </div>
          <div className='flex items-center gap-x-3 pl-5 text-white text-sm mb-2'>
            <div className='w-2 h-2 rounded-full bg-[#FFDD55]'></div>
            <p>The Best</p>
          </div> */}

          {/* <div className='flex items-center gap-x-3 p-2 pl-5 text-white text-sm my-5 border-t border-b border-b-[#262628] border-t-[#262628]'>
            <FiPlus />
            <p>Add New Playlist</p>
          </div> */}
          {/* 
          <p className='text-sm text-[#8D8D8D] pl-5 mb-2'>Others</p>

          <div className='flex items-center gap-x-3 pl-5 text-white text-sm mb-2'>
            <div className='w-2 h-2 rounded-full bg-[#34C759]'></div>
            <p>Favourite</p>
          </div> */}


        </div>

        <div className='absolute bottom-5 w-[80%] flex justify-between items-center mx-5 '>
          <div onClick={() => nav("/")} className='flex items-center gap-x-2 cursor-pointer'>
            <IoLogOut className='text-[#FF1700] cursor-pointer text-xl' />
            <p className='text-xs text-[#FF1700]'>Logout</p>
          </div>
        </div>

      </div>

      {/* Mobile Sidebar */}
      {
        isNavOpen && (
          <div className={`lg:hidden block w-[14rem] z-50 h-[100vh] ${theme == "dark" ? "bg-[#1D1D1F]" : "bg-[#1D1D1F]"} fixed top-0 left-0 transition-all duration-300 ease-in-out ${isNavOpen ? 'transform translate-x-0' : 'transform -translate-x-full'}`} ref={sidebarRef}>

            <div className="flex-shrink-0 flex items-center gap-x-2 p-5">
              <img src={theme == "dark" ? DarkModeLogo : LightModeLogo} alt="" className='h-8' />
            </div>

            <div className='mt-7'>
              <p className='text-sm text-[#8D8D8D] pl-5 mb-2'>Menu</p>
              {navData?.map((i) => (
                <Link to={`/dashboard/${i.link}`} key={i.id} className={`flex pl-5 justify-between items-center gap-x-3 mb-1 cursor-pointer ${(location == i.link || (location == "home" && i.link == "home?query=Music")) ? "text-[#FF1700]" : "text-[#C9C9C9]"}`}>
                  <div className='flex items-center gap-x-3 '>
                    <div>{i.icon}</div>
                    <p className='text-sm'>{i.name}</p>
                  </div>
                  <div className={`w-1 h-8 ${(location == i.link || (location == "home" && i.link == "home?query=Music")) ? "bg-[#FF1700]" : "bg-transparent"} rounded-tl-md rounded-bl-md`}></div>
                </Link>
              ))}
              <p className='text-sm text-[#8D8D8D] pl-5 mt-4 mb-4'>Playlist</p>


              {
                playlistData?.map((i) => {
                  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

                  return (
                    <div onClick={() => nav("/dashboard/library")} key={i?._id} className={`flex items-center gap-x-3 pl-5 text-white text-sm mb-2 cursor-pointer`}>
                      <span className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: randomColor }}></span>
                      {i.title}
                    </div>
                  );
                })
              }

            </div>

            <div className='absolute bottom-5 w-[80%] flex justify-between items-center mx-5 '>
              <div onClick={() => nav("/")} className='flex items-center gap-x-2 cursor-pointer'>
                <IoLogOut className='text-[#FF1700] cursor-pointer text-xl' />
                <p className='text-xs text-[#FF1700]'>Logout</p>
              </div>
            </div>

          </div>
        )}
    </>
  );
};

export default Sidebar;
