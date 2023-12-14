import React, { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, InputAdornment, RadioGroup, TextField, Typography } from '@mui/material';
import BpRadio from '../components/SizeCheckBox';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from 'react';
import CartItemCard from '../components/CartItemCard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Accordion, AccordionBody, AccordionHeader, Input, Option, Select } from '@material-tailwind/react';
import cartAPI from '../features/cart/cartAPI';
import { addNewAdress, calculateTotals, getItems, removeItems, updateItems } from '../features/cart/cartSlice';
import { toast } from 'react-toastify';
import Base from '../components/Base';

const Cart = () => {
    const [shipping, setShipping] = useState('Standard Delivery');
    const [pincode, setPincode] = useState();
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [open, setOpen] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const dispatch = useDispatch()
    const [openAccord, setOpenAccord] = useState('');
    const [formData, setFormData] = useState({
      name: "",
      phone: "",
      building: "",
      street: "",
      landmark: "",
      city: "",
      state: "",
      pincode: ''
    });
    
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
      fetchCart();
    }, []);

    const { cartItems, userAddress, subtotal, totalSaving } = useSelector(state => state.cart);

    // Update cart item quantity
    const updateCartItem = async(productId, newQuantity) => {
      try {
        const response = await cartAPI.updateItem(productId, newQuantity);
        
        if (response.status === 200) {
          dispatch(updateItems(response.data));
          dispatch(calculateTotals());
        }        
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error(error.response.data.message);
      }
    };

    // remove cart item
    const handleRemoveItem = async(productId) => {
      try {
        const response = await cartAPI.removeItem(productId);
        
        if (response.status === 200) {
          dispatch(removeItems(response.data));
          dispatch(calculateTotals());
        }
      } catch (error) {
        console.error("Error removing products:", error);
        toast.error(error.response.data.message);
      }
    };
    
  // Add address
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleState = (value) => {
    setFormData((prevData) => ({ ...prevData, state: value }));
  };

  const stateAndUnion = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Chandigarh', 'Delhi', 'Daman', 'Goa', 'Gujarat', 'Haryana',
'Himachal Pradesh', 'Jharkhand', 'Jammu and Kashmir', 'Karnataka', 'Kerala', 'Ladakh', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
'Punjab', 'Puducherry', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',];

