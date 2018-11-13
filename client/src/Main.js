import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import './App.css';
import Demo from './Demo';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// injectTapEventPlugin();
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: []
        }
    }

    componentWillMount() {
        let page = [];
        page.push(<Demo appContext={this}/>);
        this.setState({
            page: page
        })
    }

    render() {
        return (
            <div className="App">
                {this.state.page}
            </div>
        );
    }
}

export default Main;
