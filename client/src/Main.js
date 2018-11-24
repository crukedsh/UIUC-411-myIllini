import React, {Component} from 'react';

import Login from './Login';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: []
        }
    }

    componentWillMount() {
        let page = [];
        page.push(<Login appContext={this} open={false}/>);
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
