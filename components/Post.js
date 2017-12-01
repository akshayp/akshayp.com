/* eslint-disable react/no-danger*/
import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
const monthFormatter = new Intl.DateTimeFormat('en-us', { month: 'short' });

class Post extends React.Component {
    render() {
        const post = this.props.post || this.props.data.markdownRemark;
        const isStandalone = !!this.props.data;
        const { title, date, link } = post.frontmatter;
        const postDate = new Date(date.replace(' ', 'T'));
        const month = monthFormatter.format(postDate);

        return (
            <div className="post">
                {isStandalone ? <Helmet title={title} /> : null}
                <time dateTime={date}>
                    <em>{month}</em> {postDate.getDate()}
                </time>
                <h2>
                    <Link to={link} title={title}>
                        {title}
                    </Link>
                </h2>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>
        );
    }
}

export default Post;

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
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
`;
