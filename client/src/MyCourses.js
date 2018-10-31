import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton'
import axios from "axios";
const apiBaseUrl = "http://localhost:3001/";

class MyCourses extends Component{
    constructor(props){
        super(props);
        this.state = {tableData: []};


    }
    componentWillMount(){
        axios.get(apiBaseUrl+"students/course-selected/"+this.props.userID)
            .then((response) =>{
                console.log(response.data)
                if (response.status==400){
                    console.log("Username does not exists");
                    alert("Username does not exist");
                }else if (response.status==200){
                    this.setState({
                        tableData: response.data.data
                    });
                    console.log(this.state)
                }else{
                    alert("unknown error")
                }
            })
    }
    render(){
        console.log(this.state.tableData)
        return (
            <MuiThemeProvider>
            <AppBar title="My Courses"/>
                {this.state.tableData.map((row,index)=>(
                    <MuiThemeProvider>
                    <Card title={"course"}>
                    <CardTitle title={row.title} subtitle={row.crn} />
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

export default MyCourses;
