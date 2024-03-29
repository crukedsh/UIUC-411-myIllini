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
import Button from "@material-ui/core/Button/Button";
import axios from "axios";
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions/ExpansionPanelActions";
import grey from "@material-ui/core/es/colors/grey";
import ClearIcon from "@material-ui/icons/Clear";
import MyCourse from "./MyCourses";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Table from "@material-ui/core/Table/Table";

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
    heading: {
        fontSize: 18,
        flexBasis: '50%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: 18,
        color: grey[500]
    },
    buttonArea: {
        width: "100%",
        maxWidth: 1000,
        marginLeft: "auto",
        marginRight: "auto"
    }
});

class RegisterCourse extends React.Component {
    constructor(props) {
        console.log(props);
        super(props);

        this.state = {
            tableData: [],
            registered: [],
            full: [],
            conflict: [],
            open: props.open
        };
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': this.props.token
        }
    }

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    registerCourse(crn) {
        if (this.props.role == "teacher") {
            console.log("Error!");
        } else {
            console.log("Add!");

            let payload = {
                "crn": crn,
                "user_id": this.props.userID
            };

            console.log(payload);
            axios.post(apiBaseUrl + "students/course-register", payload, {headers: this.headers})
                .then((response) => {
                    console.log(response);
                    if  (response.status == 200 && response.data.error==="") {
                        let curCrn = this.state.registered;
                        curCrn.push(crn);
                        this.setState({registered: curCrn});
                    } else if (response.data.error==="full"){
                        let curCrn = this.state.full;
                        curCrn.push(crn);
                        this.setState({full: curCrn});
                    } else if (response.data.error==="conflict"){
                        let curCrn = this.state.conflict;
                        curCrn.push(crn);
                        this.setState({conflict: curCrn});
                    }
                });


        }
    }


    componentWillMount() {

        axios.get(apiBaseUrl + "students/course-unselected/" + this.props.userID, {headers: this.headers})
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
                                Register Courses
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
                    <div className={classes.mainPage}>
                        {this.state.tableData.map((row, index) => (
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography align="left" className={classes.heading}>{row.title}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>CRN</TableCell>
                                                <TableCell numeric>{row.crn}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Enrollment</TableCell>
                                                <TableCell numeric>{row.enrolled_num} / {row.capacity}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Meeting 1</TableCell>
                                                <TableCell
                                                    numeric>{row.weekday[0]} {row.start_time[0]}-{row.end_time[0]} @ {row.location[0]}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Meeting 2</TableCell>
                                                <TableCell
                                                    numeric>{row.weekday[1]} {row.start_time[1]}-{row.end_time[1]} @ {row.location[1]}</TableCell>
                                            </TableRow>
                                            <TableRow >
                                                <TableCell colSpan={2}>{row.description}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </ExpansionPanelDetails>
                                <ExpansionPanelActions>
                                    {
                                        this.state.registered.includes(row.crn) ?
                                            <Button disabled> added </Button> : this.state.full.includes(row.crn) ?
                                            <Button disabled> full </Button> : this.state.conflict.includes(row.crn) ?
                                            <Button disabled> conflict </Button> :
                                            <Button onClick={
                                                () => this.registerCourse(row.crn)}>add</Button>
                                    }
                                </ExpansionPanelActions>
                            </ExpansionPanel>
                        ))}
                        <Button color="primary" aria-label="Back" onClick={() => this.handleClickBack()}>
                            <ClearIcon/>
                        </Button>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

RegisterCourse.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterCourse);