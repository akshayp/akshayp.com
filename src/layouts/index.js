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
            <div id="doc" className={`pure-g ${active}`}>
                <Helmet>
                    <title>Unstructured Scribbles | Something about Everything</title>
                    <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                    />
                    <link
                        rel="index"
                        title="Unstructured Scribbles | Something about Everything"
                        href="http://www.akshayp.com"
                    />
                    <link rel="shortcut icon" href={__PATH_PREFIX__ + '/favicon.png'} />
                    <link rel="stylesheet" href={__PATH_PREFIX__ + '/css/vendor.css'} type="text/css" />
                    <link rel="stylesheet" href={__PATH_PREFIX__ + '/css/style.css'} type="text/css" />
                </Helmet>
                <a
                    href="#menu"
                    className={`pure-menu-link ${active}`}
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
                <div id="menu" className="pure-u">
                    <div className="pure-menu pure-menu-open">
                        <h1>
                            <a href="/" className="pure-menu-heading">
                                Unstructured Scribbles
                            </a>
                        </h1>
                        <Nav current={location.pathname} />
                        <Bio />
                    </div>
                </div>
                <div id="main" className="pure-u">
                    {children()}
                </div>
                <div id="ft" className="pure-u-1">
                    <Footer />
                </div>
            </div>
        );
    }
}

export default Template;
