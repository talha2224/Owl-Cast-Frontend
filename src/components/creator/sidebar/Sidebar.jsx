import React, { useEffect, useRef, useState } from 'react';
import { adminNav } from '../../../constants/sidebarData';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoLogOut } from 'react-icons/io5';
import { useSidebar } from '../../../context/SidebarContext';
import LightModeLogo from '../../../assets/logo.svg'
import DarkModeLogo from '../../../assets/w-logo.svg'
import { FiPlus } from "react-icons/fi";

import { useTheme } from '../../../context/ThemeContext';
import { TiTick } from 'react-icons/ti';

const Sidebar = () => {
  const { theme } = useTheme();
  const location = useLocation().pathname.split("/")[3];
  const { isNavOpen, toggleNav } = useSidebar();
  const sidebarRef = useRef(null);
  const nav = useNavigate();
  const [initialStep, setinitialStep] = useState(0)
  const [data, setData] = useState({ preferrence: "music" })
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImageUpload2 = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage2(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


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






  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`lg:block hidden w-[15rem] h-[100vh] ${theme == "dark" ? "bg-[#1D1D1F]" : "bg-[#1D1D1F]"} relative border-r border-r-[#262628]`}>

        <div className="flex-shrink-0 flex items-center gap-x-2 p-5">
          <img src={theme == "dark" ? DarkModeLogo : LightModeLogo} alt="" className='h-8' />
        </div>

        <div className='mt-7'>
          <p className='text-sm text-[#8D8D8D] pl-5 mb-2'>Menu</p>
          {adminNav?.map((i) => (
            <Link to={`/creator/dashboard/${i.link}`} key={i.id} className={`flex pl-5 justify-between items-center gap-x-3 mb-1 cursor-pointer ${(location == i.link || (location == "home" && i.link == "home?query=Music")) ? "text-[#FF1700]" : "text-[#C9C9C9]"}`}>
              <div className='flex items-center gap-x-3 '>
                <div>{i.icon}</div>
                <p className='text-sm'>{i.name}</p>
              </div>
              <div className={`w-1 h-8 ${(location == i.link || (location == "home" && i.link == "home?query=Music")) ? "bg-[#FF1700]" : "bg-transparent"} rounded-tl-md rounded-bl-md`}></div>
            </Link>
          ))}
          <p className='text-sm text-[#8D8D8D] pl-5 mt-4 mb-4'>More</p>

          <div onClick={() => nav("/creator/dashboard/draft")} className='flex items-center gap-x-3 pl-5 text-white text-sm mb-2 cursor-pointer'>
            <div className='w-2 h-2 rounded-full bg-[#FF4500]'></div>
            <p>Trash</p>
          </div>
          <div onClick={() => nav("/creator/dashboard/draft")} className='flex items-center gap-x-3 pl-5 text-white text-sm mb-2 cursor-pointer'>
            <div className='w-2 h-2 rounded-full bg-[#FFDD55]'></div>
            <p>Draft</p>
          </div>

          <div onClick={() => { setinitialStep(1) }} className='flex cursor-pointer items-center gap-x-3 p-2 pl-5 text-white text-sm my-5 border-t border-b border-b-[#262628] border-t-[#262628]'>
            <FiPlus />
            <p>New Upload</p>
          </div>

          <div className='w-[100%] bg-[#262628] p-3'>
            <p className='text-white text-sm'>Storage Used</p>
            <div className='flex items-center justify-between mt-3 text-white'>
              <p className='text-sm text-[#808080]'>15GB/<span className='text-white'>50GB</span></p>
              <p className='text-xs text-[#E54B3C]'>Upgrade</p>
            </div>
          </div>

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
              {adminNav?.map((i) => (
                <Link to={`/creator/dashboard/${i.link}`} key={i.id} className={`flex pl-5 justify-between items-center gap-x-3 mb-1 cursor-pointer ${(location == i.link || (location == "home" && i.link == "home?query=Music")) ? "text-[#FF1700]" : "text-[#C9C9C9]"}`}>
                  <div className='flex items-center gap-x-3 '>
                    <div>{i.icon}</div>
                    <p className='text-sm'>{i.name}</p>
                  </div>
                  <div className={`w-1 h-8 ${(location == i.link || (location == "home" && i.link == "home?query=Music")) ? "bg-[#FF1700]" : "bg-transparent"} rounded-tl-md rounded-bl-md`}></div>
                </Link>
              ))}
              <p className='text-sm text-[#8D8D8D] pl-5 mt-4 mb-4'>More</p>

              <div onClick={() => nav("/creator/dashboard/draft")} className='flex items-center gap-x-3 pl-5 text-white text-sm mb-2 cursor-pointer'>
                <div className='w-2 h-2 rounded-full bg-[#FF4500]'></div>
                <p>Trash</p>
              </div>
              <div onClick={() => nav("/creator/dashboard/draft")} className='flex items-center gap-x-3 pl-5 text-white text-sm mb-2 cursor-pointer'>
                <div className='w-2 h-2 rounded-full bg-[#FFDD55]'></div>
                <p>Draft</p>
              </div>

              <div onClick={() => { setinitialStep(1) }} className='flex cursor-pointer items-center gap-x-3 p-2 pl-5 text-white text-sm my-5 border-t border-b border-b-[#262628] border-t-[#262628]'>
                <FiPlus />
                <p>New Upload</p>
              </div>

              <div className='w-[100%] bg-[#262628] p-3'>
                <p className='text-white text-sm'>Storage Used</p>
                <div className='flex items-center justify-between mt-3 text-white'>
                  <p className='text-sm text-[#808080]'>15GB/<span className='text-white'>50GB</span></p>
                  <p className='text-xs text-[#E54B3C]'>Upgrade</p>
                </div>
              </div>

            </div>

            <div className='absolute bottom-5 w-[80%] flex justify-between items-center mx-5 '>
              <div onClick={() => nav("/")} className='flex items-center gap-x-2 cursor-pointer'>
                <IoLogOut className='text-[#FF1700] cursor-pointer text-xl' />
                <p className='text-xs text-[#FF1700]'>Logout</p>
              </div>
            </div>

          </div>
        )
      }


      {/* // MODELS  */}
      {initialStep === 1 && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">

          <div className={`${theme === "dark" ? "bg-[#1A1A1B] text-gray-300" : "bg-white text-gray-700"} rounded-md shadow-lg p-6 w-full max-w-md`}>

            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-medium">Upload your content</h2>
                <p className='text-xs text-[#8D8D8D] mt-1'>Upload your music or podcast, use the recommended size for your cover image</p>
              </div>
              <button onClick={() => setinitialStep(0)} className="focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div onClick={() => { setData({ ...data, preferrence: "Single" }) }} className='flex cursor-pointer justify-between items-center w-[100%] textsm text-white bg-[#262628] px-3 h-[2.5rem] border border-[#444444] mt-8 rounded-md text-sm'>
              <p>Single</p>
              {data?.preferrence == "Single" && <div style={{ background: 'linear-gradient(90deg, #E54B3C 0%, #FF1700 100%)', }} className='w-4 h-4 rounded-full flex justify-center items-center'><TiTick /></div>}
            </div>
            <div onClick={() => { setData({ ...data, preferrence: "Podcast" }) }} className='flex cursor-pointer justify-between items-center w-[100%] textsm text-white bg-[#262628] px-3 h-[2.5rem] border border-[#444444] mt-2 rounded-md text-sm'>
              <p>Podcast</p>
              {data?.preferrence == "Podcast" && <div style={{ background: 'linear-gradient(90deg, #E54B3C 0%, #FF1700 100%)', }} className='w-4 h-4 rounded-full flex justify-center items-center'><TiTick /></div>}
            </div>
            <div onClick={() => { setData({ ...data, preferrence: "Music" }) }} className='flex cursor-pointer justify-between items-center w-[100%] textsm text-white bg-[#262628] px-3 h-[2.5rem] border border-[#444444] my-2 rounded-md text-sm'>
              <p>Music</p>
              {data?.preferrence == "Music" && <div style={{ background: 'linear-gradient(90deg, #E54B3C 0%, #FF1700 100%)', }} className='w-4 h-4 rounded-full flex justify-center items-center'><TiTick /></div>}
            </div>
            <div onClick={() => { setData({ ...data, preferrence: "Album" }) }} className='flex cursor-pointer justify-between items-center w-[100%] textsm text-white bg-[#262628] px-3 h-[2.5rem] border border-[#444444] my-2 rounded-md text-sm'>
              <p>Album</p>
              {data?.preferrence == "Album" && <div style={{ background: 'linear-gradient(90deg, #E54B3C 0%, #FF1700 100%)', }} className='w-4 h-4 rounded-full flex justify-center items-center'><TiTick /></div>}
            </div>

            <button onClick={() => setinitialStep(2)} className="bg-[#FF1700] text-sm w-[100%] py-2 mt-2 rounded-md">Next</button>

          </div>
        </div>
      )}
      {initialStep === 2 && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">

          <div className={`${theme === "dark" ? "bg-[#1A1A1B] text-gray-300" : "bg-white text-gray-700"} rounded-md shadow-lg p-6 w-full max-w-md`}>

            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-medium">Upload your content</h2>
                <p className='text-xs text-[#8D8D8D] mt-1'>Upload your music or podcast, use the recommended size for your cover image</p>
              </div>
              <button onClick={() => setinitialStep(0)} className="focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <label htmlFor="image-upload" className='w-[100%] h-[12rem] flex justify-center items-center flex-col rounded-lg bg-[#262628] cursor-pointer'>
              {selectedImage ? (
                <img src={selectedImage} alt="Uploaded Preview" className="w-full h-full object-contain rounded-lg" />
              ) : (
                <>
                  <p className='text-sm text-[#AAAAAA]'>Upload your image</p>
                  <p className='text-sm text-[#FF1700]'>Min *390* x *190*</p>
                </>
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>

            <button onClick={() => setinitialStep(3)} className="bg-[#FF1700] text-sm w-[100%] py-2 mt-2 rounded-md">Next</button>

          </div>
        </div>
      )}
      {initialStep === 3 && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">

          <div className={`${theme === "dark" ? "bg-[#1A1A1B] text-gray-300" : "bg-white text-gray-700"} rounded-md shadow-lg p-6 w-full max-w-md`}>

            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-medium">Upload your content</h2>
                <p className='text-xs text-[#8D8D8D] mt-1'>Upload your music or podcast, use the recommended size for your cover image</p>
              </div>
              <button onClick={() => setinitialStep(0)} className="focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <label htmlFor="image-upload2" className='w-[100%] h-[12rem] flex justify-center items-center flex-col rounded-lg bg-[#262628] cursor-pointer'>
              {selectedImage2 ? (
                <img src={selectedImage2} alt="Uploaded Preview" className="w-full h-full object-contain rounded-lg" />
              ) : (
                <>
                  <p className='text-sm text-[#AAAAAA]'>Upload your image</p>
                  <p className='text-sm text-[#FF1700]'>Min *390* x *190*</p>
                </>
              )}
              <input
                id="image-upload2"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload2}
              />
            </label>

            <button onClick={() => setinitialStep(4)} className="bg-[#FF1700] text-sm w-[100%] py-2 mt-2 rounded-md">Next</button>

          </div>
        </div>
      )}
      {initialStep === 4 && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">

          <div className={`${theme === "dark" ? "bg-[#1A1A1B] text-gray-300" : "bg-white text-gray-700"} rounded-md shadow-lg p-6 w-full max-w-md`}>

            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-medium">Upload your content</h2>
                <p className='text-xs text-[#8D8D8D] mt-1'>Upload your music or podcast, use the recommended size for your cover image</p>
              </div>
              <button onClick={() => setinitialStep(0)} className="focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className='text-sm'>Metadata</p>
            <input type="text" name="" id="" placeholder='Title' className='w-[100%] h-[2.3rem] px-3 rounded-md border border-[#444444] bg-transparent mt-2 text-sm placeholder:text-sm' />
            <input type="text" name="" id="" placeholder='Description' className='w-[100%] h-[2.3rem] px-3 rounded-md border border-[#444444] bg-transparent mt-2 text-sm placeholder:text-sm' />
            <input type="text" name="" id="" placeholder='Tags / Keywords' className='w-[100%] h-[2.3rem] px-3 rounded-md border border-[#444444] bg-transparent mt-2 text-sm placeholder:text-sm' />

            <button onClick={() => setinitialStep(0)} className="bg-[#FF1700] text-sm w-[100%] py-2 mt-2 rounded-md">Publish Now</button>
            <button onClick={() => setinitialStep(0)} className="text-sm w-[100%] py-2 mt-2 rounded-md">Draft</button>

          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
