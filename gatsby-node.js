'use strict';

const Promise = require('bluebird');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = ({ graphql, boundActionCreators }) => {
    const { createPage } = boundActionCreators;

    return new Promise((resolve, reject) => {
        const blogPost = path.resolve('./components/Post.js');
        resolve(
            graphql(
                `
                    {
                        allMarkdownRemark(limit: 1000) {
                            edges {
                                node {
                                    fields {
                                        slug
                                    }
                                }
                            }
                        }
                    }
                `
            ).then(result => {
                if (result.errors) {
                    return reject(result.errors);
                }

                // Create blog posts pages.
                result.data.allMarkdownRemark.edges.forEach(edge => {
                    createPage({
                        path: edge.node.fields.slug,
                        component: blogPost,
                        context: {
                            slug: edge.node.fields.slug
                        }
                    });
                });
            })
        );
    });
};

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
    const { createNodeField } = boundActionCreators;

    if (node.internal.type === `MarkdownRemark`) {
        const value = createFilePath({ node, getNode });
        createNodeField({
            name: `slug`,
            node,
            value
        });
    }
};
