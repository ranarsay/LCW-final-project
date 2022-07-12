import React from 'react'
import Delivery from '../assets/delivery.png'
import HeroBg from '../assets/heroBg.png'
import { heroData } from '../utils/data'

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
                <p className='text-[2rem] lg:text-[3.5rem] font-bold tracking-wide text-headingColor'> Find the perfect pieces of clothing
                    <span className='text-purple-600 text-[2rem] lg:text-[4rem]'> Retro Style</span>
                </p>
                <p className='text-base text-textColor text-center md:text-left md:w-[80%]'>
                    A vintage shop for retro lovers
                </p>
                <button
                    type='button'
                    className='bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 
      rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 '>
                    Shop Now
                </button>
            </div>

            <div className='py-2 flex flex-1 items-center relative'>
                <div className='w-full flex items-center justify-center relative'>
                    <img src={HeroBg} className="ml-auto h-420 w-full lg:w-auto lg:h-650" alt="herobg" />
                    <div className='w-full h-full absolute top-0 left-0 flex items-center 
                    justify-center px-32 py-4 gap-4 flex-wrap'>
                        {
                            heroData && heroData.map(n => (
                                <div key={n.id} className='w-190 min-w-[190px] p-4 bg-cardOverlay backdrop-blur-md 
                                rounded-md flex flex-col items-center justify-center shadow-lg'>
                                    <img src={n.imageSrc} className="w-40 -mt-0" alt={n.imageSrc}></img>
                                    <p className='text-base font-semibold text-textColor pt-3'>{n.name}</p>
                                    <p className='text-sm font-semibold text-headingColor'>
                                        <span className='text-xs text-slate-500'>$</span> {n.price}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomeContainer