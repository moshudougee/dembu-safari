import { Contact, Gem, Home, PawPrint} from 'lucide-react';
import { FaHome, FaPaw } from "react-icons/fa";
import { BiSolidContact } from "react-icons/bi";
import { GiElephant } from "react-icons/gi";

export const navLinks = [
    {
        title: "Home",
        href: "/",
        icon: <FaHome size={20} />
    },
    {
        title: "About",
        href: "/about",
        icon: <FaPaw size={20} />
    },
    {
        title: "Popular",
        href: "/popular",
        icon: <GiElephant size={24} />
    },
    {
        title: "Contact",
        href: "/contact",
        icon: <BiSolidContact size={23} />
    }

];