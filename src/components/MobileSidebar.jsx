'use client'
import { LayoutList, Loader } from 'lucide-react'
import { BsStack } from "react-icons/bs"
import { FcLandscape, FcPackage } from "react-icons/fc"
import React from 'react'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
  } from "@/components/ui/menubar"
//import { categories } from '@/constants/categories'
import Link from 'next/link'
import { adCategories } from '@/constants/adCategories'
import useCategories from '@/hooks/useCategories'
import useCounties from '@/hooks/useCounties'

const MobileSidebar = () => {
    const {data: categories, error, isLoading} = useCategories()
    const {data: counties, error: countiesError, isLoading: countiesLoading} = useCounties()
    
    
 return (
    <div>
        <div className='flex my-1'>
            <ul className='flex flex-col w-full m-1 p-1'>
                <li className='mt-2'>
                    <div>
                    <Menubar className="sidebar-menubar">
                    <MenubarMenu>
                      <MenubarTrigger className=" focus:bg-transparent data-[state=open]:bg-transparent">
                        <div className='mobilesidebar-menu group1'>
                            <BsStack size={20} />
                            <span className='mobilesidebar-text'>Categories</span>
                        </div>
                      </MenubarTrigger>
                      <MenubarContent className="text-safari-2">
                        {isLoading ? (
                          <div className='flex gap-2'>
                            <Loader className='animate-spin' />
                            <span>Loading...</span>
                          </div>
                        ) : error ? (
                          <div className="text-red-500 text-center">{error}</div>
                        ) : (
                          categories?.map((category) => {
                            let last = false;
                            if(category.$id === categories[categories.length - 1].$id){
                                last = true;
                            }
                            return(
                                <div key={category.$id}>
                                <MenubarItem>
                                    <Link href={`/categories/${category.$id}`} className='menubar-item'>
                                        <LayoutList />
                                        <span className="menubar-text">{category.name}</span>
                                    </Link>
                                </MenubarItem>
                                {!last && <MenubarSeparator />}
                                </div>
                            )
                          })
                        )
                        
                        }
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
                        <div className='mobilesidebar-menu group1'>
                            <FcLandscape size={20} />
                            <span className='mobilesidebar-text'>Counties</span>
                        </div>
                      </MenubarTrigger>
                      <MenubarContent className="flex flex-col max-h-[500px] w-[220px] ps-4 text-safari-2 overflow-y-scroll custom-scrollbar">
                        {countiesLoading ? (
                          <div className='flex gap-2'>
                            <Loader className='animate-spin' />
                          <span>Loading...</span>
                        </div>
                        ) : countiesError ? (
                          <div className="text-red-500 text-center">{countiesError}</div>
                        ) : (
                          counties?.map((county) => {
                            let last = false;
                            if(county.$id === counties[counties.length - 1].$id){
                                last = true;
                            }
                            let code = ''
                            if (county.code <= 9) {
                                code = '00'+county.code
                            } else {
                                code = '0'+county.code
                            }
                            return(
                                <div key={county.$id}>
                                <MenubarItem className='shadow'>
                                    <Link href={`/counties/${county.$id}`} className='menubar-item'>
                                        <div className='relative rounded w-5 h-auto'>
                                          <img src={county.flag} alt='flag' className='w-5 h-auto' />
                                        </div>
                                        <span className="menubar-text">{county.name} {code}</span>
                                    </Link>
                                </MenubarItem>
                                {!last && <MenubarSeparator />}
                                </div>
                            )
                          })
                        )
                        }
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
                        <div className='mobilesidebar-menu group1'>
                            <FcPackage size={20} />
                            <span className='mobilesidebar-text'>Packages</span>
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
                                    <Link href={category.href} className='menubar-item'>
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
    </div>
  )
}

export default MobileSidebar