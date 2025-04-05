import PreviewImage from '../../assets/dashboard/preview.svg'
import { useTheme } from '../../context/ThemeContext';
import Podcast from '../../assets/dashboard/podcast.svg'
import Podcast2 from '../../assets/dashboard/podcast2.svg'
import CoverImage from '../../assets/dashboard/cover.svg'
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const PodcastPage = () => {
    const { theme } = useTheme();
    const nav = useNavigate()


    return (
        <div className='flex-1 overflow-x-auto p-5'>

            <p className={`${theme == "dark" && "text-white"} font-medium text-lg`}>AI-Curated Podcast</p>

            <div className='flex items-center overflow-x-auto gap-x-7 mt-8'>
                {
                    [1, 2, 3, 4, 5, 6, 7].map((i) => (
                        <img onClick={()=>nav(`/dashboard/podcast/single/${i}`)} key={i} src={PreviewImage} className='cursor-pointer' />
                    ))
                }
            </div>

            <div  className="flex justify-between items-center w-[100%]">
                <p className={`${theme == "dark" && "text-white"} font-medium text-lg mt-10`}>New Releases</p>
                <p className="text-[#828287]">Recent</p>
            </div>

            <div className="mt-10 flex gap-x-5 items-center flex-wrap">
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,]?.map((i, index) => (
                        <div onClick={()=>nav(`/dashboard/podcast/single/${i}`)} key={i} className="mb-5 flex-1 min-w-[15rem] cursor-pointer">
                            <img src={i % 2 == 0 ? Podcast : Podcast2} alt="" />
                            <p className="mt-2 text-white">Podcast Title</p>
                            <p className="mt-1 text-[#828287]">Artist Name</p>
                        </div>
                    ))
                }
            </div>

            <div className="flex justify-between items-center w-[100%]">
                <p className={`${theme == "dark" && "text-white"} font-medium text-lg mt-10`}>Trending Podcast</p>
            </div>

            <div className={`mt-6 px-5 flex items-center gap-x-10 flex-wrap`}>
                {
                    [1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5].map((i, index) => (
                        <div key={index} className="flex justify-between items-center mb-4 w-[10rem] cursor-pointer">
                            <div className="flex items-center flex-wrap">
                                <img src={CoverImage} alt="" className="w-10 h-10" />
                                <div className="ml-3">
                                    <p className={`${theme == "dark" ? "text-white" : "text-black"} font-medium text-sm`}>Song Title</p>
                                    <p className={`${theme == "dark" ? "text-white" : "text-black"} text-xs mt-1`}>Artist Name</p>
                                </div>
                            </div>
                            <HiOutlineDotsVertical className={`${theme == "dark" && "text-white"}`} />

                        </div>
                    ))
                }
            </div>

        </div>
    );
};

export default PodcastPage;