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
import Login from "./Login"
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";


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
    },

    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
    mainPage: {
        marginTop: theme.spacing.unit * 12,
        height: '100vh',
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 2,
    },

    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
    radio: {
        marginLeft: theme.spacing.unit * 6
    }
});

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            userID: '',
            password: '',
        };
    }

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    handleSubmit = () => {
        let payload = {
            "first_name": this.state.first_name,
            "last_name": this.state.last_name,
            "email": this.state.email,
            "password": this.state.password,
            "role": this.state.role,
            "netID": this.state.userID
        };
        console.log(payload);
        let self = this;
        axios.post(apiBaseUrl + 'users/register', payload)
            .then(function (response) {
                console.log(response);
                if (response.status === 201) {
                    console.log("registration successful");
                    alert("Registration successful!");
                    let page = [];
                    page.push(<Login appContext={self.props.appContext} open={self.state.open}/>);
                    self.props.appContext.setState({
                        page: page
                    });
                }
                else {
                    console.log("some error ocurred", response.statusText);
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    handleRegister = () => {
        let self = this;
        let page = [];
        page.push(<Login appContext={self.props.appContext}
                         open={self.state.open}/>);
        self.props.appContext.setState({page: page});
    };

    handleRadioChange = event => {
        this.setState({role: event.target.value});
    };

    render() {
        const {classes} = this.props;

        return (

            <div className={classes.root}>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline/>
                    <AppBar
                        position="absolute"
                        className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
                    >
                        <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(
                                    classes.menuButton,
                                    this.state.open && classes.menuButtonHidden,
                                )}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                className={classes.title}
                                align="left"
                            >
                                Register
                            </Typography>
                            <Button color="inherit" onClick={this.handleRegister}>
                                Login
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        classes={{
                            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                        }}
                        open={this.state.open}
                    >
                        <div className={classes.toolbarIcon}>
                            <IconButton onClick={this.handleDrawerClose}>
                                <ChevronLeftIcon/>
                            </IconButton>
                        </div>
                        <Divider/>
                        <List>{new about().render()}</List>
                    </Drawer>

                    <CssBaseline/>
                    <main className={classes.mainPage}>

                        <Paper className={classes.paper}>
                            <Typography component="h1" variant="h5">
                                Register
                            </Typography>
                            <form className={classes.form}>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="netid">NetID</InputLabel>
                                    <Input id="netid" name="netid" autoComplete="id" autoFocus
                                           onChange={(event) => this.setState({userID: event.target.value})}/>
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="first_name">First Name</InputLabel>
                                    <Input id="first_name" name="first_name" autoComplete="first_name"
                                           onChange={(event) => this.setState({first_name: event.target.value})}/>
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="last_name">Last Name</InputLabel>
                                    <Input id="last_name" name="last_name" autoComplete="last_name"
                                           onChange={(event) => this.setState({last_name: event.target.value})}/>
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="email">Email</InputLabel>
                                    <Input id="email" name="email" autoComplete="email"
                                           onChange={(event) => this.setState({email: event.target.value})}/>
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <Input name="password" type="password" id="password" autoComplete="current-password"
                                           onChange={(event) => this.setState({password: event.target.value})}/>
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <RadioGroup
                                        aria-label="Role"
                                        name="role"
                                        className={classes.group}
                                        value={this.state.role}
                                        onChange={this.handleRadioChange}
                                        row={true}
                                    >
                                        <FormControlLabel value="teacher" control={<Radio/>} label="Teacher"/>
                                        <FormControlLabel value="student" control={<Radio/>} label="Student"
                                                          className={classes.radio}/>
                                    </RadioGroup>
                                </FormControl>
                                <Button
                                    // type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={this.handleSubmit}
                                >
                                    Register
                                </Button>
                            </form>
                        </Paper>
                    </main>
                </MuiThemeProvider>
            </div>
        );
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);