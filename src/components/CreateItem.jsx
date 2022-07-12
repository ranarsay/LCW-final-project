import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { GiClothes } from 'react-icons/gi';
import { ImPriceTag } from 'react-icons/im'
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { categories } from '../utils/data';
import Loader from './Loader';
import { AiOutlineFieldNumber } from 'react-icons/ai'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase.config';
import { fetchItems, saveItem } from '../utils/firebaseFunctions';
import { actionType } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';
const CreateItem = () => {

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{ clothingItems }, dispatch] = useStateValue();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on('state_changed', (snapshot) => {
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    }, (error) => {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading, try again");
      setAlertStatus("danger")
      setTimeout(() => {
        setFields(false)
        setIsLoading(false)
      }, 3000)
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
        setImageAsset(downloadURL);
        setIsLoading(false)
        setFields(true);
        setMsg("Image uploaded successfuly")
        setAlertStatus("success")
        setTimeout(() => {
          setFields(false);
        }, 3000)
      })
    })
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null)
      setIsLoading(false)
      setFields(true);
      setMsg("Image deleted successfuly")
      setAlertStatus("danger")
      setTimeout(() => {
        setFields(false);
      }, 3000)
    })
  }
  const saveDetails = () => {
    setIsLoading(true);
    try {
      if ((!title || !price || !size || !imageAsset || !category)) {
        setFields(true);
        setMsg("Required fields cannot be empty!");
        setAlertStatus("danger")
        setTimeout(() => {
          setFields(false)
          setIsLoading(false)
        }, 3000)
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          size: size,
          price: price,
          qty: 1
        }
        saveItem(data);
        setIsLoading(false);
        setFields(true);
        setMsg("Item uploaded successfuly");
        clearData();
        setAlertStatus("success")
        setTimeout(() => {
          setFields(false);
        }, 3000)
      }

    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading, try again");
      setAlertStatus("danger")
      setTimeout(() => {
        setFields(false)
        setIsLoading(false)
      }, 3000)
    }
    fetchData();
  };

  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setCategory("Select Category");
    setPrice("");
    setSize("");

  }

  const fetchData = async () => {
    await fetchItems().then((data) => {
      dispatch({
        type: actionType.SET_CLOTHING_ITEMS,
        clothingItems: data
      })
    });
  };

  return (
    <div className='w-full min-h-screen h-auto p-16 flex items-center justify-center'>
      <div className='w-[70%] md:w-[60%] border border-gray-300 rounded-lg p-4
      flex flex-col items-center justify-center gap-4'>
        {
          fields && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`w-full p-2 rounded-lg text-center text-lg ${alertStatus === 'danger' ?
                "bg-red-400 text-red-800" : 'bg-emerald-400 text-emerald-800'}`}
            >{msg}</motion.p>
          )
        }
        <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
          <GiClothes className='text-xl text-gray-700' />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give me a title..."
            className='w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-400'
          />
        </div>
        <div className='w-full'>
          <select onChange={(e) => setCategory(e.target.value)} className='outline-none w-full text-base border-b-2 border-gray-200 rounded-md cursor-pointer'>
            <option value='other' className='bg-white'>Select category
            </option>
            {categories && categories.map(item => (
              <option key={item.id} className='text-base border-0 outline-none capitalize bg-white text-headingColor'
                value={item.urlParamName}
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className='group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420
        cursor-pointer rounded-lg'>
          {isLoading ? <Loader></Loader> : <>
            {!imageAsset ? <>
              <label className='w-full h-full flex flex-col items-center justify-center cursor-pointer'>
                <div className='w-full h-full flex flex-col items-center justify-center'>
                  <MdCloudUpload className='text-gray-500 text-3xl hover:text-gray-700 gap-2' />
                  <p className='text-gray-500 text-3xl hover:text-gray-700'>Click here to upload</p>
                </div>
                <input type='file' name='uploadimage' accept='image/*'
                  onChange={uploadImage} className='w-0 h-0'>
                </input>
              </label>

            </> : <>
              <div className='relative h-full'>
                <img src={imageAsset} alt='uploaded image' className='w-full h-full object-cover'></img>
                <button type='button' className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer online-none hover:shadow-md duration-500 transition-all ease-in-out'
                  onClick={deleteImage}>
                  <MdDelete className='text-white'></MdDelete>
                </button>
              </div>
            </>}
          </>}
        </div>
        <div className='w-full flex flex-col md:flex-row items-center gap-3'>
          <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
            <AiOutlineFieldNumber className='text-gray-700 text-2xl' />
            <input
              type='text'
              required
              value={size}
              onChange={(e) => setSize(e.target.value)}
              placeholder='Size'
              className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor'>

            </input>
          </div>
          <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
            <ImPriceTag className='text-gray-700 text-2xl' />
            <input
              type='text'
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder='Price in $'
              className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor'>

            </input>
          </div>
        </div>
        <div className='flex items-center w-full'>
          <button type='button' className='ml-o md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold'
            onClick={saveDetails}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateItem