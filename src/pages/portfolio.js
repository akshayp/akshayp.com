import React from 'react';
import Helmet from 'react-helmet';
import portfolio from '../../config/portfolio.json';

class Portfolio extends React.Component {
    render() {
        return (
            <div className="portfolio post">
                <Helmet title="Portfolio" />
                <ul>
                    {portfolio.map(site => {
                        return (
                            <li className="pure-u-1-3" key={site.url}>
                                <a href={site.url} target="_blank">
                                    <img src={`/img/${site.key}.jpg`} alt={site.company} />
                                    <span>{site.description}</span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default Portfolio;
