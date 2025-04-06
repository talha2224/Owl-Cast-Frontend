import React from 'react'
import { useTheme } from '../../context/ThemeContext';
import MusicImg from '../../assets/dashboard/creator/music.svg'
import { FaMusic } from "react-icons/fa6";
import { HiDotsVertical } from 'react-icons/hi';
import CoverImage from '../../assets/dashboard/cover.svg'

const CreatorHomePage = () => {

    const { theme } = useTheme();

    return (

        <div className='flex-1 overflow-x-auto mx-5 mt-8'>


            <div className={`${theme == "dark" ? "bg-[#262628]" : "border"} px-8 py-4 rounded-xl w-[100%] flex items-center gap-x-4`}>
                {theme == "dark" ? <img src={MusicImg} alt="" /> : <FaMusic className='text-[2rem]' />}
                <div>
                    <p className='text-[#C9C9C9] text-sm'>Total Uploads</p>
                    <div className={`${theme === "dark" && "text-white"} text-lg font-medium`}>20</div>
                </div>

            </div>

            <div className={`${theme == "dark" ? "bg-[#1D1D1F]" : "border"} mt-5 p-5 rounded-md`}>
                <p className={`${theme == "dark" && "text-white"} font-medium text-lg`}>Most Played Upload</p>
                <div className="w-[100%]">
                    {
                        [1, 23, 4, 5]?.map((i, index) => (
                            <div key={i} className={`cursor-pointer ${theme == "dark" ? "text-[#C9C9C9]" : "text-black"} flex justify-between items-center overflow-x-auto rounded-[1rem] py-2 px-3 my-3 ${theme == "dark" ? "bg-[#202022]" : "border"}`}>
                                <div className="flex items-center md:mr-2 mr-[7rem]">
                                    <h1 className={`text-[#828287] bg-transparent font-bold lg:w-[3rem] lg:mr-0 mr-3 text-xl`}>{index + 1}</h1>
                                    <img src={CoverImage} alt="" className='mr-2' />
                                    <div className="ml-3">
                                        <p className={`${theme == "dark" ? "text-white" : "text-black"} font-medium text-sm text-nowrap`}>Song Title</p>
                                        <p className={`${theme == "dark" ? "text-white" : "text-black"} text-xs mt-1 text-nowrap`}>Artist Name</p>
                                    </div>
                                </div>
                                <p className='text-nowrap text-sm mr-2'>2,992,044 Streams</p>
                                <p className='text-[#34c759] text-nowrap text-sm mr-2'>15%</p>
                                <p className='text-nowrap text-sm mr-2'>03:00</p>
                                <p className='text-nowrap text-sm mr-2  '>2 weeks ago</p>
                                <button className={`bg-[#303332] mr-2 px-3 py-1 rounded-full text-xs ${theme!=="dark" && "text-white"}`}>$40.40</button>
                                <p className='mr-2 text-sm text-[#40E0D0]'>{"Ads"}</p>
                                <HiDotsVertical/>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className={`${theme == "dark" ? "bg-[#1D1D1F]" : "border"} mt-5 p-5 rounded-md`}>
                <p className={`${theme == "dark" && "text-white"} font-medium text-lg`}>Library</p>
                <div className="w-[100%]">
                    {
                        [1, 23, 4, 5]?.map((i, index) => (
                            <div key={i} className={`cursor-pointer ${theme == "dark" ? "text-[#C9C9C9]" : "text-black"} flex justify-between items-center overflow-x-auto rounded-[1rem] py-2 px-3 my-3 ${theme == "dark" ? "bg-[#202022]" : "border"}`}>
                                <div className="flex items-center md:mr-2 mr-[7rem]">
                                    <h1 className={`text-[#828287] bg-transparent font-bold lg:w-[3rem] lg:mr-0 mr-3 text-xl`}>{index + 1}</h1>
                                    <img src={CoverImage} alt="" className='mr-2' />
                                    <div className="ml-3">
                                        <p className={`${theme == "dark" ? "text-white" : "text-black"} font-medium text-sm text-nowrap`}>Song Title</p>
                                        <p className={`${theme == "dark" ? "text-white" : "text-black"} text-xs mt-1 text-nowrap`}>Artist Name</p>
                                    </div>
                                </div>
                                <p className='text-nowrap text-sm mr-2'>2,992,044 Streams</p>
                                <p className='text-[#34c759] text-nowrap text-sm mr-2'>15%</p>
                                <p className='text-nowrap text-sm mr-2'>03:00</p>
                                <p className='text-nowrap text-sm mr-2  '>Jan 10, 2021</p>
                                <button className={`bg-[#303332] mr-2 px-3 py-1 rounded-full text-xs ${theme!=="dark" && "text-white"}`}>$40.40</button>
                                <p className='mr-2 text-sm text-[#3771C8]'>{"Subscriber"}</p>
                                <button className='bg-transparent mr-2 px-3 py-1 rounded-full text-xs text-[#3771C8] border border-[#3771C8]'>Published</button>
                                <HiDotsVertical/>
                            </div>
                        ))
                    }
                </div>
            </div>



        </div>

    )
}

export default CreatorHomePage