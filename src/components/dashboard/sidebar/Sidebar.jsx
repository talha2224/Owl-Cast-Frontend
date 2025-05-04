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
import { loadStripe } from "@stripe/stripe-js";
import toast from 'react-hot-toast';
loadStripe("pk_test_51OjJpTASyMRcymO6x2PBK1nrHChycNMNXj7HHvTRffOp5xufCj3WRSCLoep1tGp5Ilx3IWj7ck5yqrwEH8VSRKn80055Kvyelu");

const Sidebar = () => {
  const { theme } = useTheme();
  const location = useLocation().pathname.split("/")[2];
  const location2 = useLocation()
  const { isNavOpen, toggleNav } = useSidebar();
  const sidebarRef = useRef(null);
  const [showUpgrade, setshowUpgrade] = useState(false)
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


  const handleSendMoney = async (amount) => {
    let loader = toast.loading("Processing Request")
    try {
      localStorage.setItem("amount", amount)
      let stripeRes = await axios.post(`${config.baseUrl2}/create-checkout-session`, { amount })
      toast.dismiss(loader)
      window.location.href = stripeRes.data?.url;
    }
    catch (error) {
      toast.dismiss(loader)
      console.log(error)
    }
  }

  const handleAddSubscription = async () => {
    try {
      let amount = localStorage.getItem("amount")
      let res = await axios.put(`${config?.baseUrl}/account/subscription/${localStorage.getItem("id")}`,{amount,planName:amount==5.99?"Student":amount==10.99?"Individual":"Family"})
      console.log(res?.data, 'res?.data of handleAddSubscription')
      localStorage.setItem("paid", "paid")
      if (res?.data) {
        nav("/dashboard/home?query=Music");
      }
    }
    catch (error) {
      console.log(error)
    }
  }


  // useEffect(() => {
  //   const queryParams = new URLSearchParams(location2.search);
  //   const query = queryParams.get("query");

  //   console.log(query,'query')

  //   if (query === "success") {
  //     handleAddSubscription()
  //   }
  //   else if("failed"){
  //     nav("/dashboard/home?query=Music");
  //   }
  // }, [location]);





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


          {
            !localStorage.getItem("paid") && (
              <div onClick={() => setshowUpgrade(true)} className='w-[100%] bg-[#262628] p-3 mt-3 cursor-pointer flex items-center justify-between  text-white'>
                  <p className='text-sm text-[#808080]'>For Downloading</p>
                  <p className='text-xs text-[#E54B3C]'>Upgrade</p>
              </div>
            )
          }


        </div>

        <div className='absolute bottom-5 w-[80%] flex justify-between items-center mx-5 '>
          <div onClick={() =>{localStorage.removeItem("key");nav("/")}} className='flex items-center gap-x-2 cursor-pointer'>
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
              <div onClick={() =>{localStorage.removeItem("key");nav("/")}} className='flex items-center gap-x-2 cursor-pointer'>
                <IoLogOut className='text-[#FF1700] cursor-pointer text-xl' />
                <p className='text-xs text-[#FF1700]'>Logout</p>
              </div>
            </div>

          </div>
        )
      }

      {showUpgrade && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className={`${theme === "dark" ? "bg-[#1A1A1B] text-gray-300" : "bg-white text-gray-700"} rounded-md shadow-lg p-6 w-full max-w-md`}>

            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-medium">Upgrade Your Plan</h2>
              </div>
              <button onClick={() => setshowUpgrade(false)} className="focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* Student Plan */}
              <div onClick={() => handleSendMoney(5.99)} className="border border-[#8D8D8D] p-4 rounded-md hover:shadow-md cursor-pointer">
                <h3 className="text-lg font-bold mb-2">Student - $5.99/mo</h3>
                <ul className="list-disc list-inside text-sm text-gray-400">
                  <li>Ad-free listening</li>
                  <li>Offline downloads</li>
                  <li>Special student discounts</li>
                </ul>
              </div>

              {/* Individual Plan */}
              <div onClick={() => handleSendMoney(10.99)} className="border border-[#8D8D8D]r p-4 rounded-md hover:shadow-md cursor-pointer">
                <h3 className="text-lg font-bold mb-2">Individual - $10.99/mo</h3>
                <ul className="list-disc list-inside text-sm text-gray-400">
                  <li>Ad-free listening</li>
                  <li>Unlimited skips</li>
                  <li>High-quality audio</li>
                </ul>
              </div>

              {/* Family Plan */}
              <div onClick={() => handleSendMoney(16.99)} className="border border-[#8D8D8D] p-4 rounded-md hover:shadow-md cursor-pointer">
                <h3 className="text-lg font-bold mb-2">Family - $16.99/mo</h3>
                <ul className="list-disc list-inside text-sm text-gray-400">
                  <li>6 accounts included</li>
                  <li>Ad-free listening</li>
                  <li>Parental controls</li>
                </ul>
              </div>
            </div>

            {/* Close Button */}
            {/* <button onClick={() => setshowUpgrade(false)} className="px-4 py-2 bg-[#FF1700] text-white rounded hover:bg-[#e01300] transition ">Close</button> */}

          </div>
        </div>
      )}

    </>
  );
};

export default Sidebar;
