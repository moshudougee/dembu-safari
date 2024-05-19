import React from 'react'
import { Layers, SlidersHorizontal, HandPlatter, Wallet, ShieldCheck, BarChartHorizontal, Layers3, CopyPlus } from 'lucide-react'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
  } from "@/components/ui/menubar"
import Link from 'next/link'
const AdminRightbar = () => {
  return (
    <div className="min-h-screen">
        <div className='sidebar-header rounded-t-md'>
            <div className='sidebar-header-menu'>
                <SlidersHorizontal />
                <span className='sidebar-menu-text'>Adverts Settings</span>
            </div>
        </div>
        <div className='flex mt-1'>
            <ul className='flex flex-col w-full h-full m-1 p-1'>
                <li className='mt-2'>
                    <div>
                    <Menubar className="sidebar-menubar">
                    <MenubarMenu>
                      <MenubarTrigger className=" focus:bg-transparent data-[state=open]:bg-transparent">
                        <div className='sidebar-menu'>
                            <Layers />
                            <span className='sidebar-menu-text'>Ad Categories</span>
                        </div>
                      </MenubarTrigger>
                      <MenubarContent className="text-safari-2">
                        <MenubarItem>
                            <Link href='/' className='menubar-item'>
                                <Layers3 />
                                <span className="menubar-text">Ad Categories</span>
                            </Link>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>
                            <Link href='/' className='menubar-item'>
                                <CopyPlus />
                                <span className="menubar-text">Add</span>
                            </Link>
                        </MenubarItem>
                        <MenubarSeparator />
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                    </div>
                </li>
                <li className='mt-2'>
                    <div>
                    <Menubar className="sidebar-menubar">
                    <MenubarMenu>
                      <MenubarTrigger className=" focus:bg-transparent data-[state=open]:bg-transparent">
                        <div className='sidebar-menu'>
                            <HandPlatter />
                            <span className='sidebar-menu-text'>Ad Services</span>
                        </div>
                      </MenubarTrigger>
                      <MenubarContent className="text-safari-2">
                        <MenubarItem>
                            <Link href='/' className='menubar-item'>
                                <Layers3 />
                                <span className="menubar-text">Ad Services</span>
                            </Link>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>
                            <Link href='/' className='menubar-item'>
                                <CopyPlus />
                                <span className="menubar-text">Add</span>
                            </Link>
                        </MenubarItem>
                        <MenubarSeparator />
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                    </div>
                </li>
                <li className='mt-2'>
                    <div>
                    <Menubar className="sidebar-menubar">
                    <MenubarMenu>
                      <MenubarTrigger className=" focus:bg-transparent data-[state=open]:bg-transparent">
                        <div className='sidebar-menu'>
                            <Wallet />
                            <span className='sidebar-menu-text'>Ad Packages</span>
                        </div>
                      </MenubarTrigger>
                      <MenubarContent className="text-safari-2">
                        <MenubarItem>
                            <Link href='/' className='menubar-item'>
                                <Layers3 />
                                <span className="menubar-text">Ad Packages</span>
                            </Link>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>
                            <Link href='/' className='menubar-item'>
                                <CopyPlus />
                                <span className="menubar-text">Add</span>
                            </Link>
                        </MenubarItem>
                        <MenubarSeparator />
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                    </div>
                </li>
                <li className='mt-2'>
                    <div>
                    <Menubar className="sidebar-menubar">
                    <MenubarMenu>
                      <MenubarTrigger className=" focus:bg-transparent data-[state=open]:bg-transparent">
                        <div className='sidebar-menu'>
                            <ShieldCheck />
                            <span className='sidebar-menu-text'>Adverts</span>
                        </div>
                      </MenubarTrigger>
                      <MenubarContent className="text-safari-2">
                        <MenubarItem>
                            <Link href='/' className='menubar-item'>
                                <Layers3 />
                                <span className="menubar-text">Adverts</span>
                            </Link>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>
                            <Link href='/' className='menubar-item'>
                                <BarChartHorizontal />
                                <span className="menubar-text">Analysis</span>
                            </Link>
                        </MenubarItem>
                        <MenubarSeparator />
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default AdminRightbar