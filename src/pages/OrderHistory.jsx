import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { Breadcrumbs, Button, Typography } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import { FormControl, FormControlLabel, FormLabel, RadioGroup } from '@mui/material'
import BpRadio from '../components/SizeCheckBox'
import CircleIcon from '@mui/icons-material/Circle';
import StarRateIcon from '@mui/icons-material/StarRate';
import orderAPI from '../features/order/orderAPI'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { orderHistory } from '../features/order/orderSlice'
import Loader from '../components/Loader'

const OrderHistory = () => {
    const [deliveryStatus, setDeliveryStatus] = useState("");
    const [orderOn, setOrderOn] = useState("");
    const dispatch = useDispatch();

    // Get orders
const fetchOrders = async () => {
    try { 
      const response = await orderAPI.listOrders(deliveryStatus, orderOn);
      
      if (response.status === 200) {
        dispatch(orderHistory(response.data.orderlist));
      } else {
        toast.warning(response.data.message);
      }
      
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [orderOn, deliveryStatus]);

  const orderList = useSelector((state) => state.order.orderList);
  console.log('orders: ', orderList)
  return (
    <Base title={'Order History'}>
        <div className='my-6 md:my-10 mx-5 md:mx-20'>

            {/* Breadvrumbs */}
                <Breadcrumbs>
                    <Link to="/" className="opacity-60">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                    </Link>
                    <Link to="/" className="opacity-60">
                        <span>My Account</span>
                    </Link>
                    <Link to="/order-history">My Orders</Link>
                </Breadcrumbs>

                <div className="grid grid-cols-12 gap-4 mt-10 mb-20">
                    {/* Left column for filter */}
                    <div className="h-fit col-span-3 p-5 hidden md:block">
                        <div className="flex justify-between">
                            <Typography variant="h6" className="mb-5">
                            Filter:-
                            </Typography>
                            <div>
                            <Button size="sm" onClick={fetchOrders}>
                                Apply
                            </Button>
                            </div>
                        </div>

                    <div className="bg-gray-200 p-5">
                        {/* Order status */}
                        <div>
                            <FormControl>
                                <FormLabel id="demo-customized-radios" className="mb-2">
                                    Order stauts
                                </FormLabel>
                                <RadioGroup
                                aria-labelledby="demo-customized-radios"
                                name="customized-radios"
                                className="ml-6"
                                value={deliveryStatus}
                                onChange={(e) => setDeliveryStatus(e.target.value)}
                                >
                                <FormControlLabel
                                    value=""
                                    control={<BpRadio />}
                                    label="All"
                                />
                                <FormControlLabel
                                    value="Shipped"
                                    control={<BpRadio />}
                                    label="On the way"
                                />
                                <FormControlLabel
                                    value="Delivered"
                                    control={<BpRadio />}
                                    label="Delivered"
                                />
                                <FormControlLabel
                                    value="Dispatched"
                                    control={<BpRadio />}
                                    label="Dispatched"
                                />
                                <FormControlLabel
                                    value="Failed"
                                    control={<BpRadio />}
                                    label="Cancelled/Failed"
                                />
                                <FormControlLabel
                                    value="Returned"
                                    control={<BpRadio />}
                                    label="Returned"
                                />
                                </RadioGroup>
                            </FormControl>
                            </div>

                        {/* Order date */}
                        <div>
                        <FormControl>
                            <FormLabel id="demo-customized-radios" className="mb-2">
                                Orderd on
                            </FormLabel>
                            <RadioGroup
                            aria-labelledby="demo-customized-radios"
                            name="customized-radios"
                            className="ml-6"
                            value={orderOn}
                            onChange={(e) => setOrderOn(e.target.value)}
                            >
                            <FormControlLabel
                                value="last30days"
                                control={<BpRadio />}
                                label="Last 30days"
                            />
                            <FormControlLabel
                                value="last60days"
                                control={<BpRadio />}
                                label="Last 60days"
                            />
                            <FormControlLabel
                                value="last90days"
                                control={<BpRadio />}
                                label="Last 90days"
                            />
                            <FormControlLabel
                                value="last1year"
                                control={<BpRadio />}
                                label="Last 1 year"
                            />
                            <FormControlLabel
                                value=""
                                control={<BpRadio />}
                                label="All"
                            />
                            </RadioGroup>
                        </FormControl>
                        </div>

                    </div>
                    </div>

                    {/* Right column for order history */}
                    
                    <div className="h-fit mb-20 mx-2 md:mx-5 col-span-12 md:col-span-9">
                        <Typography variant="h6" className="mt-5 mb-10 hidden md:block">
                            My Order History
                        </Typography>
                        {orderList && orderList.length === 0 ? (
                        <Loader />
                    ) : (
                    <div>
                    {orderList.map((order, key) => (
                        <Link to={`/order-history/${order._id}`}>                    
    <div className="rounded-lg mb-5 bg-white py-3 px-3 shadow-lg md:flex md:justify-between backdrop-blur-md max-sm:px-8" key={order._id}>
                            {/* Order item */}
                            <div className='columns-2 flex'>
    <div className='w-fit'>
        <img
            className="h-40 w-32 rounded-lg object-cover object-center"
            src={order.products[0].prodImg}
            alt="nature image"
        />
    </div>
    <div className='w-fit mt-2 ml-4'>
        <p className='text-base font-medium'>
            {order.products[0].prodName}  
            {(order.products.length > 1) ? 
                (` + ${order.products.length -1} items`)
                : "" 
            }    
        </p>
        <p className='text-sm font-light text-gray-700 mt-2'>
            Order placed on { new Date(order.orderDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) }
        </p>
        <p className='text-sm font-medium text-gray-600 mt-7'>
            Order Id: 
        </p>
        <p className='text-sm font-normal text-gray-500'>{order._id}</p>
    </div>
</div>


                            <div className='mt-2'>
                                <div className='text-base font-medium'>₹ {order.totalAmount}</div>
                                <div className='text-sm font-normal text-gray-600 mt-1'>Payment method:</div>
                                <div className='text-xs font-normal text-gray-800'>UPI</div>
                                {(order.paymentDetails.paymentStatus === 'Completed') ? 
                                    <div className='text-sm font-medium text-green-600 mt-4'>Payment Successfull</div>
                                : (order.paymentDetails.paymentStatus === 'Pending') ? 
                                    <div className='text-sm font-medium text-orange-500 mt-4'>Payment Pending</div>
                                : <div className='text-sm font-medium text-red-600 mt-4'>Payment Failed</div>
                                }
                            </div>

                            <div className='mt-2'>
                                <div>
                                    {(order.deliveryStatus === 'Delivered') ? 
                                    <div>
                                        <CircleIcon sx={{ mr: 1, fontSize: 16, color: '#03C100' }} />
                                        <span className='text-sm font-normal'>{order.deliveryStatus} on Jan 4th, 2024</span>
                                        <div className='text-xs font-light text-gray-600 mt-1 text-center'>Your items has been delivered</div>
                                    </div>                                    
                                    : (order.deliveryStatus === 'Returned' || order.deliveryStatus === 'Failed') ?
                                    <div> 
                                        <CircleIcon sx={{ mr: 1, fontSize: 16, color: '#FF0000' }} />
                                        <span className='text-sm font-normal'>{order.deliveryStatus}</span>
                                        <div className='text-xs font-light text-gray-600 mt-1 text-center'>Your items was {order.deliveryStatus}</div>
                                    </div>
                                    : 
                                    <div>
                                        <CircleIcon sx={{ mr: 1, fontSize: 16, color: '#FF7222' }} />
                                        <span className='text-sm font-normal'>{order.deliveryStatus}</span>
                                        <div className='text-xs font-light text-gray-600 mt-1 text-center'>Your items yet to be delivered</div>
                                    </div>
                                    }
                                </div>
                                
                                <div className='mt-4 text-red-500'>
                                    <StarRateIcon />
                                    <span className='ml-1 align-middle text-sm font-normal'>Rate & Review Products</span>
                                </div>
                            </div>

                        </div>
                        </Link>
                    ))}
                    </div>
)}
                    </div>
                </div>
        </div>

    </Base>
  )
}

export default OrderHistory