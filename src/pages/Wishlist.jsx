import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import userAPI from "../features/user/userAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { manageWishlist } from "../features/user/userSlice";
import CalculateOfferPercentage from "../components/CalculateOfferPercentage";
import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openPopover, setOpenPopover] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedVariantId, setSelectedVariantId] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  // size select
  const handleSizeSelection = (size, _id, itemId) => {
    setSelectedSize(size);
    setSelectedVariantId(_id);
    setSelectedItem(itemId);
  };

  // handle size
  const handleDone = async (e, itemsId) => {
    e.preventDefault();
    try {
      if (itemsId === selectedItem) {
        const response = await userAPI.wishlistItemSize(
          selectedItem,
          selectedVariantId,
          selectedSize
        );

        if (response.status === 200) {
          fetchwishlist();
        }
      }
    } catch (error) {
      console.error("Error managing wishlist:", error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchwishlist();
  }, []);

  // Get products
  const fetchwishlist = async () => {
    try {
      const response = await userAPI.getWishlist();
      if (response.status === 200) {
        dispatch(manageWishlist(response.data));
      } else if (response.status === 404) {
        navigate("/login");
        toast.warning("Login to manage Wishlist");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(error.response.data.message);
    }
  };

  const wishlistItems = useSelector((state) => state.userInfo.wishlist);
  console.log(wishlistItems);

  // remove item from wishlist
  const handleWishlist = async (e, itemId) => {
    e.preventDefault();
    try {
      const response = await userAPI.removeWishlistItem(itemId);

      if (response.status === 200) {
        fetchwishlist();
      }
    } catch (error) {
      console.error("Error managing wishlist:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mx-30 my-10">
        <p className="text-md font-semibold mb-10">Wishlist</p>

        {/* Wishlist */}
        {wishlistItems && wishlistItems.length === 0 ? (
          <div className="">Wishlist is empty</div>
        ) : (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 justify-between place-items-center">
            {wishlistItems.map((item, key) => (
              <div
                className="z-10 w-64 h-96 relative rounded shadow border border-neutral-200 cursor-pointer"
                key={item._id}
                onMouseLeave={() => setOpenPopover(null)}
              >
                <button className="absolute top-2 right-2 text-gray-500 bg-white rounded-full p-0.5 hover:text-red-500">
                  <CloseIcon onClick={(e) => handleWishlist(e, item._id)} />
                </button>
                <div className="w-full h-52">
                  <img
                    src={item.product.images[0]}
                    alt="card-image"
                    className="h-full w-full object-cover"
                    onClick={() => navigate(`/category/${item.product._id}`)}
                  />
                </div>
                <div className="mx-4 my-3">
                  <p
                    className="text-black text-lg font-semibold font-red-hat-display leading-tight line-clamp-1 tracking-tight"
                    onClick={() => navigate(`/category/${item.product._id}`)}
                  >
                    {item.product.brandName} {item.product.productName}
                  </p>
                  <p className="text-gray-600 text-sm font-medium font-red-hat-display leading-tight tracking-tight mt-1">
                    {item.product.productType}
                  </p>
                  <div className="columns-2 mt-2">
                    <p className="text-gray-600 text-sm font-medium font-red-hat-display leading-tight tracking-tight">
                      Color: {item.product.color}
                    </p>
                    {item.selectedSize && item.selectedSize ? (
                      <p className="text-gray-600 text-sm font-medium font-red-hat-display leading-tight tracking-tight">
                        Size:{item.selectedSize}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="columns-3 mt-3">
                    <p className="text-black text-md font-semibold font-red-hat-display leading-tight tracking-tight">
                      ₹ {item.product.salesPrice}
                    </p>
                    <p className="text-gray-500 line-through text-md font-semibold font-red-hat-display leading-tight tracking-tight">
                      ₹ {item.product.price}
                    </p>
                    <p className="text-red-500 text-md font-semibold font-red-hat-display leading-tight tracking-tight">
                      <CalculateOfferPercentage
                        originalPrice={item.product.price}
                        discountedPrice={item.product.salesPrice}
                      />
                      % off
                    </p>
                  </div>
                </div>
                <footer className="text-center w-full h-9 px-5 py-2.5 justify-center items-center gap-2.5 inline-flex">
                  {item.selectedSize && item.selectedSize ? (
                    <button className="bg-white w-full h-9 px-5 hover:scale-105 font-red-hat-display border border-gray-700 text-sm font-medium leading-tight tracking-tight">
                      Add to Bag
                    </button>
                  ) : (
                    <Popover open={true} placement="top">
                      <PopoverHandler>
                        <button
                          className="bg-white w-full h-9 px-5 hover:scale-105 font-red-hat-display border border-gray-700 text-sm font-medium leading-tight tracking-tight"
                          onMouseEnter={() => setOpenPopover(item._id)}
                          onClick={() => setOpenPopover(item._id)}
                        >
                          Add to Bag
                        </button>
                      </PopoverHandler>
                      {openPopover === item._id ? (
                        <PopoverContent className="z-40 w-64">
                          <div className="gap-2 flex flex-wrap justify-center">
                            <p className="font-red-hat-display text-sm w-full">
                              Select size:
                            </p>
                            <div className="w-1/4 mt-3 mb-5">
                              {item.product.varients.map(({ size, _id }) => (
                                <button
                                  className={`w-full px-3 border py-1 hover:bg-gray-900 hover:text-white ${
                                    selectedVariantId === _id
                                      ? "bg-black text-white"
                                      : "border-gray-900"
                                  }`}
                                  key={_id}
                                  onClick={() =>
                                    handleSizeSelection(size, _id, item._id)
                                  }
                                >
                                  {size}
                                </button>
                              ))}
                            </div>
                            <footer className="w-full">
                              <button
                                className="bg-gray-900 w-full h-9 px-5 hover:scale-105 font-red-hat-display border border-gray-700 text-sm font-medium leading-tight tracking-tight text-white"
                                onClick={(e) => handleDone(e, item._id)}
                              >
                                Done
                              </button>
                            </footer>
                          </div>
                        </PopoverContent>
                      ) : null}
                    </Popover>
                  )}
                </footer>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;
