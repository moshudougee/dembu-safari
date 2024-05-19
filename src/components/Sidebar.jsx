'use client'
import { Caravan, LayoutList, Palmtree, SquareKanban, SwatchBook, Telescope } from 'lucide-react'
import React from 'react'
import AdminSidebar from './sidebars/AdminSidebar'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
  } from "@/components/ui/menubar"
  import { categories } from '@/constants/categories'
import Link from 'next/link'
import { adCategories } from '@/constants/adCategories'
import { useGlobalContext } from '@/context/GlobalProvider'
import CustomLoading from './CustomLoading'

const Sidebar = () => {
    const { user, loggedIn, loading } = useGlobalContext()
    
    let counties = [];
    for(let i = 0; i < 47; i++) {
        counties.push({
            id: i,
            title: `County ${i + 1}`
        });
    }
    if (loading) {
      return <CustomLoading />
    }
  return (
    <div className="flex flex-col">
        <div className='sidebar-header rounded-t-md'>
            <div className='sidebar-header-menu'>
                <Telescope />
                <span className='sidebar-menu-text'>Explore</span>
            </div>
        </div>
        <div className='flex mt-1'>
            <ul className='flex flex-col w-full m-1 p-1'>
                <li className='mt-2'>
                    <div>
                    <Menubar className="sidebar-menubar">
                    <MenubarMenu>
                      <MenubarTrigger className=" focus:bg-transparent data-[state=open]:bg-transparent">
                        <div className='sidebar-menu'>
                            <Caravan />
                            <span className='sidebar-menu-text'>Destinations</span>
                        </div>
                      </MenubarTrigger>
                      <MenubarContent className="text-safari-2">
                        {categories.map((category) => {
                            let last = false;
                            if(category.id === categories[categories.length - 1].id){
                                last = true;
                            }
                            return(
                                <div key={category.id}>
                                <MenubarItem>
                                    <Link href='/' className='menubar-item'>
                                        <LayoutList />
                                        <span className="menubar-text">{category.title}</span>
                                    </Link>
                                </MenubarItem>
                                {!last && <MenubarSeparator />}
                                </div>
                            )
                        })}
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
                            <Palmtree />
                            <span className='sidebar-menu-text'>Counties</span>
                        </div>
                      </MenubarTrigger>
                      <MenubarContent className="flex flex-col max-h-[500px] w-auto text-safari-2 overflow-y-scroll custom-scrollbar">
                        {counties.map((category) => {
                            let last = false;
                            if(category.id === counties[counties.length - 1].id){
                                last = true;
                            }
                            return(
                                <div key={category.id}>
                                <MenubarItem>
                                    <Link href='/' className='menubar-item'>
                                        <SquareKanban />
                                        <span className="menubar-text">{category.title}</span>
                                    </Link>
                                </MenubarItem>
                                {!last && <MenubarSeparator />}
                                </div>
                            )
                        })}
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
                            <SwatchBook />
                            <span className='sidebar-menu-text'>Packages</span>
                        </div>
                      </MenubarTrigger>
                      <MenubarContent className="text-safari-2">
                        {adCategories.map((category) => {
                            let last = false;
                            if(category.id === adCategories[adCategories.length - 1].id){
                                last = true;
                            }
                            return(
                                <div key={category.id}>
                                <MenubarItem>
                                    <Link href='/' className='menubar-item'>
                                        {category.icon}
                                        <span className="menubar-text">{category.title}</span>
                                    </Link>
                                </MenubarItem>
                                {!last && <MenubarSeparator />}
                                </div>
                            )
                        })}
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                    </div>
                </li>
            </ul>
        </div>
        {loggedIn && user?.role === 'ADMIN' && 
          <AdminSidebar />
        }
       
    </div>
  )
}

export default Sidebar