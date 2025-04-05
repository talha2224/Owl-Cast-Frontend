import { IoCall } from "react-icons/io5";
import { MdDashboard, MdOutlineSyncAlt } from 'react-icons/md';
import { RiFilePaperLine } from "react-icons/ri";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { LuUser } from "react-icons/lu";
import { RiHome5Fill } from "react-icons/ri";
import { FaPodcast } from "react-icons/fa6";
import { FaMusic } from "react-icons/fa";
import { IoLibrarySharp } from "react-icons/io5";

export const navData = [
    {
        id: 1,
        link: "home?query=Music",
        name: "Home",
        icon: <RiHome5Fill />
    },
    {
        id: 7,
        link: "podcast",
        name: "Podcast",
        icon: <FaPodcast/>
    },
    {
        id: 8,
        link: "music",
        name: "Music",
        icon: <FaMusic/>
    },
    {
        id: 9,
        link: "library",
        name: "Library",
        icon: <IoLibrarySharp/>
    }
];

export const adminNav = [
    {
        id: 1,
        link: "home",
        name: "Home",
        icon: <MdDashboard className='text-[#FFCC00]' />
    },
    {
        id: 7,
        link: "user",
        name: "User Managements",
        icon: <LuUser className="text-[#FF2D55]" />
    },
    {
        id: 4,
        link: "transaction",
        name: "Transaction",
        icon: <MdOutlineSyncAlt className="text-[#34C759]" />
    }
]