import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import './App.css';
import LoginScreen from './Loginscreen';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// injectTapEventPlugin();
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginPage: [],
            uploadScreen: [],
            forum: []
        }
    }

    componentWillMount() {
        var loginPage = [];
        loginPage.push(<LoginScreen appContext={this}/>);
        this.setState({
            loginPage: loginPage
        })
    }

    render() {
        return (
            <div className="App">
                {this.state.loginPage}
                {this.state.uploadScreen}
                {this.state.forum}
            </div>
        );
    }
}

export default App;
