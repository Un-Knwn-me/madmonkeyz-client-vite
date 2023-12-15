import { Button, FormControl, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

const CartItemCard = ({ item, updateCartItem, removeItem }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);

    if (newQuantity <= item.varient.stock) {
      setQuantity(newQuantity);

      updateCartItem(item._id, newQuantity);
    } else {
      console.log("Quantity exceeds stock");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-md backdrop-blur-md shadow-md mb-10 md:my-3 overflow-hidden md:max-w-full">
      <div className="md:flex p-5">
        {/* item image */}
        <div className="md:shrink-0">
        {item.product && item.product.images && item.product.images.length > 0 ? (
          <img
            className="h-48 w-full rounded-md object-cover md:w-48"
            src={item.product.images[0]}
            alt={item.product.brandName}
          />
          ) : (
            <div>No Image</div>
          )}
        </div>
        {/* item details */}
        <div className="md:flex md:justify-between gap-6 md:px-6 p-2 md:pt-0">
          <div className="">
            <div className="text-base">
              {item.product?.brandName} - {item.product.productName}
            </div>
            <div className="text-xs text-gray-700">
              {item.product.productType} - {item.product.category}
            </div>
            <div className="text-sm font-semibold mt-2">
              Color:{" "}
              <span className="text-sm font-normal">{item.product.color}</span>
            </div>
            <div className="text-sm font-semibold mt-2">
              Size:{" "}
              <span className="text-sm font-normal">{item.selectedSize}</span>
            </div>

            {/* Quantity dropdown */}
            <div>
              <div className="text-sm font-semibold mt-2">
                Quantity:
                <span>
                  <FormControl
                    variant="standard"
                    sx={{ ml: 1, mt: -1 }}
                    size="small"
                  >
                    <Select
                      id="quantity"
                      value={quantity}
                      onChange={handleChange}
                      autoWidth
                    >
                      {/* [...Array] - it creates the new array equals to (item.product.stock), _ - it denotes no values*/}
                      {[...Array(item.varient.stock)].map((_, index) => (
                        <MenuItem key={index + 1} value={index + 1}>
                          {index + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-md font-normal text-right text-gray-900">
              ₹ {item.product.salesPrice * item.quantity}{" "}
              <span className="text-md ml-3 line-through font-medium text-gray-500">
                ₹ {item.product.price * item.quantity}{" "}
              </span>
            </div>
            <div className="font-light text-xs text-right text-gray-600">
              Includes all taxes & GST
            </div>
          </div>
        </div>
      </div>

<div className="px-5">
      <div
        style={{ width: "100%", height: "100%", border: "1px black solid" }}
      />
      <div className="flex justify-center py-3">
        <Button
          variant="text"
          sx={{ color: "#000000" }}
          onClick={() => removeItem(item._id)}
        >
          Remove
        </Button>
      </div>
      </div>

    </div>
  );
};

export default CartItemCard;