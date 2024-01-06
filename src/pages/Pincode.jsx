import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import cartAPI from '../features/cart/cartAPI';
import { Input } from '@material-tailwind/react';

const Pincode = () => {
    const [pincode, setPincode] = useState();

  const handleInputChange = (e) => {
    setPincode(e.target.value);
  };

      // handleCheckout
  const handleCheckout = async (event) => {
    event.preventDefault();
    try {
      const response = await cartAPI.checkPincode(pincode);

      if (response.status === 200) {
        console.log(response.data);
        console.log(response.data.records.length);
        if(response.data.records[0].statename === "TAMIL NADU"){
            console.log(40)
        } else if(response.data.records[0].statename === "PONDICHERRY"){
            console.log(50)
        } else if(response.data.records[0].statename === "KARNATAKA" || response.data.records[0].statename === "ANDHRA PRADESH" || response.data.records[0].statename === "KERALA"){
            console.log(70)
        } else {
            console.log(100)
        }
      }
    } catch (error) {
      console.error("Error checking out:", error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
        <Input
                  required
                  id="pincode"
                  type='number'
                  name="pincode"
                  autoComplete="pincode"
                  value={pincode}
                  onChange={handleInputChange}
                  size="lg"
                  placeholder="enter"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
        <button onClick={handleCheckout}>get pincode</button>
    </div>
  )
}

export default Pincode