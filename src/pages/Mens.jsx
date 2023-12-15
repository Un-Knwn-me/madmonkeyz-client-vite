import React, { useCallback, useEffect, useState } from "react";
import banner from "../assets/images/mens.jpg";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { Button, Option, Select, Typography } from "@material-tailwind/react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FormControl, FormControlLabel, FormLabel, RadioGroup, } from "@mui/material";
import BpRadio from "../components/SizeCheckBox.jsx";
import { useDispatch, useSelector } from "react-redux";
import productAPI from "../features/product/productAPI.jsx";
import { listProducts } from '../features/product/productSlice.jsx';
import Base from "../components/Base.jsx";
import cartAPI from "../features/cart/cartAPI.jsx";
import { calculateTotals, getItems } from "../features/cart/cartSlice.jsx";
import { Link } from "react-router-dom";

const Mens = () => {
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [sortBy, setSortBy] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  // filter side bar
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

// Get products
const fetchProducts = async () => {
  try { 
    const response = await productAPI.listProducts(sortBy);
    
    if (response.status === 200) {
      setFilteredProducts(response.data);
      dispatch(listProducts(response.data));
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
}, [sortBy]);

const productlist = useSelector((state) => state.productList);

  // handle filter
  const handleFilterChange = () => {
    const newFilteredProducts = productlist.filter((item) => {
      return (
        (item.category === category || category === "") &&
        (item.color === color || color === "") &&
        (item.size === size || size === "") &&
        item.salesPrice >= (minPrice || 0) &&
        item.salesPrice <= (maxPrice || Infinity)
      );
    });
    setFilteredProducts(newFilteredProducts);
    setSidebarOpen(false);
  };

  return (
    <Base title={'Men'}>

      {/* Banner */}
      <div
        className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32"
        id="catBanner"
      >
        <img
          src={banner}
          alt="Men"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        />
      </div>

      {/* Content */}

      <div className="flex justify-center antialiased md:mx-10 my-10">
        <p className="text-2xl font-semibold">Apparel for Mens</p>
      </div>

      {/* Sidebar */}
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        open={isSidebarOpen}
        onClose={toggleSidebar}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="fixed inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-md overflow-y-scroll bg-white">
              <div className="absolute top-0 left-0 pt-4 pl-4">
                <button
                  type="button"
                  className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  onClick={toggleSidebar}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon
                    className="h-7 w-7 text-gray-900"
                    aria-hidden="true"
                  />
                </button>
              </div>
              <div className="h-full px-5 flex flex-col py-10 bg-white shadow-xl overflow-y-scroll">
                <div className="flex justify-between">
                  <Typography variant="h6" className="mb-5">
                    Filter:-
                  </Typography>
                  <div>
                    <Button size="sm" onClick={handleFilterChange}>
                      Apply
                    </Button>
                  </div>
                </div>

                <div className="bg-gray-200 p-5">
                  {/* Category */}
                  <div>
                    <FormControl>
                      <FormLabel id="demo-customized-radios" className="mb-2">
                        Category
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-customized-radios"
                        name="customized-radios"
                        className="ml-6"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <FormControlLabel
                          value=""
                          control={<BpRadio />}
                          label="All"
                        />
                        <FormControlLabel
                          value="T-shirts"
                          control={<BpRadio />}
                          label="T-Shirts"
                        />
                        <FormControlLabel
                          value="Shirt"
                          control={<BpRadio />}
                          label="Shirt"
                        />
                        <FormControlLabel
                          value="Pant"
                          control={<BpRadio />}
                          label="Pant"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>

                  {/* Color */}
                  <div>
                    <FormControl>
                      <FormLabel id="demo-customized-radios" className="mb-2">
                        Color
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-customized-radios"
                        name="customized-radios"
                        className="ml-6"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                      >
                        <FormControlLabel
                          value=""
                          control={<BpRadio />}
                          label="All"
                        />
                        <FormControlLabel
                          value="Black"
                          control={<BpRadio />}
                          label="Black"
                        />
                        <FormControlLabel
                          value="White"
                          control={<BpRadio />}
                          label="White"
                        />
                        <FormControlLabel
                          value="Blue"
                          control={<BpRadio />}
                          label="Blue"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>

                  {/* Price */}
                  <div>
                    <Typography
                      color="blue-gray"
                      variant="lead"
                      className="text-base font-medium mb-4"
                    >
                      Price:
                    </Typography>
                    <div className="grid grid-cols-12 gap-3">
                      <div className="col-span-6">
                        <input
                          type="number"
                          name="minPrice"
                          min={0}
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                          id="price"
                          className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                          placeholder="Min"
                        />
                      </div>

                      <div className="col-span-6">
                        <input
                          type="number"
                          name="maxPrice"
                          min={100}
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                          id="price"
                          className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Size */}
                  <div className="my-5">
                    <FormControl>
                      <FormLabel id="demo-customized-radios" className="mb-2">
                        Size
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-customized-radios"
                        name="customized-radios"
                        className="ml-6"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                      >
                        <FormControlLabel
                          value=""
                          control={<BpRadio />}
                          label="All"
                        />
                        <FormControlLabel
                          value="S"
                          control={<BpRadio />}
                          label="S"
                        />
                        <FormControlLabel
                          value="M"
                          control={<BpRadio />}
                          label="M"
                        />
                        <FormControlLabel
                          value="L"
                          control={<BpRadio />}
                          label="L"
                        />
                        <FormControlLabel
                          value="XL"
                          control={<BpRadio />}
                          label="XL"
                        />
                        <FormControlLabel
                          value="2XL"
                          control={<BpRadio />}
                          label="2XL"
                        />
                        <FormControlLabel
                          value="3XL"
                          control={<BpRadio />}
                          label="3XL"
                        />
                        <FormControlLabel
                          value="4XL"
                          control={<BpRadio />}
                          label="4XL"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      <div className="grid grid-cols-12 gap-4 mt-10 mb-20">
        {/* Left column for filter */}
        <div className="h-fit col-span-3 p-5 hidden md:block">
          <div className="flex justify-between">
            <Typography variant="h6" className="mb-5">
              Filter:-
            </Typography>
            <div>
              <Button size="sm" onClick={handleFilterChange}>
                Apply
              </Button>
            </div>
          </div>

          <div className="bg-gray-200 p-5">
            {/* Category */}
            <div>
              <FormControl>
                <FormLabel id="demo-customized-radios" className="mb-2">
                  Category
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-customized-radios"
                  name="customized-radios"
                  className="ml-6"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <FormControlLabel
                    value=""
                    control={<BpRadio />}
                    label="All"
                  />
                  <FormControlLabel
                    value="T-shirts"
                    control={<BpRadio />}
                    label="T-Shirts"
                  />
                  <FormControlLabel
                    value="Shirt"
                    control={<BpRadio />}
                    label="Shirt"
                  />
                  <FormControlLabel
                    value="Pant"
                    control={<BpRadio />}
                    label="Pant"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            {/* Color */}
            <div>
              <FormControl>
                <FormLabel id="demo-customized-radios" className="mb-2">
                  Color
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-customized-radios"
                  name="customized-radios"
                  className="ml-6"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                >
                  <FormControlLabel
                    value=""
                    control={<BpRadio />}
                    label="All"
                  />
                  <FormControlLabel
                    value="Black"
                    control={<BpRadio />}
                    label="Black"
                  />
                  <FormControlLabel
                    value="White"
                    control={<BpRadio />}
                    label="White"
                  />
                  <FormControlLabel
                    value="Blue"
                    control={<BpRadio />}
                    label="Blue"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            {/* Price */}
            <div>
              <Typography
                color="blue-gray"
                variant="lead"
                className="text-base font-medium mb-4"
              >
                Price:
              </Typography>
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-6">
                  <input
                    type="number"
                    name="minPrice"
                    min={0}
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    id="price"
                    className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    placeholder="Min"
                  />
                </div>

                <div className="col-span-6">
                  <input
                    type="number"
                    name="maxPrice"
                    min={100}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    id="price"
                    className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>

            {/* Size */}
            <div className="my-5">
              <FormControl>
                <FormLabel id="demo-customized-radios" className="mb-2">
                  Size
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-customized-radios"
                  name="customized-radios"
                  className="ml-6"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  <FormControlLabel
                    value=""
                    control={<BpRadio />}
                    label="All"
                  />
                  <FormControlLabel value="S" control={<BpRadio />} label="S" />
                  <FormControlLabel value="M" control={<BpRadio />} label="M" />
                  <FormControlLabel value="L" control={<BpRadio />} label="L" />
                  <FormControlLabel
                    value="XL"
                    control={<BpRadio />}
                    label="XL"
                  />
                  <FormControlLabel
                    value="2XL"
                    control={<BpRadio />}
                    label="2XL"
                  />
                  <FormControlLabel
                    value="3XL"
                    control={<BpRadio />}
                    label="3XL"
                  />
                  <FormControlLabel
                    value="4XL"
                    control={<BpRadio />}
                    label="4XL"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>

        {/* Right column with product listing */}
        <div className="h-fit mb-20 mx-5 col-span-12 md:col-span-9">
          <div className="flex items-center justify-between mt-5 mb-20">
            <Typography variant="h6" className="mt-5 hidden md:block">
              Mad Monkeyz Premium
            </Typography>
            {/* Open Sidebar button */}
            <div className="block md:hidden mt-5">
              <Button size="sm" onClick={toggleSidebar}>
                Filter
              </Button>
            </div>
            {/* sort */}
            <div className="flex items-left gap-4">
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium mb-1"
                >
                  Sort-by
                </Typography>
                <Select
                  placeholder="Sort By"
                  name="sortBy"
                  id="sortBy"
                  autoComplete="off"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  className="border-t border-blue-gray-200 focus:border-gray-600 focus-visible:border-gray-600 w-full"
                  required
                  size="md"
                  value={sortBy}
                  onChange={(value) => setSortBy(value)}
                >
                  <Option value="" className="flex items-center gap-2">
                    None
                  </Option>
                  <Option value="name" className="flex items-center gap-2">
                    A-Z
                  </Option>
                  <Option
                    value="newestFirst"
                    className="flex items-center gap-2"
                  >
                    Newest
                  </Option>
                  <Option value="oldestFirst" className="flex items-center gap-2">
                    Oldest
                  </Option>
                  <Option value="highToLow" className="flex items-center gap-2">
                    Price: High to Low
                  </Option>
                  <Option value="lowToHigh" className="flex items-center gap-2">
                    Price: Low to High
                  </Option>
                </Select>
              </div>

            </div>
          </div>

          {productlist && productlist.length === 0 ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto">
              {filteredProducts.map((product, key) => (
                <Link to={`/men/${product._id}`} key={product._id} >
                <ProductCard product={product} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </Base>
  );
};

export default Mens;