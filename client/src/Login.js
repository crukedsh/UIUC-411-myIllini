import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {createMuiTheme, MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {about} from './DrawerItems';
import blue from "@material-ui/core/colors/blue";
import pink from "@material-ui/core/colors/pink";
import red from "@material-ui/core/colors/red";
import Paper from "@material-ui/core/Paper/Paper";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import Button from "@material-ui/core/Button/Button";
import axios from "axios";
import Profile from "./Profile"
import Register from "./Register"

const drawerWidth = 240;

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: pink,
        error: red,
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
});

let apiBaseUrl = "http://chenzhu2.web.illinois.edu/";
const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24,
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    appBarSpacer: theme.mixins.toolbar,
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },});

class Login extends Component {
    constructor(props) {
        super(props);
        var localloginComponent = [];
        localloginComponent.push(
            <MuiThemeProvider>
                <div>
                    <TextField
                        hintText="Enter your Illinois netID"
                        floatingLabelText="Student Id"
                        onChange={(event, newValue) => this.setState({userID: newValue})}
                    />
                    <br/>
                    <TextField
                        type="password"
                        hintText="Enter your Password"
                        floatingLabelText="Password"
                        onChange={(event, newValue) => this.setState({password: newValue})}
                    />
                    <br/>
                    <RaisedButton label="Submit" primary={true} style={style}
                                  onClick={(event) => this.handleClick(event)}/>
                </div>
            </MuiThemeProvider>
        )
        this.state = {
            userID: '',
            password: '',
            menuValue: 1,
            loginComponent: localloginComponent,
            loginRole: 'student',
            open: false
        }
    }

    componentWillMount() {
        // console.log("willmount prop values",this.props);
        if (this.props.role != undefined) {
            if (this.props.role == 'student') {
                console.log("in student componentWillMount");
                var localloginComponent = [];
                localloginComponent.push(
                    <MuiThemeProvider>
                        <div>
                            <TextField
                                hintText="Enter your netID"
                                floatingLabelText="Student Id"
                                onChange={(event, newValue) => this.setState({userID: newValue})}
                            />
                            <br/>
                            <TextField
                                type="password"
                                hintText="Enter your Password"
                                floatingLabelText="Password"
                                onChange={(event, newValue) => this.setState({password: newValue})}
                            />
                            <br/>
                            <RaisedButton label="Submit" primary={true} style={style}
                                          onClick={(event) => this.handleClick(event)}/>
                        </div>
                    </MuiThemeProvider>
                )
                this.setState({menuValue: 1, loginComponent: localloginComponent, loginRole: 'student'})
            }
            else if (this.props.role == 'teacher') {
                console.log("in teacher componentWillMount");
                var localloginComponent = [];
                localloginComponent.push(
                    <MuiThemeProvider>
                        <div>
                            <TextField
                                hintText="Enter your NetID"
                                floatingLabelText="Teacher Id"
                                onChange={(event, newValue) => this.setState({userID: newValue})}
                            />
                            <br/>
                            <TextField
                                type="password"
                                hintText="Enter your Password"
                                floatingLabelText="Password"
                                onChange={(event, newValue) => this.setState({password: newValue})}
                            />
                            <br/>
                            <RaisedButton label="Submit" primary={true} style={style}
                                          onClick={(event) => this.handleClick(event)}/>
                        </div>
                    </MuiThemeProvider>
                )
                this.setState({menuValue: 2, loginComponent: localloginComponent, loginRole: 'teacher'})
            }
        }
    }

    handleClick(event) {
        var self = this;
        var payload = {
            "netID": this.state.userID,
            "password": this.state.password,
            //"role":this.state.loginRole
        };
        axios.post(apiBaseUrl + 'users/login', payload)
            .then(function (response) {
                console.log(response);
                if (response.status == 200) {
                    console.log("Login successful!");
                    let uploadScreen = [];
                    uploadScreen.push(<Profile appContext={self.props.appContext}
                                               role={response.data.data[0].type}
                                               userID={response.data.data[0].id}/>)
                    self.props.appContext.setState({loginPage: [], uploadScreen: uploadScreen})
                }
                else if (response.status == 204) {
                    console.log("userID password do not match");
                    alert("userID password do not match")
                }
                else {
                    console.log("userID does not exists");
                    alert("userID does not exist");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleMenuChange(value) {
        console.log("menuvalue", value);
        var loginRole;
        if (value == 1) {
            var localloginComponent = [];
            loginRole = 'student';
            localloginComponent.push(
                <MuiThemeProvider>
                    <div>
                        <TextField
                            hintText="Enter your College Rollno"
                            floatingLabelText="Student Id"
                            onChange={(event, newValue) => this.setState({userID: newValue})}
                        />
                        <br/>
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) => this.setState({password: newValue})}
                        />
                        <br/>
                        <RaisedButton label="Submit" primary={true} style={style}
                                      onClick={(event) => this.handleClick(event)}/>
                    </div>
                </MuiThemeProvider>
            )
        }
        else if (value == 2) {
            var localloginComponent = [];
            loginRole = 'teacher';
            localloginComponent.push(
                <MuiThemeProvider>
                    <div>
                        <TextField
                            hintText="Enter your netId"
                            floatingLabelText="Teacher Id"
                            onChange={(event, newValue) => this.setState({userID: newValue})}
                        />
                        <br/>
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) => this.setState({password: newValue})}
                        />
                        <br/>
                        <RaisedButton label="Submit" primary={true} style={style}
                                      onClick={(event) => this.handleClick(event)}/>
                    </div>
                </MuiThemeProvider>
            )
        }
        this.setState({
            menuValue: value,
            loginComponent: localloginComponent,
            loginRole: loginRole
        })
    }

    handleToggle = () => this.setState({open: !this.state.open});

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <Drawer open={this.state.open}>
                        <MenuItem onClick={() => this.setState({open: !this.state.open})}>About</MenuItem>
                    </Drawer>
                    <AppBar
                        title="Login"
                        onLeftIconButtonClick={this.handleToggle}
                    />
                </MuiThemeProvider>
                {this.state.loginComponent}
            </div>
        );
    }
}

const style = {
    margin: 15,
};

export default Login;
