import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.svg'
import Users from '../assets/users.svg'

const Navbar = () => {

    return (
        <nav className="">
            <div className="px-4 sm:px-6 lg:px-[8rem]">

                <div className="flex items-center justify-between h-16">


                    <div className="flex-shrink-0 flex items-center gap-x-2">
                        <img src={Logo} alt="" className='h-10' />
                    </div>

                    <div className="ml-4 flex items-center md:ml-6 gap-x-3">
                        <img src={Users} alt="" className='h-10 md:block hidden' />
                        <Link to="/login" className="bg-[#F2F2F2] px-3 md:px-5 py-2 rounded-3xl text-xs md:text-sm font-medium">Explore</Link>
                        <Link to="/register"><button className="bg-[#000] px-3 md:px-5 py-2 rounded-3xl text-xs md:text-sm font-medium text-white">Free Trial</button></Link>
                    </div>

                </div>
            </div>

        </nav>
    );
}

export default Navbar;