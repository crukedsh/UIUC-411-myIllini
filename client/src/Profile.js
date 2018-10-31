import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import ListItem from "@material-ui/core/ListItem/ListItem";
import Divider from "@material-ui/core/Divider/Divider";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Avatar from "@material-ui/core/Avatar/Avatar";
import List from "@material-ui/core/List/List";
import ClassIcon from "@material-ui/icons/Class";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssessmentIcon from "@material-ui/icons/Assessment";
import blue from '@material-ui/core/colors/blue';
import MyCourses from "./MyCourses";
import UploadPage from "./UploadPage";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // draweropen: false,
            currentScreen: []
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
            userID={this.props.username}/>);
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



    render() {
        const styles = {
            root: {
                width: "100%",
                maxWidth: 360,
                marginLeft: "auto",
                marginRight: "auto"
            },
            avatar: {
                margin: 5,
                color: '#fff',
                backgroundColor: blue[500],
            },
        };
        return (

            <div className="App">
            <MuiThemeProvider>
                <AppBar title="Personal Profile">

                    {/*// onLeftIconButtonClick={(event) => this.toggleDrawer(event)}*/}

                </AppBar>
            </MuiThemeProvider>
                    <div style={styles.root}>
                        <List>
                            <ListItem button onClick={(event) => this.handleCoursesClick(event)}>
                                <Avatar style={styles.avatar}>
                                    <ClassIcon />
                                </Avatar>

                                <ListItemText primary="Courses"/>
                            </ListItem>
                            <li>
                                <Divider inset/>
                            </li>
                            <ListItem button onClick={(event) => this.handleAssignmentClick(event)}>
                                <Avatar style={styles.avatar}>
                                    <AssignmentIcon />
                                </Avatar>
                                <ListItemText primary="Assignments"/>
                            </ListItem>
                            <li>
                                <Divider inset/>
                            </li>
                            <ListItem button>
                                <Avatar style={styles.avatar}>
                                    <AssessmentIcon />
                                </Avatar>
                                <ListItemText primary="Grades"/>
                            </ListItem>
                        </List>
                    </div>
            </div>
        );
    }
}

export default App;
