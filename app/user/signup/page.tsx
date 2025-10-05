"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserSignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
    rememberMe: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    // For phone number, only allow numbers and limit to 9 digits
    if (name === "phoneNumber") {
      const numericValue = value.replace(/\D/g, '');
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
 
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate phone number has exactly 9 digits
    if (formData.phoneNumber.length !== 9) {
      alert("Phone number must be 9 digits (e.g., 946901117)");
      return;
    }

    // Sign in logic would go here
    console.log("Sign in data:", formData);
    
    // Set role as "user"
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
      <button 
        onClick={() => router.push('/')}
        className="absolute top-4 left-4 z-10 flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium bg-white bg-opacity-90 px-4 py-2 rounded-lg shadow-md transition-colors"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Homepage
      </button>
      <div className="hidden md:flex w-1/2 bg-gray-100 relative">
        <img 
          src="/image1.jpg" 
          alt="Zemen Bazaar" 
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
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-blue-900 mb-2">One platform</h1>
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Infinite possibilities!</h2>
            <p className="text-gray-600 italic">buy here, sell here at zemen bazaar</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to access your account</p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSignIn}>
            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <div className="flex">
                <div className="border border-gray-300 border-r-0 rounded-l-md px-3 py-2 bg-gray-100 flex items-center text-gray-700">
                  +251
                </div>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder=" "
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="flex-1 border border-gray-300 px-3 py-2 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  required
                  maxLength={9}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">Enter your 9-digit phone number without the country code</p>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                required
              />
            </div>

            {/* Remember me and Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              
              <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>

            {/* Sign In button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium transition-colors duration-200"
            >
              Sign In
            </button>
          </form>

          {/* Sign up link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a 
              href="#" 
              className="text-blue-600 hover:text-blue-500 font-medium"
              onClick={(e) => {
                e.preventDefault();
                router.push("/user/login");
              }}
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}