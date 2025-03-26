import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Footer from "../../shared/Footer";
import InputField from "../../shared/InputField";
import axios from "axios";
import USER_API_END_POINT from "../../utils/a";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";

export default function SignIn() {
  const [input, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading } = useSelector((store) => store.auth); // Currently unused, consider using it or remove this line
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) =>
    setFormData({ ...input, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      console.log("Form submitted:", input);

      const res = await axios.post(`${USER_API_END_POINT}/signin`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        // Add a slight delay to show the loading state
        dispatch(setUser(res.data.user));

        // Redirect based on user role
        if (res.data.user.role === "customer") {
          navigate("/ManageJobs"); // Redirect to customer-specific page
        } else if (res.data.user.role === "serviceProvider") {
          navigate("/home"); // Redirect to service provider-specific page
        }

        dispatch(setLoading(false));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      // Ensure loading is turned off in case of an error
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6 py-10">
        <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
          <h1 className="text-2xl font-semibold text-center mb-6">Sign In</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email Input */}
            <InputField
              label="Email ID"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={input.email}
              onChange={handleChange}
            />

            {/* Password Input */}
            <InputField
              label="Password"
              type="password"
              name="password"
              placeholder="At least 6 characters"
              value={input.password}
              onChange={handleChange}
            />

            {/* Role Selector */}
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
                "Sign In"
              )}
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600 mt-2">
              Don't have an account?
              <Link
                to="/signup"
                className="text-purple-700 font-semibold ml-1 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
