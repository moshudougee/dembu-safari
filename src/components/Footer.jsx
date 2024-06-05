import { Contact, Gem, HandCoins, Home, Layers, LayoutList, Palmtree, PawPrint, ShieldCheck, SquareActivity } from 'lucide-react'
import { FaBlog, FaFacebook, FaSquareInstagram, FaTwitter } from "react-icons/fa6"
import { FcAbout } from "react-icons/fc"
import { BiSolidContact } from "react-icons/bi"
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <div className="footer">
        <div className='footer-main'>
          <div className='footer-item'>
            <Link href='#' className='footer-link'>
              <Home size={16} />
              <span>Home</span>
            </Link>
            <Link href='#' className='footer-link'>
              <Layers size={16} />
              <span>Categories</span>
            </Link>
            <Link href='#' className='footer-link'>
              <Palmtree size={16} />
              <span>Counties</span>
            </Link>
            <Link href='#' className='footer-link'>
              <Gem size={16} />
              <span>Popular</span>
            </Link>
          </div>
          <div className='footer-item'>
            <Link href='#' className='footer-link'>
              <FaBlog size={16} />
              <span>Blog</span>
            </Link>
            <Link href='#' className='footer-link'>
              <FcAbout size={16} />
              <span>About</span>
            </Link>
            <Link href='#' className='footer-link'>
              <BiSolidContact size={16} />
              <span>Contact</span>
            </Link>
            <Link href='#' className='footer-link'>
              <HandCoins size={16} />
              <span>Pricing</span>
            </Link>
          </div>
          <div className='footer-item'>
            <Link href='#' className='footer-link'>
              <SquareActivity size={16} />
              <span>Credits</span>
            </Link>
            <Link href='#' className='footer-link'>
              <LayoutList size={16} />
              <span>FAQ</span>
            </Link>
            <Link href='#' className='footer-link'>
              <ShieldCheck size={16} />
              <span>Terms</span>
            </Link>
            <Link href='#' className='footer-link'>
              <ShieldCheck size={16} />
              <span>Privacy</span>
            </Link>
          </div>
          <div className='footer-item'>
            <span className='px-4 font-semibold text-safari-2'>Socials</span>
            <Link href='#' className='footer-link'>
              <FaFacebook className=' text-blue-900' size={16} />
              <span>Facebook</span>
            </Link>
            <Link href='#' className='footer-link'>
              <FaTwitter className='text-blue-700' size={16} />
              <span>Twitter</span>
            </Link>
            <Link href='#' className='footer-link'>
              <FaSquareInstagram className=' text-red-600' size={16} />
              <span>Instagram</span>
            </Link>
          </div>
        </div>
        <div className='flex w-full justify-center items-center'>
          <span className='footer-copyright'>Copyright ©{year} Dembu Safari. All rights reserved</span>
        </div>
    </div>
  )
}

export default Footer