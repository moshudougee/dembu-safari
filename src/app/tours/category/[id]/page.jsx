import ToursCategoryComp from '@/components/ToursCategoryComp'
import { getCategory } from '@/lib/server/categoryActions'
import React from 'react'

export const generateMetadata = async ({params}) => {
  const { id } = params
  const category = await getCategory(id)
  if(!category) {
    return
  }
  return {
    title: `${category.name} Tours & Safari`,
    description: `Tours & Safari services for tourists visiting ${category.name} in Kenya`,
    openGraph: {
      title: `${category.name} Tours & Safari`,
      description: `Tours & Safari services for tourists visiting ${category.name} in Kenya`,
      type: "article",
      locale: "en_US",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/tours/category/${category.$id}`,
      siteName: "Dembu Safari",
      images: [
        {
          url: category.image,
          with: 595,
          height: 334,
        }
        
      ],
    },
  }
}

const CategoryToursPage = ({ params }) => {
  const { id } = params
  return (
    <div className='min-h-screen'>
      <ToursCategoryComp
        id={id}
      />
    </div>
  )
}

export default CategoryToursPage