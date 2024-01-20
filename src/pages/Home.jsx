import React, { useEffect } from 'react'
import Base from '../components/Base'
import { Carousel } from '@material-tailwind/react'
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

  return (
    <Base title={'Home'}>
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
        <div className='columns-2 flex m-10 md:m-20'>
            <div className='w-full relative'>
                <img
                    className="object-cover object-center"
                    src={flatBanner1}
                    alt="Flat banner 1"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-white text-3xl tracking-wide font-bold">FLAT ₹ 50 OFF</p>
                </div>
            </div>
                <div className='w-full relative'>
                <img
                    className="object-cover object-center"
                    src={flatBanner2}
                    alt="Flat banner 2"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-white text-2xl tracking-wide text-center font-light mx-5">On your first purchase above ₹2000</p>
                </div>
            </div>
        </div>

        <div className='my-10 text-lg font-medium text-center font-red-hat-display'>SPECIAL ARRIVALS FOR YOU</div>

        {/* Product List */}
        {homeProducts && homeProducts.length === 0 ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-10 md:m-20">
              {homeProducts.map((product, key) => (
                <Link to={`/category/${product._id}`} key={product._id} >
                    <ProductCard product={product} />
                </Link>
              ))}
            </div>
          )}

          {/* AD banner 1 */}

          <div className='w-fit my-20 mx-20'>
            <img src={adBanner1} alt="Ad banner 1" />
          </div>

          <div className='w-fit my-20 mx-20'>
            <img src={adBanner2} alt="Ad banner 1" />
          </div>

          <div className='w-fit my-20 mx-80'>
            <img src={brandBanner1} alt="Brand banner 1" />
          </div>

        {/* Coupons */}
        <div className='mt-30 mb-20 text-2xl font-medium text-blue-800 text-center font-red-hat-display'>COUPON ZONE</div>

    </Base>
  )
}

export default Home