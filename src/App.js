import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router';
import { Header, MainContainer, CreateItem } from './components';
import { AnimatePresence } from 'framer-motion';
import { useStateValue } from './context/StateProvider';
import { fetchItems } from './utils/firebaseFunctions';
import { actionType } from './context/reducer';

const App = () => {
  const [{ }, dispatch] = useStateValue();
  
  const fetchData = async () => {
    await fetchItems().then((data) => {
      dispatch({
        type: actionType.SET_CLOTHING_ITEMS,
        clothingItems: data
      })
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <div className='w-screen h-auto flex flex-col'>
        <Header />

        <main className='mt-14 md:mt-20 px-4 md:px-16 w-full'>
          <Routes>
            <Route path='/' element={<MainContainer />} />
            <Route path='/createItem' element={<CreateItem />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;