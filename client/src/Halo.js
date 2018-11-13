import React from 'react';
import PropTypes from 'prop-types';
import {createMuiTheme, withStyles} from '@material-ui/core/styles';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import AppBar from 'material-ui/AppBar';
import ListItem from "@material-ui/core/ListItem/ListItem";
import Divider from "@material-ui/core/Divider/Divider";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Avatar from "@material-ui/core/Avatar/Avatar";
import List from "@material-ui/core/List/List";
import ChatIcon from "@material-ui/icons/Chat";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ClassIcon from "@material-ui/icons/Class";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssessmentIcon from "@material-ui/icons/Assessment";
import blue from '@material-ui/core/colors/blue';
import MyCourses from "./MyCourses";
import UploadPage from "./UploadPage";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import pink from "@material-ui/core/colors/pink";
import red from "@material-ui/core/colors/red";

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: pink,
        error: red,
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
});


const styles = theme => ({
    root: {
        width: "100%",
        maxWidth: 1000,
        marginLeft: "auto",
        marginRight: "auto"
    },
    avatar: {
        margin: 5,
        color: '#fff',
        backgroundColor: blue[500],
    },
});

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // draweropen: false,
            currentScreen: [],
            snackOpen: true,
        };
    }

    // componentDidMount() {
    //     var currentScreen = [];
    //     currentScreen.push(<UploadScreen appContext={this.props.appContext} role={this.props.role} />);
    //
    //     this.setState({currentScreen})
    // }

    // TODO: vacant redirection.

    handleCoursesClick(){
        console.log("Courses!");
        let uploadScreen=[];
        uploadScreen.push(<MyCourses
            appContext={this.props.appContext}
            role={this.props.role}
            userID={this.props.userID}/>);
        this.props.appContext.setState({uploadScreen:uploadScreen})
    }
    handleAssignmentClick(){
        console.log("Assignments!");
        let uploadScreen=[];
        uploadScreen.push(<UploadPage
            appContext={this.props.appContext}
            role={this.props.role}
            userID={this.props.username}/>);
        this.props.appContext.setState({uploadScreen:uploadScreen})


    }
    // /**
    //  * Toggle opening and closing of drawer
    //  * @param {*} event
    //  */
    // toggleDrawer(event) {
    //     // console.log("drawer click");
    //     this.setState({draweropen: !this.state.draweropen})
    // }
    //
    // handleMenuClick(event, page) {
    //     switch (page) {
    //         case "openprint":
    //             // console.log("need to open uploadapge")
    //             var currentScreen = [];
    //             currentScreen.push(<UploadScreen appContext={this.props.appContext} role={this.props.role}/>);
    //             this.setState({currentScreen})
    //             break;
    //         case "openpast":
    //             // console.log("need to open pastfiles")
    //             var currentScreen = [];
    //             currentScreen.push(<Pastfiles appContext={this.props.appContext} role={this.props.role}/>);
    //             this.setState({currentScreen})
    //             break;
    //         case "logout":
    //             var loginPage = [];
    //             loginPage.push(<LoginScreen appContext={this.props.appContext}/>);
    //             this.props.appContext.setState({loginPage: loginPage, uploadScreen: []})
    //             break;
    //     }
    //     this.setState({draweropen: false})
    // }




    handleClose = () => {
        this.setState({ snackOpen: false });
    };


    render() {
        const { classes } = this.props;

        return (

            <div className="App">
                {/*<AppBar title="Personal Profile">*/}

                    {/*onLeftIconButtonClick={(event) => this.toggleDrawer(event)*/}

                {/*</AppBar>*/}
                    <div style={classes.root}>
                        <List>
                            <ListItem button onClick={(event) => this.handleCoursesClick(event)}>
                                <Avatar style={classes.avatar}>
                                    <ClassIcon />
                                </Avatar>

                                <ListItemText
                                    primary="Courses" />
                            </ListItem>
                            <li>
                                <Divider inset/>
                            </li>
                            <ListItem button onClick={(event) => this.handleAssignmentClick(event)}>
                                <Avatar style={classes.avatar}>
                                    <AssignmentIcon />
                                </Avatar>
                                <ListItemText primary="Assignments"/>
                            </ListItem>
                            <li>
                                <Divider inset/>
                            </li>
                            <ListItem button>
                                <Avatar style={classes.avatar}>
                                    <AssessmentIcon />
                                </Avatar>
                                <ListItemText primary="Grades"/>
                            </ListItem>
                            <li>
                                <Divider inset/>
                            </li>
                            <ListItem button>
                                <Avatar style={classes.avatar}>
                                    <ChatIcon />
                                </Avatar>
                                <ListItemText primary="Messages"/>
                            </ListItem>
                            <li>
                                <Divider inset/>
                            </li>
                            <ListItem button>
                                <Avatar style={classes.avatar}>
                                    <AccountBoxIcon />
                                </Avatar>
                                <ListItemText primary="Account"/>
                            </ListItem>

                        </List>
                        <Snackbar
                            anchorOrigin={{ vertical:"bottom", horizontal:"left" }}
                            open={this.state.snackOpen}
                            onClose={this.handleClose}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={
                                <span id="message-id">Welcome {this.props.role}, {this.props.userID}! </span>
                            }
                        />
                    </div>
            </div>
        );
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
