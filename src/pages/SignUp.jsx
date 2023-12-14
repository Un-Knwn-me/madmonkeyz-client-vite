import {
    Button,
    Card,
    Input,
    Option,
    Select,
    Typography,
  } from "@material-tailwind/react";
  import React, { useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import VisibilityIcon from "@mui/icons-material/Visibility";
  import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import userAPI from "../features/user/userAPI";
import { toast } from "react-toastify";
  
  const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      password: "",
      shirtSize: "",
      hipSize: "",
      height: "",
      weight: "",
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    const handleShirtChange = (value) => {
      setFormData((prevData) => ({ ...prevData, shirtSize: value }));
    };
  
    const handleHipSizeChange = (value) => {
      setFormData((prevData) => ({ ...prevData, hipSize: value }));
    };
  
    // stepper
    const handleNext = () => {
      setActiveStep((cur) => cur + 1);
    };
  
    const handlePrev = () => {
      setActiveStep((cur) => cur - 1);
    };
  
    // password toggle
    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };
  
    // signup account
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await userAPI.signupUser(formData);

        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/");
        } 
      } catch (error) {
        console.error("Error signing up: ", error);
        toast.error(error.response.data.message);
      }
    };
  
    return (
      <>
        <div className="grid grid-cols-12 gap-6 md:gap-0 h-screen bg-gray-100">
          {/* Left Grid - Image Banner */}
          <div className="col-span-12 md:col-span-7 flex items-center justify-center h-full bg-gray-900">
            {/* <img
            className="object-cover w-full h-full"
            src="your-banner-image.jpg"
            alt="Banner"
          /> */}
  
            <div className="mt-4 text-center text-white font-normal">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="46"
                viewBox="0 0 40 46"
                fill="none"
              >
                <g clipPath="url(#clip0_1198_21)">
                  <path
                    d="M39.998 23.5311C39.9246 20.7115 37.7137 18.7227 35.3977 19.1871C35.2446 19.2178 35.1029 19.2517 34.9716 19.2893C34.3478 17.862 33.6641 16.4459 32.7552 15.2429C31.6549 13.7869 30.2676 12.2659 28.8132 11.3051C27.5281 10.456 26.1085 9.90342 24.6621 9.53084C23.3396 9.18988 21.9431 9.35843 20.6506 9.2445C19.917 9.17982 19.14 9.28727 18.4906 8.8898C17.9449 8.55585 17.8607 8.33537 18.3574 7.03516C17.4489 7.75597 17.0478 8.298 16.8482 9.11863C16.78 9.39895 16.4256 8.23601 16.7737 7.42481C16.0395 7.84312 15.7143 8.95637 15.5938 8.96985C15.3294 8.99995 15.1958 7.95552 15.156 7.27567C14.6 7.93332 14.4791 9.31332 14.4791 9.31332C14.3419 9.37352 13.8445 7.90323 14.1207 7.18403C13.3106 7.78823 13.5767 9.37657 13.3143 9.53075C13.004 9.71313 13.1259 8.0423 11.1986 7.32122V7.3214C11.9541 8.44112 12.0939 8.89627 11.5924 9.66902C11.4877 9.83046 11.3815 9.99057 11.2737 10.1493C10.3779 11.4673 9.124 12.5436 8.18775 13.8239C7.27525 15.0722 6.38588 16.3686 5.719 17.8076C5.49209 18.297 5.28441 18.7978 5.09658 19.3086C4.93328 19.2607 4.76841 19.2202 4.60236 19.1871C2.28635 18.7227 0.0754859 20.7115 0.00204843 23.531C-0.0684984 26.2405 1.69111 28.3279 4.04885 28.1499C4.19369 29.5654 4.53049 31.2077 5.08189 32.4145C5.70728 33.7834 6.54166 34.7895 7.59033 35.7571C8.27596 36.3897 9.07572 36.8695 9.89971 37.2224C11.5781 37.9413 13.4228 38.1653 15.1956 38.4586C17.0798 38.7704 18.9859 38.9874 20.8895 38.9622C22.6233 38.9395 24.3565 38.7027 26.0657 38.3669C27.5603 38.0734 28.906 37.806 30.2864 37.0848C31.4399 36.4823 32.4638 35.6505 33.3523 34.6122C34.3441 33.4536 35.2885 32.2981 35.8608 30.8116C36.1835 29.973 36.386 29.0656 36.4858 28.1511C38.5696 28.0015 40.0631 26.0314 39.998 23.5311ZM4.36721 21.8653C4.1201 23.1644 3.95424 24.6181 3.94588 25.8994C3.68338 26.0394 3.41986 26.0782 3.204 25.9664C2.44252 25.5722 1.89408 24.8443 2.0522 23.7061C2.21056 22.5678 2.74322 22.0517 3.55197 21.8118C3.874 21.7163 4.14455 21.748 4.36721 21.8653ZM32.9222 28.4753C32.8394 29.3812 32.7111 30.3142 32.3591 31.1303C31.876 32.2506 31.0986 33.1735 30.2641 33.9756C29.4422 34.7653 28.4483 35.3144 27.4485 35.7563C26.2246 36.2972 25.0186 36.5707 23.7188 36.7694C22.0342 37.027 20.3196 37.0786 18.6228 36.9636C17.0024 36.8538 15.3631 36.6587 13.8082 36.1218C12.6499 35.722 11.532 35.237 10.5538 34.4193C9.73744 33.7369 8.95385 32.8961 8.45885 31.8844C7.84119 30.6221 7.45947 29.1553 7.41713 27.7076C7.36142 25.8097 7.82588 24.0888 8.47885 22.3445C8.95103 21.0825 9.66283 19.9187 10.5059 18.9448C11.2388 18.0985 12.1075 17.2225 13.068 16.7677C14.0113 16.321 15.0614 16.1102 16.0807 16.1524C16.961 16.1886 17.8059 16.4495 18.6229 16.8283C19.1842 17.0889 19.851 17.6403 20.2571 17.9122C20.7613 17.6448 21.2916 16.9861 21.9003 16.7122C22.8963 16.2644 23.9845 16.0111 25.0537 16.0322C25.9574 16.0503 26.8283 16.2606 27.6605 16.6665C28.5398 17.0954 29.2551 17.7527 29.9342 18.5254C30.6504 19.3404 31.173 20.3711 31.6236 21.4072C32.1481 22.6129 32.6255 23.8791 32.8377 25.2049C33.0096 26.2776 33.0213 27.3908 32.9222 28.4752V28.4753ZM37.0363 25.9664C36.8952 26.0394 36.7333 26.046 36.5651 26.0048C36.5432 25.0075 36.4458 23.9887 36.2589 23.073C36.1732 22.654 36.069 22.2403 35.9465 21.8336C36.1549 21.7454 36.4003 21.7263 36.6883 21.8118C37.4971 22.0517 38.0297 22.5678 38.1881 23.7061C38.3462 24.8443 37.7978 25.5722 37.0363 25.9664ZM15.0875 25.0393C15.0875 26.0408 14.3817 26.8525 13.5108 26.8525C12.64 26.8525 11.9341 26.0408 11.9341 25.0393C11.9341 24.0378 12.64 23.2261 13.5108 23.2261C14.3817 23.2261 15.0875 24.0379 15.0875 25.0393ZM28.6399 25.0393C28.6399 26.0408 27.9339 26.8525 27.0631 26.8525C26.1922 26.8525 25.4864 26.0408 25.4864 25.0393C25.4864 24.0378 26.1923 23.2261 27.0631 23.2261C27.9338 23.2261 28.6398 24.0379 28.6398 25.0393H28.6399ZM19.6123 28.327C19.5245 28.5315 19.1894 28.5595 18.8638 28.3892C18.5383 28.219 18.3452 27.9152 18.433 27.7104C18.5207 27.5058 18.8558 27.4778 19.1814 27.6481C19.507 27.8183 19.7 28.1222 19.6123 28.327ZM21.0344 28.327C21.1221 28.5315 21.4572 28.5595 21.7828 28.3892C22.1085 28.219 22.3014 27.9152 22.2137 27.7104C22.1259 27.5058 21.7909 27.4778 21.4653 27.6481C21.1396 27.8183 20.9466 28.1222 21.0344 28.327ZM16.3797 31.0775C16.4357 31.1005 16.4371 31.2581 16.4517 31.3156C16.4907 31.4687 16.5595 31.5806 16.6705 31.6776C16.9152 31.8916 17.2441 31.9757 17.5399 32.0432C18.221 32.1985 18.9261 32.224 19.6187 32.2212C20.2333 32.2185 20.8475 32.1825 21.4592 32.1134C22.1603 32.0344 22.8842 31.935 23.5521 31.6672C23.7507 31.5876 24.1178 31.4567 24.1459 31.1693C24.1598 31.0276 23.9636 30.6077 24.246 30.8038C24.5594 31.0215 24.5188 31.4753 24.3246 31.768C24.1238 32.0706 23.8053 32.2614 23.5084 32.4114C22.3282 33.008 20.9351 33.1464 19.6571 33.1163C18.8553 33.0974 18.024 33.0056 17.2674 32.6811C16.924 32.5338 16.5495 32.3223 16.338 31.9633C16.237 31.7918 16.062 31.1159 16.3797 31.0775Z"
                    fill="#FFAC7E"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1198_21">
                    <rect width="40" height="46" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span>MAD MONKEYZ</span>
            </div>
          </div>
  
          {/* Right Grid - Login Form */}
  
          <div className="col-span-12 md:col-span-5 flex flex-col justify-center items-center md:p-8">
            <Card color="transparent" shadow={false}>
              <Typography variant="h4" color="blue-gray">
                Sign Up
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Help us to get the tailored experience.
              </Typography>
              <form
                onSubmit={handleSubmit}
                className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
              >
                {activeStep === 0 && (
                  <div className="mb-1 flex flex-col gap-5">
                    <Typography variant="h6" color="blue-gray" className="-mb-5">
                      Full Name
                    </Typography>
                    <Input
                      required
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      autoComplete="name"
                      size="lg"
                      placeholder=""
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-5">
                      Email
                    </Typography>
                    <Input
                      required
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      autoComplete="email"
                      size="lg"
                      placeholder=""
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-5">
                      Mobile Number
                    </Typography>
                    <div className="relative mt-1 flex items-center">
                      <span className="bg-gray-400 rounded-xl mr-1 p-3 text-black">
                        +91
                      </span>
                      <Input
                        required
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        autoComplete="phone"
                        size="lg"
                        placeholder=""
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>
                    <Typography variant="h6" color="blue-gray" className="-mb-5">
                      Password
                    </Typography>
                    <Input
                      required
                      type={showPassword ? "text" : "password"}
                      size="lg"
                      id="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="********"
                      name="password"
                      autoComplete="password"
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900 flex-grow"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      icon={
                        showPassword ? (
                          <VisibilityOffIcon
                            onClick={handleTogglePassword}
                            className="h-6 w-6 text-gray-700"
                          />
                        ) : (
                          <VisibilityIcon
                            onClick={handleTogglePassword}
                            className="h-6 w-6 text-gray-700"
                          />
                        )
                      }
                    />
                    <Button
                      type="submit"
                      onClick={handleNext}
                      className="mt-6"
                      fullWidth
                    >
                      Next
                    </Button>
                  </div>
                )}
  
                {activeStep === 1 && (
                  <div className="mb-1 flex flex-col gap-5">
                    <div className="grid grid-cols-12 gap-6">
                      <div className="col-span-12 md:col-span-6">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 font-medium"
                        >
                          Shirt size <span className="text-red-600">*</span>
                        </Typography>
                        <Select
                          placeholder="Select Size"
                          name="shirtSize"
                          id="shirtSize"
                          autoComplete="off"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                          className="border-t border-blue-gray-200 focus:border-gray-600 focus-visible:border-gray-600 w-full"
                          required
                          value={formData.shirtSize}
                          onChange={(value) => handleShirtChange(value)}
                        >
                          <Option
                            value="S"
                            className="flex items-center gap-2"
                          >
                            S - <span className="ml-auto">36</span>
                          </Option>
                          <Option
                            value="M"
                            className="flex items-center gap-2"
                          >
                            M - <span className="ml-auto">38</span>
                          </Option>
                          <Option value="L" className="flex items-center gap-2">
                            L - <span className="ml-auto">40</span>
                          </Option>
                          <Option value="XL" className="flex items-center gap-2">
                            XL - <span className="ml-auto">42</span>
                          </Option>
                          <Option value="2XL" className="flex items-center gap-2">
                            2XL - <span className="ml-auto">44</span>
                          </Option>
                          <Option value="3XL" className="flex items-center gap-2">
                            3XL - <span className="ml-auto">46</span>
                          </Option>
                        </Select>
                      </div>
                      <div className="col-span-12 md:col-span-6">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 font-medium"
                        >
                          Hip size <span className="text-red-600">*</span>
                        </Typography>
                        <Select
                          required
                          placeholder="Select Size"
                          name="hipSize"
                          id="hipSize"
                          autoComplete="off"
                          value={formData.hipSize}
                          onChange={(value) => handleHipSizeChange(value)}
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                          className="border-t border-blue-gray-200 focus:border-gray-600 focus-visible:border-gray-600 w-full"
                        >
                          <Option value={"S"} className="flex items-center gap-2">
                            S - <span className="ml-auto">30</span>
                          </Option>
                          <Option value={"M"} className="flex items-center gap-2">
                            M - <span className="ml-auto">32</span>
                          </Option>
                          <Option value={"L"} className="flex items-center gap-2">
                            L - <span className="ml-auto">34</span>
                          </Option>
                          <Option
                            value={"XL"}
                            className="flex items-center gap-2"
                          >
                            XL - <span className="ml-auto">36</span>
                          </Option>
                          <Option className="flex items-center gap-2">
                            2XL - <span className="ml-auto">38</span>
                          </Option>
                          <Option className="flex items-center gap-2">
                            3XL - <span className="ml-auto">40</span>
                          </Option>
                        </Select>
                      </div>
                    </div>
  
                    <Typography variant="h6" color="blue-gray" className="-mb-5">
                      Height
                    </Typography>
                    <div className="relative mt-1">
                      <Input
                        type="number"
                        id="height"
                        name="height"
                        value={formData.height}
                        onChange={handleInputChange}
                        autoComplete="height"
                        size="lg"
                        placeholder="Enter height in cm"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                      <span className="bg-gray-400 rounded absolute inset-y-1 right-1 flex items-center p-3 text-black">
                        cm
                      </span>
                    </div>
                    <Typography variant="h6" color="blue-gray" className="-mb-5">
                      Weight
                    </Typography>
                    <div className="relative">
                      <Input
                        type="number"
                        id="weight"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        autoComplete="weight"
                        size="lg"
                        placeholder="Enter weight in kg"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                      <span className="bg-gray-400 rounded absolute inset-y-1 right-1 flex items-center p-3 text-black">
                        kg
                      </span>
                    </div>
  
                    <div>
                      <div className="flex justify-center text-center mt-2">
                        <Button
                          variant="text"
                          className="underline"
                          onClick={handlePrev}
                        >
                          Back
                        </Button>
                      </div>
  
                      <Button type="submit" className="mt-6" fullWidth>
                        sign up
                      </Button>
                    </div>
                  </div>
                )}
  
                <Typography color="gray" className="mt-4 text-center font-normal">
                  Already have an account?{" "}
                  <Link to="/" className="font-medium text-gray-900">
                    Sign in
                  </Link>
                </Typography>
              </form>
            </Card>
          </div>
        </div>
      </>
    );
  };
  
  export default SignUp;