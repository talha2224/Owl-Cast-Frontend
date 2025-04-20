import { useEffect, useRef, useState } from "react";
import PreviewImage from '../../assets/dashboard/preview.svg'
import { useTheme } from '../../context/ThemeContext';
import Podcast from '../../assets/dashboard/podcast.svg'
import TrendImage from '../../assets/dashboard/trend.svg'
import CoverImage from '../../assets/dashboard/cover.svg'
import CoverImage2 from '../../assets/dashboard/cover-image.svg'
import Overlay from '../../assets/dashboard/overlay2.png'
import { useNavigate } from 'react-router-dom';
import { HiDotsVertical } from "react-icons/hi";
import { FaAngleRight, FaBackward, FaForward, FaPlay } from "react-icons/fa6";
import { AiOutlineExpandAlt } from "react-icons/ai";
import { RxCross1, RxLoop } from "react-icons/rx";
import { CiPause1 } from "react-icons/ci";
import { useLocation } from "react-router-dom";
import axios from "axios";
import config from '../../config'
import { formatTimeAgo, getAudioDuration } from '../../utils';


const SinglePage = () => {
    const nav = useNavigate()
    const { theme } = useTheme();
    const [playingIndex, setPlayingIndex] = useState(0);
    const [podcastData, setPodcastData] = useState([]);
    const [musicData, setMusicData] = useState([]);
    const [trendingData, setTrendingData] = useState([])
    const [durations, setDurations] = useState({});
    let songId = useLocation().pathname.split("/")[4]
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);


    const fetchData = async () => {
        try {
            let res = await axios.get(`${config.baseUrl}/music/all`);
            let trending = await axios.get(`${config.baseUrl}/music/trending`);
            setTrendingData(trending.data?.data)
            const fetchedData = res?.data?.data;
            setPodcastData(fetchedData.filter((i) => (i?._id == songId)))
            setMusicData(fetchedData.filter((i) => (i.type !== "Podcast")))

            const durationsMap = {};
            await Promise.all(fetchedData.map(async (item) => { const duration = await getAudioDuration(item.audio); durationsMap[item._id] = duration; }));
            setDurations(durationsMap);

        }
        catch (error) {
            console.log(error)
        }
    };



    const formatDuration = (seconds) => {
        if (!seconds) return "00:00";
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    };

    const handlePlayPause = () => {
        if (!audioRef) return;
        if (isPlaying) {
            audioRef.current.pause();
        }
        else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleForward = () => {
        if (!audioRef) return;
        audioRef.current.currentTime += 10; // Forward 10 seconds
    };

    const handleBackward = () => {
        if (!audioRef) return;
        audioRef.current.currentTime -= 10; // Backward 10 seconds
    };

    useEffect(() => { fetchData() }, [])

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => {
            setCurrentTime(audio.currentTime);
        };

        audio.addEventListener('timeupdate', updateTime);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
        };
    }, [playingIndex]);


    return (
        <div className='flex-1 overflow-x-auto lg:flex items-start flex-wrap lg:h-[100%] relative'>
            <audio src={playingIndex?.audio} ref={audioRef} autoPlay />

            <div className={`lg:w-[67.9%] h-full p-5 border-r ${theme == "dark" && "border-r-[#262628]"} lg:overflow-y-auto`}>

                <div style={{ backgroundImage: `url(${Overlay})` }} className='w-full bg-no-repeat flex items-start gap-x-10 p-10 flex-wrap'>
                    <img src={podcastData[0]?.image} alt="" className='h-[10rem] rounded-xl' />
                    <div className='mt-2 lg:mt-0'>
                        <p className='text-lg font-medium text-[#FF1700]'>Podcast</p>
                        <h1 className='text-white text-xl font-medium mt-2'>{podcastData[0]?.title}</h1>
                        <button onClick={() => { setPlayingIndex(podcastData[0]); if (audioRef.current) { audioRef.current.load(); audioRef.current.play(); setIsPlaying(true); } }} className='text-white px-8 py-2 rounded-full mt-3 lg:mt-[3rem] text-sm' style={{ background: 'linear-gradient(90deg, #E54B3C 0%, #FF1700 100%)', }}>Play all</button>
                    </div>
                </div>
                <h1 className='text-xl text-white font-medium mt-8'>About</h1>
                <p className='text-white text-sm mt-3'>{podcastData[0]?.description}</p>

                <p className='mt-3 text-[#C9C9C9] text-sm'>{podcastData[0]?.listeners?.length || "0"} Listeners {" "} | {podcastData[0]?.tags?.replaceAll(",", " |")} | {formatTimeAgo(podcastData[0]?.createdAt)}</p>


                <div className={`${theme == "dark" ? "bg-[#1D1D1F]" : "border"} mt-5 p-5 rounded-md`}>
                    <p className={`${theme == "dark" && "text-white"} font-medium text-lg`}>Episodes</p>
                    <div className="w-[100%]">
                        {
                            podcastData?.map((i, index) => (
                                <div onClick={() => { setPlayingIndex(i); if (audioRef.current) { audioRef.current.load(); audioRef.current.play(); setIsPlaying(true); } }} key={i?._id} className={`cursor-pointer ${theme == "dark" ? "text-[#C9C9C9]" : "text-black"} flex justify-between items-center flex-wrap rounded-[1rem] py-2 px-3 my-3 ${theme == "dark" ? playingIndex === i ? "bg-[#FF1700]" : "bg-[#202022]" : "border"}`}>
                                    <div className="flex items-center flex-wrap">
                                        <h1 className={`text-[#828287] bg-transparent font-bold lg:w-[3rem] lg:mr-0 mr-3 text-xl`}>{index + 1}</h1>
                                        <img src={i?.image} alt="" className='mr-2 rounded-lg w-[3rem] h-[3rem]' />
                                        <div className="ml-3">
                                            <p className={`${theme == "dark" ? "text-white" : "text-black"} font-medium text-sm`}>{i?.title}</p>
                                            <p className={`${theme == "dark" ? "text-white" : "text-black"} text-xs mt-1`}>{i?.creatorId?.firstName + " " + i?.creatorId?.lastName}</p>
                                        </div>
                                    </div>
                                    <p>{i?.listeners?.length} Listeners</p>
                                    <p>{formatDuration(durations[i._id])}</p>
                                    <p>{formatTimeAgo(i?.createdAt)}</p>
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
                        musicData.map((i, index) => (
                            <div onClick={() => { setPlayingIndex(i); if (audioRef.current) { audioRef.current.load(); audioRef.current.play(); setIsPlaying(true); } }} key={index} className="flex justify-between items-center mb-4 cursor-pointer">
                                <div className="flex items-center flex-wrap">
                                    <img src={i?.image} alt="" className="w-10 h-10 rounded-md" />
                                    <div className="ml-3">
                                        <p className={`${theme == "dark" ? "text-white" : "text-black"} font-medium text-sm`}>{i?.title}</p>
                                        <p className={`${theme == "dark" ? "text-white" : "text-black"} text-xs mt-1`}>{i?.creatorId?.firstName + " " + i?.creatorId?.lastName}</p>
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
                <div className="flex justify-center items-center mt-3 mx-5"><img onClick={() => { setPlayingIndex(trendingData); if (audioRef.current) { audioRef.current.load(); audioRef.current.play(); setIsPlaying(true); } }} src={trendingData?.image} alt="" className="w-[20rem] h-[15rem] rounded-md cursor-pointer" /></div>

            </div>



            {
                (playingIndex !== 0) &&
                (
                    <div style={{ backgroundImage: `url(${playingIndex?.image})` }} className="w-[100%] md:w-[25rem] h-[13rem] rounded-3xl absolute bottom-[4rem] md:bottom-[2rem] md:right-10 bg-no-repeat bg-cover p-5 ">

                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center flex-wrap">
                                <img src={playingIndex?.image} alt="" className="w-[3rem] h-[3rem] rounded-md" />
                                <div className="ml-3">
                                    <p className={`${theme == "dark" ? "text-white" : "text-black"} font-medium `}>{playingIndex?.title}</p>
                                    <p className={`${theme == "dark" ? "text-white" : "text-black"} mt-1`}>{playingIndex?.creatorId?.firstName + " " + playingIndex?.creatorId?.lastName}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-x-4">
                                <RxCross1 onClick={() => { setPlayingIndex(0); if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; } }} className={`${theme == "dark" && "text-white"} cursor-pointer text-lg`} />
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-5 mt-7 text-white">
                            {/* Current Time */}
                            <p>{formatDuration(currentTime)}</p>

                            {/* Progress Bar */}
                            <div className="flex-1 bg-[#444444] h-[5px] rounded-full relative overflow-hidden">
                                <div className="h-[5px] bg-[#FF1700] rounded-full absolute top-0 left-0" style={{ width: `${(currentTime / durations[playingIndex._id]) * 100}%` }} />
                            </div>

                            {/* Remaining Time */}
                            <p>-{formatDuration(durations[playingIndex._id] - currentTime)}</p>
                        </div>

                        <div className="mt-7 flex justify-center items-center gap-x-6">
                            <RxLoop className="text-white" />
                            <FaBackward className="text-white cursor-pointer" onClick={handleBackward} />
                            {
                                isPlaying ? <CiPause1 className="text-white text-xl cursor-pointer" onClick={handlePlayPause} /> : <FaPlay className="text-white text-xl cursor-pointer" onClick={handlePlayPause} />
                            }
                            <FaForward className="text-white cursor-pointer" onClick={handleForward} />
                            <RxLoop className="text-white" />
                        </div>

                    </div>
                )
            }

        </div>
    );
};

export default SinglePage;