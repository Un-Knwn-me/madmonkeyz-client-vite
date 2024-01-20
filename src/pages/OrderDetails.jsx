import React, { useEffect, useRef, useState } from 'react'
import Base from '../components/Base'
import { Breadcrumbs, Button, Popover, PopoverContent, PopoverHandler, Rating, } from '@material-tailwind/react'
import { Link, useParams } from 'react-router-dom'
import orderAPI from '../features/order/orderAPI'
import { orderInfo } from '../features/order/orderSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import copy from 'copy-to-clipboard';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Loader from '../components/Loader'
import { Box, Step, StepLabel, Stepper, styled } from '@mui/material'

const OrderDetails = () => {
    const { orderId } = useParams();
    const textRef = useRef();
    const dispatch = useDispatch();
    const [copied, setCopied] = useState(false);
    const [actStep, setActStep] = useState(0);

  // Get order details
  const fetchOrderDetails = async () => {
    try { 
      const response = await orderAPI.getOrderInfo(orderId);
      
      if (response.status === 200) {
        dispatch(orderInfo(response.data));

         if(response.data.orderInfo.deliveryStatus === "Confirmed") {
          setActStep(1)
         }  else if(response.data.orderInfo.deliveryStatus === "Dispatched") {
          setActStep(2)
         } else if(response.data.orderInfo.deliveryStatus === "Shipped"){
          setActStep(3)
         } else if(response.data.orderInfo.deliveryStatus === "Delivered"){
          setActStep(4)
         }
      }  else {
        toast.warning(response.message)
      }    
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(error.response.data.message);
    }
  };
  
  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  // get orderDetails
  const { orderDetails } = useSelector((state) => state.order);

  console.log("a", orderDetails)
  // Copy to clipboard
  const copyToClipboard = () => {
      const copyText = textRef.current.innerText;
      let isCopy = copy(copyText);
      if (isCopy) {
        setCopied(true)
        setTimeout(() => {setCopied(false);}, 5000)
      }
  };

  const CustomStepIcon = styled('div')(({ theme, active, completed }) => ({
    width: 16,
    height: 16,
    borderRadius: '50%',
    backgroundColor: completed ? '#19D714' : active ? '#BDFF9E' : '#DADADA',
    border: `4px solid ${completed ? '#19D714' : active ? '#19D714' : '#DADADA'}`,
    color: completed ? '#19D714' : active ? '#19D714' : theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiStepIcon-text': {
      fill: completed ? '#19D714' : theme.palette.primary.main,
    },
    transform: 'translateY(30%)',
  }));

  const steps = [
    'Order Confirmed',
    'Dispatched',
    'Out for Delivery',
    'Delivered'
  ];

  return (
    <Base title={'Order Details'}>
      {orderDetails && orderDetails.deliveryAddress ? (
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
                <span className="m-1 text-sm">{orderDetails._id}</span>
            </Breadcrumbs>

            <div className='mt-10 mb-5 text-lg font-medium'>Order Details</div>

            <div className="rounded-lg md:divide-x divide-gray-400 mb-5 bg-white py-5 px-8 shadow-lg md:flex md:justify-between backdrop-blur-md max-sm:px-8">
                <div className='w-fit'>
                  <div className='text-base font-normal text-gray-900'>
                    Order Id: <span className='text-sm text-gray-600 font-normal'>{orderDetails._id}</span>
                  </div>
                  <div className='mt-4'>
                    <p className='text-base font-medium mb-2'>
                      {orderDetails.deliveryAddress.name}
                    </p>
                    <p className='text-sm font-normal'>{orderDetails.deliveryAddress.building}, {orderDetails.deliveryAddress.street}</p>
                    <p className='text-sm font-normal'>{orderDetails.deliveryAddress.landmark}</p>
                    <p className='text-sm font-normal'>{orderDetails.deliveryAddress.city}, {orderDetails.deliveryAddress.state}</p>
                    <p className='text-sm font-normal'>{orderDetails.deliveryAddress.country} - {orderDetails.deliveryAddress.pincode}</p>
                    <p className='text-sm font-medium mt-2'>
                      +91 {orderDetails.deliveryAddress.phone}
                    </p>
                  </div>
                  <p className='text-xs font-light text-gray-700 mt-2'>
                    Order placed on { new Date(orderDetails.orderDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) }
                  </p>
                </div>
                <div className='mt-5 md:mt-0 md:pl-5 w-full'>
                  <div className='md:flex md:justify-between'>
                    {/* delivery progress */}
                    <div className="w-full py-4 md:px-4">
                      
                    <Box sx={{ width: '100%' }}>
                      <Stepper activeStep={actStep} alternativeLabel>
                        {steps.map((label, index) => (
                          <Step key={label}>
                            <StepLabel StepIconComponent={CustomStepIcon} completed={index < 1}>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </Box>
              
                        <hr className='mt-5 md:mt-10 mb-6'/>
                        { (orderDetails.deliveryStatus === "Pending") ? "" : (
                        <div className='flex justify-between'>
                          <div className='text-sm font-medium'>Your item has been {orderDetails.deliveryStatus}</div>
                          <div>
                            <div className='text-sm font-medium text-gray-800'>Tracking Id:
                              <span className='text-sm font-normal text-gray-700 ml-2' ref={textRef}>{orderDetails.trackingId} { (!copied) ? <ContentCopyIcon sx={{ fontSize: 14 }} onClick={copyToClipboard}/> : <DoneAllIcon className='text-cyan-600' sx={{ fontSize: 16 }} /> } </span>
                            </div>
                            <div className="mt-2">
                              <Link to={orderDetails.trackingSite} target='_blank'>
                                <p className='text-center text-cyan-600 text-sm'>click here to track <OpenInNewIcon sx={{ fontSize: 12 }}/></p>
                              </Link>
                            </div>
                          </div>
                        </div>
                       )}
                    </div>

                    {/* invoice */}
                    <div className='w-fit ml-10'>
                      <Button variant="text" className="flex items-center gap-2">
                        <FileDownloadOutlinedIcon fontSize="small"/>
                          {" "}Download Invoice
                      </Button>
                      <Popover>
                        <PopoverHandler>
                          <p className='text-sm font-medium text-gray-800 text-center mt-5'>Price details <HelpOutlineOutlinedIcon sx={{ fontSize: 16 }} color='#413E3E'/></p>
                        </PopoverHandler>
                        <PopoverContent>
                            This is a very beautiful popover, show some love.
                        </PopoverContent>
                      </Popover>
                      <p className='text-lg font-medium text-center mt-3'>₹ {orderDetails.totalAmount}</p>
                      <Link to="#">
                        <p className='text-center mt-6 text-cyan-600 text-sm'>Need help? Contact support</p>
                      </Link>
                    </div>
                  </div>
                </div>
            </div>

            {/* order detail */}
            <div className='mt-10 mb-5 text-lg font-medium'>Items in this order</div>

              {/* products */}
              {orderDetails.products.map((product, key) => (
            <div className="rounded-lg md:divide-x divide-gray-400 mb-5 bg-white p-3 shadow-lg md:flex md:justify-between backdrop-blur-md max-sm:px-8" key={product._id}>
              <div className='columns-2 flex min-w-80'>
                <div className='w-full'>
                  <img
                      className="h-40 w-32 rounded-lg object-cover object-center"
                      src={product.prodImg}
                      alt="nature image"
                  />
                </div>
                <div className='w-full mt-1 mx-4'>
                    <p className='text-base font-medium'>
                        {product.prodName}
                    </p>
                    <p className='text-xs font-light text-gray-600'>{product.prodCategory}</p>
                    <p className='text-sm font-medium text-gray-600 mt-2'>
                        Color: {product.prodColor}
                    </p>
                    <p className='text-sm font-medium text-gray-600 mt-1'>
                        Size : {product.selectedSize} 
                    </p>
                    <p className='text-sm font-medium text-gray-600 mt-1'>
                        Quantity: {product.quantity}
                    </p>
                    <p className='text-lg font-medium mt-3'>₹ {product.salesPrice * product.quantity}</p>
                </div>
              </div>

              {/* review */}
              <div className='flex justify-between w-full mt-5 md:mt-0'>
                <div className="flex items-center align-middle">
                  <div className=' md:ml-10'>
                  <Button variant="text" className="text-blue-500" >
                    Return / Refund
                  </Button>
                  <p className='text-xs font-light text-gray-600 align-middle'>Return policy ended on </p>
                  </div>
                </div>
                <div className="flex items-center align-middle">
                  <p className='text-sm font-medium text-gray-700 mt-2'>
                    Comment: 
                  </p>
              </div>
              <div className="flex items-center align-middle">
                <Rating value={4} readonly />
                  <Button variant="text" className="text-blue-500 mt-4" >
                    Edit
                </Button>
              </div>                
              </div>


            </div>
))}
    </div>
    ) : (
        <Loader />
      )}
    </Base>
  )
}

export default OrderDetails