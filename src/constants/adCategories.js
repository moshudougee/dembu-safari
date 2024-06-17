import { FaHotel } from "react-icons/fa6";
import { BsLuggageFill } from "react-icons/bs";

export const adCategories = [
    {
        id: 1,
        title: "Accommodation",
        icon: <FaHotel size={24} />,
        href: '/accommodations'
    },
    {
        id: 2,
        title: "Tours & Safari",
        icon: <BsLuggageFill size={24} />,
        href: '/tours'
    },
    
]