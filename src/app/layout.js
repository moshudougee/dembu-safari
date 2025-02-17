export const dynamic = 'force-dynamic'
import { Inter, Lobster, Pinyon_Script } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Adbar from "@/components/Adbar";
import GlobalProvider from "@/context/GlobalProvider";
import { Toaster } from "react-hot-toast";
import MobileSidebar from "@/components/MobileSidebar";
import AdSense from "@/components/AdSense";


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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: "Dembu Safari - The Home of Kenyan tourist attractions and destinations in all 47 counties",
    template: '%s | Dembu Safari - The Home of Kenyan tourist attractions and destinations in all 47 counties'
  },
  description: "Whether you're seeking the thrill of a safari adventure, the serenity of pristine beaches, or the cultural richness of historical sites, Dembu Safari is here to help you discover the best that Kenya has to offer.",
  openGraph: {
    title: "Dembu Safari - The Home of Kenyan tourist attractions and destinations in all 47 counties",
    description: "Whether you're seeking the thrill of a safari adventure, the serenity of pristine beaches, or the cultural richness of historical sites, Dembu Safari is here to help you discover the best that Kenya has to offer.",
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Dembu Safari"
  },
};
 
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true} className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
         async 
         src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6856025729636564"
         crossOrigin="anonymous"
         strategy="lazyOnload"
        >
        </script>
      </head>
      <body className={`${inter.variable} ${pinyon.variable} ${lobster.variable}`}>
        <GlobalProvider>
          <Toaster />
          <Navbar />
          <div className="flex justify-center items-start mt-20 mx-8">
            <div className="sidebar">
              <Sidebar />
            </div>
            <div className="fixed left-0 top-48 w-10 z-10 lg:hidden">
              <MobileSidebar />
            </div>
            <div className="content-main">
              {children}
            </div>
            <div className="rightbar">
              <Adbar />
            </div>
          </div>
          <div className="flex lg:mx-[212px] mt-4 shadow rounded">
              <Footer />
          </div>
        </GlobalProvider>
      </body>
    </html>
  );
}
