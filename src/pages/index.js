import React from 'react';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import Post from '../../components/Post';

class Home extends React.Component {
    render() {
        const posts = get(this, 'props.data.allMarkdownRemark.edges');
        const siteTitle = get(this, 'props.data.site.siteMetadata.title');

        return (
            <div>
                <Helmet title={siteTitle} />
                {posts.map(({ node }) => {
                    return <Post key={node.fields.slug} post={node} />;
                })}
            </div>
        );
    }
}

export default Home;

export const pageQuery = graphql`
    query IndexQuery {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 10) {
            edges {
                node {
                    id
                    excerpt
                    html
                    fields {
                        slug
                    }
                    frontmatter {
                        date
                        link
                        title
                    }
                }
            }
        }
    }
`;
