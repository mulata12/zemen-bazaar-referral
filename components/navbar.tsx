"use client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  // If you need the role for something, use it. Otherwise, remove this line.
  // const role = useAuth(); // Remove if unused
  
  const router = useRouter();

  const handleAdminLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Admin Login clicked");
    router.push("/admin/login");
  };

  const handleUserLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("User Login clicked");
    router.push("/user/login");
  };

  const handleHome = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Home clicked");
    router.push("/");
  };

  return (
    <header className="p-6 bg-blue-600 text-white w-full relative z-50">
      <nav className="flex justify-evenly items-center font-semibold w-full">
        <div 
          className="flex items-center space-x-4 min-w-max py-3 px-6 bg-blue-700 rounded-lg shadow-lg cursor-pointer"
          onClick={handleHome}
        >
          {/* Image and text combined in one clickable container */}
          <img 
            src="/image2.jpg" 
            alt="Zemen Bazaar Logo" 
            className="w-12 h-12 rounded-lg object-cover"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.style.display = 'none';
            }}
          />
          <h1 className="font-bold text-3xl tracking-wide">
            Zemen Bazaar Referral
          </h1>
        </div>
        
        <button 
          onClick={handleHome}
          className="text-lg px-4 py-2 hover:bg-blue-700 rounded transition-colors"
        >
          Home
        </button>
        
        <button 
          onClick={handleUserLogin}
          className="text-lg px-4 py-2 hover:bg-blue-700 rounded transition-colors"
        >
          User
        </button>
        
        <button 
          onClick={handleAdminLogin}
          className="text-lg px-4 py-2 hover:bg-blue-700 rounded transition-colors"
        >
          Admin Login
        </button>
      </nav>
    </header>
  );
}