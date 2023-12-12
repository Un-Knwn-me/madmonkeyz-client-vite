import React, { useState } from 'react'
import { Avatar, Button, Collapse, IconButton, Input, Navbar, Typography } from '@material-tailwind/react'
import logo from '../assets/madMonkeyz.png';
import { Link } from 'react-router-dom';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Box, TextField } from '@mui/material';
import { useSelector } from 'react-redux';

const Base = ({title, description, children}) => {
    const [openNav, setOpenNav] = useState(false);
    const [search, setSearch] = useState('');

    const user = useSelector((state) => state.userInfo.userName);

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
      <Navbar color="transparent" className="sticky top-0 z-10 bg-black h-max max-w-full rounded-none px-4 py-0 lg:px-10">
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
            
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
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
          <div className="flex items-center gap-x-8">
          <div className="relative flex w-fit">
         
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
              <ShoppingBagOutlinedIcon />
              </Link>
              </div>
              <div className="flex items-center gap-4">
        <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" size="sm" />
        <div>
          <Typography variant="lead" className='text-base'>{user}</Typography>
        </div>
      </div>
            </div>
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
  
      <footer>
        footer
      </footer>
      </>
    )
  }

export default Base