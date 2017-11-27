import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <p>
                Unstructured Scribbles is powered by <a href="https://www.gatsbyjs.org/">Gatsby JS</a> and{' '}
                <a href="http://purecss.io">Pure CSS</a>. Opinions on this website are my own and not of my employer.
            </p>
        );
    }
}

export default Footer;