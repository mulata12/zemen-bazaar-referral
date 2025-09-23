import "./globals.css";
import Navbar from "../components/navbar";

export const metadata = {
  title: "Zemen Bazaar Referral MVP",
  description: "Referral microservice MVP for User, Seller, Agent, Admin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        {/* Navbar with role-based Admin link */}
        <Navbar />

        {/* Main content */}
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}





