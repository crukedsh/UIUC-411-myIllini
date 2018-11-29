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
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import FormControl from "@material-ui/core/FormControl/FormControl";

let apiBaseUrl = "http://chenzhu2.web.illinois.edu/";

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
        marginTop: theme.spacing.unit * 3,
        marginLeft: 10,
        marginRight: 10,
        width: 230,
        margin: "normal"
    },
    longTextField: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: 10,
        marginRight: 10,
        width: 480,
        margin: "normal"
    },
    select: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: 10,
        marginRight: 10,
        width: 230,
        margin: "normal"
    },
    warning: {
        color: 'red',
        fontStyle: "italic"
    }
});

class AddEditCourse extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.isAdd) {
            this.state = {
                open: props.open,
                start_time_1: "11:00",
                start_time_2: "11:00",
                end_time_1: "12:15",
                end_time_2: "12:15",
                weekday_1: "M",
                weekday_2: "W",
                location_1: "Siebel 1404",
                location_2: "Siebel 1404",
                capacity: "",
                description: "",
                crn: "",
                title: "",
            };
        } else {
            this.state = {
                open: props.open,
                crn: this.props.crn,
                title: this.props.title,
                capacity: this.props.capacity,
                description: this.props.description,
                start_time_1: this.props.start_time[0],
                start_time_2: this.props.start_time[1],
                end_time_1: this.props.end_time[0],
                end_time_2: this.props.end_time[1],
                weekday_1: this.props.weekday[0],
                weekday_2: this.props.weekday[1],
                location_1: this.props.location[0],
                location_2: this.props.location[1]
            };
        }
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': this.props.token
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
            let weekday = [this.state.weekday_1, this.state.weekday_2];
            let start_time = [this.state.start_time_1, this.state.start_time_2];
            let end_time = [this.state.end_time_1, this.state.end_time_2];
            let location = [this.state.location_1, this.state.location_2];
            let payload = {
                "crn": parseInt(this.state.crn),
                "title": this.state.title,
                "capacity": parseInt(this.state.capacity),
                "user_id": this.props.userID,
                "description": this.state.description,
                "start_time": start_time,
                "end_time": end_time,
                "weekday": weekday,
                "location": location
            };

            console.log(payload);
            if (this.props.isAdd) {
                axios.post(apiBaseUrl + "professors/create-course", payload, {headers: this.headers})
                    .then((response) => {
                            console.log(response);
                            if (response.status == 400) {
                                alert("course already exists!");
                            } else if (response.status == 200) {
                                alert("course created successfully!")
                            } else {
                                alert("bad response " + response.status)
                            }
                            this.handleClickBack();
                        }
                    )
                    .catch(function (err) {
                        alert(err.toString());
                    });

            } else {
                axios.post(apiBaseUrl + "professors/edit-course", payload, {headers: this.headers})
                    .then((response) => {
                            console.log(response);
                            if (response.status == 400) {
                                alert("error!");
                            } else if (response.status == 200) {
                                alert("course edited successfully!")
                            }

                            this.handleClickBack();
                        }
                    );

            }
        }
    }

    handleClickBack() {
        console.log("Back to course!");
        let page = [];
        page.push(<MyCourse
            appContext={this.props.appContext}
            role={this.props.role}
            userID={this.props.userID}
            open={this.state.open}
            token={this.props.token}/>);
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
                            this.props.role, this.state.open, this.props.token)}
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
                                        value={this.state.crn}
                                        className={classes.textField}
                                        onChange={(event) => (this.setState({crn: event.target.value}))}
                                    />
                                    :
                                    <TextField
                                        required
                                        disabled
                                        id="crn"
                                        label="CRN"
                                        value={this.state.crn}
                                        className={classes.textField}
                                    />}

                                <TextField
                                    id="title"
                                    label="Title"
                                    value={this.state.title}
                                    className={classes.longTextField}
                                    onChange={(event) => (this.setState({title: event.target.value}))}
                                />
                                <TextField
                                    id="capacity"
                                    label="Capacity"
                                    value={this.state.capacity}
                                    type="number"
                                    className={classes.textField}
                                    onChange={(event) => (this.setState({capacity: event.target.value}))}
                                />
                                <TextField
                                    id="start_time_1"
                                    label="Start time"
                                    type="time"
                                    value={this.state.start_time_1}
                                    className={classes.textField}
                                    onChange={(event) => (this.setState({start_time_1: event.target.value}))}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300,
                                    }}
                                />
                                <TextField
                                    id="end_time_1"
                                    label="End time"
                                    type="time"
                                    value={this.state.end_time_1}
                                    className={classes.textField}
                                    onChange={(event) => (this.setState({end_time_1: event.target.value}))}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300,
                                    }}
                                />
                                <Select
                                    value={this.state.weekday_1}
                                    onChange={(event) => (this.setState({weekday_1: event.target.value}))}
                                    id="weekday_1"
                                    className={classes.select}
                                >
                                    <MenuItem value="M">Monday</MenuItem>
                                    <MenuItem value="T">Tuesday</MenuItem>
                                    <MenuItem value="W">Wednesday</MenuItem>
                                    <MenuItem value="R">Thursday</MenuItem>
                                    <MenuItem value="F">Friday</MenuItem>
                                </Select>
                                <TextField
                                    id="location_1"
                                    label="Location"
                                    value={this.state.location_1}
                                    className={classes.textField}
                                    onChange={(event) => (this.setState({location_1: event.target.value}))}
                                />
                                <TextField
                                    id="start_time_2"
                                    label="Start time"
                                    type="time"
                                    value={this.state.start_time_2}
                                    className={classes.textField}
                                    onChange={(event) => (this.setState({start_time_2: event.target.value}))}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300,
                                    }}
                                />
                                <TextField
                                    id="end_time_2"
                                    label="End time"
                                    type="time"
                                    value={this.state.end_time_2}
                                    className={classes.textField}
                                    onChange={(event) => (this.setState({end_time_2: event.target.value}))}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300,
                                    }}
                                />
                                <Select
                                    value={this.state.weekday_2}
                                    onChange={(event) => (this.setState({weekday_2: event.target.value}))}
                                    id="weekday_2"
                                    className={classes.select}
                                >
                                    <MenuItem value="M">Monday</MenuItem>
                                    <MenuItem value="T">Tuesday</MenuItem>
                                    <MenuItem value="W">Wednesday</MenuItem>
                                    <MenuItem value="R">Thursday</MenuItem>
                                    <MenuItem value="F">Friday</MenuItem>
                                </Select>
                                <TextField
                                    id="location_2"
                                    label="Location"
                                    value={this.state.location_2}
                                    className={classes.textField}
                                    onChange={(event) => (this.setState({location_2: event.target.value}))}
                                />
                                <TextField
                                    id="description"
                                    label="Description"
                                    value={this.state.description}
                                    multiline
                                    rows="5"
                                    onChange={(event) => (this.setState({description: event.target.value}))}
                                    style={{margin: 10}}
                                    fullWidth
                                />
                            </form>

                        </div>
                        {this.props.isAdd ? <Typography/> :
                            <div>
                                <Typography className={classes.warning}> * Warning: Editing schedules may cause time conflicts for registered students</Typography>
                            </div>
                        }
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