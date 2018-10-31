import React, {Component} from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import AddIcon from "@material-ui/icons/Add";
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton'
import axios from "axios";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Divider from "@material-ui/core/Divider/Divider";
import Button from "@material-ui/core/Button/Button";
import Typography from "@material-ui/core/Typography/Typography";
import blue from "@material-ui/core/colors/blue";
import withStyles from "@material-ui/core/es/styles/withStyles";
import grey from "@material-ui/core/es/colors/grey";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import IconButton from "@material-ui/core/IconButton/IconButton";

import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import Profile from "./Profile";

const apiBaseUrl = "http://localhost:3001/";

class MyCourses extends Component {
    constructor(props) {
        super(props);
        let buttonContent = [];
        if (this.props.role == "student") {
            buttonContent.push(
                <div>
                    <FlatButton label="drop"/>
                </div>
            )
        } else {
            buttonContent.push(
                <div>
                    <FlatButton label="edit"/>
                    <FlatButton label="delete"/>
                </div>
            )
        }

        this.state = {
            tableData: [],
            buttonContent: buttonContent
        };
    }

    componentWillMount() {
        axios.get(apiBaseUrl + "students/course-selected/" + this.props.userID)
            .then((response) => {
                console.log(response.data)
                if (response.status == 400) {
                    console.log("Username does not exists");
                    alert("Username does not exist");
                } else if (response.status == 200) {
                    this.setState({
                        tableData: response.data.data
                    });
                    console.log(this.state)
                } else {
                    alert("unknown error")
                }
            })
    }

    handleClickProfile(){
        console.log("Profile!");
        let uploadScreen=[];
        uploadScreen.push(<Profile
            appContext={this.props.appContext}
            role={this.props.role}
            userID={this.props.userID}/>);
        this.props.appContext.setState({uploadScreen:uploadScreen})
    }


    render() {
        const styles =  ({
            root: {
                width: "100%",
                maxWidth: 1000,
                marginLeft: "auto",
                marginRight: "auto"
            },
            heading: {
                fontSize: 18,
                flexShrink: 0,
            },
            secondaryHeading: {
                fontSize: 18,
                flexBasis: '100%',
                color: grey[500]
            },
            menuButton: {
                marginLeft: -12,
                marginRight: 20,
            },
        });
        console.log(this.state.tableData)
        return (
            <MuiThemeProvider>
                <AppBar title="My Courses"/>

                <div style={styles.root}>
                    {this.state.tableData.map((row, index) => (
                        <MuiThemeProvider>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography style={styles.heading}>{row.title}</Typography>
                                    <Typography style={styles.secondaryHeading}>{row.crn}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography>
                                        Details here!
                                    </Typography>
                                </ExpansionPanelDetails>
                                <Divider/>
                                <ExpansionPanelActions>
                                    {this.state.buttonContent}
                                </ExpansionPanelActions>
                            </ExpansionPanel>
                        </MuiThemeProvider>
                    ))}
                    <Button color="primary" aria-label="Add">
                        <AddIcon/>
                    </Button>
                    <Button color="primary" aria-label="Add" onClick={()=>this.handleClickProfile()}>
                        <MenuIcon/>
                    </Button>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default (MyCourses);
