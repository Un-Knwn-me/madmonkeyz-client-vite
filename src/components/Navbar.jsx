import React, { useEffect } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  // get data
    const user = useSelector((state) => state.userInfo.userName);
    const { cartTotalQuantity } = useSelector(state => state.cart);


      // Get cart items
      const fetchCart = async () => {
        try { 
          const response = await cartAPI.getItem();
          
          if (response.status === 200) {
            dispatch(getItems(response.data));
            dispatch(calculateTotals());
          }
          
        } catch (error) {
          console.error("Error fetching products:", error);
          toast.error(error.response.data.message);
        }
      };

  return (
    <>
            {/* Announcement bar */}
            <div class="flex h-8 bg-cyan-500 text-white flex items-center justify-between">
        <p class="uppercase text-xs font-bold leading-tight tracking-tight text-center w-1/3">
            Express Delivery
        </p>
        <p class="uppercase text-xs font-bold leading-tight tracking-tight text-center w-1/3">
            Signup & get 50% off
        </p>
        <p class="uppercase text-xs font-bold leading-tight tracking-tight text-center w-1/3">
            100% pure cotton
        </p>
      </div>
    
    <nav className="sticky top-0 bg-gray-100 text-black py-4 px-5 md:px-10 w-full z-20">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold">
          <a href="/">Emperor Polo</a>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-4">
          <Link to="/">Home</Link>
          <Link to="/category">Category</Link>
          <Link to="/order-history">Orders</Link>
        </div>

        {/* Navbar icons and search */}
        <div className="flex space-x-4 md:space-x-6 items-center">
        <div className='item-center md:hidden'>
            <SearchOutlinedIcon sx={{ fontSize: 26 }} />
          </div>
          <div className='hidden md:flex relative'>
            <input
              type="text"
              placeholder="Search..."
              className="py-2 px-4 rounded-xs bg-white focus:outline-none focus:shadow-outline w-56"
            />
            <div className="absolute top-0 right-0 my-2 mr-4 cursor-pointer">
              <SearchOutlinedIcon sx={{ color: "#000000" }}/>
            </div>
          </div>

          <div>
            <Link to={'/wishlist'}>
              <FavoriteBorderOutlinedIcon/>
            </Link>
          </div>
          <div className='relative'>
            <Link to={'/cart'}>
              <LocalMallOutlinedIcon/>
              <div className="absolute bg-cyan-400 rounded-full text-white px-2 top-0 right-0 -mt-2 -mr-4">
              <span className="text-md">
                {cartTotalQuantity}
              </span>
              </div>
            </Link>
          </div>
          <div className='item-center cursor-pointer'>
            <AccountCircleOutlinedIcon sx={{ fontSize: 26 }} />
          </div>
          
        </div>

         
      </div>
    </nav>
    </>
  );
}