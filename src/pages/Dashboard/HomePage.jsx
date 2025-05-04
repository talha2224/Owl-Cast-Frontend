import { useTheme } from "../../context/ThemeContext";
import HeaderImage from '../../assets/dashboard/header.svg';
import { HiDotsVertical } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import { FaAngleRight, FaBackward, FaForward, FaPlay } from "react-icons/fa6";
import { AiOutlineExpandAlt } from "react-icons/ai";
import { RxCross1, RxLoop } from "react-icons/rx";
import { CiPause1 } from "react-icons/ci";
import { useLocation } from "react-router-dom";
import axios from "axios";
import config from '../../config';
import { formatTimeAgo } from '../../utils';
import { GiSoundWaves } from "react-icons/gi";

// Translation data
const translations = {
  en: {
    forYou: "For You",
    topPodcasts: "Top Podcasts",
    seeAll: "See all",
    topHits: "Top Hits",
    library: "Library",
    recent: "Recent",
    playlist: "Playlist",
    music: "Music",
    podcasts: "Podcasts",
    trending: "Trending 🔥",
    newReleases: "New Releases"
  },
  sp: {
    forYou: "Para ti",
    topPodcasts: "Podcasts principales",
    seeAll: "Ver todo",
    topHits: "Éxitos principales",
    library: "Biblioteca",
    recent: "Reciente",
    playlist: "Lista de reproducción",
    music: "Música",
    podcasts: "Podcasts",
    trending: "Tendencias 🔥",
    newReleases: "Nuevos lanzamientos"
  },
};

