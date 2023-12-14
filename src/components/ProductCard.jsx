import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import Rating from "./Rating";

const ProductCard = ({ product }) => {

  return (
    <div className="w-full">
      
    <Card
      className="overflow-hidden cursor-pointer"
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none h-[10rem] relative"
      >
        <img
          src={product.images[0]}
          alt={product.productName}
          className="object-cover w-full h-full"
          style={{ objectFit: "cover" }}
        />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
        <IconButton
          size="sm"
          color="red"
          variant="text"
          className="!absolute top-4 right-4 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </IconButton>
      </CardHeader>
      <CardBody className="-my-4">
        <div className="mb-2 flex items-center">
          <Typography color="blue-gray" className="font-medium">
            {product.brandName} - {product.category}
          </Typography>
          
        </div>
        <div className="mb-2 flex items-center justify-start">
          <div className="w-[20px] h-5 px-4 text-black rounded border border-black flex-col justify-center items-center inline-flex">
            <div className="text-black text-xl font-medium font-['Red Hat Display'] leading-10 tracking-tight">
              {product.size}
            </div>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="ml-2 font-normal opacity-75"
          >
            {product.color}
          </Typography>
        </div>
        <div className="mb-2 flex items-center justify-start">
          <Rating value={product.ratings} text={`${product.numOfReviews} reviews`} />
        </div>
        <div className="mb-2 flex items-center justify-start">
          <Typography color="blue-gray" className="font-medium">
            Rs. {product.salesPrice}
          </Typography>
          <Typography className="ml-2 font-light text-slate-400 line-through">
            Rs. {product.price}
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          ripple={false}
          fullWidth={true}
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
    </div>
  );
};

export default ProductCard;