import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import { FaAngleDown } from 'react-icons/fa';
import WhiteLogo from '../assets/white-logo.png'
import RedLogo from '../assets/red-logo.png'
import Blue from '../assets/landing/blue.svg'
import Red from '../assets/landing/red.svg'
import App from '../assets/landing/app.svg'
import { FiChevronRight, FiChevronDown } from 'react-icons/fi';
import { FaInstagram, FaDiscord, FaXTwitter, FaFacebookF, FaYoutube } from 'react-icons/fa6';

const faqs = [
    {
        question: 'What is OwlCast? Is it the same as iTunes?',
        answer: 'OwlCast Music is a streaming service that allows you to listen to over 100 million songs and podcasts.',
    },
    {
        question: 'How can I listen to OwlCast Music?',
        answer: 'You can listen to OwlCast Music on your smartphone, tablet, computer, smart speakers, and other connected devices through our app or website.',
    },
    {
        question: 'What does OwlCast Music cost?',
        answer: 'We offer various subscription plans, including individual, family, and student options. Please check our pricing page for the latest details.',
    },
    {
        question: 'Can I listen to podcasts?',
        answer: 'Yes, OwlCast includes a vast library of podcasts across various genres. You can stream and download them just like music.',
    },
    {
        question: 'How can I listen to OwlCast Podcast?',
        answer: 'You can find and listen to podcasts within the OwlCast Music app or website by navigating to the podcast section or searching for specific shows.',
    },
];

