import React from 'react'
import { MdShoppingBasket } from 'react-icons/md'
import { motion } from 'framer-motion'

const RowContainer = ({ flag, data }) => {
    console.log(data)
    return (
        <div className={`w-full flex items-center my-12 bg-purple-50 ${flag ? 'overflow-x-scroll' : 'overflow-x-hidden flex-wrap'} `}>
            {data && data.map(item => (
                <div key={item.id} className='w-300 min-w-[300px] md:min-w-[340px] md:w-340 gap-5 h-auto my-12 p-2 bg-cardOverlay backdrop-blur-lg hover:drop-shadow-lg'>
                <div className='w-full flex items-center justify-between'>
                    <motion.img whileHover={{ scale: 1.2 }} src={item?.imageURL}
                        alt='' className='w-40 -mt-8' />
                    <motion.div whileTap={{ scale: 0.75 }} className='w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center cursor-pointer hover:shadow-md'>
                        <MdShoppingBasket className='text-white' />
                    </motion.div>
                </div>
                <div className='w-full flex flex-col items-end justify-end'>
                    <p className='text-textColor font-semibold text-base md:text-lg'>
                        {item?.title}
                    </p>
                    <p className='mt-1 text-sm text-gray-500'>{item?.size} size</p>
                    <div className='flex items-center gap-8'>
                        <p className='text-lg text-headingColor font-semibold'>
                            <span className='text-sm text-purple-500'>$</span>
                            {item?.price}
                        </p>
                    </div>
                </div>
            </div>
            ))}
        </div>
    )
}

export default RowContainer
