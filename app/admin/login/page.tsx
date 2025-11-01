'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:4000/auth/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        const errData = await response.json();
        setError(errData.message || "Login failed");
        return;
      }
      const data = await response.json();
     if (!data?.token || !data?.user) {
        setError("Invalid server response");
        return;
      }
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminEmail", data.user.email);
      localStorage.setItem("adminRole", data.user.role);
      console.log("Login successful:", data);
      router.push("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError("Unable to reach server. Try again later.");
    } 
   finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex bg-white">
      {/* Back to Homepage Button */}
      <button
        onClick={() => router.push('/')}
        className="absolute top-4 left-4 z-10 flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium bg-white bg-opacity-90 px-4 py-2 rounded-lg shadow-md transition-colors"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Homepage
      </button>
      {/* Left side */}
      <div className="hidden md:flex w-1/2 bg-gray-100 relative">
        <img src="/image1.jpg" alt="Admin Portal Visual" className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        <div className="absolute inset-0 bg-blue-900 bg-opacity-70 flex items-center justify-center">
          <div className="text-white text-center max-w-md px-8">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-1xl font-bold text-black">zemen bazaar</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Zemen Bazaar</h1>
            <p className="text-xl mb-2">Admin Portal</p>
            <p className="text-blue-100 text-lg">Referral Program Management System</p>
            <div className="mt-6 p-4 bg-white bg-opacity-10 rounded-lg">
              <p className="text-sm text-black">Manage referrals, monitor performance, and configure rewards</p>
            </div>
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-blue-800">Admin Login</h1>
            <p className="text-gray-600 mt-2">Access the referral program management system</p>
          </div>
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm text-center">{error}</p>
            </div>
          )}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 pr-10"
                  placeholder="Enter password"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </>
              ) : (
                "Sign in to Admin Dashboard"
              )}
            </button>
          </form>
          {/* Mobile branding */}          
          <div className="mt-8 block lg:hidden">
            <p className="text-center text-sm text-gray-600">
              &copy; {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
