import React from 'react'
import { Gem } from 'lucide-react';
import Image from 'next/image';
import Dest from '@/images/image2.jpg'
import DestSmall from '@/images/image16.jpg'
import BreadCrumb from '@/components/Breadlinks'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdsHorizontal from '@/components/AdsHorizontal';
import ContentHeader from '@/components/ContentHeader';


const PopularDestination = ({ params }) => {
    const crumbLinks = [
      {
        name: 'Popular',
        href: '/popular'
      }
    ]
    const crumbPage = "Maasai Mara National Reserve"
    const {id }= params;
    const temp = [1, 2, 3, 4]
    //console.log(id)
  return (
    <div className=' min-h-screen'>
      <ContentHeader 
        crumbLinks={crumbLinks}
        crumbPage={crumbPage}
        icon={<Gem />}
        title='Popular Destinations'
        subtitle='Maasai Mara National Reserve'
      />
      <div className='flex flex-col justify-center items-center w-full my-4'>
        <div className='flex w-[900px] h-[500px] border rounded'>
            <Image src={Dest} alt='Popular' className='rounded' />
        </div>
        <div className='flex gap-1 w-auto justify-center items-center mt-2'>
            {temp.map((t) => {
                return (
                    <div key={t} className='flex w-[200px] h-[111px] rounded border'>
                        <Image src={DestSmall} alt='Popular' className='rounded' />
                    </div>
                )
            })}
        </div>
      </div>
      <hr className="hr"/>
      <div className='flex flex-col justify-center items-center w-full my-4'>
        <div className='flex justify-center items-center m-1'>
        <Tabs defaultValue="details" className="flex flex-col w-[1000px] min-h-[600px] border p-4 mx-10">
          <TabsList className="text-success-1">
            <TabsTrigger 
              value="details" 
              className="hover:text-safari-2 hover:bg-banner data-[state=active]:bg-banner data-[state=active]:text-safari-2"
            >
              Details
            </TabsTrigger>
            <TabsTrigger 
              value="accomodation" 
              className="hover:text-safari-2 hover:bg-banner data-[state=active]:bg-banner data-[state=active]:text-safari-2"
            >
              Accomodation
            </TabsTrigger>
            <TabsTrigger 
              value="tours"
              className="hover:text-safari-2 hover:bg-banner data-[state=active]:bg-banner data-[state=active]:text-safari-2"
            >
              Tours & Safari
            </TabsTrigger>
            <TabsTrigger 
              value="feedback"
              className="hover:text-safari-2 hover:bg-banner data-[state=active]:bg-banner data-[state=active]:text-safari-2"
            >
              Feedback
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <p className='indent-12'>Maasai Mara, also sometimes spelled Masai Mara and locally known simply as The Mara, 
              is a large national game reserve in Narok, Kenya, contiguous with the Serengeti National Park in Tanzania. It is named 
              in honour of the Maasai people,[2] the ancestral inhabitants of the area, who migrated to the area from the Nile Basin. 
              Their description of the area when looked at from afar: "Mara" means "spotted" in the local Maasai language, because of 
              the short bushy trees which dot the landscape.
              Maasai Mara is one of the wildlife conservation and wilderness areas in Africa, with its populations of lion, leopard, 
              cheetah and African bush elephant. It also hosts the Great Migration, which secured it as one of the Seven Natural Wonders 
              of Africa, and as one of the ten Wonders of the World.
              The Greater Mara ecosystem encompasses areas known as the Maasai Mara National Reserve, the Mara Triangle, several Maasai 
              group ranches, and several conservancies..
            </p>
            <p className='indent-12'>Maasai Mara, also sometimes spelled Masai Mara and locally known simply as The Mara, 
              is a large national game reserve in Narok, Kenya, contiguous with the Serengeti National Park in Tanzania. It is named 
              in honour of the Maasai people,[2] the ancestral inhabitants of the area, who migrated to the area from the Nile Basin. 
              Their description of the area when looked at from afar: "Mara" means "spotted" in the local Maasai language, because of 
              the short bushy trees which dot the landscape.
              Maasai Mara is one of the wildlife conservation and wilderness areas in Africa, with its populations of lion, leopard, 
              cheetah and African bush elephant. It also hosts the Great Migration, which secured it as one of the Seven Natural Wonders 
              of Africa, and as one of the ten Wonders of the World.
              The Greater Mara ecosystem encompasses areas known as the Maasai Mara National Reserve, the Mara Triangle, several Maasai 
              group ranches, and several conservancies..
            </p>
          </TabsContent>
          <TabsContent value="accomodation">
            <div className='flex flex-col justify-center items-center'>
              <p className='indent-12'>
              If you offer various accomodation services near <em>Maasai Mara National Reserve</em> kindly advertise with us here.
              </p>
            </div>
            
          </TabsContent>
          <TabsContent value="tours">
            <div className='flex flex-col justify-center items-center'>
              <p className='indent-12'>
              If you offer various tours & safari services near <em>Maasai Mara National Reserve</em> kindly advertise with us here.
              </p>
            </div>
            
          </TabsContent>
          <TabsContent value="feedback">
            <div className='flex flex-col justify-center items-center'>
              <p className='indent-12'>
              Leave a feedback about your experience visiting <em>Maasai Mara National Reserve</em>.
              </p>
            </div>
            
          </TabsContent>
        </Tabs>

        </div>
      </div>
      <hr className="hr"/>
      <AdsHorizontal />
      <hr className="hr"/>
    </div>
  )
}

export default PopularDestination