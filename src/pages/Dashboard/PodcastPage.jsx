import { useTheme } from '../../context/ThemeContext';
import Podcast from '../../assets/dashboard/podcast.svg'
import Podcast2 from '../../assets/dashboard/podcast2.svg'
import CoverImage from '../../assets/dashboard/cover.svg'
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from "axios";
import config from '../../config'
import { FaBackward, FaForward, FaPlay } from 'react-icons/fa6';
import { RxCross1, RxLoop } from 'react-icons/rx';
import { CiPause1 } from 'react-icons/ci';


const translations = {
    en: {
        aiCuratedPodcast: "AI-Curated Podcast",
        newReleases: "New Releases",
        recent: "Recent",
        trendingPodcast: "Trending Podcast",
    },
    sp: {
        aiCuratedPodcast: "Podcast curado por IA",
        newReleases: "Nuevos lanzamientos",
        recent: "Reciente",
        trendingPodcast: "Podcast de tendencia",
    },
};

const PodcastPage = () => {
    const [key] = useState(localStorage.getItem("key"))
    const { theme } = useTheme();
    const nav = useNavigate()
    const [playingIndex, setPlayingIndex] = useState(0);
    const [podcastData, setPodcastData] = useState([]);
    const [durations, setDurations] = useState({});
    const [mixData, setMixData] = useState([])

    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);

    const [language, setLanguage] = useState('en');
    const [translationsData, setTranslationsData] = useState(translations.en);

    const fetchData = async () => {
        try {
            if (key && key!=="null") {
                let res = await axios.get(`${config.baseUrl}/operator/${key}`);
                const fetchedData = res?.data?.data?.music;
                setMixData(fetchedData)
                setPodcastData(fetchedData.filter((i) => (i.type == "Podcast")))

                const durationsMap = {};
                fetchedData.forEach(item => {
                    durationsMap[item._id] = item.duration; // no async/await
                });
                setDurations(durationsMap);

            }
            else {
                let res = await axios.get(`${config.baseUrl}/music/all`);
                const fetchedData = res?.data?.data;
                setMixData(fetchedData)
                setPodcastData(fetchedData.filter((i) => (i.type == "Podcast")))

                const durationsMap = {};
                fetchedData.forEach(item => {
                    durationsMap[item._id] = item.duration; // no async/await
                });
                setDurations(durationsMap);
            }

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
        audioRef.current.currentTime += 10;
    };

    const handleBackward = () => {
        if (!audioRef) return;
        audioRef.current.currentTime -= 10;
    };

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


    useEffect(() => {
        const storedLang = localStorage.getItem('language');
        if (storedLang) {
            setLanguage(storedLang);
        }
    }, []);

    useEffect(() => { fetchData() }, [])


    useEffect(() => {
        setTranslationsData(translations[language] || translations.en);
    }, [language]);


    return (
        <div className='flex-1 overflow-x-auto p-5'>

            <audio src={playingIndex?.audio} ref={audioRef} autoPlay />


            <p className={`${theme == "dark" && "text-white"} font-medium text-lg`}>{translationsData.aiCuratedPodcast}</p>

            <div className='flex items-center overflow-x-auto gap-x-7 mt-8'>
                {
                    podcastData.map((i) => (
                        <img onClick={() => nav(`/dashboard/podcast/single/${i?._id}`)} key={i?._id} src={i?.image} className='cursor-pointer w-[20rem] h-[20rem] rounded-xl' />
                    ))
                }
            </div>

            <div className="flex justify-between items-center w-[100%]">
                <p className={`${theme == "dark" && "text-white"} font-medium text-lg mt-10`}>{translationsData.newReleases}</p>
                <p className="text-[#828287]">{translationsData.recent}</p>
            </div>

            <div className="mt-10 flex items-center flex-wrap">
                {
                    podcastData?.map((i, index) => (
                        <div onClick={() => nav(`/dashboard/podcast/single/${i?._id}`)} key={index} className="mb-5 min-w-[15rem] cursor-pointer">
                            <img src={i?.image} alt="" className='w-[12rem] h-[12rem]' />
                            <p className="mt-2 text-white">{i?.title}</p>
                            <p className="mt-1 text-[#828287]">{i?.creatorId?.firstName + " " + i?.creatorId?.lastName}</p>
                        </div>
                    ))
                }
            </div>

            <div className="flex justify-between items-center w-[100%]">
                <p className={`${theme == "dark" && "text-white"} font-medium text-lg mt-10`}>{translationsData.trendingPodcast}</p>
            </div>

            <div className={`mt-6 px-5 flex items-center gap-x-10 flex-wrap`}>
                {
                    mixData.map((i, index) => (
                        <div onClick={() => { setPlayingIndex(i); if (audioRef.current) { audioRef.current.load(); audioRef.current.play(); setIsPlaying(true); } }} key={index} className="flex justify-between items-center mb-4 w-[15rem] cursor-pointer">
                            <div className="flex items-center flex-wrap">
                                <img src={i?.image} alt="" className="w-10 h-10 my-2" />
                                <div className="ml-3 my-2">
                                    <p className={`${theme == "dark" ? "text-white" : "text-black"} font-medium text-sm`}>{i?.title}</p>
                                    <p className={`${theme == "dark" ? "text-white" : "text-black"} text-xs mt-1`}>{i?.creatorId?.firstName?(i?.creatorId?.firstName + " " + i?.creatorId?.lastName):"Admin"}</p>
                                </div>
                            </div>
                            <HiOutlineDotsVertical className={`${theme == "dark" && "text-white"}`} />

                        </div>
                    ))
                }
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

export default PodcastPage;
