import React, { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext';
import { HiDotsVertical } from 'react-icons/hi';
import CoverImage from '../../assets/dashboard/cover.svg'
import axios from 'axios';
import config from '../../config';
import { formatTimeAgo } from '../../utils';



const translations = {
    en: {
        draft: "Draft",
    },
    sp: {
        draft: "Borrador",
    },
};

const CreatorDraftPage = () => {
    const { theme } = useTheme();
    const [data, setData] = useState([])
    const [durations, setDurations] = useState({});


    const [language, setLanguage] = useState('en');
    const [translationsData, setTranslationsData] = useState(translations.en);

    const fetchData = async () => {
        try {
            let res = await axios.get(`${config.baseUrl}/music/creator/${localStorage.getItem("id")}`);
            const fetchedData = res?.data?.data;
            setData(fetchedData?.filter((i) => i?.status == "Draft"));
            const durationsMap = {};
            fetchedData.forEach(item => {
                durationsMap[item._id] = item.duration; // no async/await
            });
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

    useEffect(() => {
        fetchData()
    }, []);


    useEffect(() => {
        const storedLang = localStorage.getItem('language');
        if (storedLang) {
            setLanguage(storedLang);
        }
    }, []);

    useEffect(() => {
        setTranslationsData(translations[language] || translations.en);
    }, [language]);

    return (
        <div className='flex-1 overflow-x-auto mx-5 mt-8'>
            <div className={`${theme == "dark" ? "bg-[#1D1D1F]" : "border"} mt-5 p-5 rounded-md`}>
                <p className={`${theme == "dark" && "text-white"} font-medium text-lg`}>{translationsData.draft}</p>
                <div className="w-[100%]">
                    {
                        data?.map((i, index) => (
                            <div key={i?._id} className={`cursor-pointer ${theme == "dark" ? "text-[#C9C9C9]" : "text-black"} flex justify-between items-center overflow-x-auto rounded-[1rem] py-2 px-3 my-3 ${theme == "dark" ? "bg-[#202022]" : "border"}`}>
                                <div className="flex items-center md:mr-2 mr-[7rem]">
                                    <h1 className={`text-[#828287] bg-transparent font-bold lg:w-[3rem] lg:mr-0 mr-3 text-xl`}>{index + 1}</h1>
                                    <img src={i?.image} alt="" className='mr-2 rounded-lg w-[3rem] h-[3rem]' />
                                    <div className="ml-3">
                                        <p className={`${theme == "dark" ? "text-white" : "text-black"} font-medium text-sm text-nowrap`}>{i?.title}</p>
                                        <p className={`${theme == "dark" ? "text-white" : "text-black"} text-xs mt-1 text-nowrap`}>Artist Name</p>
                                    </div>
                                </div>
                                <p className='text-nowrap text-sm mr-2'>{i?.type}</p>
                                <p>{formatDuration(durations[i._id])}</p>
                                <p>{formatTimeAgo(i?.createdAt)}</p>
                                <button className={`bg-[#303332] mr-2 px-3 py-1 rounded-full text-xs ${theme !== "dark" && "text-white"}`}>Ads</button>
                                 {/* <p className='mr-2 text-sm text-[#40E0D0]'>{"3 Episodes"}</p> */}
                                <HiDotsVertical />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default CreatorDraftPage
