import { Settings2, Contact, Landmark, Layers, ScrollText, ShieldCheck, Trees, Users, UserCog, Layers3, CopyPlus, ShieldPlus, BookUser } from 'lucide-react'
import React from 'react'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
  } from "@/components/ui/menubar"
import Link from 'next/link'

const AdminSidebar = () => {
  return (
    <div>
        <div className='sidebar-header mt-2'>
            <div className='sidebar-header-menu'>
                <Settings2 />
                <span className='sidebar-menu-text'>Admin Dashboard</span>
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
                            <Users />
                            <span className='sidebar-menu-text'>Users</span>
                        </div>
                      </MenubarTrigger>
                      <MenubarContent className="text-safari-2">
                        <MenubarItem>
                            <Link href='/admin/users' className='menubar-item'>
                                <UserCog />
                                <span className="menubar-text">All Users</span>
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
                            <Landmark />
                            <span className='sidebar-menu-text'>Counties</span>
                        </div>
                      </MenubarTrigger>
                      <MenubarContent className="text-safari-2">
                        <MenubarItem>
                            <Link href='/admin/counties' className='menubar-item'>
                                <Layers3 />
                                <span className="menubar-text">Counties</span>
                            </Link>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>
                            <Link href='/admin/counties/add' className='menubar-item'>
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
                            <Layers />
                            <span className='sidebar-menu-text'>Categories</span>
                        </div>
                      </MenubarTrigger>
                      <MenubarContent className="text-safari-2">
                        <MenubarItem>
                            <Link href='/admin/categories' className='menubar-item'>
                                <Layers3 />
                                <span className="menubar-text">Categories</span>
                            </Link>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>
                            <Link href='/admin/categories/add' className='menubar-item'>
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
                            <Trees />
                            <span className='sidebar-menu-text'>Destinations</span>
                        </div>
                      </MenubarTrigger>
                      <MenubarContent className="text-safari-2">
                        <MenubarItem>
                            <Link href='/' className='menubar-item'>
                                <Layers3 />
                                <span className="menubar-text">Destinations</span>
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
                            <ScrollText />
                            <span className='sidebar-menu-text'>About</span>
                        </div>
                      </MenubarTrigger>
                      <MenubarContent className="text-safari-2">
                        <MenubarItem>
                            <Link href='/' className='menubar-item'>
                                <Layers3 />
                                <span className="menubar-text">About</span>
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
                            <Contact />
                            <span className='sidebar-menu-text'>Contacts</span>
                        </div>
                      </MenubarTrigger>
                      <MenubarContent className="text-safari-2">
                        <MenubarItem>
                            <Link href='/' className='menubar-item'>
                                <BookUser />
                                <span className="menubar-text">Contacts</span>
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
                            <span className='sidebar-menu-text'>Privacy Policy</span>
                        </div>
                      </MenubarTrigger>
                      <MenubarContent className="text-safari-2">
                        <MenubarItem>
                            <Link href='/' className='menubar-item'>
                                <ShieldPlus />
                                <span className="menubar-text">Privacy Policy</span>
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
                            <span className='sidebar-menu-text'>Terms</span>
                        </div>
                      </MenubarTrigger>
                      <MenubarContent className="text-safari-2">
                        <MenubarItem>
                            <Link href='/' className='menubar-item'>
                                <ShieldPlus />
                                <span className="menubar-text">Terms</span>
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

export default AdminSidebar