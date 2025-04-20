import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { CiStar } from "react-icons/ci";
import PreviewImage from '../../assets/dashboard/preview2.svg'
import PreviewImage2 from '../../assets/dashboard/preview.svg'
import { useEffect, useState } from "react";
import config from "../../config";
import axios from "axios";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";

const playlistButtons = [
    { label: "+ Add new playlist", color: null, isAddButton: true },
];



const LibraryPage = () => {
    const { theme } = useTheme();
    const nav = useNavigate();
    const [playlistData, setPlaylistData] = useState([]);
    const [musicData, setMusicData] = useState([])
    const [initialStep, setInitialStep] = useState(0);
    const [playlistName, setPlaylistName] = useState("");
    const [data, setData] = useState({ playlistId: "", music: [] })

    const fetchAllPlaylist = async () => {
        try {
            let playlist = await axios.get(`${config.baseUrl}/user/playlist/${localStorage.getItem("id")}`)
            if (playlist?.data) {
                setPlaylistData(playlist?.data?.data)
            }
        }
        catch (error) {

        }
    }

    const fetchAllMusic = async () => {
        try {
            let playlist = await axios.get(`${config.baseUrl}/music/all`)
            if (playlist?.data) {
                setMusicData(playlist?.data?.data)
            }
        }
        catch (error) {

        }
    }


    const handleCreatePlaylist = async () => {
        let loader = toast.loading("Creating Playlist")
        try {
            let res = await axios.post(`${config.baseUrl}/user/playlist/create`, { title: playlistName, userId: localStorage.getItem("id") })
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

    const handleAddSong = async () => {
        let loader = toast.loading("Adding Songs")
        console.log(data?.music)
        try {
            let res = await axios.put(`${config.baseUrl}/user/playlist/${data?.playlistId}`, { music: data?.music })
            if (res?.data?.data) {
                fetchAllPlaylist()
                toast.dismiss(loader)
                toast.success("Songs Added")
                setInitialStep(0)
            }
        }
        catch (error) {
            toast.dismiss(loader)
            toast.error("Something went wrong")
        }
    }

    useEffect(() => {
        fetchAllPlaylist()
        fetchAllMusic()
    }, [])


    return (
        <div className='flex-1 overflow-x-auto p-5'>

            <p className={`${theme == "dark" && "text-white"} font-medium text-lg`}>My Playlists</p>

            <div className="flex flex-wrap gap-2 mt-6">

                {
                    playlistData?.map((i) => {
                        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

                        return (
                            <button key={i?._id} className={`flex items-center w-[15rem] px-3 py-4 text-sm ${theme === "dark" ? "text-gray-300 bg-[#262628] hover:bg-[#333335]" : "text-gray-700 bg-gray-200 hover:bg-gray-300"}`}>
                                <span className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: randomColor }}></span>
                                {i.title}
                            </button>
                        );
                    })
                }
                {playlistButtons.map((button, index) => (
                    <button onClick={() => { if (button.isAddButton) { setInitialStep(1) } }} key={index} className={`flex items-center w-[15rem] px-3 py-4 text-sm ${theme === "dark" ? "text-gray-300 bg-[#262628] hover:bg-[#333335]" : "text-gray-700 bg-gray-200 hover:bg-gray-300"} ${button.isAddButton ? "border border-dashed" : ""}`}>
                        {!button.isAddButton && button.color && (<span className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: button.color }}></span>)}
                        {button.label}
                    </button>

                ))}
            </div>


            {
                playlistData?.map((i) => (
                    <div key={i?._id}>
                        <p className={`${theme == "dark" && "text-white"} font-medium text-lg mt-7`}>{i?.title}</p>

                        <div className='flex items-center overflow-x-auto gap-x-7 mt-8'>
                            {
                                i?.music.map((music) => (
                                    <img onClick={() => nav(`/dashboard/podcast/single/${music?._id}`)} key={i} src={music?.image} className='cursor-pointer h-[12rem] rounded-xl' />
                                ))
                            }
                        </div>
                    </div>

                ))
            }




            {/* PLAYLIST  */}
            {initialStep === 1 && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className={`${theme === "dark" ? "bg-[#1A1A1B] text-gray-300" : "bg-white text-gray-700"} rounded-md shadow-lg p-6 w-full max-w-md`}>

                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-lg font-medium">Select Your Playlist</h2>
                                <p className='text-xs text-[#8D8D8D] mt-1'>Select a playlist to link the music or podcast.</p>
                            </div>
                            <button onClick={() => setInitialStep(0)} className="focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>


                        <p className='text-sm'>Playlist Title</p>
                        <input onChange={(e) => setPlaylistName(e.target.value)} type="text" name="" id="" placeholder='Title' className='w-[100%] h-[2.3rem] px-3 rounded-md border border-[#444444] bg-transparent mt-2 text-sm placeholder:text-sm' />
                        <button onClick={handleCreatePlaylist} className="rounded-md border border-[#444444] bg-transparent w-[100%] h-[2.3rem] mt-2 text-sm">Create</button>
                        <p className='text-center mt-2 text-sm'>Or</p>
                        {
                            playlistData?.map((i) => (
                                <div key={i?._id} onClick={() => { setData({ ...data, playlistId: i?._id, music: [...i?.music] }) }} className='flex cursor-pointer justify-between items-center w-[100%] textsm text-white bg-[#262628] px-3 h-[2.5rem] border border-[#444444] mt-2 rounded-md text-sm'>
                                    <p>{i?.title}</p>
                                    {data?.playlistId == i?._id && <div style={{ background: 'linear-gradient(90deg, #E54B3C 0%, #FF1700 100%)', }} className='w-4 h-4 rounded-full flex justify-center items-center'><TiTick /></div>}
                                </div>
                            ))
                        }
                        <button onClick={() => { setInitialStep(2) }} className="bg-[#FF1700] text-sm w-[100%] py-2 mt-2 rounded-md">Next</button>

                    </div>
                </div>
            )}

            {initialStep === 2 && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className={`${theme === "dark" ? "bg-[#1A1A1B] text-gray-300" : "bg-white text-gray-700"} rounded-md shadow-lg p-6 w-full max-w-md`}>

                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-lg font-medium">Select Your Playlist</h2>
                                <p className='text-xs text-[#8D8D8D] mt-1'>Select a playlist to link the music or podcast.</p>
                            </div>
                            <button onClick={() => setInitialStep(0)} className="focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {
                            musicData?.map((i) => (
                                <div key={i?._id} onClick={() => { setData({ ...data, music: [...data?.music, i?._id] }) }} className='flex cursor-pointer justify-between items-center w-[100%] textsm text-white bg-[#262628] px-3 h-[2.5rem] border border-[#444444] mt-2 rounded-md text-sm'>
                                    <p>{i?.title}</p>
                                    {data?.music?.includes(i?._id) && <div style={{ background: 'linear-gradient(90deg, #E54B3C 0%, #FF1700 100%)', }} className='w-4 h-4 rounded-full flex justify-center items-center'><TiTick /></div>}
                                </div>
                            ))
                        }
                        <button onClick={handleAddSong} className="bg-[#FF1700] text-sm w-[100%] py-2 mt-2 rounded-md">Add</button>

                    </div>
                </div>
            )}

        </div>
    );
};

export default LibraryPage;