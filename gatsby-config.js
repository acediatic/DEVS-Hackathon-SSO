module.exports = {
  siteMetadata: {
    title: `DEVS 2021 Hackathon`,
    description: `A sign in/out utility for the 2021 DEVS Hackathon.`,
    author: `@acediatic`,
    siteUrl: `https://acediatic.github.io/DEVS-Hackathon-SSO`,
  },
  pathPrefix: `/DEVS-Hackathon-SSO`,
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "YOUR_GOOGLE_ANALYTICS_TRACKING_ID",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
  ],
}
