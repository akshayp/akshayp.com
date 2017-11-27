import React from 'react';
import Helmet from 'react-helmet';

class NotFound extends React.Component {
    render() {
        return (
            <div className="post">
                <Helmet title="Sorry! Page not found" />
                <img src="/img/404.jpg" class="fourohfour-error-image" alt="404 error" />
            </div>
        );
    }
}

export default NotFound;
