/* eslint-disable react/no-danger*/
import React, { Component } from 'react';

let stylesheetAdded = false;
let gistCallbackId = 0;

class Gist extends Component {
    state = {
        loading: true,
        src: ''
    };

    constructor(props) {
        super(props);
    }

    static nextGistCallback() {
        gistCallbackId = gistCallbackId + 1;
        return `embed_gist_callback_${gistCallbackId}`;
    }

    static addStylesheet(href) {
        if (stylesheetAdded) {
            return;
        }
        const link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = href;

        document.head.appendChild(link);
        stylesheetAdded = true;
    }

    componentDidMount() {
        const gistCallback = Gist.nextGistCallback();
        window[gistCallback] = gist => {
            this.setState({
                loading: false,
                src: gist.div
            });
            Gist.addStylesheet(gist.stylesheet);
        };

        const { gist, file } = this.props;

        let url = `https:\/\/gist.github.com/${gist}.json?callback=${gistCallback}`;
        if (file) {
            url += `&file=${file}`;
        }

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        document.head.appendChild(script);
    }

    render() {
        const { loading, src } = this.state;

        return loading ? <div>Loading...</div> : <div dangerouslySetInnerHTML={{ __html: src }} />;
    }
}

export default Gist;
