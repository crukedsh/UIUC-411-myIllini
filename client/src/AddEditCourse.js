import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {createMuiTheme, MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {drawerItemLogged} from './DrawerItems';
import blue from "@material-ui/core/colors/blue";
import pink from "@material-ui/core/colors/pink";
import red from "@material-ui/core/colors/red";
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import MyCourse from "./MyCourses";
import axios from "axios";

let apiBaseUrl = "http://localhost:3001/";

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
        width: 1000,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    avatar: {
        margin: 5,
        color: '#fff',
        backgroundColor: blue[500],
    },
    pageRoot: {
        width: "100%",
        maxWidth: 1000,
        marginLeft: "auto",
        marginRight: "auto"
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: 10,
        marginRight: 10,
        width: 230,
        margin: "normal"
    },
    longTextField: {
        marginLeft: 10,
        marginRight: 10,
        width: 480,
        margin: "normal"
    },
});

class AddEditCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            crn: this.props.crn,
            title: this.props.title,
            capacity: this.props.capacity
        };
    }

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    handleClickDone() {
        console.log(this.state);
        if (this.state.crn.length == 0) {
            alert("CRN must not be empty!")
        } else {
            let payload = {
                "crn": parseInt(this.state.crn),
                "title": this.state.title,
                "capacity": parseInt(this.state.capacity),
                "user_id": this.props.userID
            };

            console.log(payload);
            if (this.props.isAdd) {
                axios.post(apiBaseUrl + "professors/create-course", payload)
                    .then((response) => {
                        console.log(response);
                        if (response.status == 400) {
                            alert("course already exists!");
                        } else if (response.status == 200) {
                            alert("course created successfully!")
                        }
                    });
            } else {
                axios.post(apiBaseUrl + "professors/edit-course", payload)
                    .then((response) => {
                        console.log(response);
                        if (response.status == 400) {
                            alert("error!");
                        } else if (response.status == 200) {
                            alert("course edited successfully!")
                        }
                    });
            }
            this.handleClickBack()
        }
    }

    handleClickBack() {
        console.log("Back to course!");
        let page = [];
        page.push(<MyCourse
            appContext={this.props.appContext}
            role={this.props.role}
            userID={this.props.userID}/>);
        this.props.appContext.setState({page: page})
    }

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
                                {this.props.isAdd ? "Add Course" : "Edit Course"}
                            </Typography>
                            <IconButton color="inherit">
                                <AccountCircleIcon/>
                            </IconButton>
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
                        {drawerItemLogged(this.props.appContext, this.props.userID,
                            this.props.role, this.state.open)}
                    </Drawer>

                    <CssBaseline/>
                    <main className={classes.mainPage}>


                        <div className={classes.pageRoot}>
                            <form className={classes.container} noValidate>
                                {this.props.isAdd ?
                                    <TextField
                                        required
                                        id="crn"
                                        label="CRN"
                                        defaultValue={this.props.crn}
                                        className={classes.textField}
                                        onChange={(event) => (this.setState({crn: event.target.value}))}
                                    />
                                    :
                                    <TextField
                                        required
                                        disabled
                                        id="crn"
                                        label="CRN"
                                        defaultValue={this.props.crn}
                                        className={classes.textField}
                                    />}

                                <TextField
                                    id="title"
                                    label="Title"
                                    defaultValue={this.props.title}
                                    className={classes.longTextField}
                                    onChange={(event) => (this.setState({title: event.target.value}))}
                                />
                                <TextField
                                    id="capacity"
                                    label="Capacity"
                                    defaultValue={this.props.capacity}
                                    type="number"
                                    className={classes.textField}
                                    onChange={(event) => (this.setState({capacity: event.target.value}))}
                                />
                                <TextField
                                    disabled
                                    id="detail"
                                    label="Detail"
                                    multiline
                                    rows="5"
                                    style={{margin: 10}}
                                    fullWidth
                                /></form>

                        </div>
                        <div>
                            <Button color="primary" aria-label="Done" onClick={() => this.handleClickDone()}>
                                <DoneIcon/>
                            </Button>
                            <Button color="primary" aria-label="Back" onClick={() => this.handleClickBack()}>
                                <ClearIcon/>
                            </Button>

                        </div>
                    </main>
                </MuiThemeProvider>
            </div>
        );
    }
}

AddEditCourse.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddEditCourse);