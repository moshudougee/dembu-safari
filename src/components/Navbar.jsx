'use client';
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import Logo from '../images/logo1.png';
import { Loader2, LogIn, LogOut, Settings, UserCog, UserPlus } from 'lucide-react';
import { Input } from './ui/input';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { navLinks } from '@/constants/navLinks';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { logout } from '@/lib/server/userActions';
import { useGlobalContext } from '@/context/GlobalProvider';



const Navbar = () => {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const {user, setUser, loggedIn, setLoggedIn, loading, updatePath} = useGlobalContext()
    const pathname = usePathname();
    const router = useRouter()

    useEffect(() => {
      if (pathname !== '/login' && pathname !== '/register' && pathname !== '/forgot' && pathname !== '/forgot/reset'){
        updatePath(pathname)
      }
    }, [pathname])
    
    
    const handleLogout = async () => {
      const response = await logout()
      if (response) {
        setUser(null)
        setLoggedIn(false)
      }
      //if (user === null && !loggedIn) router.push(pathname)
    }
    
    //console.log(pathname)
  return (
    <div>
      <div className="nav">
        <div className="nav-items">
          <Link href='/'>
            <div className="nav-logo">
              <div className="nav-logo-image">
                <Image src={Logo} alt="Logo" className='rounded-lg' priority/>
              </div>
              <span className="nav-logo-text">Dembu Safari</span>
            </div>
          </Link>
          
          <div className="nav-mobile">
            <div className=''>
                <button type="button" 
                className="nav-mobile-search"
                onClick={() => setMobileNavOpen(prev => !prev)}
                >
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                <span className="sr-only">Search</span>
                </button>
                <button type="button" 
                className="nav-mobile-menu-icon"
                onClick={() => setMobileNavOpen(prev => !prev)}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
            </div>
            
          </div>
          {mobileNavOpen && (
            <div className='md:hidden bg-white pb-4'>
                <div className="relative mx-1 mt-3 md:hidden" onClick={() => setMobileNavOpen(false)}>
                <div className="mobile-search-icon">
                    <svg className="w-4 h-4 text-success-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <Input type="text" className="mobile-search-input" placeholder="Search..." />
                </div>
                <ul className="mobile-menu-list"
                    onClick={() => setMobileNavOpen(false)}
                >
                  {navLinks.map((link, index) => {
                    let active = false;
                    if (index === 0) {
                      active = true;
                    }
                    return (
                      <li key={index}>
                        <a href={link.href} className={`${active ? "mobile-menu-list-active" : "mobile-menu-list-item"}`}>
                          {link.icon}
                          <span className='mobile-menu-text'>{link.title}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
                {loading ? (
                  <div className='nav-loading'>&nbsp; Loading...</div>
                )
                : loggedIn && user ? (
                  <div className='flex gap-1 text-safari-2 justify-start items-center bg-white mx-2'>
                    <div className='relative h-[60px] w-[60px] rounded-full'>
                      <Image src={user?.avatar} fill sizes='100' alt='Profile' className='rounded-full object-cover' />
                    </div>
                    <div>
                    <Menubar className="mobile-menubar">
                    <MenubarMenu>
                      <MenubarTrigger 
                        className="focus:text-safari-1 data-[state=open]:text-safari-1">
                        <span className="mobile-menu-text">{user?.firstName}</span>
                      </MenubarTrigger>
                      <MenubarContent className="text-safari-2" onClick={() => setMobileNavOpen(false)}>
                      <MenubarLabel className="flex gap-2 justify-center items-center">
                          <div className='flex justify-center items-center rounded-lg bg-safari-4 w-20 h-20'>
                            <span className='text-6xl text-success-1'>D</span>
                          </div>
                          <div className='flex flex-col'>
                            <span className='text-xl'>{`${user.firstName} ${user.lastName}`}</span>
                            <span className='text-sm font-normal'>{user?.email}</span>
                          </div>
                      </MenubarLabel>
                      <MenubarSeparator />
                      {user?.role === 'ADMIN' && 
                        <>
                        <MenubarItem>
                          <Link href='/admin' className='menubar-item'>
                            <Settings />
                            <span className="menubar-text">Admin Panel</span>
                          </Link>
                        </MenubarItem >
                        <MenubarSeparator />
                        </>
                      }
                        <MenubarItem>
                          <Link href='/profile' className='menubar-item'>
                            <UserCog />
                            <span className="menubar-text">Profile</span>
                          </Link>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>
                          <div className='menubar-item' onClick={handleLogout}>
                            <LogOut />
                            <span className="menubar-text">Logout</span>
                          </div>
                        </MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className='flex gap-1 justify-start ps-4 ms-3 text-success-1 bg-white'>
                      <Link href='/login' className='flex gap-1'>
                        <LogIn />
                        <span className='mobile-menu-text'>Login</span>
                      </Link>
                    </div>
                    |
                    <div className='flex gap-1 justify-start ps-4 ms-3 text-success-1 bg-white'>
                      <Link href='/register' className='flex gap-1'>
                        <UserPlus />
                        <span className='mobile-menu-text'>Register</span>
                      </Link>
                    </div>
                  </>
                )}
                
            </div>
            )}
          <div className="navbar" id="navbar-search">
            <ul className="navbar-list">
              {navLinks.map((link, index) => {
                let active = false
                if (pathname === link.href) {
                  active = true;
                }
                return (
                  <li key={index}>
                    <Link
                      href={link.href} 
                      className={`${active ? 'navbar-menu-active' : 'navbar-menu'}`}
                    >
                      <div className='navbar-menu-icon'>
                        {link.icon}
                      </div>
                      <span className='navbar-menu-text'>{link.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="navbar-search">
              <div className="navbar-search-icon">
                <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              {/**<input type="text" id="search-navbar" className="navbar-search-input" placeholder="Search..."/>*/}
              <Input type="text" className="navbar-search-input" placeholder="Search..."/>
            </div>
            {loading ? (
              <div className='nav-loading'>
                <Loader2 className=' animate-spin' />&nbsp;
                Loading...
              </div>
            )
            : loggedIn && user ? (
              <div className='flex flex-row ms-2'>
                <div className='relative rounded-full w-[60px] h-[60px] border-2 border-safari-2'>
                  <Image src={user?.avatar} fill sizes='100' alt='Profile' className='rounded-full object-cover' />
                </div>
                <div className='flex items-center ms-2'>
                  {/**<span className=' text-safari-2 text-xl font-semibold'>Denis</span>*/}
                  <Menubar className="menubar">
                    <MenubarMenu>
                      <MenubarTrigger 
                        className="focus:text-success-1 cursor-pointer">
                        <span className="navbar-menu-text">{user?.firstName}</span>
                      </MenubarTrigger>
                      <MenubarContent className="text-safari-2">
                        <MenubarLabel className="flex gap-2 justify-center items-center">
                          <div className='flex justify-center items-center rounded-lg bg-safari-4 w-20 h-20'>
                            <span className='text-6xl text-success-1'>{user?.firstName[0]}</span>
                          </div>
                          <div className='flex flex-col'>
                            <span className='text-xl'>{`${user.firstName} ${user.lastName}`}</span>
                            <span className='text-sm font-normal'>{user?.email}</span>
                          </div>
                        </MenubarLabel>
                        <MenubarSeparator />
                        {user?.role === 'ADMIN' &&
                        <> 
                        <MenubarItem>
                          <Link href='/admin' className='menubar-item'>
                            <Settings />
                            <span className="menubar-text">Admin Panel</span>
                          </Link>
                        </MenubarItem >
                        <MenubarSeparator />
                        </>
                        }
                        <MenubarItem>
                          <Link href='/profile' className='menubar-item'>
                            <UserCog />
                            <span className="menubar-text">Profile</span>
                          </Link>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>
                          <div className='menubar-item' onClick={handleLogout}>
                            <LogOut />
                            <span className="menubar-text">Logout</span>
                          </div>
                        </MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>

                </div>
              </div>
            ) : (
              <>
              <div className='navbar-menu mx-2 cursor-pointer'>
                <Link href='/login' className='flex gap-1'>
                <LogIn />
                <span className='navbar-menu-text'>Login</span>
                </Link>
              </div>
              |
              <div className='navbar-menu mx-2 cursor-pointer'>
                <Link href='/register' className='flex gap-1'>
                <UserPlus />
                <span className='navbar-menu-text'>Register</span>
                </Link>
              </div>
              </>
            )}
            

          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
