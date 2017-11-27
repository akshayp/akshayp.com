import React from 'react';
import Helmet from 'react-helmet';
import Gist from '../../components/Gist';

class Geektool extends React.Component {
    render() {
        return (
            <div className="post">
                <Helmet title="Geektool Scripts" />
                <h2>Geektool Scripts</h2>
                <h3>System Statistics:</h3>
                <Gist gist={'akshayp/620075'} />

                <h3>Display IP Address bash Script</h3>
                <Gist gist={'akshayp/620092'} />

                <h3>Battery Status</h3>
                <Gist gist={'akshayp/620103'} />

                <h3>Scrubbing two lists</h3>
                <Gist gist={'akshayp/620105'} />
            </div>
        );
    }
}

export default Geektool;
