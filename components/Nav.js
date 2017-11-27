import React from 'react';
import navItems from '../config/nav.json';

class Nav extends React.Component {
    render() {
        const { current } = this.props;
        return (
            <ul>
                {navItems.map(item => {
                    const className = item.url === current ? 'pure-menu-selected' : '';
                    return (
                        <li key={item.url} className={className}>
                            <a href={item.url}>{item.description}</a>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

export default Nav;
