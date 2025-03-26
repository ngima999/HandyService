import React, { useState } from "react";
import Nav from "./Nav";
import Footer from "../../shared/Footer";
import { Upload } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../shared/InputField";
import axios from "axios";
import { toast } from "react-toastify";
import USER_API_END_POINT from "../../utils/a";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";

export default function SignUp() {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const { loading } = useSelector((store) => store.auth); // Currently unused, consider using it or remove this line
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      console.log(
        "FormData being sent:",
        Object.fromEntries(formData.entries())
      );
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },

        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/signin");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error: ", error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Nav />
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100 px-6 py-10 overflow-hidden">
        <div className="w-full max-w-xl p-6 bg-white shadow-xl rounded-2xl overflow-hidden">
          <h1 className="text-2xl font-medium text-gray-900 text-center mb-9">
            Sign Up
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Full Name"
                type="text"
                name="fullName"
                placeholder="Enter your name"
                value={input.fullName}
                onChange={handleChange}
              />
              <InputField
                label="Email ID"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={input.email}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Password"
                type="password"
                name="password"
                placeholder="At least 6 characters"
                value={input.password}
                onChange={handleChange}
              />
              <InputField
                label="Mobile Number"
                type="tel"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={input.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-800 text-sm font-semibold mb-2">
                Select Role <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="customer"
                    checked={input.role === "customer"}
                    onChange={handleChange}
                    className="form-radio text-indigo-500"
                  />
                  <span>Customer</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="serviceProvider"
                    checked={input.role === "serviceProvider"}
                    onChange={handleChange}
                    className="form-radio text-indigo-500"
                  />
                  <span>Service Provider</span>
                </label>
              </div>
            </div>
            <div className="w-80">
              <label className="block text-gray-800 text-sm font-semibold mb-2">
                Upload Profile Picture
              </label>
              <div className="relative flex items-center justify-center w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 hover:border-indigo-500 transition duration-200 shadow-sm cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex items-center space-x-2 text-gray-700">
                  <Upload className="w-5 h-5 text-indigo-500" />
                  <span className="text-sm font-medium">
                    {input.file ? input.file.name : "Click to upload"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 mt-4">
              <button
                type="submit"
                className="w-30 bg-purple-700 text-white py-3 rounded-lg text-sm font-semibold hover:bg-purple-800 transition-all shadow-md flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
              <p className="text-1 text-gray-600 ml-7">
                Already Have an Account?
                <Link
                  to="/signin"
                  className="text-[#6300B3] hover:text-[#450080] font-semibold ml-1"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