const HomePage = () => {
  const [key] = useState(localStorage.getItem("key"))
  const { theme } = useTheme();
  const [playingIndex, setPlayingIndex] = useState(0);
  const [expandView, setExpandView] = useState(false);
  const currentLocation = useLocation();
  const queryParams = new URLSearchParams(currentLocation.search);
  const queryValue = queryParams.get('query');
  const [language, setLanguage] = useState('en'); // Default language
  const [translationsData, setTranslationsData] = useState(translations.en);


  const [mixData, setMixData] = useState([]);
  const [podcastData, setPodcastData] = useState([]);
  const [musicData, setMusicData] = useState([]);
  const [trendingData, setTrendingData] = useState([]);
  const [durations, setDurations] = useState({});

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);


  const fetchData = async () => {
    try {


      if (key) {
        let res = await axios.get(`${config.baseUrl}/operator/${key}`);
        const fetchedData = res?.data?.data?.music;
        const durationsMap = {};
        fetchedData.forEach(item => {
          durationsMap[item._id] = item.duration;
        });
        setDurations(durationsMap);
        let trending = await axios.get(`${config.baseUrl}/music/trending`);
        setTrendingData(trending.data?.data);
        setMixData(fetchedData);
        setPodcastData(fetchedData.filter((i) => (i.type === "Podcast")));
        setMusicData(fetchedData.filter((i) => (i.type !== "Podcast")));
      }

      else {
        let res = await axios.get(`${config.baseUrl}/music/all`);
        const fetchedData = res?.data?.data;
        const durationsMap = {};
        fetchedData.forEach(item => {
          durationsMap[item._id] = item.duration;
        });
        setDurations(durationsMap);
        let trending = await axios.get(`${config.baseUrl}/music/trending`);
        setTrendingData(trending.data?.data);
        setMixData(fetchedData);
        setPodcastData(fetchedData.filter((i) => (i.type === "Podcast")));
        setMusicData(fetchedData.filter((i) => (i.type !== "Podcast")));
      }

    }
    catch (error) {
      console.log(error);
    }
  };

  const updateListners = async (i) => {
    try {
      setPlayingIndex(i);
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        setIsPlaying(true);
      }
      if (!i?.listeners?.includes(localStorage.getItem("id"))) {
        let res = await axios.put(`${config.baseUrl}/music/listener/${i?._id}`, { userId: localStorage.getItem("id") });
        console.log(res?.data?.data);
      }
    }
    catch (error) {
      console.log(error);
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

  useEffect(() => { fetchData(); }, []);

  useEffect(() => {
    const storedLang = localStorage.getItem('language');
    if (storedLang) {
      setLanguage(storedLang);
    }
  }, []);

  useEffect(() => {
    setTranslationsData(translations[language] || translations.en);
  }, [language]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      if (!isNaN(audio.currentTime)) {
        setCurrentTime(audio.currentTime);
      }
    };

    audio.addEventListener('timeupdate', updateTime);

    const handleLoadedMetadata = () => {
      setCurrentTime(audio.currentTime);
    };
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [playingIndex]);

  return (
    <div className="flex-1 overflow-x-auto lg:flex items-start flex-wrap lg:h-[100%] relative">
      <audio src={playingIndex?.audio} ref={audioRef} autoPlay />

      {queryValue === "Music" && (
        <div className={`lg:w-[67.9%] h-full p-5 border-r ${theme === "dark" && "border-r-[#262628]"} lg:overflow-y-auto`}>
          <p className={`${theme === "dark" && "text-white"} font-medium text-lg`}>{translationsData.forYou}</p>
          <img src={HeaderImage} alt="" className="mt-6" />

          <div className={`${theme === "dark" ? "bg-[#1D1D1F]" : "border"} mt-5 p-5 rounded-md`}>
            <div className="flex justify-between items-center">
              <p className={`${theme === "dark" && "text-white"} font-medium text-lg`}>{translationsData.topPodcasts}</p>
              <p className="text-[#828287]">{translationsData.seeAll}</p>
            </div>
            <div className="w-[100%] overflow-x-auto mt-4 flex items-center gap-x-4">
              {podcastData?.map((i) => (
                <img
                  onClick={() => { updateListners(i); }}
                  key={i?.id}
                  src={i?.image}
                  className="w-[7rem] h-[7rem] rounded-md cursor-pointer"
                  alt={`Podcast: ${i?.title}`}
                />
              ))}
            </div>
          </div>

          <div className={`${theme === "dark" ? "bg-[#1D1D1F]" : "border"} mt-5 p-5 rounded-md`}>
            <p className={`${theme === "dark" && "text-white"} font-medium text-lg`}>{translationsData.topHits}</p>
            <div className="w-[100%]">
              {musicData?.map((i, index) => (
                <div onClick={() => { updateListners(i); }} key={i?._id} className={`cursor-pointer ${theme === "dark" ? "text-[#C9C9C9]" : "text-black"} flex justify-between items-center flex-wrap rounded-[1rem] py-2 px-3 my-3 ${theme === "dark" ? playingIndex === i ? "bg-[#FF1700]" : "bg-[#202022]" : "border"}`}>
                  <div className="flex items-center flex-wrap">
                    <h1 className={`text-[#828287] bg-transparent font-bold lg:w-[3rem] lg:mr-0 mr-3 text-xl`}>{index + 1}</h1>
                    <div className="relative w-[3rem] h-[3rem]">
                      <img src={i?.image} alt={i?.title} className='mr-2 rounded-lg w-[100%] h-[100%]' />
                      {
                        playingIndex === i ? <GiSoundWaves className="text-white text-[2rem] absolute top-2 left-2" />
                          : index == 0 && <FaPlay className="text-white text-[1.5rem] absolute top-3 left-3" />
                      }
                    </div>
                    <div className="ml-3">
                      <p className={`${theme === "dark" ? "text-white" : "text-black"} font-medium text-sm`}>{i?.title}</p>
                      <p className={`${theme === "dark" ? "text-white" : "text-black"} text-xs mt-1`}>{i?.creatorId?.firstName + " " + i?.creatorId?.lastName}</p>
                    </div>
                  </div>
                  <p>{i?.listeners?.length} Listeners</p>
                  <p>{formatDuration(durations[i._id])}</p>
                  <p>{formatTimeAgo(i?.createdAt)}</p>
                  <HiDotsVertical />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {queryValue === "Music" && (
        <div className="flex-1 lg:overflow-y-auto h-full pb-10">
          <div className="flex justify-between items-center w-[90%] m-5">
            <p className={`${theme === "dark" && "text-white"} font-medium text-lg`}>{translationsData.library}</p>
            <p className="text-[#828287]">{translationsData.recent}</p>
          </div>

          <div className="flex items-center gap-x-4 overflow-x-auto mt-6 mx-5">
            <button className="text-sm text-white bg-[#262628] px-4 py-1 rounded-full text-nowrap truncate">{translationsData.playlist}</button>
            <button className="text-sm text-white bg-[#262628] px-4 py-1 rounded-full text-nowrap truncate">{translationsData.music}</button>
            <button className="text-sm text-white bg-[#262628] px-4 py-1 rounded-full text-nowrap truncate">{translationsData.podcasts}</button>
            <button className="text-sm text-white bg-[#262628] px-4 py-1 rounded-full text-nowrap truncate">{translationsData.library}</button>
          </div>

          <div className={`mt-6 px-5 border-b ${theme === "dark" && "border-b-[#262628]"}`}>
            {musicData.map((i, index) => (
              <div
                onClick={() => { updateListners(i); }}
                key={index}
                className="flex justify-between items-center mb-4 cursor-pointer"
              >
                <div className="flex items-center flex-wrap">
                  <img src={i?.image} alt={i?.title} className="w-10 h-10 rounded-md" />
                  <div className="ml-3">
                    <p className={`${theme === "dark" ? "text-white" : "text-black"} font-medium text-sm`}>{i?.title}</p>
                    <p className={`${theme === "dark" ? "text-white" : "text-black"} text-xs mt-1`}>{i?.creatorId?.firstName + " " + i?.creatorId?.lastName}</p>
                  </div>
                </div>
                <FaAngleRight className={`${theme === "dark" && "text-white"}`} />
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center w-[90%] m-5">
            <p className={`${theme === "dark" && "text-white"} font-medium text-lg`}>{translationsData.trending}</p>
            <p className="text-[#828287]">{translationsData.recent}</p>
          </div>
          <div className="flex justify-center items-center mt-3 mx-5">
            <img
              onClick={() => {
                setPlayingIndex(trendingData);
                if (audioRef.current) {
                  audioRef.current.load();
                  audioRef.current.play();
                  setIsPlaying(true);
                }
              }}
              src={trendingData?.image}
              alt="Trending"
              className="w-[20rem] h-[15rem] rounded-md cursor-pointer"
            />
          </div>
        </div>
      )}

      {queryValue === "Podcast" && (
        <div className="flex-1 p-5">
          <div className="flex justify-between items-center w-[100%]">
            <p className={`${theme === "dark" && "text-white"} font-medium text-lg`}>
              {queryValue === "Podcast" ? translationsData.topPodcasts : translationsData.newReleases}
            </p>
            <p className="text-[#828287]">{translationsData.recent}</p>
          </div>

          <div className="mt-10 flex gap-x-5 items-center flex-wrap">
            {podcastData?.map((i) => (
              <div
                onClick={() => { updateListners(i); }}
                key={i?._id}
                className="mb-5 flex-1 min-w-[15rem] max-w-[15rem] cursor-pointer"
              >
                <img src={i?.image} alt={i?.title} className="w-[13rem] h-[13rem] rounded-md" />
                <p className="mt-2 text-white">{i?.title}</p>
                <p className="mt-1 text-[#828287]">{i?.creatorId?.firstName + " " + i?.creatorId?.lastName}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {queryValue === "New Releases" && (
        <div className="flex-1 p-5">
          <div className="flex justify-between items-center w-[100%]">
            <p className={`${theme === "dark" && "text-white"} font-medium text-lg`}>
              {queryValue === "Podcast" ? translationsData.topPodcasts : translationsData.newReleases}
            </p>
            <p className="text-[#828287]">{translationsData.recent}</p>
          </div>

          <div className="mt-10 flex gap-x-5 items-center flex-wrap">
            {mixData?.map((i) => (
              <div
                onClick={() => { updateListners(i); }}
                key={i?._id}
                className="mb-5 flex-1 sm:min-w-[15rem] sm:max-w-[15rem] cursor-pointer"
              >
                <img src={i?.image} alt={i?.title} className="w-[13rem] h-[13rem] rounded-md" />
                <p className="mt-2 text-white">{i?.title}</p>
                <p className="mt-1 text-[#828287]">{i?.creatorId?.firstName + " " + i?.creatorId?.lastName}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {playingIndex !== 0 && !expandView && (
        <div
          style={{ backgroundImage: `url(${playingIndex?.image})` }}
          className="w-[100%] md:w-[25rem] h-[13rem] rounded-3xl absolute bottom-[4rem] md:bottom-[2rem] md:right-10 bg-no-repeat bg-cover p-5 "
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center flex-wrap">
              <img src={playingIndex?.image} alt={playingIndex?.title} className="w-[3rem] h-[3rem] rounded-md" />
              <div className="ml-3">
                <p className={`${theme === "dark" ? "text-white" : "text-black"} font-medium `}>{playingIndex?.title}</p>
                <p className={`${theme === "dark" ? "text-white" : "text-black"} mt-1`}>{playingIndex?.creatorId?.firstName + " " + playingIndex?.creatorId?.lastName}</p>
              </div>
            </div>
            <div className="flex items-center gap-x-4">
              <AiOutlineExpandAlt
                onClick={() => { setExpandView(!expandView); }}
                className={`${theme === "dark" && "text-white"} cursor-pointer text-lg`}
              />
              <RxCross1
                onClick={() => {
                  setPlayingIndex(0);
                  if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                  }
                }}
                className={`${theme === "dark" && "text-white"} cursor-pointer text-lg`}
              />
            </div>
          </div>
          <div className="flex justify-between items-center gap-5 mt-7 text-white">
            <p>{formatDuration(currentTime)}</p>
            <div className="flex-1 bg-[#444444] h-[5px] rounded-full relative overflow-hidden">
              <div
                className="h-[5px] bg-[#FF1700] rounded-full absolute top-0 left-0"
                style={{ width: `${(currentTime / durations[playingIndex._id]) * 100}%` }}
              />
            </div>
            <p>-{formatDuration(durations[playingIndex._id] - currentTime)}</p>
          </div>

          <div className="mt-7 flex justify-center items-center gap-x-6">
            <RxLoop className="text-white" />
            <FaBackward className="text-white cursor-pointer" onClick={handleBackward} />
            {isPlaying ? (
              <CiPause1 className="text-white text-xl cursor-pointer" onClick={handlePlayPause} />
            ) : (
              <FaPlay className="text-white text-xl cursor-pointer" onClick={handlePlayPause} />
            )}
            <FaForward className="text-white cursor-pointer" onClick={handleForward} />
            <RxLoop className="text-white" />
          </div>
        </div>
      )}

      {expandView && (
        <div
          style={{ backgroundImage: `url(${playingIndex?.image})` }}
          className="w-screen h-screen p-5 fixed top-0 left-0 bg-no-repeat bg-cover flex justify-center items-center flex-col"
        >
          <img src={playingIndex?.image} alt={playingIndex?.title} className="h-[20rem] mb-5 rounded-md" />

          <div className='fixed top-10 right-24 cursor-pointer text-white'>
            <RxCross1 onClick={() => setExpandView(false)} />
          </div>

          <div className="flex justify-between items-center mb-4 w-[20rem]">
            <p className={`${theme === "dark" ? "text-white" : "text-black"} font-medium `}>{playingIndex?.title}</p>
            <HiDotsVertical className={`${theme === "dark" && "text-white"} cursor-pointer text-lg`} />
          </div>

          <div className="w-[20rem] mt-2">
            <div className="flex items-center gap-4 text-white">
              <p>{formatDuration(currentTime)}</p>
              <div className="flex-1 bg-[#444444] h-[5px] rounded-full relative overflow-hidden">
                <div
                  className="h-[5px] bg-[#FF1700] rounded-full absolute top-0 left-0"
                  style={{ width: `${(currentTime / durations[playingIndex._id]) * 100}%` }}
                />
              </div>
              <p>-{formatDuration(durations[playingIndex._id] - currentTime)}</p>
            </div>
            <div className="flex justify-center mt-5 gap-x-6">
              <FaBackward onClick={handleBackward} className="text-white cursor-pointer" />
              {isPlaying ? (
                <CiPause1 onClick={handlePlayPause} className="text-white text-xl cursor-pointer" />
              ) : (
                <FaPlay onClick={handlePlayPause} className="text-white text-xl cursor-pointer" />
              )}
              <FaForward onClick={handleForward} className="text-white cursor-pointer" />
            </div>
          </div>
        </div>
      )}
    </div >
  );
};

export default HomePage;
