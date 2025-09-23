"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserRegistration() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
    acceptTerms: false
  });

  const [errors, setErrors] = useState({
    phoneNumber: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    // Clear error when user starts typing
    if (name === "phoneNumber" && errors.phoneNumber) {
      setErrors({ ...errors, phoneNumber: "" });
    }
    
    // For phone number, only allow numbers
    if (name === "phoneNumber") {
      // Remove any non-digit characters
      const numericValue = value.replace(/\D/g, '');
      // Limit to 9 digits
      const limitedValue = numericValue.slice(0, 9);
      
      setFormData(prev => ({
        ...prev,
        [name]: limitedValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
      }));
    }
  };

  const validatePhoneNumber = (phone: string) => {
    // Ethiopian phone numbers should start with 9 and have 9 digits total
    if (phone.length !== 9) {
      return "Phone number must have exactly 9 digits";
    }
    
    if (!phone.startsWith('9')) {
      return "Phone number must start with 9";
    }
    
    return "";
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone number
    const phoneError = validatePhoneNumber(formData.phoneNumber);
    if (phoneError) {
      setErrors({ phoneNumber: phoneError });
      return;
    }
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    // Validate terms accepted
    if (!formData.acceptTerms) {
      alert("You must accept the terms and conditions");
      return;
    }

    // Registration logic would go here
    console.log("Registration data:", formData);
    
    // After successful registration, set role and redirect
    await fetch("/api/auth/role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: "user" }),
    });

    router.push("/user/dashboard");
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left side with image - covers full height */}
      <div className="hidden md:flex w-1/2 bg-gray-100 relative">
        <img 
          src="/image1.jpg" 
          alt="Registration Visual" 
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            // Fallback if image fails to load
            const target = e.target as HTMLImageElement;
            target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='400' viewBox='0 0 500 400'%3E%3Crect width='500' height='400' fill='%23E5E7EB'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%236B7280'%3EImage Preview%3C/text%3E%3C/svg%3E";
          }}
        />
      </div>

      {/* Right side with form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-blue-800">Create User Account</h1>
            <p className="text-gray-600 mt-2">Join us today and enjoy our services</p>
          </div>
          
          <form className="space-y-4" onSubmit={handleRegister}>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <div className="flex">
                <div className="border border-gray-300 border-r-0 rounded-l-md px-3 py-2 bg-gray-100 flex items-center text-gray-700">
                  +251
                </div>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="946901117"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-2 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  required
                />
              </div>
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">Enter your 9-digit phone number (e.g., 946901117)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Referral Code (Optional)</label>
              <input
                type="text"
                name="referralCode"
                placeholder="Enter referral code if you have one"
                value={formData.referralCode}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              />
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-700">
                I accept the terms and conditions of Zemen Bazaar
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium transition-colors duration-200"
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a 
              href="#" 
              className="text-blue-600 hover:text-blue-500 font-medium"
              onClick={(e) => {
                e.preventDefault();
                router.push("/user/signup");
              }}
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}