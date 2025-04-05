import { useTheme } from "../../context/ThemeContext";
import HeaderImage from '../../assets/dashboard/header.svg'
import PodcastImage from '../../assets/dashboard/podcast.png'
import CoverImage from '../../assets/dashboard/cover.svg'
import TrendImage from '../../assets/dashboard/trend.svg'
import OverlayImage from '../../assets/dashboard/overlay.png'
import BigImage from '../../assets/dashboard/big.svg'
import Podcast from '../../assets/dashboard/podcast.svg'
import Podcast2 from '../../assets/dashboard/podcast2.svg'
import { HiDotsVertical } from "react-icons/hi";
import { useState } from "react";
import { FaAngleRight, FaBackward, FaForward, FaPlay } from "react-icons/fa6";
import { AiOutlineExpandAlt } from "react-icons/ai";
import { RxCross1, RxLoop } from "react-icons/rx";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const { theme } = useTheme();
  const [palyingIndex, setPalyingIndex] = useState(0);
  const [expandView, setExpandView] = useState(false)
  const currentLocation = useLocation();
  const queryParams = new URLSearchParams(currentLocation.search);
  const queryValue = queryParams.get('query');

  return (


    <div className="flex-1 overflow-x-auto lg:flex items-start flex-wrap lg:h-[100%] relative">

      {
        queryValue === "Music" && (
          <div className={`lg:w-[67.9%] h-full p-5 border-r ${theme == "dark" && "border-r-[#262628]"} lg:overflow-y-auto`}>

            <p className={`${theme == "dark" && "text-white"} font-medium text-lg`}>For You</p>
            <img src={HeaderImage} alt="" className="mt-6" />


            <div className={`${theme == "dark" ? "bg-[#1D1D1F]" : "border"} mt-5 p-5 rounded-md`}>
              <div className="flex justify-between items-center">
                <p className={`${theme == "dark" && "text-white"} font-medium text-lg`}>Top Podcasts</p>
                <p className="text-[#828287]">See all</p>
              </div>

              <div className="w-[100%] overflow-x-auto mt-4 flex items-center gap-x-4">
                {
                  [1, 23, 4, 5, 6, 7, 8, 9, 10, 11, 12]?.map((i) => (<img key={i} src={PodcastImage} />))
                }
              </div>
            </div>

            <div className={`${theme == "dark" ? "bg-[#1D1D1F]" : "border"} mt-5 p-5 rounded-md`}>
              <p className={`${theme == "dark" && "text-white"} font-medium text-lg`}>Top Hits</p>
              <div className="w-[100%]">
                {
                  [1, 23, 4, 5, 6, 7, 8, 9, 10, 11, 12]?.map((i, index) => (
                    <div onClick={() => setPalyingIndex(i)} key={i} className={`cursor-pointer ${theme == "dark" ? "text-[#C9C9C9]" : "text-black"} flex justify-between items-center flex-wrap rounded-[1rem] py-2 px-3 my-3 ${theme == "dark" ? palyingIndex === i ? "bg-[#FF1700]" : "bg-[#202022]" : "border"}`}>
                      <div className="flex items-center flex-wrap">
                        <h1 className={`text-[#828287] bg-transparent font-bold lg:w-[3rem] lg:mr-0 mr-3 text-xl`}>{index + 1}</h1>
                        <img src={CoverImage} alt="" />
                        <div className="ml-3">
                          <p className={`${theme == "dark" ? "text-white" : "text-black"} font-medium text-sm`}>Song Title {i}</p>
                          <p className={`${theme == "dark" ? "text-white" : "text-black"} text-xs mt-1`}>Artist Name</p>
                        </div>
                      </div>
                      <p>2,992,044</p>
                      <p>03:00</p>
                      <p>2 weeks ago</p>
                      <HiDotsVertical />
                    </div>
                  ))
                }
              </div>
            </div>





          </div>
        )
      }

      {
        queryValue === "Music" && (
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
        )
      }


      {
        (queryValue === "Podcast" || queryValue === "New Releases") && (
          <div className="flex-1 p-5">

            <div className="flex justify-between items-center w-[100%]">
              <p className={`${theme == "dark" && "text-white"} font-medium text-lg`}>{queryValue === "Podcast"?"Top Podcasts":"New Releases"}</p>
              <p className="text-[#828287]">Recent</p>
            </div>

            <div className="mt-10 flex gap-x-5 items-center flex-wrap">
              {
                [1,2,3,4,5,6,7,8,9,10,11,12,12,23,223,23,3,3434,7477,4545]?.map((i,index)=>(
                  <div key={i} className="mb-5 flex-1 min-w-[15rem]">
                    <img src={i%2==0?Podcast:Podcast2} alt="" />
                    <p className="mt-2 text-white">Podcast Title</p>
                    <p className="mt-1 text-[#828287]">Artist Name</p>
                  </div>
                ))
              }
            </div>

          </div>
        )
      }




      {
        queryValue === "Music" && (palyingIndex!==0 && !expandView) &&
        (
          <div style={{ backgroundImage: `url(${OverlayImage})` }} className="w-[100%] md:w-[25rem] h-[13rem] rounded-3xl absolute bottom-[4rem] md:bottom-[2rem] md:right-10 bg-no-repeat bg-cover p-5 ">

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center flex-wrap">
                <img src={CoverImage} alt="" className="w-[3rem] h-[3rem]" />
                <div className="ml-3">
                  <p className={`${theme == "dark" ? "text-white" : "text-black"} font-medium `}>Playlist title</p>
                  <p className={`${theme == "dark" ? "text-white" : "text-black"} mt-1`}>Artist Name</p>
                </div>
              </div>
              <div className="flex items-center gap-x-4">
                <AiOutlineExpandAlt onClick={() => { setExpandView(!expandView) }} className={`${theme == "dark" && "text-white"} cursor-pointer text-lg`} />
                <HiDotsVertical className={`${theme == "dark" && "text-white"} cursor-pointer text-lg`} />
              </div>
            </div>

            <div className="flex justify-between items-center gap-5 mt-7 text-white">
              <p>3:03</p>
              <div className="flex-1 bg-[#444444] h-[5px] rounded-full">
                <div className="w-[70%] h-[5px] bg-[#FF1700] rounded-full"></div>
              </div>
              <p>-0:51</p>
            </div>

            <div className="mt-7 flex justify-center items-center gap-x-6">
              <RxLoop className="text-white" />
              <FaForward className="text-white" />
              <FaPlay className="text-white text-xl" />
              <FaBackward className="text-white" />
              <RxLoop className="text-white" />
            </div>

          </div>
        )
      }

      {
        (expandView) &&
        <div style={{ backgroundImage: `url(${OverlayImage})` }} className="w-screen h-screen p-5 fixed top-0 left-0 bg-no-repeat bg-cover flex justify-center items-center flex-col">

          <img src={BigImage} alt="" className="h-[20rem] mb-5" />

          <div className='fixed top-10 right-24 cursor-pointer text-white'>
            <RxCross1 onClick={() => setExpandView(false)} />
          </div>


          <div className="flex justify-between items-center mb-4 w-[20rem]">
            <p className={`${theme == "dark" ? "text-white" : "text-black"} font-medium `}>Playlist title</p>
            <HiDotsVertical className={`${theme == "dark" && "text-white"} cursor-pointer text-lg`} />
          </div>

          <div className="flex justify-between items-center gap-5 text-white w-[20rem]">
            <p>3:03</p>
            <div className="flex-1 bg-[#444444] h-[5px] rounded-full">
              <div className="w-[70%] h-[5px] bg-[#FF1700] rounded-full"></div>
            </div>
            <p>-0:51</p>
          </div>

          <div className="mt-7 flex justify-center items-center gap-x-6">
            <RxLoop className="text-white" />
            <FaForward className="text-white" />
            <FaPlay className="text-white text-xl" />
            <FaBackward className="text-white" />
            <RxLoop className="text-white" />
          </div>

        </div>
      }


    </div>
  );
};

export default HomePage;