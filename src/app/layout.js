export const dynamic = 'force-dynamic'
import { Inter, Lobster, Pinyon_Script } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Adbar from "@/components/Adbar";
import GlobalProvider from "@/context/GlobalProvider";
import { Toaster } from "react-hot-toast";


const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const lobster = Lobster({ 
  subsets: ["latin"] ,
  weight: '400', 
  variable: '--font-lobster' 
});
const pinyon = Pinyon_Script({ 
  subsets: ["latin"],
  weight: '400', 
  variable: '--font-pinyon-script' 
});

export const metadata = {
  title: "Dembu Safari",
  description: "The Home of Kenyan tourist attractions and destinations in all 47 counties",
};
 
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true} className="scroll-smooth">
      <body className={`${inter.variable} ${pinyon.variable} ${lobster.variable}`}>
        <GlobalProvider>
          <Toaster />
          <Navbar />
          <div className="flex mt-20 mx-8">
            <div className="sidebar">
              <Sidebar />
            </div>
            <div className="flex flex-col border-safari-2 rounded w-full xl:min-w-[1000px] mx-[180px]">
              {children}
            </div>
            <div className="fixed flex right-0 border-safari-2 rounded w-[210px]">
              <Adbar />
            </div>
          </div>
          <div className="flex mx-[212px] mt-4 border rounded">
              <Footer />
          </div>
        </GlobalProvider>
      </body>
    </html>
  );
}
