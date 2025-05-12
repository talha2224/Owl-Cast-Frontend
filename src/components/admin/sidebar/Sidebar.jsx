import React, { useEffect, useRef, useState } from 'react';
import { superAdminNav } from '../../../constants/sidebarData';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoLogOut } from 'react-icons/io5';
import { useSidebar } from '../../../context/SidebarContext';
import LightModeLogo from '../../../assets/logo.svg'
import DarkModeLogo from '../../../assets/w-logo.svg'
import { useTheme } from '../../../context/ThemeContext';
import config from '../../../config';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { TiTick } from 'react-icons/ti';
import { IoIosArrowBack } from "react-icons/io";

const Sidebar = () => {
  const { theme } = useTheme();
  const location = useLocation().pathname.split("/")[3];
  const { isNavOpen, toggleNav } = useSidebar();
  const sidebarRef = useRef(null);
  const nav = useNavigate();

  const [initialStep, setinitialStep] = useState(0)
  const [data, setData] = useState({ duration: "", type: "music", creatorId: localStorage.getItem("id"), playlistId: null, audio: null, image: null, title: "", description: "", tags: "", })
  const [playlistName, setPlaylistName] = useState("")
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [playlistData, setPlaylistData] = useState([])

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setData({ ...data, image: file, previewUrl });
    }
  };

  const handleImageUpload2 = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);

      // Create a temporary Audio element to get duration
      const audioElement = new Audio(previewUrl);
      audioElement.addEventListener('loadedmetadata', () => {
        const durationInSeconds = Math.floor(audioElement.duration);
        console.log(durationInSeconds, 'durationInSeconds')
        setData(prev => ({
          ...prev,
          audio: file,
          previewUrl2: previewUrl,
          duration: durationInSeconds  // set duration here
        }));
      });
    }
  };

  const fetchAllPlaylist = async () => {
    try {
      let playlist = await axios.get(`${config.baseUrl}/playlist/${localStorage.getItem("id")}`)
      if (playlist?.data) {
        setPlaylistData(playlist?.data?.data)
      }
    }
    catch (error) {

    }
  }

  const handleNext = () => {
    console.log(data?.playlistId)
    if (data.type == "Album") {
      setShowPlaylist(true);
      setinitialStep(0)
    }
    else {
      setinitialStep(2)
    }
  }

  const handleCreatePlaylist = async () => {
    let loader = toast.loading("Creating Playlist")
    try {
      let res = await axios.post(`${config.baseUrl}/playlist/create`, { title: playlistName, userId: localStorage.getItem("id") })
      if (res?.data?.data) {
        fetchAllPlaylist()
        toast.dismiss(loader)
        toast.success("Playlist Added")
      }
    }
    catch (error) {
      toast.dismiss(loader)
      toast.error("Something went wrong")
    }
  }

  const handleUpload = async (status) => {
    let loader = toast.loading("Uploading It Will Take Some Time");
    try {
      let formData = new FormData()
      formData.append("type", data?.type)
      formData.append("creatorId", data?.creatorId)
      formData.append("playlistId", data?.playlistId)
      formData.append("audio", data?.audio)
      formData.append("image", data?.image)
      formData.append("title", data?.title)
      formData.append("description", data?.description)
      formData.append("tags", data?.tags)
      formData.append("status", status)
      formData.append("duration", data?.duration);
      let res = await axios.post(`${config.baseUrl}/music/upload`, formData)
      if (res?.data?.data) {
        toast.dismiss(loader)
        toast.success("Uploading Sucessfull")
        setData({ duration: "", type: "music", creatorId: localStorage.getItem("id"), playlistId: null, audio: null, image: null, title: "", description: "", tags: "", })
        setinitialStep(0)
      }
    }
    catch (error) {
      console.log(error)
      toast.dismiss(loader)
      toast.error("Something went wrong")
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
          {superAdminNav?.map((i) => (
            <Link to={`/admin/dashboard/${i.link}`} key={i.id} className={`flex pl-5 justify-between items-center gap-x-3 mb-1 cursor-pointer ${(location == i.link || (location == "home" && i.link == "home?query=Music")) ? "text-[#FF1700]" : "text-[#C9C9C9]"}`}>
              <div className='flex items-center gap-x-3 '>
                <div>{i.icon}</div>
                <p className='text-sm'>{i.name}</p>
              </div>
              <div className={`w-1 h-8 ${(location == i.link || (location == "home" && i.link == "home?query=Music")) ? "bg-[#FF1700]" : "bg-transparent"} rounded-tl-md rounded-bl-md`}></div>
            </Link>
          ))}

          <div onClick={() => { setinitialStep(1) }} className='flex cursor-pointer items-center gap-x-3 p-2 pl-5 text-white text-sm my-5 border-t border-b border-b-[#262628] border-t-[#262628]'>
            <FiPlus />
            <p>New Upload</p>
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
              {superAdminNav?.map((i) => (
                <Link to={`/admin/dashboard/${i.link}`} key={i.id} className={`flex pl-5 justify-between items-center gap-x-3 mb-1 cursor-pointer ${(location == i.link || (location == "home" && i.link == "home?query=Music")) ? "text-[#FF1700]" : "text-[#C9C9C9]"}`}>
                  <div className='flex items-center gap-x-3 '>
                    <div>{i.icon}</div>
                    <p className='text-sm'>{i.name}</p>
                  </div>
                  <div className={`w-1 h-8 ${(location == i.link || (location == "home" && i.link == "home?query=Music")) ? "bg-[#FF1700]" : "bg-transparent"} rounded-tl-md rounded-bl-md`}></div>
                </Link>
              ))}

              <div onClick={() => { setinitialStep(1) }} className='flex cursor-pointer items-center gap-x-3 p-2 pl-5 text-white text-sm my-5 border-t border-b border-b-[#262628] border-t-[#262628]'>
                <FiPlus />
                <p>New Upload</p>
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
              <button onClick={() =>{setinitialStep(0);setData({ duration: "", type: "music", creatorId: localStorage.getItem("id"), playlistId: null, audio: null, image: null, title: "", description: "", tags: "", })}} className="focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div onClick={() => { setData({ ...data, type: "Single" }) }} className='flex cursor-pointer justify-between items-center w-[100%] textsm text-white bg-[#262628] px-3 h-[2.5rem] border border-[#444444] mt-8 rounded-md text-sm'>
              <p>Single</p>
              {data?.type == "Single" && <div style={{ background: 'linear-gradient(90deg, #E54B3C 0%, #FF1700 100%)', }} className='w-4 h-4 rounded-full flex justify-center items-center'><TiTick /></div>}
            </div>
            <div onClick={() => { setData({ ...data, type: "Podcast" }) }} className='flex cursor-pointer justify-between items-center w-[100%] textsm text-white bg-[#262628] px-3 h-[2.5rem] border border-[#444444] mt-2 rounded-md text-sm'>
              <p>Podcast</p>
              {data?.type == "Podcast" && <div style={{ background: 'linear-gradient(90deg, #E54B3C 0%, #FF1700 100%)', }} className='w-4 h-4 rounded-full flex justify-center items-center'><TiTick /></div>}
            </div>
            <div onClick={() => { setData({ ...data, type: "Music" }) }} className='flex cursor-pointer justify-between items-center w-[100%] textsm text-white bg-[#262628] px-3 h-[2.5rem] border border-[#444444] my-2 rounded-md text-sm'>
              <p>Music</p>
              {data?.type == "Music" && <div style={{ background: 'linear-gradient(90deg, #E54B3C 0%, #FF1700 100%)', }} className='w-4 h-4 rounded-full flex justify-center items-center'><TiTick /></div>}
            </div>
            <div onClick={() => { setData({ ...data, type: "Album" }) }} className='flex cursor-pointer justify-between items-center w-[100%] textsm text-white bg-[#262628] px-3 h-[2.5rem] border border-[#444444] my-2 rounded-md text-sm'>
              <p>Album</p>
              {data?.type == "Album" && <div style={{ background: 'linear-gradient(90deg, #E54B3C 0%, #FF1700 100%)', }} className='w-4 h-4 rounded-full flex justify-center items-center'><TiTick /></div>}
            </div>

            <button onClick={handleNext} className="bg-[#FF1700] text-sm w-[100%] py-2 mt-2 rounded-md">Next</button>

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
              <button onClick={() =>{setinitialStep(0);setData({ duration: "", type: "music", creatorId: localStorage.getItem("id"), playlistId: null, audio: null, image: null, title: "", description: "", tags: "", })}} className="focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <label htmlFor="image-upload" className='w-[100%] h-[12rem] flex justify-center items-center flex-col rounded-lg bg-[#262628] cursor-pointer'>
              {data?.image ? (
                <img src={data?.previewUrl} alt="Uploaded Preview" className="w-full h-full object-contain rounded-lg" />
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
            <button onClick={() => setinitialStep(1)} className="bg-[#262628] text-sm w-[100%] py-2 mt-2 rounded-md">Back</button>

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
              <button onClick={() =>{setinitialStep(0);setData({ duration: "", type: "music", creatorId: localStorage.getItem("id"), playlistId: null, audio: null, image: null, title: "", description: "", tags: "", })}} className="focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <label htmlFor="image-upload2" className='w-[100%] h-[12rem] flex justify-center items-center flex-col rounded-lg bg-[#262628] cursor-pointer'>
              {data?.audio ? (
                <p>File Uploaded</p>
                // <img src={data?.previewUrl2} alt="Uploaded Preview" className="w-full h-full object-contain rounded-lg" />
              ) : (
                <>
                  <p className='text-sm text-[#AAAAAA]'>Upload your mp4 file</p>
                  <p className='text-sm text-[#FF1700]'>Min *390* x *190*</p>
                </>
              )}
              <input id="image-upload2" type="file" className="hidden" onChange={handleImageUpload2} />
            </label>

            <button onClick={() => setinitialStep(4)} className="bg-[#FF1700] text-sm w-[100%] py-2 mt-2 rounded-md">Next</button>
            <button onClick={() => setinitialStep(2)} className="bg-[#262628] text-sm w-[100%] py-2 mt-2 rounded-md">Back</button>
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
              <button onClick={() =>{setinitialStep(0);setData({ duration: "", type: "music", creatorId: localStorage.getItem("id"), playlistId: null, audio: null, image: null, title: "", description: "", tags: "", })}} className="focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className='text-sm'>Metadata</p>
            <input onChange={(e) => setData({ ...data, title: e.target?.value })} type="text" name="" id="" placeholder='Title' className='w-[100%] h-[2.3rem] px-3 rounded-md border border-[#444444] bg-transparent mt-2 text-sm placeholder:text-sm' />
            <input onChange={(e) => setData({ ...data, description: e.target?.value })} type="text" name="" id="" placeholder='Description' className='w-[100%] h-[2.3rem] px-3 rounded-md border border-[#444444] bg-transparent mt-2 text-sm placeholder:text-sm' />
            <input onChange={(e) => setData({ ...data, tags: e.target?.value })} type="text" name="" id="" placeholder='Tags / Keywords' className='w-[100%] h-[2.3rem] px-3 rounded-md border border-[#444444] bg-transparent mt-2 text-sm placeholder:text-sm' />

            <button onClick={() => { handleUpload("Active") }} className="bg-[#FF1700] text-sm w-[100%] py-2 mt-2 rounded-md">Publish Now</button>
            <button onClick={() => { handleUpload("Draft") }} className="text-sm w-[100%] py-2 mt-2 rounded-md">Draft</button>
            <button onClick={() => setinitialStep(3)} className="bg-[#262628] text-sm w-[100%] py-2 mt-2 rounded-md">Back</button>

          </div>
        </div>
      )}


      {/* PLAYLIST  */}
      {showPlaylist && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className={`${theme === "dark" ? "bg-[#1A1A1B] text-gray-300" : "bg-white text-gray-700"} rounded-md shadow-lg p-6 w-full max-w-md`}>

            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-medium">Select Your Album</h2>
                <p className='text-xs text-[#8D8D8D] mt-1'>Select an album to link the uploaded music or podcast.</p>
              </div>
              <button onClick={() => setinitialStep(0)} className="focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>


            <p className='text-sm'>New Playlist</p>
            <input onChange={(e) => setPlaylistName(e.target.value)} type="text" name="" id="" placeholder='Title' className='w-[100%] h-[2.3rem] px-3 rounded-md border border-[#444444] bg-transparent mt-2 text-sm placeholder:text-sm' />
            <button onClick={handleCreatePlaylist} className="rounded-md border border-[#444444] bg-transparent w-[100%] h-[2.3rem] mt-2 text-sm">Create</button>
            <p className='text-center mt-2 text-sm'>Or</p>
            {
              playlistData?.map((i) => (
                <div key={i?._id} onClick={() => { setData({ ...data, playlistId: i?._id }) }} className='flex cursor-pointer justify-between items-center w-[100%] textsm text-white bg-[#262628] px-3 h-[2.5rem] border border-[#444444] mt-2 rounded-md text-sm'>
                  <p>{i?.title}</p>
                  {data?.playlistId == i?._id && <div style={{ background: 'linear-gradient(90deg, #E54B3C 0%, #FF1700 100%)', }} className='w-4 h-4 rounded-full flex justify-center items-center'><TiTick /></div>}
                </div>
              ))
            }
            <button onClick={() => { setinitialStep(2); setShowPlaylist(false) }} className="bg-[#FF1700] text-sm w-[100%] py-2 mt-2 rounded-md">Next</button>

          </div>
        </div>
      )}

    </>
  );
};

export default Sidebar;
