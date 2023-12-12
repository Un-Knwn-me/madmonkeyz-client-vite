import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Breadcrumbs,
  Button,
  Carousel,
  Chip,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import cartAPI from "../features/cart/cartAPI";
import { addItems } from "../features/cart/cartSlice";
import { toast } from "react-toastify";
import Base from "../components/Base";
import productAPI from "../features/product/productAPI";
import { productInfo } from "../features/product/productSlice";

const ProductView = () => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get productdetails
  const fetchProductDetails = async (id) => {
    try { 
      const response = await productAPI.productInfo(id);
      
      if (response.status === 200) {
        dispatch(productInfo(response.data));
      }
      
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(error.response.data.message);
    }
  };
  
  useEffect(() => {
    fetchProductDetails(id);
  }, [id]);

  const productState = useSelector((state) => state.products);
  const product = productState.productList.find((item) => item._id === id);

    // Set quantity
    const decreaseQuantity = () => {
      if (qty > 1) {
        setQty(qty - 1);
      }
    };
  
    const increaseQuantity = () => {
      if (qty < product.stock) {
      setQty(qty + 1);
      }
    };

  // handle add to cart
  const handleAddToCart = async (e) => {
      e.preventDefault();
    try {
      const response = await cartAPI.addItem(product._id, qty, product.salesPrice, product.price);
      if (response.status === 200) {
        dispatch(addItems(response.data));
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Base>

      {productState.loading ? (
        <Loader />
      ) : (
        <div>
          {/* navigation */}
          <div className="m-2 md:mx-10 md:m-5">
            <Breadcrumbs>
              <Link to="/" className="opacity-60 m-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 1 20 20"
                  fill="inherit"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </Link>
              <Link to="/men" className="opacity-60 m-1">
                <span className="text-sm">Men</span>
              </Link>
              <span className="m-1 text-sm">{product.productName}</span>
            </Breadcrumbs>
          </div>

          <div className="mx-10 md:mx-20">
            <div className="mx-auto mt-6 sm:px-6">
              <div className="grid grid-cols-12 gap-6">
                {/* Left column with product image */}
                <div className="h-fit col-span-12 md:col-span-7">
                  {/* Image gallery */}
                  <Carousel className="rounded-xl md:max-h-screen">
                    {product.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Product${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    ))}
                  </Carousel>
                </div>

                {/* Right column with product name */}
                <div className="col-span-12 md:col-span-5">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {product.brandName} - {product.productName}
                  </h1>

                  <p className="m-2 text-gray-600">
                    {product.productType} {product.category}
                  </p>

                  {/* Reviews */}
                  <div className="mt-3 mx-2">
                    <h3 className="sr-only">Reviews</h3>
                    <Rating
                      value={product.ratings}
                      text={`${product.numOfReviews} reviews`}
                    />
                  </div>

                  {/* Price */}
                  <div className="m-5">
                    <h1 className="text-xl font-medium text-gray-900">
                      <span className="text-xl font-normal text-gray-900">
                        Price:
                      </span>{" "}
                      ₹ {product.salesPrice}{" "}
                      <span className="text-xl mx-3 line-through font-medium text-gray-500">
                        ₹ {product.price}
                      </span>
                    </h1>
                    <p className="font-light text-xs text-gray-600">
                      Includes all taxes & GST
                    </p>
                  </div>

                  {/* Colors */}
                  <div className="mt-5 mx-5">
                    <h3 className="text-md font-medium text-gray-900">
                      Color:
                    </h3>
                    <div
                      className={`w-10 h-10 m-2 bg-${product.color} rounded-full border-2 border-${product.color}`}
                    />
                  </div>

                  {/* Sizes */}
                  <div className="m-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-md font-medium text-gray-900">
                        Size:
                      </h3>
                      <Link
                        to="#"
                        className="text-sm font-medium text-right text-indigo-600 hover:text-indigo-500"
                      >
                        Size guide
                      </Link>
                    </div>
                    <div className="w-[50px] mt-3 h-10 px-4 bg-black rounded border border-black flex-col justify-center items-center inline-flex">
                      <div className="text-white text-xl font-medium font-['Red Hat Display'] leading-10 tracking-tight">
                        {product.size}
                      </div>
                    </div>
                  </div>

                  {/* status */}
                  <div className="mt-8 mx-5">
                    <div className="flex items-center justify-start">
                      <h3 className="text-md font-medium text-gray-900">
                        Status:
                      </h3>
                      <div className="inline-block ml-3">
                        <Chip
                          variant="gradient"
                          color={product.stock > 0 ? "green" : "red"}
                          value={
                            product.stock > 0 ? "In Stock" : "Out of Stock"
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="mt-8 mx-5">
                    <div className="flex items-center justify-start">
                      <h3 className="text-md font-medium text-gray-900">
                        Quantity:
                      </h3>
                    </div>
                    <div className="flex items-center m-3 space-x-4">
                      <Button
                        size="sm"
                        onClick={() => decreaseQuantity(product._id)}
                        className="px-2 py-1 bg-gray-200 text-gray-900 rounded"
                      >
                        <RemoveIcon />
                      </Button>
                      <span>{qty}</span>
                      <Button
                        size="sm"
                        onClick={() => increaseQuantity(product._id)}
                        className="px-2 py-1 bg-gray-200 text-gray-900 rounded"
                      >
                        <AddIcon />
                      </Button>
                    </div>
                  </div>

                  <p className="font-light text-xs mt-10 text-gray-600 text-center">
                    2days return & replace policy applicable to this product
                  </p>

                  {/* Add to cart */}
                  <div className="mt-3 mx-5 grid grid-cols-12 gap-5">
                    {/* Left column with product image */}
                    <div className="h-fit col-span-2">
                      <div className="group inline-flex flex-wrap items-center gap-3">
                        <Tooltip content="Whislist">
                          <span className="cursor-pointer text-left rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                            <FavoriteIcon className="text-red-800" />
                          </span>
                        </Tooltip>
                      </div>
                    </div>
                    <div className="h-fit ml-3 md:ml-1 text-right col-span-10">
                      <Button
                        onClick={handleAddToCart}
                        type="button"
                        disabled={product.stock === 0}
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Add to bag
                      </Button>
                    </div>
                  </div>

                  {/* ... (rest of your product information) */}

                  <div className="my-20 w-full h-fit border-2 border-gray-200">
                    <Typography className="m-5" variant="h5">
                      Product Description:
                    </Typography>
                    <Typography className="mx-5" variant="paragraph">
                      {product.description}
                    </Typography>

                    <Typography className="m-5" variant="h6">
                      Product Details:
                    </Typography>
                    <Typography className="mx-5 -mt-3" variant="small">
                      {product.notes}
                    </Typography>

                    <Typography className="m-5" variant="h6">
                      Size & Fit:
                    </Typography>
                    <Typography className="mx-5 -mt-3" variant="small">
                      {product.style}
                    </Typography>

                    <Typography className="m-5" variant="h6">
                      Material & Care:
                    </Typography>
                    <Typography className="mx-5 -mt-3" variant="small">
                      {product.fabric}
                    </Typography>
                    <Typography className="mx-5 mt-1" variant="small">
                      Machine wash
                    </Typography>

                    <Typography className="m-5" variant="h6">
                      Specification:
                    </Typography>
                    <div className="grid grid-cols-12 gap-6 mb-5">
                      {/* Left column with product Spec */}
                      <div className="h-fit col-span-6">
                        <Typography
                          className="mx-5 text-xs text-slate-600"
                          variant="small"
                        >
                          Fabric
                        </Typography>
                        <Typography className="mx-5 mt-1" variant="small">
                          {product.fabric}
                        </Typography>

                        <Typography
                          className="mx-5 mt-4 text-xs text-slate-600"
                          variant="small"
                        >
                          Fit
                        </Typography>
                        <Typography className="mx-5 mt-1" variant="small">
                          {product.fit} Regular Fit
                        </Typography>

                        <Typography
                          className="mx-5 mt-4 text-xs text-slate-600"
                          variant="small"
                        >
                          Type
                        </Typography>
                        <Typography className="mx-5 mt-1" variant="small">
                          {product.productType}
                        </Typography>
                      </div>

                      {/* Right column with product spec */}
                      <div className="h-fit col-span-6">
                        <Typography
                          className="mx-5 text-xs text-slate-600"
                          variant="small"
                        >
                          Tag
                        </Typography>
                        <Typography className="mx-5 mt-1" variant="small">
                          {product.tag}
                        </Typography>

                        <Typography
                          className="mx-5 mt-4 text-xs text-slate-600"
                          variant="small"
                        >
                          Category
                        </Typography>
                        <Typography className="mx-5 mt-1" variant="small">
                          {product.category} Regular Fit
                        </Typography>

                        <Typography
                          className="mx-5 mt-4 text-xs text-slate-600"
                          variant="small"
                        >
                          SKU
                        </Typography>
                        <Typography className="mx-5 mt-1" variant="small">
                          {product.sku}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Base>
  );
};

export default ProductView;