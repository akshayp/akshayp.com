import React from 'react';
import Helmet from 'react-helmet';

class About extends React.Component {
    render() {
        return (
            <div className="post">
                <Helmet title="About Me" />
                <h2>About</h2>
                <h4>Who am I?</h4>

                <p>
                    I was a student at Georgia Tech and recently graduated with a degree in Computer Engineering. Upon
                    graduation, I decided to venture a "little" outside of my hardware education and go into web
                    development. I am very passionate about building usable, responsive and interactive websites.
                    Technology has been a passion from an early age. From the time I built my first computer at age 11,
                    I have always been drawn to technology. Tinkering with code and playing with computer parts had
                    become an integral part of my daily routine. I actively develop on the LAMP stack and am familiar
                    with most modern frontend technologies including a whole host of frameworks.
                </p>

                <h4>What do I do?</h4>
                <p>
                    I am currently pursuing a career in frontend development at Yahoo! Sports. You can view some of my
                    previous work in the <a href="/portfolio">Portfolio</a> section of the site. A snapshot of my skill
                    set and experience is available on LinkedIn. If you would like to get in touch with me for anything
                    (jobs, networking, suggestions), please reach out to me on any of the social networks listed in the
                    sidebar.
                </p>

                <h4>What is this blog for?</h4>
                <p>
                    This blog publishes content about Web Technology, Design, and Travel primarily. There are code
                    snippets and open sourced projects scattered in posts and categories all across the site. Feel free
                    to comment on the various designs, photos and posts I have on this blog. Feedback is always welcome!
                </p>
            </div>
        );
    }
}

export default About;
