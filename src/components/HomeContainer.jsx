import React from 'react'
import Delivery from '../assets/delivery.png'
import HeroBg from '../assets/heroBg.png'
import Top1 from '../assets/top1.jpg'

const HomeContainer = () => {
    return (
        <section className='grid grid-cols-1 md:grid-cols-2 pt-14 gap-2 w-full' id='home'>
            <div className='py-2 flex-1 flex flex-col items-start md:items-start justify-center gap-6'>
                <div className='flex items-center gap-2 justify-center px-2 py-1 rounded-full bg-purple-100'>
                    <p className='text-base text-purple-500 font-semibold'>
                        Fast Delivery
                    </p>
                    <div className='w-10 h-10 rounded-full bg-white  drop-shadow-xl'>
                        <img src={Delivery} className='w-full h-full object-contain' alt='delivery'></img>
                    </div>
                </div>
                <p className='text-[2rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor'> The Fastest Delivery in
                    <span className='text-purple-600 text-[3rem] lg:text-[5rem]'> Your City</span>
                </p>
                <p className='text-base text-textColor text-center md:text-left md:w-[80%]'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
                <button
                    type='button'
                    className='bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 
      rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 '>
                    Order Now
                </button>
            </div>

            <div className='py-2 flex flex-1 items-center relative'>
                <div className='w-full flex items-center justify-center relative'>
                    <img src={HeroBg} className="ml-auto h-420 w-full lg:w-auto lg:h-650" alt="herobg"/>
                    <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center px-32 py-4'>
                        <div className='w-210 p-4 bg-cardOverlay backdrop-blur-md rounded-md flex flex-col items-center justify-center'>
                            <img src={Top1} className="w-40 -mt-0" alt="top-1"></img>
                            <p className='text-base font-semibold text-textColor pt-3'>Vintage Shirts</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomeContainer