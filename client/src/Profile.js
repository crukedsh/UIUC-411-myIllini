import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton'


const tableData = [
    {
        name: 'John Smith',
        status: 'Employed',
    },
    {
        name: 'Randal White',
        status: 'Unemployed',
    },
    {
        name: 'Stephanie Sanders',
        status: 'Employed',
    },
    {
        name: 'Steve Brown',
        status: 'Employed',
    },
    {
        name: 'Joyce Whitten',
        status: 'Employed',
    },
    {
        name: 'Samuel Roberts',
        status: 'Employed',
    },
    {
        name: 'Adam Moore',
        status: 'Employed',
    },
];
class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {draweropen: false};

    }
    /**
     * Toggle opening and closing of drawer
     * @param {*} event
     */
    toggleDrawer(event) {
        // console.log("drawer click");
        this.setState({draweropen: !this.state.draweropen})
    }
    componentDidMount(){

    }
    render(){

        return (
            <MuiThemeProvider>
            <AppBar title="My Profile"/>
                {tableData.map((row,index)=>(
                    <MuiThemeProvider>
                    <Card title={"course"}>
                    <CardTitle title={row.name} subtitle="Card subtitle" />
                        <CardActions>
                            <FlatButton label="Details" />
                            <FlatButton label="Drop the course" />
                        </CardActions>
                    </Card>
                    </MuiThemeProvider>
                ))}
                </MuiThemeProvider>
        )
    }
}


{/*<Table>*/}
{/*<TableHeader displaySelectAll={false}*/}
{/*adjustForCheckbox={true}*/}
{/*>*/}
{/*<TableRow>*/}
{/*<TableHeaderColumn colSpan="2" tooltip="Course Selected" style={{textAlign: 'center'}}>*/}
{/*Course Selected*/}
{/*</TableHeaderColumn>*/}
{/*</TableRow>*/}
{/*<TableRow>*/}
{/*/!*<TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>*!/*/}
{/*<TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>*/}
{/*<TableHeaderColumn tooltip="The Status">Status</TableHeaderColumn>*/}
{/*</TableRow>*/}
{/*</TableHeader>*/}
{/*<TableBody*/}
{/*displayRowCheckbox={true}*/}
{/*>*/}
{/*{tableData.map( (row, index) => (*/}
{/*<TableRow key={index}>*/}
{/*<TableRowColumn>{row.name}</TableRowColumn>*/}
{/*<TableRowColumn>{row.status}</TableRowColumn>*/}
{/*</TableRow>*/}
{/*))}*/}
{/*</TableBody>*/}
{/*</Table>*/}

export default Profile;