// Add new address 
const handleSubmitAddress = async (event) => {
    event.preventDefault();
    try {
      const response = await cartAPI.addAddress(formData);

      if (response.status === 200) {
        dispatch(addNewAdress(response.data));
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error(error.response.data.message);
    }
  };
 
  const handleOpen = (addressId) => {
    setOpenAccord((prev) => (prev === addressId ? null : addressId));
  };

    // stepper
  const handleNext = () => {
    setActiveStep((cur) => cur + 1);
  };

  const handlePrev = () => {
    setActiveStep((cur) => cur - 1);
  };

  // pincode check
  const handlePinCheck = async() => {
    try {
      const response = await cartAPI.checkPincode(pincode);

      if (response.status === 200) {
        console.log(response.records)
        // dispatch(addNewAdress(response.data));
        // toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <Base title={'cart'}>
<div className='bg-gray-200 pt-10 pb-20'>

  {/* Stepper */}
  
    <div className="grid grid-cols-12 gap-6 mx-5 md:mx-20">
      
    <div className="h-fit col-span-12 py-5 md:col-span-8">
    <p className='text-md font-semibold mb-5'>My Bag</p>
    {/* pincode & delivery selection */}
    <div className="rounded-lg bg-white py-5 px-8 shadow-lg md:flex md:justify-between backdrop-blur-md max-sm:px-8">
      
      <div>
      <p className='text-base'>Delivery options:</p>
        <div className="m-5">
        <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={shipping}
        onChange={(e) => setShipping(e.target.value)}
      >
        <FormControlLabel value="Standard Delivery" control={<BpRadio />} label={<Typography variant="body2">Standard Delivery</Typography>} />
        <FormControlLabel
          value="disabled"
          disabled
          control={<BpRadio />}
          label={<Typography variant="body2">Express Delivery</Typography>}
        />
      </RadioGroup>
      </FormControl>
        </div>
      </div>
     
      <div>
        
<form>   
<FormControl sx={{ width: '15ch' }}>
<TextField
        id="pincode"
        label="Enter pincode"
        size="small"
        type='number'
        value={pincode || ''}
        onChange={(e) => setPincode(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      </FormControl>
      <button type="submit" onClick={handlePinCheck} className="mt-5 ml-2 textblack text-sm leading-6 font-medium px-3 rounded-sm border border-black w-fit">Check</button>
</form>

      </div>
      
    </div>


{/* List Cart Products */}
{activeStep === 0 && (
<div>
<div className='text-md font-semibold mb-5 mt-10'><ShoppingCartIcon /> Items ({cartItems?.length})</div>   
    {/* list */} 
    {cartItems && cartItems?.length === 0 ? (
          <div className='text-lg my-10'>Your cart is empty.</div>
        ) : (
    <div>
      {cartItems?.map((item) => (
        <CartItemCard key={item.product?._id} item={item} removeItem={handleRemoveItem} updateCartItem={updateCartItem} />
 ))}
 </div>
)}

</div>
 )}

{/* Address */}
{activeStep === 1 && (
<div>
<div className='text-md font-semibold mb-5 mt-10'>Shipping Address:</div>
    {/* list */} 
    <div className="rounded-lg bg-white py-5 px-8 shadow-lg backdrop-blur-md max-sm:px-8">
    
       <FormControl>
       <RadioGroup
         row
         aria-labelledby="demo-row-radio-buttons-group-label"
         name="row-radio-buttons-group"
         value={deliveryAddress}
         onChange={(e) => setDeliveryAddress(e.target.value)} 
       >
        {userAddress.map((address) => (
  <FormControlLabel
    key={address._id}
    value={address._id}
    control={<BpRadio />}
    label={<div key={address._id} className='ml-2'>
      <Accordion open={openAccord === address._id}>
        <AccordionHeader className='text-sm' onClick={() => handleOpen(address._id)}>
          {address.name}, {address.building}, {address.street}, {address.landmark}, {address.city}, {address.state}, {address.pincode}
          <div>ph:- {address.phone}</div>
        </AccordionHeader>
        <AccordionBody>
          <Button variant='contained' size="small" sx={{ backgroundColor: '#000000' }}>Deliver Here</Button>
        </AccordionBody>
      </Accordion>
    </div>}
  />
))}

       </RadioGroup>
       </FormControl>  
    </div>

     <div className="flex justify-start text-center mt-4">
           <Button
             variant="text"
             className="underline"
             sx={{ color: '#000000', mb: 3 }}
             onClick={handleClickOpen}
           >
             <AddCircleOutlineIcon sx={{ mr:2, }}/>Add New Address
           </Button>
           
            <Dialog open={open} onClose={handleClose}>
            <form onSubmit={handleSubmitAddress} >
        <DialogTitle>Add new address:</DialogTitle>
        <DialogContent >        
        <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-6">
        <Typography variant="small" color="blue-gray" className="-mb-5">
                    Full Name
                  </Typography>
                  <Input
                    required
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    autoComplete="name"
                    size="md"
                    placeholder=""
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  </div>
                  <div className="col-span-12 md:col-span-6">
                  <Typography variant="small" color="blue-gray" className="-mb-5">
                    Mobile Number
                  </Typography>
                  <div className="relative mt-1 flex items-center">
                    <span className="bg-gray-400 rounded-xl mr-1 p-1.5 text-black">
                      +91
                    </span>
                    <Input
                      required
                      id="phone"
                      type='number'
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      autoComplete="phone"
                      size="md"
                      placeholder=""
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                  </div>
                  </div>
                  <div className='mt-2'>
                  <Typography variant="small" color="blue-gray" className="-mb-5">
                    Building, House-no
                  </Typography>
                  <Input
                    required
                    id="building"
                    name="building"
                    value={formData.building}
                    onChange={handleInputChange}
                    autoComplete="building"
                    size="md"
                    placeholder=""
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  </div>
                  <div className='mt-2'>
                  <Typography variant="small" color="blue-gray" className="-mb-5">
                    Street, area, village
                  </Typography>
                  <Input
                    required
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    autoComplete="street"
                    size="md"
                    placeholder=""
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  </div>
                  <div className="grid grid-cols-12 gap-6 mt-2">
                  <div className="col-span-12 md:col-span-6">
        <Typography variant="small" color="blue-gray" className="-mb-5">
                    Landmark
                  </Typography>
                  <Input
                    id="landmark"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleInputChange}
                    autoComplete="landmark"
                    size="md"
                    placeholder="Enter the nearest landmark"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  </div>
                    <div className="col-span-12 md:col-span-6">
        <Typography variant="small" color="blue-gray" className="-mb-5">
                    City
                  </Typography>
                  <Input
                    required
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    autoComplete="city"
                    size="md"
                    placeholder=""
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  </div>
                  </div>
                  <div className="grid grid-cols-12 gap-6 mt-2">
                    <div className="col-span-12 md:col-span-6">
        <Typography variant="small" color="blue-gray" className="-mb-5">
                    Pincode
                  </Typography>
                  <Input
                    required
                    id="pincode"
                    name="pincode"
                    type='number'
                    value={formData.pincode}
                    onChange={handleInputChange}
                    autoComplete="pincode"
                    size="md"
                    placeholder=""
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  </div>
                  <div className="col-span-12 md:col-span-6">
                  <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-base mb-1"
                >
                  State
                </Typography>
                  <Select
  required
  placeholder="Select State"
  name="state"
  id="state"
  autoComplete="off"
  value={formData.state}
  onChange={(value) => handleState(value)}
  labelProps={{
    className: "before:content-none after:content-none",
  }}
  className="border-t border-blue-gray-200 focus:border-gray-600 focus-visible:border-gray-600 w-full"
>
  {stateAndUnion.map((state) => (
    <Option key={state} value={state} className="flex items-center gap-2">
      {state}
    </Option>
  ))}
</Select> 
                  </div>
                  </div>
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: '#000000' }} >Cancel</Button>
          <Button variant='contained' sx={{ backgroundColor: '#000000', '&:hover': { backgroundColor: '#000000'} }} type="submit" onClick={handleClose}>Save</Button>
        </DialogActions>
        </form>
      </Dialog>
         </div>
</div>
 )}

    </div>
    <div className="h-fit col-span-12 md:my-7 md:col-span-4">
      {/* Promo */}
      <div className="rounded-lg -mt-10 md:mt-10 bg-white py-5 px-8 shadow-lg backdrop-blur-md max-sm:px-8">
  <label htmlFor="promoCode" className="block text-sm font-medium leading-6 text-gray-900">
    Promo code:
  </label>
  <div className="mt-2 relative rounded-md shadow-sm">
    <input
      type="text"
      name="promoCode"
      id="promoCode"
      className="w-full md:w-48 rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
      placeholder="Enter Promo/Coupon code"
    />
      <button type="submit" className="md:ml-2 mt-2 md:mt-0 textblack text-sm leading-6 font-medium px-3 rounded-sm border border-black w-fit">Apply</button>
  </div>
      </div>

{/* Order summary */}
      <div className="rounded-lg mt-10 bg-white py-5 px-8 shadow-lg backdrop-blur-md max-sm:px-8">
      <h1 className="font-medium text-md">Order Summary</h1>
      <div className='flex justify-between mt-6'>
        <p className='text-left text-sm'>Sub total</p>
        <p className='text-right text-sm'>₹ {subtotal}</p>
      </div>
      <div className='flex justify-between mt-3'>
        <p className='text-left text-sm'>Shipping Charges</p>
        <p className='text-right text-sm'>₹ {40}</p>
      </div>
      <div className='flex justify-between mt-3'>
        <p className='text-left text-sm'>Discount</p>
        <p className='text-right text-red-600 text-sm'>- ₹ {0}</p>
      </div>
      <div className='flex justify-between mt-3'>
        <p className='text-left text-sm'>Total Savings</p>
        <p className='text-right text-sm text-green-600'>₹ {totalSaving}</p>
      </div>
      <div className='my-5' style={{width: '100%', height: '100%', border: '1px black solid'}}></div>
      <div className='flex justify-between mt-3'>
        <p className='text-left text-lg font-semibold'>Total Price</p>
        <p className='text-right text-lg font-semibold'>₹ {subtotal + 40 - 0}</p>
      </div>
      </div>
      {/* next stepper */}
      <div>
      {activeStep === 0 && (
      <button type="button" onClick={handleNext} className="mt-10 bg-black text-white text-sm leading-6 font-medium py-2 px-3 rounded-md w-full">Place Order</button>
      )}
      </div>

{/* stepper back */}
<div>
      {activeStep === 1 && (       
         <div className="flex justify-center text-center mt-4">
           <Button
             variant="text"
             className="underline"
             sx={{ color: '#000000' }}
             onClick={handlePrev}
           >
             Back
           </Button>
         </div>
      )}
      </div>

      {/* Proceed payment */}
      <div>
      {activeStep === 1 && (
      <button type="submit" className="mt-6 bg-black text-white text-sm leading-6 font-medium py-2 px-3 rounded-md w-full">Proceed Payment</button>
      )}
      </div>

      </div>
    </div>

    <div className='flex justify-center my-5'>
    <Link to="/men">
    <Button variant="outlined" sx={{ color: '#000000', borderColor: '#000000', '&:hover': { borderColor: '#000000', color: '#000000', backgroundColor: '#FFFFFF',},}} size="small">
          Back
    </Button>
    </Link>
</div>
</div>
    </Base>
  );
};

export default Cart;