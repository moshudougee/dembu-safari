import { getCategories } from "@/lib/server/categoryActions";
import { getCounties } from "@/lib/server/countyActions";

const SITE_URL = 'https://dembu-safari.vercel.app'


const SiteMap = async () => {
    const categories = await getCategories().then((res) => {
        return res.map((category) => {
            return {
                url: `${SITE_URL}/categories/${category.$id}`,
                lastModified: category.$updatedAt,
                changefreq: 'daily',
                priority: 0.8,
            }
        })
    })
    const counties = await getCounties().then((res) => {
        return res.map((county) => {
            return {
                url: `${SITE_URL}/counties/${county.$id}`,
                lastModified: county.$updatedAt,
                changefreq: 'daily',
                priority: 0.7,
            }
        })
    })
    const routes = ["", "/popular", "/about", "/contact", "/accommodations", "/tours"].map((route) => {
        return {
            url: `${SITE_URL}${route}`,
            lastModified: new Date().toISOString(),
            changefreq: 'daily',
            priority: 1,
        }
    })
    return [...routes, ...categories, ...counties] 
}

export default SiteMap;