const LandingPage = () => {

    const [sliderValue, setSliderValue] = useState(20);
    const [openIndex, setOpenIndex] = useState(null);
    const answerRefs = useRef([]);


    const toggleFAQ = (index) => { setOpenIndex(openIndex === index ? null : index); };
    useEffect(() => { answerRefs.current = answerRefs.current.slice(0, faqs.length); }, [faqs]);


    return (


        <div className='w-screen h-screen bg-[#FFFFFF] flex flex-col'>

            <Navbar />

            <div className='flex justify-center items-center gap-x-5 flex-wrap bg-[#F5F5F7] px-3 py-5'>
                <button className='bg-black text-white px-6 rounded-full py-2 mt-2'>TRY IT <span className='text-[#E54B3C]'>30 DAYS</span> FREE</button>
                <p className=' mt-2'>Start a free trial and hear the difference.</p>
                <p className='underline font-semibold mt-2'>Purchase</p>
                <button className='text-white px-8 py-2 rounded-full mt-2' style={{ background: 'linear-gradient(90deg, #E54B3C 0%, #FF1700 100%)', }}>Explore</button>
            </div>

            <div className='px-4 sm:px-6 lg:px-[8rem] pt-10 pb-10'>

                <div className='flex justify-center items-center flex-col'>
                    <p className='text-[2.2rem] text-center font-semibold'>Do you really love music?</p>
                    <p className='text-center w-[100%] md:w-[50%] text-[#7F7F7F] text-sm mt-2'>Play over 100 million songs, always ad‑free. Hear next-level sound quality with Spatial Audio1 and lossless audio.2 Take center stage with OwlCast Music Sing. Access exclusive interviews and live concerts. And listen across all your devices, online or off. The music app for music lovers is here.</p>
                </div>

                <div className='flex justify-center items-center mt-10'>
                    <div className='flex items-center px-1 py-1 bg-[#F3F4F6] rounded-full gap-x-8'>
                        <p className='text-sm cursor-pointer ml-2'>Monthly</p>
                        <button className='text-sm cursor-pointer bg-white rounded-full px-3 py-1 flex-1'>Anually</button>
                    </div>
                </div>

                <div className='flex justify-between items-center mt-10 flex-wrap'>
                    <p className='text-lg font-medium'>Choose the plan that’s right for you.</p>
                    <p className='text-[#7F7F7F] mt-2'>Select country of operation</p>
                </div>
                <div className='flex justify-between items-center mt-2 flex-wrap'>
                    <p className='text-[#7F7F7F]'>Simple pricing, No commitment. Cancel anytime.</p>
                    <div className='border flex items-center gap-x-4 px-5 py-2 rounded-full cursor-pointer mt-2'>
                        <img src="https://cdn.britannica.com/79/4479-050-6EF87027/flag-Stars-and-Stripes-May-1-1795.jpg" alt="" className='h-[1rem] w-[1rem] rounded-full' />
                        <p>United States</p>
                        <FaAngleDown />
                    </div>
                </div>

                <div className="w-full mt-10">
                    <div className="relative w-full h-[1.5rem]:">
                        {/* Tooltip */}
                        <div className="absolute -top-10 text-white text-xs bg-black px-3 py-1 rounded shadow transition-all" style={{ left: `calc(${sliderValue}% - 40px)`, }}>{(sliderValue * 2000).toLocaleString()} Songs
                        </div>

                        <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-200 rounded-full transform -translate-y-1/2 z-0" />
                        <div className="absolute top-1/2 left-0 h-2 rounded-full transform -translate-y-1/2 z-10" style={{ width: `${sliderValue}%`, background: 'linear-gradient(90deg, #E54B3C 0%, #FF1700 100%)', }} />
                        <input type="range" min="0" max="100" value={sliderValue} onChange={(e) => setSliderValue(parseInt(e.target.value))} className="w-full h-2 bg-transparent appearance-none z-20 relative" style={{ position: 'relative' }} />
                    </div>
                </div>


                {/* PRICING CARDS  */}

                <div className='mt-10 flex justify-between items-center gap-x-[4rem] flex-wrap'>

                    <div className='min-h-[30rem] md:min-w-[22rem] md:max-w-[22rem] w-[100%] mt-2 rounded-lg p-5 bg-[#FAFAFA]'>
                        <img src={RedLogo} alt="" />
                        <h1 className='mt-3 font-medium text-lg'>Student</h1>
                        <p className='text-[#7F7F7F] text-sm'>Simple pricing. No hidden fees</p>
                        <h1 className='mt-3 font-semibold text-xl'>$5.99</h1>
                        <p className='text-[#7F7F7F] text-sm'>Per user/month, billed annually</p>
                        <button className='text-white w-[100%] py-3 rounded-full mt-3 text-sm' style={{ background: 'linear-gradient(90deg, #E54B3C 0%, #FF1700 100%)', }}>Try it 30 days free</button>
                        <h1 className='mt-3 font-medium text-lg'>Benefits</h1>
                        <div className='text-[#7F7F7F] mb-1'>✔️ Sed ut perspiciatis unde omnis iste</div>
                        <div className='text-[#7F7F7F] mb-1'>✔️ Sed ut perspiciatis unde omnis iste</div>
                        <div className='text-[#7F7F7F] mb-1'>✔️ Sed ut perspiciatis unde omnis iste</div>
                        <div className='text-[#7F7F7F] mb-1'>✔️ Sed ut perspiciatis unde omnis iste</div>
                    </div>

                    <div style={{ background: 'linear-gradient(90deg, #E54B3C 0%, #FF1700 100%)', }} className='min-h-[30rem] md:min-w-[22rem] md:max-w-[22rem] w-[100%] mt-2 rounded-lg p-5 text-white'>
                        <img src={WhiteLogo} alt="" />
                        <h1 className='mt-3 font-medium text-lg'>Individual</h1>
                        <p className='text-sm'>Simple pricing. No hidden fees</p>
                        <h1 className='mt-3 font-semibold text-xl'>$10.99</h1>
                        <p className='text-sm'>Per user/month, billed annually</p>
                        <button className='bg-white w-[100%] py-3 rounded-full mt-3 text-sm text-[#E54B3C]'>Try it 15 days free</button>
                        <h1 className='mt-3 font-medium text-lg'>Benefits</h1>
                        <div className='text-[#FFC2BC] mb-1'>✔️ Sed ut perspiciatis unde omnis iste</div>
                        <div className='text-[#FFC2BC] mb-1'>✔️ Sed ut perspiciatis unde omnis iste</div>
                        <div className='text-[#FFC2BC] mb-1'>✔️ Sed ut perspiciatis unde omnis iste</div>
                        <div className='text-[#FFC2BC] mb-1'>✔️ Sed ut perspiciatis unde omnis iste</div>
                    </div>

                    <div className='min-h-[30rem] md:min-w-[22rem] md:max-w-[22rem] w-[100%] mt-2 rounded-lg p-5 bg-[#FAFAFA]'>
                        <img src={RedLogo} alt="" />
                        <h1 className='mt-3 font-medium text-lg'>Family</h1>
                        <p className='text-[#7F7F7F] text-sm'>Simple pricing. No hidden fees</p>
                        <h1 className='mt-3 font-semibold text-xl'>$16.99</h1>
                        <p className='text-[#7F7F7F] text-sm'>Per user/month, billed annually</p>
                        <button className='text-white w-[100%] py-3 rounded-full mt-3 text-sm' style={{ background: 'linear-gradient(90deg, #E54B3C 0%, #FF1700 100%)', }}>Try it 30 days free</button>
                        <h1 className='mt-3 font-medium text-lg'>Benefits</h1>
                        <div className='text-[#7F7F7F] mt-1'>✔️ Sed ut perspiciatis unde omnis iste</div>
                        <div className='text-[#7F7F7F] mb-1'>✔️ Sed ut perspiciatis unde omnis iste</div>
                        <div className='text-[#7F7F7F] mb-1'>✔️ Sed ut perspiciatis unde omnis iste</div>
                        <div className='text-[#7F7F7F] mb-1'>✔️ Sed ut perspiciatis unde omnis iste</div>
                    </div>

                </div>


            </div>

            <div className='mt-10 bg-[#F9F9F9] p-10 flex justify-center items-center gap-x-12 flex-wrap sm:px-6 lg:px-[8rem]'>
                {/* Podcast Card 1 */}
                <div className='bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-sm mt-2'>
                    <div className='relative'>
                        <img src={Red} alt="Red Podcast Background" className='w-full h-auto' />
                    </div>
                    <div className='p-6'>
                        <h3 className='text-xl font-semibold text-gray-800 mb-2'>Podcast Name</h3>
                        <p className='text-gray-600 text-sm mb-4'>Welcome to [Podcast Name], a window into the investment process. On the show...</p>
                        <div className='flex items-center justify-between'>
                            <p className='text-[#E54B3C] font-semibold text-sm cursor-pointer'>Read more</p>
                        </div>
                    </div>
                </div>

                {/* Podcast Card 2 */}
                <div className='bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-sm mt-2'>
                    <div className='relative'>
                        <img src={Blue} alt="Blue Podcast Background" className='w-full h-auto' />
                    </div>
                    <div className='p-6'>
                        <h3 className='text-xl font-semibold text-gray-800 mb-2'>Podcast Name</h3>
                        <p className='text-gray-600 text-sm mb-4'>Welcome to [Podcast Name], a window into the investment process. On the show...</p>
                        <div className='flex items-center justify-between'>
                            <p className='text-[#1976D2] font-semibold text-sm cursor-pointer'>Read more</p>
                        </div>
                    </div>
                </div>

                {/* Text Card 1 */}
                <div>

                    <div className='bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-sm p-6 mt-2'>
                        <h3 className='text-xl font-semibold text-gray-800 mb-2'>How to make money in year 2025</h3>
                        <p className='text-gray-600 text-sm mb-4'>Welcome to [Podcast Name], a window into the investment process.</p>
                        <div className='flex items-center justify-between'>
                            <p className='text-gray-800 font-semibold text-sm cursor-pointer'>Read more</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 text-gray-800">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>

                    {/* Text Card 2 */}
                    <div className='bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-sm p-6 mt-2'>
                        <div className='flex items-center mb-2'>
                            <img src={RedLogo} alt="Red Logo" className='w-8 h-8 mr-2' />
                        </div>
                        <p className='text-gray-600 text-sm mb-4'>Welcome to [Podcast Name], a window into the investment process.</p>
                        <div className='flex items-center justify-between'>
                            <p className='text-[#E54B3C] font-semibold text-sm cursor-pointer'></p> {/* Empty Read more */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#E54B3C" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>

                </div>
            </div>


            {/* FAQS  */}

            <div className="flex justify-center items-center px-4 sm:px-6 lg:px-[8rem] mt-10">
                <div className="w-full max-w-lg">
                    <h1 className="text-2xl font-medium text-gray-900 mb-6">Questions? Answers.</h1>
                    <div className="mt-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="mb-4 rounded-lg bg-gray-100 overflow-hidden">
                                <button className="w-full text-left py-3 px-4 flex items-center justify-between font-medium text-gray-800" onClick={() => toggleFAQ(index)}>
                                    <div className="flex items-center">
                                        <span className="w-2 h-2 rounded-full bg-gray-800 mr-3"></span>{faq.question}</div>
                                    <span className="text-gray-600">{openIndex === index ? <FiChevronDown /> : <FiChevronRight />}</span>
                                </button>
                                <div ref={(el) => (answerRefs.current[index] = el)}
                                    className={`px-4 py-3 text-gray-700 text-sm overflow-hidden  ${openIndex === index ? "block" : "hidden"} transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-screen" : "max-h-0"}`}
                                >{faq.answer}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center px-4 sm:px-6 lg:px-[8rem] mt-10">

                <div style={{ background: 'linear-gradient(90deg, #E54B3C 0%, #FF1700 100%)', }} className='p-10 w-[100%] h-[19rem] flex justify-center items-center flex-col'>
                    <h1 className='text-2xl font-semibold text-white text-center'>Get 3 months of OwCast Music <br /> free with eligible devices</h1>
                    <img src={App} alt="" className='mt-10' />
                </div>

            </div>

            <div className="flex justify-center items-center px-4 sm:px-6 lg:px-[8rem] pb-10">
                <div className="w-full bg-[#FAFAFA] p-10 rounded-lg">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800">Subscribe To Our Newsletter</h2>
                        <p className="text-gray-600 mt-2">For more exclusive updates!</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <input type="email" className="py-4 px-4 w-[30rem] focus:outline-none text-gray-700 placeholder-gray-400 border rounded-full" placeholder="Email Address" />
                        <button className="bg-[#E54B3C] text-white py-2 text-sm px-6 outline-none rounded-full ml-[-9rem]">Subscribe</button>
                    </div>
                    <div className="flex justify-center mt-8 space-x-6 text-gray-600">
                        <FaInstagram size={24} className='text-[#E1306C]' />
                        <FaDiscord size={24} className='text-[#5865F2]' />
                        <FaXTwitter size={24} className='text-[#000000]' />
                        <FaFacebookF size={24} className='text-[#1877F2]' />
                        <FaYoutube size={24} className='text-[#FF0000]' />
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center py-3 px-4 sm:px-6 lg:px-[8rem] bg-[#FAFAFA] flex-wrap">

                <p className='text-[#7f7f7f] text-sm my-2'>Copyright © 2025 OwlCast. All rights reserved.</p>

                <div className='flex items-center gap-x-5'>
                    <p>Privacy Policy</p>
                    <p>Terms of Services</p>
                </div>
                <p className='text-[#7f7f7f] text-sm  mt-2'>United States</p>
            </div>


        </div >



    )


}

export default LandingPage