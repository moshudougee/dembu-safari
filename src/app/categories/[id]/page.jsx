import CategoryComponent from '@/components/CategoryComponent'
import { getCategory } from '@/lib/server/categoryActions'
import React from 'react'

export const generateMetadata = async ({params}) => {
  const { id } = params
  const category = await getCategory(id)
  if(!category) {
    return
  }
  return {
    title: category.name,
    description: category.intro,
    openGraph: {
      title: category.name,
      description: category.intro,
      type: "article",
      locale: "en_US",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/categories/${category.$id}`,
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

const DestinationCategory = ({ params }) => {
    const { id } = params
    
  return (
    <div className='min-h-screen'>
        <CategoryComponent
          id={id}
        />
    </div>
  )
}

export default DestinationCategory