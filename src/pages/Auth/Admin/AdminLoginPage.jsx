import React, { useState } from 'react';
import Logo from '../../../assets/logo.svg'
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import config from '../../../config';
import axios from 'axios';
import toast from 'react-hot-toast';

const LoginPage = () => {
    const nav = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        let loading = toast.loading("Processing Request")
        try {
            const response = await axios.post(`${config.baseUrl}/account/login`, { email, password });
            if (response.data.code === 200) {
                console.log("Login successful:", response.data.data);
                toast.dismiss(loading)
                toast.success("Login Sucessfull")
                localStorage.setItem("id", response?.data?.data?._id);
                localStorage.setItem("email", response?.data?.data?.email)
                if(response?.data?.data?.email==="admin@owlcast.com"){
                    nav("/admin/dashboard/home");
                }
                else{
                    nav("/dashboard/home?query=Music");
                }
            } 
        } 
        catch (err) {
            console.error(err);
            toast.dismiss(loading)
            toast.error(err.response?.data?.msg)
        }
    };

    return (
        <div className='flex justify-center items-center w-screen h-screen bg-[#262628] flex-col'>
            <div className='fixed top-10 right-24 cursor-pointer text-white'>
                <RxCross1 onClick={() => nav("/")} />
            </div>

            <img src={Logo} alt="" className='h-[2rem]' />
            <p className='text-white font-medium text-xl mt-4'>Welcome back!</p>
            <p className='text-sm text-[#828287] mt-2'>Enter your email and password to sign in</p>

            <input type="email" placeholder='Enter Email Address'value={email}onChange={(e) => setEmail(e.target.value)}className='w-[20rem] h-[2.5rem] text-white border border-[#444444] px-3 bg-transparent outline-none rounded-md mt-3 placeholder:text-sm placeholder:text-[#808080]'/>
            <input type="password"placeholder='Enter Password'value={password}onChange={(e) => setPassword(e.target.value)}className='w-[20rem] h-[2.5rem] text-white border border-[#444444] px-3 bg-transparent outline-none rounded-md mt-3 placeholder:text-sm placeholder:text-[#808080]'/>


            <button onClick={handleLogin} style={{ background: 'linear-gradient(90deg, #E54B3C 0%, #FF1700 100%)', }} className='mt-3 rounded-full text-white text-sm h-[2.3rem] w-[20rem]'>Sign In</button>

        </div>
    );
};

export default LoginPage;
