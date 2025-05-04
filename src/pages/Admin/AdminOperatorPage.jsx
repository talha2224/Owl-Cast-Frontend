import { useTheme } from "../../context/ThemeContext";
import { useEffect, useState } from "react";
import config from "../../config";
import axios from "axios";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";


const translations = {
    en: {
        myPlaylists: "My Playlists",
        addNewPlaylist: "+ Add new playlist",
        selectPlaylist: "Select Your Playlist",
        playlistTitle: "Playlist Title",
        titlePlaceholder: "Title",
        create: "Create",
        or: "Or",
        next: "Next",
        addSongs: "Add Songs",
        selectPlaylistToLink: "Select a playlist to link the music or podcast.",
    },
    sp: {
        myPlaylists: "Mis listas de reproducción",
        addNewPlaylist: "+ Agregar nueva lista de reproducción",
        selectPlaylist: "Selecciona tu lista de reproducción",
        playlistTitle: "Título de la lista de reproducción",
        titlePlaceholder: "Título",
        create: "Crear",
        or: "O",
        next: "Siguiente",
        addSongs: "Agregar Canciones",
        selectPlaylistToLink: "Selecciona una lista de reproducción para vincular la música o el podcast.",
    },
};


const playlistButtons = [
    { label: "+ Add new operator", color: null, isAddButton: true },
];



