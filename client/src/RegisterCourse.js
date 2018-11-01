import React, {Component} from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
import grey from "@material-ui/core/es/colors/grey";
import MenuIcon from "@material-ui/icons/Menu";
import Profile from "./Profile";
import AddEditCourse from "./AddEditCourse";

const apiBaseUrl = "http://localhost:3001/";

class RegisterCourse extends Component {
    constructor(props) {
        console.log(props);
        super(props);

        this.state = {
            tableData: [],
            registered: []
        };
    }

    registerCourse(crn){
        this.state.registered.push(crn);
        if (this.props.role == "teacher") {
            console.log("Error!");
        } else {
            console.log("Add!");
            let uploadScreen = [];
            // TODO: register
            // uploadScreen.push(<AddEditCourse
            //     appContext={this.props.appContext}
            //     role={this.props.role}
            //     userID={this.props.userID}
            //     isAdd={true}
            // />);
            this.props.appContext.setState({uploadScreen: uploadScreen})
        }
    }

    componentWillMount() {

        axios.get(apiBaseUrl + "students/course-unselected/" + this.props.userID)
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
            }
        });
        console.log(this.state.tableData)
        return (
            <MuiThemeProvider>
                <AppBar title="My Courses"/>

                <div style={styles.root}>
                    {this.state.tableData.map((row, index) => {
                        if (!this.state.registered.includes(row.crn))
                        return  (
                        <MuiThemeProvider>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography style={styles.heading}>{row.title}</Typography>
                                    <Typography style={styles.secondaryHeading}>{row.crn} </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography>
                                        Capacity: {row.capacity}
                                    </Typography>
                                </ExpansionPanelDetails>
                                <Divider/>
                                <ExpansionPanelActions>
                                    <FlatButton label="add"
                                                onClick={
                                                    () => this.registerCourse(row.crn)}/>
                                    }
                                </ExpansionPanelActions>
                            </ExpansionPanel>
                        </MuiThemeProvider>
                        )   })}
                    <Button color="primary" aria-label="Add" onClick={()=>this.addCourse()}>
                        <AddIcon/>
                    </Button>
                    <Button color="primary" aria-label="Profile" onClick={()=>this.handleClickProfile()}>
                        <MenuIcon/>
                    </Button>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default (RegisterCourse);
