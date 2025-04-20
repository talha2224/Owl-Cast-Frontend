import React, { useEffect, useRef, useState } from 'react';
import Logo from '../../../assets/logo.svg';
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import { TiTick } from "react-icons/ti";
import config from '../../../config';
import axios from 'axios';
import toast from 'react-hot-toast';

const CreatorRegisterPage = () => {
  const nav = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState({ preferrence: "music", role: "creator", firstName: "", lastName: "", email: "", password: "", dob: "", country: "", aspect: "Music", agree: false, });
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState(['', '', '', '',]);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChangeOtp = (index, event) => {
    const value = event.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDownOtp = (index, event) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData({ ...data, [name]: type === "checkbox" ? checked : value });
  };

  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 2 && !data.email) {
      newErrors.email = "Email is required";
    }

    if (currentStep === 3) {
      if (!data.password) newErrors.password = "Password is required";
      if (!data.firstName) newErrors.firstName = "First name is required";
      if (!data.lastName) newErrors.lastName = "Last name is required";
      if (!data.dob) newErrors.dob = "Date of birth is required";
      if (!data.country) newErrors.country = "Country is required";
      if (!data.agree) newErrors.agree = "You must agree to Terms & Conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = async () => {
    if (!validateStep()) return;
    if (currentStep === 3) {
      let loader = toast.loading("Processing Request")
      try {
        const payload = { role: data.role, firstName: data.firstName, lastName: data.lastName, email: data.email, password: data.password, aspect: data.preferrence, dob: data.dob, country: data.country, };
        console.log(payload)
        const res = await axios.post(`${config.baseUrl}/account/creator/register`, payload);
        if (res?.data?.data) {
          toast.dismiss(loader)
          toast.success("Account Created Verify Your Email")
          localStorage.setItem("id", res?.data?.data?._id);
          localStorage.setItem("email", res?.data?.data?.email)
          setCurrentStep(4);
        }
      }
      catch (err) {
        console.error(err.response?.data?.msg || "Registration failed");
        toast.dismiss(loader)
        toast.error(err.response?.data?.msg)
      }
    }
    else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleVerify = async () => {
    const email = localStorage.getItem('email');
    const enteredOtp = otp.join('');
    if (!enteredOtp || enteredOtp.length !== 4) {
      toast.error("Please enter the complete 4-digit OTP");
      return;
    }
    let loader = toast.loading("Verifying OTP...");
    try {
      const res = await axios.post(`${config.baseUrl}/account/verify/otp`, { email, otp: enteredOtp });
      if (res.data.code === 200) {
        toast.dismiss(loader);
        toast.success("OTP Verified Successfully!");
        nav("/creator/dashboard/home");
      }
    } 
    catch (err) {
      console.error(err.response?.data?.msg || "OTP verification failed");
      toast.dismiss(loader);
      toast.error(err.response?.data?.msg || "Invalid OTP");
    }
  };

  const handleResendOtp = async () => {
    const email = localStorage.getItem('email');
    let loader = toast.loading("Resending OTP...");
    try {
      const res = await axios.post(`${config.baseUrl}/account/send/otp/${email}`);
      if (res.data.code === 200) {
        toast.dismiss(loader);
        toast.success("OTP sent successfully!");
      }
    } catch (err) {
      console.error(err.response?.data?.msg || "Resend OTP failed");
      toast.dismiss(loader);
      toast.error(err.response?.data?.msg || "Failed to resend OTP");
    }
  };


  return (
    <div className="flex justify-center items-center w-screen h-screen bg-[#262628] flex-col">

      <div className="fixed top-10 right-24 cursor-pointer text-white">
        <RxCross1 onClick={() => nav("/")} />
      </div>

      <img src={Logo} alt="Logo" className="h-[2rem]" />

      <div className="flex justify-center items-center flex-col mt-4">
        {currentStep === 1 && (
          <>
            <p className="text-white font-medium text-xl">Do you really love music?</p>
            <p className="text-sm text-[#828287] mt-2 w-[20rem] text-center">Kindly select your preferable aspect, are you a music lover or an artist/podcaster?</p>
          </>
        )}
        {currentStep === 2 && (
          <>
            <p className="text-white font-medium text-xl">Continue with Email</p>
            <p className="text-sm text-[#828287] mt-2 w-[20rem] text-center">Sign in if you already have an account, or create a new one.</p>
          </>
        )}
        {currentStep === 3 && (
          <>
            <p className="text-white font-medium text-xl">Create your account</p>
            <p className="text-sm text-[#828287] mt-2 w-[20rem] text-center">Complete your details to continue.</p>
          </>
        )}
        {currentStep === 4 && (
          <>
            <p className="text-white font-medium text-xl">Verification Code</p>
            <p className="text-sm text-[#828287] mt-2 w-[20rem] text-center">Enter the code sent to {data.email}</p>
          </>
        )}
      </div>

      {/* Form */}
      {currentStep === 1 && (
        <div className="mt-8">
          <div onClick={() => setData({ ...data, preferrence: "Music" })} className="flex cursor-pointer justify-between items-center px-3 bg-[#262628] w-[20rem] h-[2.5rem] border border-[#444444] my-2 rounded-md text-white text-sm">
            <p>A music Lover</p>
            {data.preferrence === "Music" && <div style={{ background: 'linear-gradient(90deg, #E54B3C 0%, #FF1700 100%)' }} className="w-4 h-4 rounded-full flex justify-center items-center"><TiTick /></div>}
          </div>
          <div onClick={() => setData({ ...data, preferrence: "Artist" })} className="flex cursor-pointer justify-between items-center px-3 bg-[#262628] w-[20rem] h-[2.5rem] border border-[#444444] my-2 rounded-md text-white text-sm">
            <p>An Artist Or Podcaster</p>
            {data.preferrence === "Artist" && <div style={{ background: 'linear-gradient(90deg, #E54B3C 0%, #FF1700 100%)' }} className="w-4 h-4 rounded-full flex justify-center items-center"><TiTick /></div>}
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <input type="email" name="email" value={data.email} onChange={handleChange} placeholder="Enter Email Address" className="w-[20rem] h-[2.5rem] text-white border border-[#444444] px-3 bg-transparent outline-none rounded-md mt-3 placeholder:text-sm placeholder:text-[#808080]" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
      )}

      {currentStep === 3 && (
        <div>
          <input type="password" name="password" value={data.password} onChange={handleChange} placeholder="Password" className="block w-[20rem] h-[2.5rem] text-white border border-[#444444] px-3 bg-transparent outline-none rounded-md mt-3 placeholder:text-sm placeholder:text-[#808080]" />
          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

          <input type="text" name="firstName" value={data.firstName} onChange={handleChange} placeholder="First Name" className="block w-[20rem] h-[2.5rem] text-white border border-[#444444] px-3 bg-transparent outline-none rounded-md mt-3 placeholder:text-sm placeholder:text-[#808080]"
          />
          {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}

          <input type="text" name="lastName" value={data.lastName} onChange={handleChange} placeholder="Last Name" className="block w-[20rem] h-[2.5rem] text-white border border-[#444444] px-3 bg-transparent outline-none rounded-md mt-3 placeholder:text-sm placeholder:text-[#808080]"
          />
          {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}

          <input type="text" name="dob" value={data.dob} onChange={handleChange} placeholder="Date Of Birth" className="block w-[20rem] h-[2.5rem] text-white border border-[#444444] px-3 bg-transparent outline-none rounded-md mt-3 placeholder:text-sm placeholder:text-[#808080]"
          />
          {errors.dob && <p className="text-red-500 text-xs">{errors.dob}</p>}

          <input type="text" name="country" value={data.country} onChange={handleChange} placeholder="Country" className="block w-[20rem] h-[2.5rem] text-white border border-[#444444] px-3 bg-transparent outline-none rounded-md mt-3 placeholder:text-sm placeholder:text-[#808080]"
          />
          {errors.country && <p className="text-red-500 text-xs">{errors.country}</p>}

          <div className="mt-2 flex items-center gap-x-2">
            <input type="checkbox" name="agree" checked={data.agree} onChange={handleChange} />
            <p className="text-sm text-[#808080]">Agree to Terms & Conditions</p>
          </div>
          {errors.agree && <p className="text-red-500 text-xs">{errors.agree}</p>}
        </div>
      )}

      {currentStep === 4 && (
        <div>
          <div className="flex items-center space-x-4 mt-4">
            {otp.map((digit, index) => (
              <input key={index} type="text" maxLength="1" className="w-12 h-12 bg-transparent rounded-lg border border-gray-300 text-center text-xl font-semibold focus:outline-none focus:border-red-500" value={digit} onChange={(event) => handleChangeOtp(index, event)} onKeyDown={(event) => handleKeyDownOtp(index, event)} ref={(el) => (inputRefs.current[index] = el)} />
            ))}
          </div>
          <div onClick={handleResendOtp} className="w-[20rem] flex justify-center items-center mt-4 text-sm text-white cursor-pointer">Resend code</div>
        </div>
      )}

      {/* Buttons */}
      {currentStep === 4 ? (
        <button onClick={handleVerify} style={{ background: 'linear-gradient(90deg, #E54B3C 0%, #FF1700 100%)' }} className="mt-3 rounded-md text-white text-sm h-[2.3rem] w-[20rem]">Verify</button>
      ) : (
        <button onClick={handleContinue} style={{ background: 'linear-gradient(90deg, #E54B3C 0%, #FF1700 100%)' }} className="mt-3 rounded-md text-white text-sm h-[2.3rem] w-[20rem]">Continue</button>
      )}

      <button onClick={() => nav("/creator/login")} className="mt-3 rounded-full text-white text-sm h-[2.3rem] w-[20rem]">Sign In</button>
    </div>
  );
};

export default CreatorRegisterPage;
