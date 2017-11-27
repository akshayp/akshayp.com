module.exports = {
    siteMetadata: {
        title: 'Unstructured Scribbles | Something about Everything',
        author: 'Akshay Patel',
        description: '',
        siteUrl: 'http://akshayp.com/'
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
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                // trackingId: `ADD YOUR TRACKING ID HERE`,
            }
        },
        `gatsby-plugin-offline`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-plugin-sitemap`
        }
    ]
};
