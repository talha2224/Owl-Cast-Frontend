import React, { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext';
import { HiDotsVertical } from 'react-icons/hi';
import { formatTimeAgo } from '../../utils';
import axios from 'axios';
import config from '../../config';
import toast from 'react-hot-toast';
import { TiTick } from 'react-icons/ti';


const translations = {
    en: {
        library: "Library",
        streams: "Streams",
    },
    sp: {
        library: "Biblioteca",
        streams: "Reproducciones",
    },
};

const AdminLibraryPage = () => {

    const { theme } = useTheme();
    const [data, setData] = useState([])
    const [durations, setDurations] = useState({});

    const [language, setLanguage] = useState('en');
    const [translationsData, setTranslationsData] = useState(translations.en);

    const [show, setShow] = useState(false)
    const [edit, setedit] = useState(false)



    const [initialStep, setinitialStep] = useState(0)
    const [musciData, setMusicData] = useState({ id: "", duration: "", type: "music", playlistId: null, audio: null, pimage: null, image: null, title: "", description: "", tags: "", })
    const [playlistName, setPlaylistName] = useState("")
    const [showPlaylist, setShowPlaylist] = useState(false)
    const [playlistData, setPlaylistData] = useState([])


    const fetchData = async () => {
        try {
            let res = await axios.get(`${config.baseUrl}/music/all`);
            const fetchedData = res?.data?.data;
            setData(fetchedData);
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


    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setMusicData({...musciData, image: file, previewUrl });
        }
    };

    const handleImageUpload2 = (event) => {
        const file = event.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            const audioElement = new Audio(previewUrl);
            audioElement.addEventListener('loadedmetadata', () => {
                const durationInSeconds = Math.floor(audioElement.duration);
                console.log(durationInSeconds, 'durationInSeconds')
                setMusicData(prev => ({
                    ...prev,
                    audio: file,
                    previewUrl2: previewUrl,
                    duration: durationInSeconds
                }));
            });
        }
    };

    const fetchAllPlaylist = async () => {
        try {
            let playlist = await axios.get(`${config.baseUrl}/playlist/all`)
            if (playlist?.data) {
                setPlaylistData(playlist?.data?.data)
            }
        }
        catch (error) {

        }
    }

    const handleNext = () => {
        if (musciData.type == "Album") {
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

    const handleUpload = async () => {
        let loader = toast.loading("Uploading It Will Take Some Time");
        try {
            let formData = new FormData()
            formData.append("type", musciData?.type)
            formData.append("playlistId", musciData?.playlistId)
            formData.append("audio", musciData?.audio)
            formData.append("image", musciData?.image)
            formData.append("title", musciData?.title)
            formData.append("description", musciData?.description)
            formData.append("tags", musciData?.tags)
            formData.append("duration", musciData?.duration);
            let res = await axios.put(`${config.baseUrl}/music/update/${musciData.id}`, formData)
            if (res?.data?.data) {
                fetchData()
                toast.dismiss(loader)
                toast.success("Uploading Sucessfull")
                setinitialStep(0)
            }
        }
        catch (error) {
            console.log(error)
            toast.dismiss(loader)
            toast.error("Something went wrong")
        }
    }

    const handleDelete = async (id) => {
        let loader = toast.loading("Deleteting It Will Take Some Time");
        try {
            let res = await axios.delete(`${config.baseUrl}/music/delete/${id}`)
            if (res?.data?.data) {
                fetchData()
                toast.dismiss(loader)
                toast.success("Content Deleted")
            }
        }
        catch (error) {
            console.log(error)
            toast.dismiss(loader)
            toast.error("Something went wrong")
        }
    }

    useEffect(() => {
        fetchAllPlaylist()
    }, [])



    return (

        <div className='flex-1 overflow-x-auto mx-5 mt-8'>


            <div className={`${theme == "dark" ? "bg-[#1D1D1F]" : "border"} mt-5 p-5 rounded-md`}>
                <p className={`${theme == "dark" && "text-white"} font-medium text-lg`}>{translationsData.library}</p>
                <div className="w-[100%]">
                    {
                        data?.map((i, index) => (
                            <div key={i?._id} className={`relative cursor-pointer ${theme == "dark" ? "text-[#C9C9C9]" : "text-black"} flex justify-between items-center overflow-x-auto rounded-[1rem] py-2 px-3 my-3 ${theme == "dark" ? "bg-[#202022]" : "border"}`}>
                                <div className="flex items-center md:mr-2 mr-[7rem] w-[20rem]">
                                    <h1 className={`text-[#828287] bg-transparent font-bold lg:w-[3rem] lg:mr-0 mr-3 text-xl`}>{index + 1}</h1>
                                    <img src={i?.image} alt="" className='mr-2 rounded-lg w-[3rem] h-[3rem]' />
                                    <div className="ml-3">
                                        <p className={`${theme == "dark" ? "text-white" : "text-black"} font-medium text-sm text-nowrap`}>{i?.title}</p>
                                        <p className={`${theme == "dark" ? "text-white" : "text-black"} text-xs mt-1 text-nowrap`}>{i?.creatorId?.firstName?(i?.creatorId?.firstName + " " + i?.creatorId?.lastName):"Admin"}</p>
                                    </div>
                                </div>
                                <p className='text-nowrap text-sm mr-2'>{i?.listeners?.length} {translationsData.streams}</p>
                                <p className='text-[#34c759] text-nowrap text-sm mr-2'>15%</p>
                                <p className='text-nowrap text-sm mr-2'>{formatDuration(durations[i._id])}</p>
                                <p className='text-nowrap text-sm mr-2'>{formatTimeAgo(i?.createdAt)}</p>                                     <p className='text-nowrap text-sm mr-2 '>Jan 10, 2021</p>
                                <div className=' flex items-center gap-x-3'>
                                    <button onClick={() => { setMusicData({ id: i?._id, duration: i?.duration, type: i?.type, playlistId: i?.playlistId?._id, audio: i?.audio, pimage: i?.image, title: i?.title, description: i?.description, tags: i?.tags, }); setinitialStep(1) }} className='bg-transparent mr-2 px-3 py-1 rounded-full text-xs text-[#3771C8] border border-[#3771C8]'>Edit</button>
                                    <button onClick={()=>handleDelete(i?._id)} className='bg-transparent mr-2 px-3 py-1 rounded-full text-xs text-[#ff4f4f] border border-[#ff4f4f]'>Delete</button>
                                </div>

                            </div>
                        ))
                    }
                </div>
            </div>



            {/* // MODELS  */}
            {initialStep === 1 && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className={`${theme === "dark" ? "bg-[#1A1A1B] text-gray-300" : "bg-white text-gray-700"} rounded-md shadow-lg p-6 w-full max-w-md`}>

                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-lg font-medium">Update your content</h2>
                                <p className='text-xs text-[#8D8D8D] mt-1'>Update your music or podcast, use the recommended size for your cover image</p>
                            </div>
                            <button onClick={() => setinitialStep(0)} className="focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div onClick={() => { setMusicData({ ...musciData, type: "Single" }) }} className='flex cursor-pointer justify-between items-center w-[100%] textsm text-white bg-[#262628] px-3 h-[2.5rem] border border-[#444444] mt-8 rounded-md text-sm'>
                            <p>Single</p>
                            {musciData?.type == "Single" && <div style={{ background: 'linear-gradient(90deg, #E54B3C 0%, #FF1700 100%)', }} className='w-4 h-4 rounded-full flex justify-center items-center'><TiTick /></div>}
                        </div>
                        <div onClick={() => { setMusicData({ ...musciData, type: "Podcast" }) }} className='flex cursor-pointer justify-between items-center w-[100%] textsm text-white bg-[#262628] px-3 h-[2.5rem] border border-[#444444] mt-2 rounded-md text-sm'>
                            <p>Podcast</p>
                            {musciData?.type == "Podcast" && <div style={{ background: 'linear-gradient(90deg, #E54B3C 0%, #FF1700 100%)', }} className='w-4 h-4 rounded-full flex justify-center items-center'><TiTick /></div>}
                        </div>
                        <div onClick={() => { setMusicData({ ...musciData, type: "Music" }) }} className='flex cursor-pointer justify-between items-center w-[100%] textsm text-white bg-[#262628] px-3 h-[2.5rem] border border-[#444444] my-2 rounded-md text-sm'>
                            <p>Music</p>
                            {musciData?.type == "Music" && <div style={{ background: 'linear-gradient(90deg, #E54B3C 0%, #FF1700 100%)', }} className='w-4 h-4 rounded-full flex justify-center items-center'><TiTick /></div>}
                        </div>
                        <div onClick={() => { setMusicData({ ...musciData, type: "Album" }) }} className='flex cursor-pointer justify-between items-center w-[100%] textsm text-white bg-[#262628] px-3 h-[2.5rem] border border-[#444444] my-2 rounded-md text-sm'>
                            <p>Album</p>
                            {musciData?.type == "Album" && <div style={{ background: 'linear-gradient(90deg, #E54B3C 0%, #FF1700 100%)', }} className='w-4 h-4 rounded-full flex justify-center items-center'><TiTick /></div>}
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
                            <button onClick={() => setinitialStep(0)} className="focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <label htmlFor="image-upload" className='w-[100%] h-[12rem] flex justify-center items-center flex-col rounded-lg bg-[#262628] cursor-pointer'>
                            {(musciData?.pimage || musciData?.previewUrl) ? (
                                <img src={musciData?.previewUrl ? musciData?.previewUrl : musciData?.pimage} alt="Uploaded Preview" className="w-full h-full object-contain rounded-lg" />
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
                            {musciData?.audio ? (
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

                    </div>
                </div>
            )}
            {initialStep === 4 && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">

                    <div className={`${theme === "dark" ? "bg-[#1A1A1B] text-gray-300" : "bg-white text-gray-700"} rounded-md shadow-lg p-6 w-full max-w-md`}>

                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-lg font-medium">Update your content</h2>
                                <p className='text-xs text-[#8D8D8D] mt-1'>Update your music or podcast, use the recommended size for your cover image</p>
                            </div>
                            <button onClick={() => setinitialStep(0)} className="focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <p className='text-sm'>Metadata</p>
                        <input defaultValue={musciData.title} onChange={(e) => setMusicData({ ...musciData, title: e.target?.value })} type="text" name="" id="" placeholder='Title' className='w-[100%] h-[2.3rem] px-3 rounded-md border border-[#444444] bg-transparent mt-2 text-sm placeholder:text-sm' />
                        <input defaultValue={musciData.description} onChange={(e) => setMusicData({ ...musciData, description: e.target?.value })} type="text" name="" id="" placeholder='Description' className='w-[100%] h-[2.3rem] px-3 rounded-md border border-[#444444] bg-transparent mt-2 text-sm placeholder:text-sm' />
                        <input defaultValue={musciData.tags} onChange={(e) => setMusicData({ ...musciData, tags: e.target?.value })} type="text" name="" id="" placeholder='Tags / Keywords' className='w-[100%] h-[2.3rem] px-3 rounded-md border border-[#444444] bg-transparent mt-2 text-sm placeholder:text-sm' />

                        <button onClick={() => { handleUpload("Active") }} className="bg-[#FF1700] text-sm w-[100%] py-2 mt-2 rounded-md">Update</button>
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
                                <div key={i?._id} onClick={() => { setMusicData({ ...musciData, playlistId: i?._id }) }} className='flex cursor-pointer justify-between items-center w-[100%] textsm text-white bg-[#262628] px-3 h-[2.5rem] border border-[#444444] mt-2 rounded-md text-sm'>
                                    <p>{i?.title}</p>
                                    {musciData?.playlistId == i?._id && <div style={{ background: 'linear-gradient(90deg, #E54B3C 0%, #FF1700 100%)', }} className='w-4 h-4 rounded-full flex justify-center items-center'><TiTick /></div>}
                                </div>
                            ))
                        }
                        <button onClick={() => { setinitialStep(2); setShowPlaylist(false) }} className="bg-[#FF1700] text-sm w-[100%] py-2 mt-2 rounded-md">Next</button>

                    </div>
                </div>
            )}



        </div>

    )
}

export default AdminLibraryPage
