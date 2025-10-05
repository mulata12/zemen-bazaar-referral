import "./globals.css";
import Navbar from "../components/navbar";

export const metadata = {
  title: "Zemen Bazaar Referral MVP",
  description: "Referral microservice MVP for ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        {/* Navbar with higher z-index */}
        <div className="relative z-50">
          <Navbar />
        </div>

        {/* Main content with lower z-index */}
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}









