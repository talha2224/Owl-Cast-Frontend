import { MdDashboard, MdMonetizationOn } from 'react-icons/md';
import { RiHome5Fill } from "react-icons/ri";
import { FaMoneyBill, FaPodcast, FaStreetView, FaUser } from "react-icons/fa6";
import { FaMusic, FaUsb } from "react-icons/fa";
import { IoLibrarySharp } from "react-icons/io5";
import { SiApplemusic } from "react-icons/si";
import { MdLibraryMusic } from "react-icons/md";
import { SiGoogleanalytics } from "react-icons/si";
import { IoMdSettings } from 'react-icons/io';

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
        name: "My Uploads",
        icon: <SiApplemusic/>
    },
    {
        id: 7,
        link: "library",
        name: "Library",
        icon: <MdLibraryMusic/>
    },
    {
        id: 4,
        link: "analytics",
        name: "Analytics",
        icon: <SiGoogleanalytics />
    },
    // {
    //     id: 41,
    //     link: "monetization",
    //     name: "Monetization",
    //     icon: <MdMonetizationOn/>
    // }
]

export const superAdminNav = [
    {
        id: 1,
        link: "home",
        name: "Dashboard",
        icon: <MdDashboard/>
    },
    {
        id: 7,
        link: "user",
        name: "User management",
        icon: <FaUser/>
    },
    {
        id: 7,
        link: "operator",
        name: "Operator management",
        icon: <FaStreetView/>
    },
    {
        id: 4,
        link: "transactions",
        name: "Transactions",
        icon: <FaMoneyBill />
    },
    {
        id: 41,
        link: "analytics",
        name: "Analytics",
        icon: <SiGoogleanalytics/>
    },
    {
        id: 44,
        link: "settings",
        name: "Settings",
        icon: <IoMdSettings/>
    }
]