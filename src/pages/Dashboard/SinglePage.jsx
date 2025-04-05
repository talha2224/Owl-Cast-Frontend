import PreviewImage from '../../assets/dashboard/preview.svg'
import { useTheme } from '../../context/ThemeContext';
import Podcast from '../../assets/dashboard/podcast.svg'
import TrendImage from '../../assets/dashboard/trend.svg'
import CoverImage from '../../assets/dashboard/cover.svg'
import CoverImage2 from '../../assets/dashboard/cover-image.svg'
import Overlay from '../../assets/dashboard/overlay2.png'
import { useNavigate } from 'react-router-dom';
import { HiDotsVertical } from "react-icons/hi";
import { FaAngleRight } from 'react-icons/fa6';


const SinglePage = () => {
    const { theme } = useTheme();
    const nav = useNavigate()


    return (
        <div className='flex-1 overflow-x-auto lg:flex items-start flex-wrap lg:h-[100%] relative'>

            <div className={`lg:w-[67.9%] h-full p-5 border-r ${theme == "dark" && "border-r-[#262628]"} lg:overflow-y-auto`}>

                <div style={{ backgroundImage: `url(${Overlay})` }} className='w-full bg-no-repeat flex items-start gap-x-10 p-10 flex-wrap'>
                    <img src={CoverImage2} alt="" className='h-[10rem] rounded-xl' />
                    <div className='mt-2 lg:mt-0'>
                        <p className='text-lg font-medium text-[#FF1700]'>Podcast</p>
                        <h1 className='text-white text-xl font-medium mt-2'>TED Talk Daily</h1>
                        <button className='text-white px-8 py-2 rounded-full mt-3 lg:mt-[3rem] text-sm' style={{ background: 'linear-gradient(90deg, #E54B3C 0%, #FF1700 100%)', }}>Play all</button>
                    </div>
                </div>
                <h1 className='text-xl text-white font-medium mt-8'>About</h1>
                <p className='text-white text-sm mt-3'>Want TED Talks on the go? Everyday, this feed brings you our latest talks in audio format. Hear thought-provoking ideas on every subject imaginable – from Artificial Intelligence to Zoology, and everything in between – given by the world's leading thinkers and doers. This collection of talks, given at TED and TEDx conferences around the globe, is also available in video format.</p>
                <p className='mt-3 text-[#C9C9C9] text-sm'>2.3M Listeners | Educational Technology Design | Mar 28 | 11 hours 46 sec</p>


                <div className={`${theme == "dark" ? "bg-[#1D1D1F]" : "border"} mt-5 p-5 rounded-md`}>
                    <p className={`${theme == "dark" && "text-white"} font-medium text-lg`}>Episodes</p>
                    <div className="w-[100%]">
                        {
                            [1, 23, 4, 5, 6]?.map((i, index) => (
                                <div key={i} className={`cursor-pointer ${theme == "dark" ? "text-[#C9C9C9]" : "text-black"} flex justify-between items-center flex-wrap rounded-[1rem] py-2 px-3 my-3 bg-[#202022]`}>
                                    <div className="flex items-center flex-wrap">
                                        <h1 className={`text-[#828287] bg-transparent font-bold lg:w-[3rem] lg:mr-0 mr-3 text-xl`}>{index + 1}</h1>
                                        <img src={CoverImage} alt="" />
                                        <div className="ml-3">
                                            <p className={`${theme == "dark" ? "text-white" : "text-black"} font-medium text-sm`}>Work is broken. Gen Z <br /> can help fix it Part 2.</p>
                                            <p className={`${theme == "dark" ? "text-white" : "text-black"} text-xs mt-1`}>Amanda Schneider </p>
                                        </div>
                                    </div>
                                    <p>2,992,044</p>
                                    <p>03:40:20</p>
                                    <p>2 weeks ago</p>
                                    <HiDotsVertical />
                                </div>
                            ))
                        }
                    </div>
                </div>

            </div>

            <div className="flex-1 lg:overflow-y-auto h-full pb-10">

                <div className="flex justify-between items-center w-[90%] m-5">
                    <p className={`${theme == "dark" && "text-white"} font-medium text-lg`}>Library</p>
                    <p className="text-[#828287]">Recent</p>
                </div>

                <div className="flex items-center gap-x-4 overflow-x-auto mt-6 mx-5">
                    <button className="text-sm text-white bg-[#262628] px-4 py-1 rounded-full">Playlist</button>
                    <button className="text-sm text-white bg-[#262628] px-4 py-1 rounded-full">Music</button>
                    <button className="text-sm text-white bg-[#262628] px-4 py-1 rounded-full">Podcasts</button>
                    <button className="text-sm text-white bg-[#262628] px-4 py-1 rounded-full">Library</button>
                </div>

                <div className={`mt-6 px-5 border-b ${theme == "dark" && "border-b-[#262628]"}`}>
                    {
                        [1, 2, 3, 4, 5].map((i, index) => (
                            <div key={index} className="flex justify-between items-center mb-4">
                                <div className="flex items-center flex-wrap">
                                    <img src={CoverImage} alt="" className="w-10 h-10" />
                                    <div className="ml-3">
                                        <p className={`${theme == "dark" ? "text-white" : "text-black"} font-medium text-sm`}>Song Title</p>
                                        <p className={`${theme == "dark" ? "text-white" : "text-black"} text-xs mt-1`}>Artist Name</p>
                                    </div>
                                </div>
                                <FaAngleRight className={`${theme == "dark" && "text-white"}`} />

                            </div>
                        ))
                    }
                </div>

                <div className="flex justify-between items-center w-[90%] m-5">
                    <p className={`${theme == "dark" && "text-white"} font-medium text-lg`}>Trending 🔥</p>
                    <p className="text-[#828287]">Recent</p>
                </div>
                <div className="flex justify-center items-center mt-3"><img src={TrendImage} alt="" /></div>

            </div>


        </div>
    );
};

export default SinglePage;