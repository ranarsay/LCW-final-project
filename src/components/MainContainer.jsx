import React from 'react'
import Delivery from '../assets/delivery.png'
import HomeContainer from './HomeContainer';
import { filterProps, motion } from 'framer-motion';
import { RowContainer } from '.';
import { useStateValue } from '../context/StateProvider';
import CategoryContainer from './CategoryContainer';
import CartContainer from './CartContainer';

const MainContainer = () => {

  const [{ clothingItems, cartShow }, dispatch] = useStateValue()
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center'>
      <HomeContainer />

      <section className='w-full my-6'>
        <div className='w-full flex items-center justify-between'>
          <p className='text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1
        before:bottom-0 before:left-0 before:bg-gradient-to-tr from-purple-400 to-purple-600 transition-all ease-in-out duration-100'>
            Our Vintage Shirts
          </p>
        </div>
        <RowContainer flag={true} data={clothingItems?.filter(n => n.category === "shirt")} />
      </section>
      <CategoryContainer />
      {cartShow && <CartContainer />}

    </div>
  )
}

export default MainContainer;