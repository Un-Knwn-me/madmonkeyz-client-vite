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
        } else {
          toast.warning(response.data.message);
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
              <img 
                src={URL("../assets/EPlogo.png")}
                alt="EP"
              />
              <span>Emperor Polo</span>
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