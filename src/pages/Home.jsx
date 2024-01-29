import React, { useEffect, useRef, useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Carousel, Typography } from '@material-tailwind/react'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import cartAPI from '../features/cart/cartAPI'
import { calculateTotals, getItems } from '../features/cart/cartSlice'
import productAPI from '../features/product/productAPI'
import { homeList } from '../features/product/productSlice'
import Loader from '../components/Loader'
import flatBanner1 from '../assets/images/Banner flat 1.png'
import flatBanner2 from '../assets/images/Banner flat 2.png';
import adBanner1 from '../assets/images/Banner 1.png';
import adBanner2 from '../assets/images/Banner 3.png';
import brandBanner1 from '../assets/images/brand banner 1.png';
import couponbg from '../assets/images/Coupon.png';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CalculateOfferPercentage from "../components/CalculateOfferPercentage.jsx";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Rating, } from '@material-tailwind/react'
import userAPI from '../features/user/userAPI.jsx';

const Home = () => {
    const dispatch = useDispatch();

    // Get products
    const fetchProducts = async () => {
        try { 
            const userId = localStorage.getItem('userId') || '' ;
            const response = await productAPI.homeProducts(userId);
        
        if (response.status === 200) {
            console.log(response.data)
            dispatch(homeList(response.data));
        }
        
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error(error.response.data.message);
        }
    };

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

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    const homeProducts = useSelector((state) => state.products.homeProducts);

    // manage wishlist
    const handleWishlist = async (e, productId) => {
        try {
          e.preventDefault();
          const response = await userAPI.addWishlist(productId);
          
          if (response.status === 200) {
            // dispatch(addItems(response.data));
            // fetchCart();
            toast.success(response.data.message);
          } else {
            toast.warning(response.data.message);
          }
        } catch (error) {
          console.error("Error managing wishlist:", error);
          toast.error(error.response.data.message);
        }
      }

  return (
    <>
    <Navbar />
        <div className="relative mb-30">
            <Carousel transition={{ duration: 1 }} prevArrow={false} style={{ height: "85vh" }} autoplayDelay={8000} nextArrow={false} navigation={false} autoplay={true} loop={true}>
                <div className="relative h-full w-full">
                    <img
                    src="https://images.pexels.com/photos/838413/pexels-photo-838413.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="image 1"
                    className="h-full w-full object-cover"
                    />
                    {/* <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
                    <div className="w-3/4 text-center md:w-2/4">
                        <Typography
                        variant="h1"
                        color="white"
                        className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                        >
                        The Beauty of Nature
                        </Typography>
                        <Typography
                        variant="lead"
                        color="white"
                        className="mb-12 opacity-80"
                        >
                        It is not so much for its beauty that the forest makes a claim
                        upon men&apos;s hearts, as for that subtle something, that quality
                        of air that emanation from old trees, that so wonderfully changes
                        and renews a weary spirit.
                        </Typography>
                        <div className="flex justify-center gap-2">
                        <Button size="lg" color="white">
                            Explore
                        </Button>
                        <Button size="lg" color="white" variant="text">
                            Gallery
                        </Button>
                        </div>
                    </div>
                    </div> */}
                </div>
                <div className="relative h-full w-full">
                    <img
                    src="https://images.pexels.com/photos/655806/pexels-photo-655806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="image 2"
                    className="h-full w-full object-cover"
                    />
                </div>
            </Carousel>
            <div className="absolute mx-10 md:mx-80 -bottom-10 left-0 right-0 text-center bg-teal-100 border-t border-cyan-400">
                <div className="w-1/2 mx-auto py-2 md:py-7">
                    <p className="text-lg">Hand Picked Products <span className='text-amber-500 font-bold'> Only </span> For You</p>
                </div>
            </div>
        </div>

        {/* Flat banner */}
        <div className='columns-2 flex m-10 md:my-20 md:mx-30'>
            <div className='w-full relative'>
                <img
                    className="object-cover object-center"
                    src={flatBanner1}
                    alt="Flat banner 1"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-white text-5xl font-times-new-roman tracking-wider leading-10 text-center font-medium">FLAT <span className='text-3xl align-top'>₹</span>50 OFF</p>
                </div>
            </div>
                <div className='w-full relative'>
                <img
                    className="object-cover object-center"
                    src={flatBanner2}
                    alt="Flat banner 2"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-white text-2xl leading-10 tracking-wide text-center font-light mx-5">On your first purchase above ₹2000</p>
                </div>
            </div>
        </div>

        <div className='my-10 text-lg font-medium text-center font-red-hat-display'>SPECIAL ARRIVALS FOR YOU</div>

        {/* Product List */}
        {homeProducts && homeProducts.length === 0 ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-10 md:my-20 md:mx-30">
              {homeProducts.map((product, key) => (
                <Link to={`/category/${product._id}`} >
                    <div className='z-10 w-full md:w-64 h-96 relative rounded shadow border border-neutral-200' key={product._id}>
                    <button className="absolute top-2 right-2 text-gray-500 bg-white rounded-full px-1 pb-1 pt-0.5 hover:text-black">
                        <FavoriteBorderOutlinedIcon fontSize="small" onClick={(e) => handleWishlist(e, product._id)}/>
                    </button>

          <div className="w-full h-56">
          <img
              src={product.images[0]}
              alt={product.productName}
              className="h-full w-full object-cover"
          />
          </div>
          <div className='mx-4 my-3'>
              <p className='text-black text-lg font-semibold font-red-hat-display leading-tight tracking-tight'>{product.brandName} - {product.category}</p>
              <p className='text-gray-600 mt-2 text-sm font-medium font-red-hat-display leading-tight tracking-tight'>Color: {product.color}</p>
              <p className='text-gray-600 text-sm font-medium font-red-hat-display leading-tight tracking-tight mt-2'><Rating value={product.ratings} readonly /> <span>{`${product.numOfReviews} reviews`}</span></p>
              <div className='mt-3'>
                  <span className='text-black text-md font-semibold font-red-hat-display leading-tight tracking-tight'>₹ {product.salesPrice}</span>
                  <span className='text-gray-500 line-through text-md font-semibold font-red-hat-display leading-tight tracking-tight ml-3'>₹ {product.price}</span>
                  <span className='text-red-500 text-md font-semibold font-red-hat-display leading-tight tracking-tight ml-3'><CalculateOfferPercentage originalPrice={product.price} discountedPrice={product.salesPrice}/>% off</span>
              </div>
          </div>
      </div>
                </Link>
              ))}
            </div>
          )}

          {/* AD banner 1 */}

          <div className='w-fit my-20 md:mx-20'>
            <img src={adBanner1} alt="Ad banner 1" />
          </div>

          <div className='w-fit my-20 md:mx-20'>
            <img src={adBanner2} alt="Ad banner 1" />
          </div>

          <div className='w-fit my-20 mx-80'>
            <img src={brandBanner1} alt="Brand banner 1" />
          </div>

        {/* Coupons */}
        <div className='mt-30 mb-20 text-2xl font-medium text-blue-800 text-center font-times-new-roman'>COUPON ZONE</div>

        <div className='grid-cols-1 items-center md:grid-cols-2 gap-x-10 flex m-10 md:m-20'>
            <div className='w-fit relative mx-20'>
                <img
                    className="object-fit object-center"
                    src={couponbg}
                    alt="Flat banner 1"
                />
                <div className="absolute inset-0 columns-2 flex items-center justify-center">
                    <div className='text-center mx-5'>
                    <p className="text-white text-2xl font-times-new-roman tracking-wide leading-10 font-medium">UPTO 50% OFF</p>
                    <p className="text-white text-lg font-red-hat-display leading-tight tracking-tight font-normal">On All Products</p>
                    </div>
                    <div className='px-4 py-2 bg-white'>
                    <p className="text-center text-black text-sm py-2 font-semibold font-red-hat-display leading-tight tracking-tight">USE CODE</p>
                    <p className="text-center text-white bg-black py-2 px-3 text-xs font-bold font-red-hat-display leading-tight tracking-tight">EMPOLO50</p>
                    </div>
                </div>
            </div>
                <div className='w-fit relative mx-20'>
                <img
                    className="object-fit object-center"
                    src={couponbg}
                    alt="Flat banner 1"
                />
                <div className="absolute inset-0 columns-2 flex items-center justify-center">
                    <div className='text-center mx-5'>
                    <p className="text-white text-2xl font-times-new-roman tracking-wide leading-10 font-medium">UPTO 20% OFF</p>
                    <p className="text-white text-lg font-red-hat-display leading-tight tracking-tight font-normal">On All Products</p>
                    </div>
                    <div className='px-4 py-2 bg-white'>
                    <p className="text-center text-black text-sm py-2 font-semibold font-red-hat-display leading-tight tracking-tight">USE CODE</p>
                    <p className="text-center text-white bg-black py-2 px-3 text-xs font-bold font-red-hat-display leading-tight tracking-tight">EMPOLO20</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Category */}
        <div className='mt-30 mb-20 text-2xl font-medium text-blue-800 text-center font-times-new-roman'>SHOP BY CATEGORY</div>

    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 m-10 md:my-20 md:mx-30'>
    <div className="w-60 h-80 relative shadow border-8 border-green-600 bg-green-600">
            <div className="w-56 h-52">
                <img
                    src="https://images.pexels.com/photos/1192601/pexels-photo-1192601.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="card-image"
                    className="h-full w-full object-cover"
                />
            </div>
            <div className='my-3'>
                <p className='text-center text-white text-sm font-light font-red-hat-display leading-tight tracking-tight my-1'>Mens Casual Wear</p>
                <p className='text-center text-white text-xl font-bold font-times-new-roman leading-tight tracking-wide'>20 - 30% OFF</p>
            </div>
            <div className='text-center text-white text-sm font-semibold font-red-hat-display leading-tight tracking-tight mt-4'>Shop Now</div>
        </div>

        <div className="w-60 h-80 relative shadow border-8 border-green-600 bg-green-600">
            <div className="w-56 h-52">
                <img
                    src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="card-image"
                    className="h-full w-full object-cover"
                />
            </div>
            <div className='my-3'>
                <p className='text-center text-white text-sm font-light font-red-hat-display leading-tight tracking-tight my-1'>Mens Casual Wear</p>
                <p className='text-center text-white text-xl font-bold font-times-new-roman leading-tight tracking-wide'>20 - 30% OFF</p>
            </div>
            <div className='text-center text-white text-sm font-semibold font-red-hat-display leading-tight tracking-tight mt-4'>Shop Now</div>
        </div>

        <div className="w-60 h-80 relative shadow border-8 border-green-600 bg-green-600">
            <div className="w-56 h-52">
                <img
                    src="https://images.pexels.com/photos/1192601/pexels-photo-1192601.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="card-image"
                    className="h-full w-full object-cover"
                />
            </div>
            <div className='my-3'>
                <p className='text-center text-white text-sm font-light font-red-hat-display leading-tight tracking-tight my-1'>Mens Casual Wear</p>
                <p className='text-center text-white text-xl font-bold font-times-new-roman leading-tight tracking-wide'>20 - 30% OFF</p>
            </div>
            <div className='text-center text-white text-sm font-semibold font-red-hat-display leading-tight tracking-tight mt-4'>Shop Now</div>
        </div>

        <div className="w-60 h-80 relative shadow border-8 border-green-600 bg-green-600">
            <div className="w-56 h-52">
                <img
                    src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="card-image"
                    className="h-full w-full object-cover"
                />
            </div>
            <div className='my-3'>
                <p className='text-center text-white text-sm font-light font-red-hat-display leading-tight tracking-tight my-1'>Mens Casual Wear</p>
                <p className='text-center text-white text-xl font-bold font-times-new-roman leading-tight tracking-wide'>20 - 30% OFF</p>
            </div>
            <div className='text-center text-white text-sm font-semibold font-red-hat-display leading-tight tracking-tight mt-4'>Shop Now</div>
        </div>

    </div>
    <Footer />
    </>
  )
}

export default Home