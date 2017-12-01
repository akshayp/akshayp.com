import React from 'react';
import get from 'lodash/get';
import Helmet from 'react-helmet';
const monthFormatter = new Intl.DateTimeFormat('en-us', { month: 'short' });

class Archives extends React.Component {
    render() {
        const posts = get(this, 'props.data.allMarkdownRemark.edges');

        return (
            <div className="post archives">
                <h2>Archives</h2>
                <Helmet title="Archives" />
                <ul>
                    {posts.map(({ node }) => {
                        const { title, date, link } = node.frontmatter;
                        const postDate = new Date(date.replace(' ', 'T'));
                        const month = monthFormatter.format(postDate);

                        return (
                            <li key={link}>
                                <a href={link} title={title}>
                                    {title}
                                </a>
                                <strong>
                                    {month} {postDate.getDate()}
                                </strong>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default Archives;

export const pageQuery = graphql`
    query ArchiveQuery {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
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
