module.exports = {
    siteMetadata: {
        title: 'Unstructured Scribbles | Something about Everything',
        author: 'Akshay Patel',
        description: '',
        siteUrl: 'https://akshayp.com/'
    },
    pathPrefix: '/',
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/_posts`,
                name: 'posts'
            }
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: ['gatsby-remark-prismjs', 'gatsby-remark-copy-linked-files']
            }
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: 'Unstructured Scribbles',
                short_name: 'Scribbles',
                start_url: '/',
                background_color: '#f7f0eb',
                theme_color: '#EFEFEF',
                display: 'minimal-ui',
                icons: [
                    {
                        src: `/img/logo-512x512.png`,
                        sizes: `512x512`,
                        type: `image/png`
                    }
                ]
            }
        },
        `gatsby-plugin-offline`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-plugin-sitemap`
        }
    ]
};
