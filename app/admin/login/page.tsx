'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    // Validate credentials
    if (email !== "solomon123@gmail.com" || password !== "123") {
      setError('Invalid email or password. ');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('Login successful, redirecting to dashboard...');
      
      // Store login state in localStorage
      localStorage.setItem('adminLoggedIn', 'true');
      localStorage.setItem('adminEmail', email);
      
      // Redirect to dashboard
      router.push('/admin/dashboard');
      
    } catch (error) {
      console.error("Login error:", error);
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Back to Homepage Button - Top Left */}
      <button 
        onClick={() => router.push('/')}
        className="absolute top-4 left-4 z-10 flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium bg-white bg-opacity-90 px-4 py-2 rounded-lg shadow-md transition-colors"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Homepage
      </button>

      {/* Left side with image - covers full height */}
      <div className="hidden md:flex w-1/2 bg-gray-100 relative">
        <img 
          src="/image1.jpg" 
          alt="Admin Portal Visual" 
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            // Fallback if image fails to load
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* Overlay with branding */}
        <div className="absolute inset-0 bg-blue-900 bg-opacity-70 flex items-center justify-center">
          <div className="text-white text-center max-w-md px-8">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">ZB</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Zemen Bazaar</h1>
            <p className="text-xl mb-2">Admin Portal</p>
            <p className="text-blue-100 text-lg">Referral Program Management System</p>
            <div className="mt-6 p-4 bg-white bg-opacity-10 rounded-lg">
              <p className="text-sm">Manage referrals, monitor performance, and configure rewards</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side with login form */}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="Enter password"
                required
              />
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
          <div className="mt-8 text-center md:hidden">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">ZB</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Zemen Bazaar</h2>
            <p className="text-gray-600">Admin Portal</p>
          </div>
        </div>
      </div>
    </div>
  );
}