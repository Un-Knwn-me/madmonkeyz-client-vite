import React from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, IconButton, Rating, Typography } from '@material-tailwind/react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CloseIcon from '@mui/icons-material/Close';

const Wishlist = () => {
  return (
    <>
    <Navbar />
        <div className="mx-30 my-10">
            <p className="text-md font-semibold mb-10">Wishlist</p>

            {/* Wishlist */}
            <div className='grid md:grid-cols-3 lg:grid-cols-5 justify-between place-items-center'>
                <div className='z-10 w-64 h-96 relative rounded shadow border border-neutral-200 cursor-pointer'>
                <button className="absolute top-2 right-2 text-gray-500 bg-white rounded-full p-0.5 hover:text-red-500">
                    <CloseIcon />
                </button>
                    <div className="w-full h-52">
                    <img
                        src="https://images.pexels.com/photos/1192601/pexels-photo-1192601.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="card-image"
                        className="h-full w-full object-cover"
                    />
                    </div>
                    <div className='mx-4 my-3'>
                        <p className='text-black text-lg font-semibold font-red-hat-display leading-tight tracking-tight'>Emperor Polo T-Shirt</p>
                        <p className='text-gray-600 text-sm font-medium font-red-hat-display leading-tight tracking-tight mt-1'>Cotton Regular fit</p>
                        <div className='columns-2 mt-2'>
                            <p className='text-gray-600 text-sm font-medium font-red-hat-display leading-tight tracking-tight'>Color: </p>
                            <p className='text-gray-600 text-sm font-medium font-red-hat-display leading-tight tracking-tight'>Size: </p>
                        </div>
                        <div className='columns-3 mt-3'>
                            <p className='text-black text-md font-semibold font-red-hat-display leading-tight tracking-tight'>₹ 400</p>
                            <p className='text-gray-500 line-through text-md font-semibold font-red-hat-display leading-tight tracking-tight'>₹ 500</p>
                            <p className='text-red-500 text-md font-semibold font-red-hat-display leading-tight tracking-tight'>20% Off</p>
                        </div>
                    </div>
                    <footer className='text-center w-full h-9 px-5 py-2.5 justify-center items-center gap-2.5 inline-flex'>
                        <button className='bg-white w-full h-9 px-5 hover:scale-105 font-red-hat-display border border-gray-700 text-sm font-medium leading-tight tracking-tight'>
                            Add to Bag
                        </button>
                    </footer>
                </div>
            </div>

        </div>
        <Footer />
    </>
  )
}

export default Wishlist