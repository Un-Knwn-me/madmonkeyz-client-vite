import React, { useState } from 'react'
import { Avatar, Button, Badge, Collapse, IconButton, Input, Typography, Navbar } from '@material-tailwind/react'
import logo from '../assets/madMonkeyz.png';
import { Link } from 'react-router-dom';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Box, TextField } from '@mui/material';
import { useSelector } from 'react-redux';

const LINKS = [
  {
    title: "Product",
    items: ["Men", "Women", "Kids"],
  },
  {
    title: "Company",
    items: ["About us", "Contact us", "Blog"],
  },
  {
    title: "Resource",
    items: ["Blog", "Newsletter", "Events", "Help center"],
  },
];
 
const currentYear = new Date().getFullYear();

const Base = ({title, description, children}) => {
    const [openNav, setOpenNav] = useState(false);
    const [search, setSearch] = useState('');

    const user = useSelector((state) => state.userInfo.userName);
    const { cartTotalQuantity } = useSelector(state => state.cart);

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
          <Typography
            as="li"
            variant="small"
            color="white"
            className="p-1 font-normal"
          >
            <Link to="/" className="flex items-center">
              Home
            </Link>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="white"
            className="p-1 font-normal"
          >
            <Link to="/men" className="flex items-center">
              Men
            </Link>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="white"
            className="p-1 font-normal"
          >
            <Link to="/women" className="flex items-center">
              Women
            </Link>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="white"
            className="p-1 font-normal"
          >
            <Link to="/kids" className="flex items-center">
              Kids
            </Link>
          </Typography>
        </ul>
      );

    return (
      <>
      <div className="-mt-1 -ml-1 w-full">
      <Navbar color="transparent" className="sticky top-0 z-10 bg-black h-max max-w-full rounded-none px-4 py-2 md:py-1 lg:px-10">
        <div className="flex items-center justify-between text-white">
        <div>
            <Link to='/'>
          <img
              src={logo}
              alt="Madmonkeyz"
              style={{ width: '40%', maxWidth: '60%', }}
            />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
          
          </div>
          <div className="flex items-center gap-x-4 md:gap-x-8">

          <div className="relative hidden md:flex w-fit">
          <Box sx={{ display: 'flex', alignItems: 'flex-end', color: '#FFFFFF' }}>
        <SearchOutlinedIcon sx={{ color: '#FFFFFF', mr: 1, my: 0.5 }} />
        <TextField sx={{ '& .MuiInputBase-input': { color: '#FFFFFF', borderColor: '#FFFFFF' } }} color="warning" label="Search" variant="standard" />
      </Box>
    </div>
    <div>
                <Link to='/whislist'>
              <FavoriteBorderOutlinedIcon />
              </Link>
              </div>
              <div>
                <Link to='/cart'> 
                <Badge content={cartTotalQuantity} color="cyan">
                <ShoppingBagOutlinedIcon />
                </Badge>
              </Link>
              </div>
              <div className="hidden md:flex items-center gap-4">
        <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" size="sm" />
        <div>
          <Typography variant="lead" className='text-base'>{user}</Typography>
        </div>
      </div>
            </div>
            
            <IconButton
              variant="text"
              className="ml-5 h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
        </div>
        <Collapse open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            <Button fullWidth variant="text" size="sm" className="">
              <span>Log In</span>
            </Button>
            <Button fullWidth variant="gradient" size="sm" className="">
              <span>Sign in</span>
            </Button>
          </div>
        </Collapse>
      </Navbar>
      </div>
      
          <main>
              <h2>{description}</h2>
              <div>{children}</div>
          </main>
  
          <footer className="relative w-full text-white bg-black">
      <div className="w-full px-5 md:px-20 pt-20">
        <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
          <Typography variant="h5" className="mb-6">
            Mad Monkeyz E-commerce
          </Typography>
          <div className="grid grid-cols-3 justify-between gap-4">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <Typography
                  variant="small"
                  className="mb-3 font-medium text-white opacity-80"
                >
                  {title}
                </Typography>
                {items.map((link) => (
                  <li key={link}>
                    <Typography
                      as="a"
                      href="#"
                      color="gray"
                      className="py-1.5 font-normal transition-colors hover:text-blue-gray-900"
                    >
                      {link}
                    </Typography>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className="mt-12 flex w-full flex-col items-center justify-center py-4 md:flex-row md:justify-between">
          <Typography
            variant="small"
            className="mb-4 text-center font-normal text-blue-gray-500 md:mb-0"
          >
            &copy; {currentYear} <a href="https://material-tailwind.com/">Mad Monkeyz</a>. All
            Rights Reserved.
          </Typography>
          <div className="flex gap-4 sm:justify-center">
            <Typography as="a" href="#" className="opacity-80 text-blue-700 transition-opacity hover:opacity-100">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </Typography>
            <Typography as="a" href="#" className="opacity-80 text-red-600 transition-opacity hover:opacity-100">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </Typography>
            <Typography as="a" href="#" className="opacity-80 text-cyan-400 transition-opacity hover:opacity-100">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </Typography>
          </div>
        </div>
      </div>
    </footer>
      </>
    )
  }

export default Base