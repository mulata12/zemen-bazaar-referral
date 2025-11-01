"use client";
import Link from "next/link";
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Zemen Bazaar Referral
          </h1>
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">
              REFERRAL MICROSERVICE
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Invite friends and earn rewards with our powerful referral system
            </p>           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <Link 
                href="/user/login"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium text-center"
              >
                User SignUp
              </Link>
              <Link 
                href="/admin/login"
                className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors text-lg font-medium text-center"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-xl">👥</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">For Users</h3>
            <p className="text-gray-600">
              Invite friends, earn rewards, and track your referrals in real-time
            </p>
          </div>          
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 text-xl">⚙️</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">For Admins</h3>
            <p className="text-gray-600">
              Manage referral programs, monitor fraud, and analyze performance
            </p>
          </div>          
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 text-xl">🚀</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast & Secure</h3>
            <p className="text-gray-600">
              Built with modern technology for the best user experience
            </p>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-black border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-white-600">
            <p>©2024 Zemen Bazaar Referral System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}











