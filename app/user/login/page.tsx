"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function UserRegistration() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rCodeFromUrl = searchParams.get("rCode") || "";
<<<<<<< HEAD
=======

>>>>>>> c452477c4a5889fcaa40f47956fd6a34df2bec77
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    referralCode: rCodeFromUrl, // initialize from URL
    acceptTerms: false
  });
  const [errors, setErrors] = useState({ phoneNumber: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showReferralCode, setShowReferralCode] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (name === "phoneNumber") {
      const numericValue = value.replace(/\D/g, "").slice(0, 9);
      setFormData(prev => ({ ...prev, [name]: numericValue }));
      if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: "" });
    } else if (name === "referralCode") {
      // update actual value without masking
      setFormData(prev => ({ ...prev, referralCode: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }
  };
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);
  const toggleReferralCodeVisibility = () => setShowReferralCode(!showReferralCode);
  const maskReferralCode = (code: string) => {
    if (showReferralCode || !code) return code || "";
    if (code.length <= 5) return code;
    return code.substring(0, 5) + "*".repeat(code.length - 5);
  };
  const displayedReferralCode = maskReferralCode(formData.referralCode);
  const validatePhoneNumber = (phone: string) => {
    if (phone.length !== 9) return "Phone number must have exactly 9 digits";
    if (!phone.startsWith("9")) return "Phone number must start with 9";
    return "";
  };
  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  const phoneError = validatePhoneNumber(formData.phoneNumber);
  if (phoneError) {
    setErrors({ phoneNumber: phoneError });
    return;
  }
  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }
  if (!formData.acceptTerms) {
    alert("You must accept the terms and conditions");
    return;
  }
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

  try {
    const queryParam = formData.referralCode ? `?rCode=${formData.referralCode}` : '';
    const res = await fetch(`${BACKEND_URL}/auth/user/register${queryParam}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Fname: formData.firstName,
        Lname: formData.lastName,
        phone: "+251" + formData.phoneNumber,
        password: formData.password,
        cpassword: formData.confirmPassword,
        email: null,
        role: null,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Registration failed");
    alert("User registered successfully!");
    setFormData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      referralCode: "",
      acceptTerms: false
    });
    setErrors({ phoneNumber: "" });
    router.push("/user/signup");
  } catch (error: any) {
    console.error("Registration error:", error);
    alert(" " + error.message);
  }
};
  return (
    <div className="min-h-screen flex bg-white">
      <button 
        onClick={() => router.push('/')}
        className="absolute top-4 left-4 z-10 flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium bg-white bg-opacity-90 px-4 py-2 rounded-lg shadow-md transition-colors"
      >
        Back to Homepage
      </button>
<<<<<<< HEAD
      <div className="hidden md:flex w-1/2 bg-gray-100 relative">
        <img src="/image1.jpg" alt="Registration Visual" className="absolute inset-0 w-full h-full object-cover" />
      </div>
=======

      <div className="hidden md:flex w-1/2 bg-gray-100 relative">
        <img src="/image1.jpg" alt="Registration Visual" className="absolute inset-0 w-full h-full object-cover" />
      </div>

>>>>>>> c452477c4a5889fcaa40f47956fd6a34df2bec77
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-blue-800">Create User Account</h1>
            <p className="text-gray-600 mt-2">Join us today and enjoy our services</p>
          </div>
<<<<<<< HEAD
=======

>>>>>>> c452477c4a5889fcaa40f47956fd6a34df2bec77
          <form className="space-y-4" onSubmit={handleRegister}>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input type="text" name="firstName" placeholder="Enter your first name" value={formData.firstName} onChange={handleChange} className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900" required />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input type="text" name="lastName" placeholder="Enter your last name" value={formData.lastName} onChange={handleChange} className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <div className="flex">
                <div className="border border-gray-300 border-r-0 rounded-l-md px-3 py-2 bg-gray-100 flex items-center text-gray-700">+251</div>
                <input type="tel" name="phoneNumber" placeholder="Enter your 9 digit phone number" value={formData.phoneNumber} onChange={handleChange} className="w-full border border-gray-300 px-3 py-2 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900" required />
              </div>
              {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
            </div>
            {/* Password Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} name="password" placeholder="Create a password" value={formData.password} onChange={handleChange} className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 pr-10" required />
                <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none">
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 pr-10" required />
                <button type="button" onClick={toggleConfirmPasswordVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none">
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            {/* Referral Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Referral Code (Optional)</label>
              <div className="relative">
                <input type="text" name="referralCode" placeholder="Enter referral code if you have one" value={displayedReferralCode} onChange={handleChange} className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 pr-10" />
                {formData.referralCode && (
                  <button type="button" onClick={toggleReferralCodeVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none">
                    {showReferralCode ? "Hide" : "Show"}
                  </button>
                )}
              </div>
            </div>
            <div className="flex items-start">
              <input type="checkbox" id="acceptTerms" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} className="h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-700">I accept the terms and conditions of Zemen Bazaar</label>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium transition-colors duration-200">Register</button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="#" className="text-blue-600 hover:text-blue-500 font-medium" onClick={(e) => { e.preventDefault(); router.push("/user/signup"); }}>Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
}
