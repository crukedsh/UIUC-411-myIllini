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
import MyCourses from "./MyCourses";
import Table from "@material-ui/core/Table/Table";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Button from "@material-ui/core/Button/Button";
import ClearIcon from "@material-ui/icons/Clear";
import axios from "axios";

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
});

class Roster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            tableData: [],
        };
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


    componentWillMount() {
        let payload = {
            "crn": this.props.crn
        };

        axios.post(apiBaseUrl + "professors/course-roster", payload, {headers: this.headers})
            .then((response) => {
                console.log(response.data)
                if (response.status == 400) {
                    console.log("crn does not exist");
                    alert("crn does not exist");
                } else if (response.status == 200) {
                    console.log(response.data.data);
                    this.setState({
                        tableData: response.data.data
                    });
                } else {
                    alert("unknown error")
                }
            })


    }

    handleClickBack() {
        console.log("Back to course!");
        let page = [];
        page.push(<MyCourses
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
                                Roster
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
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>NetID</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                        {this.state.tableData.map((row, index) => {return (
                            <TableRow key={row.user_id}>
                                <TableCell>{row.first_name} {row.last_name}</TableCell>
                                <TableCell>{row.user_id}</TableCell>
                            </TableRow>
                        );})
                          }
                            </TableBody>
                        </Table>
                        <Button color="primary" aria-label="Back" onClick={() => this.handleClickBack()}>
                            <ClearIcon/>
                        </Button>
                    </main>
                </MuiThemeProvider>
            </div>
        );
    }
}

Roster.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Roster);