const AdminOperatorPage = () => {
    const { theme } = useTheme();
    const [operatorData, setOperatorData] = useState([]);
    const [musicData, setMusicData] = useState([])
    const [initialStep, setInitialStep] = useState(0);
    const [initialStep2, setInitialStep2] = useState(0);

    const [body, setBody] = useState({ title: "", description: "", music: [], id: "" })




    const fetchAllOperator = async () => {
        try {
            let operator = await axios.get(`${config.baseUrl}/operator/`)
            if (operator?.data) {
                setOperatorData(operator?.data?.data)
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


    const handleCreate = async () => {
        let loader = toast.loading("Creating Operator")
        try {
            let res = await axios.post(`${config.baseUrl}/operator/create`, body)
            if (res?.data?.data) {
                fetchAllOperator()
                setBody({ title: "", description: "", music: [] })
                toast.dismiss(loader)
                toast.success("Operator Created")
                setInitialStep(0)
            }
        }
        catch (error) {
            toast.dismiss(loader)
            toast.error("Something went wrong")
        }
    }
    const handleUpdate = async () => {
        let loader = toast.loading("Updating Operator")
        try {
            let res = await axios.put(`${config.baseUrl}/operator/${body?.id}`, body)
            if (res?.data?.data) {
                fetchAllOperator()
                setBody({ title: "", description: "", music: [] })
                toast.dismiss(loader)
                toast.success("Operator Updated")
                setInitialStep2(0)
            }
        }
        catch (error) {
            toast.dismiss(loader)
            toast.error("Something went wrong")
        }
    }

    const handleDelete = async (id) => {
        let loader = toast.loading("Deleting Operator")
        try {
            let res = await axios.delete(`${config.baseUrl}/operator/${id}`)
            if (res?.data) {
                fetchAllOperator()
                toast.dismiss(loader)
                toast.success("Operator Deleted")
            }
        }
        catch (error) {
            toast.dismiss(loader)
            toast.error("Something went wrong")
        }
    }


    useEffect(() => {
        fetchAllOperator()
        fetchAllMusic()
    }, [])




    return (
        <div className='flex-1 overflow-x-auto p-5'>




            <div className="flex flex-wrap justify-between items-center">
                <p className={`${theme == "dark" && "text-white"} font-medium text-lg`}>All Operators</p>
                {playlistButtons.map((button, index) => (
                    <button onClick={() => { if (button.isAddButton) { setInitialStep(1) } }} key={index} className={`flex justify-center items-center w-[15rem] px-3 py-4 text-sm ${theme === "dark" ? "text-gray-300 bg-[#262628] hover:bg-[#333335]" : "text-gray-700 bg-gray-200 hover:bg-gray-300"} ${button.isAddButton ? "border border-dashed" : ""}`}>
                        {!button.isAddButton && button.color && (<span className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: button.color }}></span>)}
                        {button.label}
                    </button>
                ))}
            </div>


            <div className={`overflow-x-auto p-4 ${theme === "dark" ? "bg-[#1A1A1B]":"border"} rounded-md mt-10`}>
                <table className="w-full">
                    <thead className="text-left text-sm text-gray-500">
                        <tr>
                            <th className="py-2 pr-4 font-medium text-nowrap"># Id</th>
                            <th className="py-2 pr-4 font-medium text-nowrap">Title</th>
                            <th className="py-2 pr-4 font-medium text-nowrap">Description</th>
                            <th className="py-2 pr-4 font-medium text-nowrap">Total Content</th>
                            <th className="py-2 pr-4 font-medium text-nowrap">Api Key</th>
                            <th className="py-2 pr-4 font-medium text-nowrap">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {operatorData?.map((item, index) => (
                            <tr key={index}>
                                <td className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} py-2 pr-4 text-sm text-nowrap`}>{index + 1}</td>
                                <td className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} py-2 pr-4 text-sm text-nowrap`}>{item?.title}</td>
                                <td className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} py-2 pr-4 text-sm text-nowrap`}>{item?.description}</td>
                                <td className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} py-2 pr-4 text-sm text-nowrap`}>{item?.music?.length}</td>
                                <td className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} py-2 pr-4 text-sm text-nowrap`}>{item?._id}</td>
                                <td className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} py-2 pr-4 text-sm text-nowrap`}>
                                    <button onClick={() => handleDelete(item?._id)} className="bg-red-600 text-[#fff] cursor-pointere px-3 py-1 rounded-md mr-4">Delete</button>
                                    <button onClick={() => { setInitialStep2(1); setBody({id:item?._id,title: item?.title, description: item?.description, music: item?.music?.map((m) => (typeof m === 'string' ? m : m._id)) || [] }) }} className="bg-blue-600 text-[#fff] cursor-pointere px-3 py-1 rounded-md mr-4">Update</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>





            {/* operator  */}
            {initialStep === 1 && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className={`${theme === "dark" ? "bg-[#1A1A1B] text-gray-300" : "bg-white text-gray-700"} rounded-md shadow-lg p-6 w-full max-w-md`}>

                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-lg font-medium">Create Operator</h2>
                                <p className='text-sm text-[#8D8D8D] mt-1'>Create operator and assign them relevant content</p>
                            </div>
                            <button onClick={() => setInitialStep(0)} className="focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <input onChange={(e) => setBody((prev) => ({ ...prev, title: e.target.value }))} type="text" name="" id="" placeholder={"Operator Name"} className='w-[100%] h-[2.3rem] px-3 rounded-md border border-[#444444] bg-transparent mt-2 text-sm placeholder:text-sm' />
                        <input onChange={(e) => setBody((prev) => ({ ...prev, description: e.target.value }))} type="text" name="" id="" placeholder={"Operator Description"} className='w-[100%] h-[2.3rem] px-3 rounded-md border border-[#444444] bg-transparent mt-2 text-sm placeholder:text-sm' />
                        <button onClick={() => { setInitialStep(2) }} className="bg-[#FF1700] text-sm w-[100%] py-2 mt-2 rounded-md">Next</button>

                    </div>
                </div>
            )}

            {initialStep === 2 && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className={`${theme === "dark" ? "bg-[#1A1A1B] text-gray-300" : "bg-white text-gray-700"} rounded-md shadow-lg p-6 w-full max-w-md`}>

                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-lg font-medium">Create Operator</h2>
                                <p className='text-sm text-[#8D8D8D] mt-1'>Select a playlist to link the music or podcast.</p>
                            </div>
                            <button onClick={() => setInitialStep(0)} className="focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {
                            musicData?.map((i) => (
                                <div key={i?._id} onClick={() => {
                                    setBody((prev) => {
                                        const isSelected = prev.music.includes(i._id);
                                        return {
                                            ...prev,
                                            music: isSelected
                                                ? prev.music.filter((id) => id !== i._id) // remove if already selected
                                                : [...prev.music, i._id], // add if not selected
                                        };
                                    });
                                }} className='flex cursor-pointer justify-between items-center w-[100%] textsm text-white bg-[#262628] px-3 h-[2.5rem] border border-[#444444] mt-2 rounded-md text-sm'>
                                    <p>{i?.title}</p>
                                    {body?.music?.includes(i?._id) && <div style={{ background: 'linear-gradient(90deg, #E54B3C 0%, #FF1700 100%)', }} className='w-4 h-4 rounded-full flex justify-center items-center'><TiTick /></div>}
                                </div>
                            ))
                        }
                        <button onClick={handleCreate} className="bg-[#FF1700] text-sm w-[100%] py-2 mt-2 rounded-md">Create</button>

                    </div>
                </div>
            )}


            {initialStep2 === 1 && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className={`${theme === "dark" ? "bg-[#1A1A1B] text-gray-300" : "bg-white text-gray-700"} rounded-md shadow-lg p-6 w-full max-w-md`}>

                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-lg font-medium">Update Operator</h2>
                                <p className='text-sm text-[#8D8D8D] mt-1'>Update operator and assign them relevant content</p>
                            </div>
                            <button onClick={() => setInitialStep2(0)} className="focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <input value={body.title} onChange={(e) => setBody((prev) => ({ ...prev, title: e.target.value }))} type="text" name="" id="" placeholder={"Operator Name"} className='w-[100%] h-[2.3rem] px-3 rounded-md border border-[#444444] bg-transparent mt-2 text-sm placeholder:text-sm' />
                        <input value={body.description} onChange={(e) => setBody((prev) => ({ ...prev, description: e.target.value }))} type="text" name="" id="" placeholder={"Operator Description"} className='w-[100%] h-[2.3rem] px-3 rounded-md border border-[#444444] bg-transparent mt-2 text-sm placeholder:text-sm' />
                        <button onClick={() => { setInitialStep2(2) }} className="bg-[#FF1700] text-sm w-[100%] py-2 mt-2 rounded-md">Next</button>

                    </div>
                </div>
            )}

            {initialStep2 === 2 && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className={`${theme === "dark" ? "bg-[#1A1A1B] text-gray-300" : "bg-white text-gray-700"} rounded-md shadow-lg p-6 w-full max-w-md`}>

                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-lg font-medium">Update Operator</h2>
                                <p className='text-sm text-[#8D8D8D] mt-1'>Select a playlist to link the music or podcast.</p>
                            </div>
                            <button onClick={() => setInitialStep2(0)} className="focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {
                            musicData?.map((i) => (
                                <div key={i?._id} onClick={() => {
                                    setBody((prev) => {
                                        const isSelected = prev.music.includes(i._id);
                                        return {
                                            ...prev,
                                            music: isSelected
                                                ? prev.music.filter((id) => id !== i._id) // remove if already selected
                                                : [...prev.music, i._id], // add if not selected
                                        };
                                    });
                                }} className='flex cursor-pointer justify-between items-center w-[100%] textsm text-white bg-[#262628] px-3 h-[2.5rem] border border-[#444444] mt-2 rounded-md text-sm'>
                                    <p>{i?.title}</p>
                                    {body?.music?.includes(i?._id) && <div style={{ background: 'linear-gradient(90deg, #E54B3C 0%, #FF1700 100%)', }} className='w-4 h-4 rounded-full flex justify-center items-center'><TiTick /></div>}
                                </div>
                            ))
                        }
                        <button onClick={handleUpdate} className="bg-[#FF1700] text-sm w-[100%] py-2 mt-2 rounded-md">Update</button>

                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminOperatorPage;
