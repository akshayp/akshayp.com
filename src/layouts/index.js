/* globals __PATH_PREFIX__ */
import React from 'react';
import Helmet from 'react-helmet';
import Footer from '../../components/Footer';
import Bio from '../../components/Bio';
import Nav from '../../components/Nav';

class Template extends React.Component {
    state = {
        active: false
    };

    render() {
        const { location, children } = this.props;
        const active = this.state.active ? 'active' : '';

        return (
            <div id="doc" className={`${active}`}>
                <Helmet>
                    <title>Unstructured Scribbles | Something about Everything</title>
                    <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                    />
                    <meta name="theme-color" content="#191818" />
                    <link
                        rel="index"
                        title="Unstructured Scribbles | Something about Everything"
                        href="https://www.akshayp.com"
                    />
                    <link rel="shortcut icon" href={__PATH_PREFIX__ + '/favicon.png'} />
                    <link rel="stylesheet" href={__PATH_PREFIX__ + '/css/style.css'} type="text/css" />
                </Helmet>
                <a
                    href="#menu"
                    className={`hamburger ${active}`}
                    onClick={e => {
                        e.preventDefault();
                        this.setState({ active: !this.state.active });
                    }}
                >
                    <img
                        width="20"
                        title=""
                        alt=""
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAYAQAAAAC6w2LjAAAAAnRSTlMAAHaTzTgAAAAXSURBVHgBY/zPwMDwEQvJAAL4SVroBQCTQhdZIO+EIAAAAABJRU5ErkJggg=="
                        alt="Menu toggle"
                    />
                </a>
                <div id="menu" className="grid-u menu menu-open">
                    <h1>
                        <a href="/" className="menu-heading">
                            Unstructured Scribbles
                        </a>
                    </h1>
                    <Nav current={location.pathname} />
                    <Bio />
                </div>
                <div id="main" className="grid-u">
                    {children()}
                </div>
                <div id="ft" className="grid-100">
                    <Footer />
                </div>
            </div>
        );
    }
}

export default Template;
