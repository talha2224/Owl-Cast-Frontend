import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { CiStar } from "react-icons/ci";
import PreviewImage from '../../assets/dashboard/preview2.svg'
import PreviewImage2 from '../../assets/dashboard/preview.svg'

const playlistButtons = [
    { label: "My vibes", color: "#FF5733" },
    { label: "Late night", color: "#3498DB" },
    { label: "The best", color: "#F1C40F" },
    { label: "The best", color: "#2ECC71" },
    { label: "Money Love", color: "#2ECC71" },
    { label: "The best", color: "#2ECC71" },
    { label: "Vibey", color: "#F1C40F" },
    { label: "+ Add new playlist", color: null, isAddButton: true },
];



const LibraryPage = () => {
    const { theme } = useTheme();
    const nav = useNavigate()


    return (
        <div className='flex-1 overflow-x-auto p-5'>

            <p className={`${theme == "dark" && "text-white"} font-medium text-lg`}>My Playlists</p>

            <div className="flex flex-wrap gap-2 mt-6">
                {playlistButtons.map((button, index) => (

                    <button key={index} className={`flex items-center w-[15rem] px-3 py-4 text-sm ${theme === "dark" ? "text-gray-300 bg-[#262628] hover:bg-[#333335]" : "text-gray-700 bg-gray-200 hover:bg-gray-300"} ${button.isAddButton ? "border border-dashed" : ""}`}>
                        {!button.isAddButton && button.color && (<span className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: button.color }}></span>)}
                        {button.label}
                    </button>

                ))}
            </div>

            <p className={`${theme === "dark" && "text-white"} font-medium text-md mt-6 mb-2`}>Others</p>

            <button className={`flex items-center w-[15rem] px-3 py-4 text-sm font-medium ${theme === "dark" ? "text-gray-300 bg-[#262628] hover:bg-[#333335]" : "text-gray-700 bg-gray-200 hover:bg-gray-300"}`}>
                <CiStar className="text-yellow-400 mr-3" />
                <span>Favourites</span>
            </button>

            <p className={`${theme == "dark" && "text-white"} font-medium text-lg mt-7`}>AI-Curated Podcast</p>

            <div className='flex items-center overflow-x-auto gap-x-7 mt-8'>
                {
                    [1, 2, 3, 4, 5, 6, 7].map((i) => (
                        <img onClick={() => nav(`/dashboard/podcast/single/${i}`)} key={i} src={i % 2 == 0 ? PreviewImage2 : PreviewImage} className='cursor-pointer h-[12rem]' />
                    ))
                }
            </div>

            <p className={`${theme == "dark" && "text-white"} font-medium text-lg mt-7`}>AI-Curated Playlists</p>

            <div className='flex items-center overflow-x-auto gap-x-7 mt-8'>
                {
                    [1, 2, 3, 4, 5, 6, 7].map((i) => (
                        <img onClick={() => nav(`/dashboard/podcast/single/${i}`)} key={i} src={i % 2 == 0 ? PreviewImage : PreviewImage2} className='cursor-pointer h-[12rem]' />
                    ))
                }
            </div>

        </div>
    );
};

export default LibraryPage;