
const Robots = () => {
    return  {
        rules: {
          userAgent: '*',
          allow: '/',
          disallow: '/admin',
        },
        sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
      }
}

export default Robots