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
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {about, drawerItemLogged} from './DrawerItems';
import blue from "@material-ui/core/colors/blue";
import pink from "@material-ui/core/colors/pink";
import red from "@material-ui/core/colors/red";
import Paper from "@material-ui/core/Paper/Paper";
import TextField from "@material-ui/core/TextField/TextField";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import Button from "@material-ui/core/Button/Button";
import axios from "axios";
import Profile from "./Profile"
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import green from "@material-ui/core/es/colors/green";

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
    leftIcon: {
        marginRight: theme.spacing.unit,
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
        marginLeft: theme.spacing.unit * 1,
        marginRight: theme.spacing.unit * 1,
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
        marginTop: theme.spacing.unit * 3,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
});

class Forum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            page: [],
            loading: false,
            success: false,
            crn: 1,
            title: "",
            content: ""
        };
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': this.props.token
        };
        //this.crn=[];
        // TODO: change fake data!
        this.crn = [
            {
                value: 2,
                label: 20
            },
            {
                value: 1,
                label: 100
            }
        ]
    }

    componentWillMount() {
        let page = [(<Button variant="fab" color='primary' onClick={this.handleNewPost}>
            <AddIcon/>
        </Button>)];

        if (this.props.role == "teacher") {
            let payload = {
                "user_id": this.props.userID
            };
            axios.post(apiBaseUrl + "professors/course-info", payload, {headers: this.headers})
                .then((response) => {
                    if (response.status == 400) {
                        console.log("Username does not exists");
                        alert("Username does not exist");
                    } else if (response.status == 200) {
                        console.log(response.data.data);
                        // response.data.data.forEach((row)=>{
                        //     this.crn.push({
                        //         value:row.crn,
                        //         label:row.title,
                        //     });
                        // });
                        console.log(this.crn);
                    } else {
                        alert("unknown error")
                    }
                })
        }
        this.setState({page: page})
    }

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };


    handleNewPost = () => {
        let self = this;
        let page = [];
        page.push(this.renderNewPosts());
        self.setState({page: page});
    };

    handleSubmit = () => {
        let payload = {
            crn: parseInt(this.state.crn),
            // crn:1,
            title: this.state.title,
            content: this.state.content,
            creator: this.props.userID

        };
        axios.post(apiBaseUrl + "forum/post", payload, {headers: this.headers})
            .then((response) => {
                if (response.status === 400) {
                    alert(response.data.error);
                    return;
                }
                this.setState(
                    {
                        loading: true
                    },
                    () => {
                        console.log(this.state);
                        let page = [];
                        page.push(this.renderNewPosts());
                        this.setState({page: page});
                        this.timer = setTimeout(() => {
                            this.setState({
                                loading: false,
                            }, () => this.setState({page: this.renderNewPosts()}));
                            alert("New Post Added!");
                            this.setState({page: this.renderPosts()});//TODO: A NEW PAGE
                        }, 1000);
                    }
                );
            });

    };

    renderPosts() {
        const {classes} = this.props;
        return (

            <form className={classes.form}>
                <FormControl margin="normal" required fullWidth>
                    <TextField label="Course Title"
                               select
                               className={classes.textField}
                               value={this.state.crn}
                               SelectProps={{
                                   native: true,
                                   MenuProps: {
                                       className: classes.menu,
                                   },
                               }}
                               onChange={(event) => {
                                   this.setState({crn: event.target.value}, () => this.setState({page: this.renderPosts()}))
                               }}>
                        {this.crn.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                </FormControl>
            </form>
        );
    }

    renderNewPosts() {
        const {classes} = this.props;
        return (
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h5">
                    New Post
                </Typography>
                <form className={classes.form}>
                    <FormControl margin="normal" required fullWidth>
                        <TextField label="Course Title"
                                   select
                                   className={classes.textField}
                                   value={this.state.crn}
                                   SelectProps={{
                                       native: true,
                                       MenuProps: {
                                           className: classes.menu,
                                       },
                                   }}
                                   onChange={(event) => {
                                       this.setState({crn: event.target.value}, () => this.setState({page: this.renderNewPosts()}))
                                   }}>
                            {this.crn.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="last_name">Title</InputLabel>
                        <Input id="last_name" name="last_name" autoComplete="last_name"
                               onChange={(event) => this.setState({title: event.target.value})}/>
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="content">Content (less than 5000 words)</InputLabel>
                        <Input multiline id="content" name="content" autoComplete="Content (less than 5000 words)"
                               onChange={(event) => this.setState({content: event.target.value})}/>
                    </FormControl>

                    <Button
                        // type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={this.state.loading}
                        onClick={this.handleSubmit}
                    >
                        <SaveIcon className={classNames(classes.leftIcon)}/>
                        Submit
                    </Button>
                    {this.state.loading && <CircularProgress size={60} className={classes.buttonProgress}/>}
                </form>
            </Paper>
        );
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
                                Forum
                            </Typography>
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
                        {this.state.page}

                    </main>
                </MuiThemeProvider>
            </div>
        );
    }
}

Forum.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Forum);