import React from 'react';
import Helmet from 'react-helmet';

class Code extends React.Component {
    render() {
        return (
            <div className="post">
                <Helmet title="Code" />
                <h2>Code</h2>
                <p>
                    I will update this section as I get time to post various coding projects I have worked on. There is
                    no fixed language these are written in . The projects exhibit the nature of my interests at
                    different points of time. My current interests are on the side of web design and development.I have
                    a code base for the following languages with varying project interests:
                </p>
                <h4>Javascript</h4>
                <ul>
                    <li>
                        <a href="/sandbox/recent-tweets/">Recent Tweets</a> built using YQL and YUI3
                    </li>
                    <li>
                        <a href="/sandbox/scroll-to-bottom.html">NYTimes style related article waypoint</a> built using
                        YUI3
                    </li>
                    <li>
                        <a href="/sandbox/yui-spinner/">CSS Spinner Image</a>
                    </li>
                </ul>
                <h4>
                    <a href="http://github.com/akshayp/assembly">Assembly</a>
                </h4>
                <ul>
                    <li>Parity Checker</li>
                    <li>Icon Matcher(potentially image matcher)</li>
                    <li>Puzzle Matcher</li>
                    <li>Background Finder</li>
                </ul>
                <h4>
                    <a href="http://github.com/akshayp/cplusplus">C/C++</a>
                </h4>
                <ul>
                    <li>Parity Checker</li>
                    <li>Icon Matcher</li>
                    <li>Ball Tracker</li>
                    <li>Prime Number Threading</li>
                    <li>Matlab in C++</li>
                </ul>
                <h4>
                    <a href="http://github.com/akshayp/vhdl">VHDL</a>
                </h4>
                <ul>
                    <li>
                        <strong>MIPS Processor</strong> with forwarding and branch hazard control
                    </li>
                    <li>
                        <strong>Ping Pong</strong> game designed for an Altera Chipset
                    </li>
                </ul>
            </div>
        );
    }
}

export default Code;
