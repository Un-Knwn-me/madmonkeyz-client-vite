import React from "react";
import CalculateOfferPercentage from "./CalculateOfferPercentage";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Rating, } from '@material-tailwind/react'
import userAPI from "../features/user/userAPI";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleWishlist = async (e) => {
    try {
      e.preventDefault();
      const response = await userAPI.addWishlist(product._id);
      
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
      <div className='z-10 w-full h-fit md:w-56 md:h-96 relative rounded shadow border border-neutral-200'>
        <button className="absolute top-2 right-2 text-gray-500 bg-white rounded-full px-1 py-0.5 hover:text-black">
          <FavoriteBorderOutlinedIcon fontSize="small" onClick={handleWishlist}/>
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
    </>
  );
};

export default ProductCard;