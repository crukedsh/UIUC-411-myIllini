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
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VisibilityIcon from '@material-ui/icons/Visibility';
import BackspaceIcon from '@material-ui/icons/Backspace';

import SearchIcon from '@material-ui/icons/Search';
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
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import green from "@material-ui/core/es/colors/green";
import InputBase from "@material-ui/core/InputBase/InputBase";
import {fade} from "@material-ui/core/es/styles/colorManipulator";
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions/ExpansionPanelActions";
import Chip from "@material-ui/core/Chip/Chip";
import Profile from "./Profile";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import Avatar from "@material-ui/core/Avatar/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Switch from "@material-ui/core/Switch/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import PostDetail from "./PostDetail";

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
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 3,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
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
            width: 600,
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
        marginRight: theme.spacing.unit * 3,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    column: {
        flexBasis: '33.33%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
});

class Friends extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dialog: false,
            open: props.open,
            openSearch: false,
            page: [],
            loading: false,
            success: false,
            crn: 1,
            title: "",
            content: "",
            newPost: false,
            postData: [],
            post_id: 0,
            keyword: "",
            searchResult: [],
            isTop: 0,
            comment: "",
            sender_id: this.props.userID,
            receiver_id:null,
            userID:this.props.userID,
            friendsList:[]
        };
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': this.props.token
        };
    }

    componentWillMount() {
        axios.get(apiBaseUrl + "friends/list/" + this.props.userID , {headers: this.headers})
            .then((response) => {
                this.setState({friendsList : JSON.stringify(response.data)});
            }).catch(error => {
            console.log(error);
        });
    }

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };


    handleNewFriend = () => {
        let self = this;
        self.setState({newPost: true});
    };


    handleSubmit = () => {
        let payload = {
            comment: this.state.comment,
            sender_id: this.props.userID,
            receiver_id: this.state.receiver_id,
            status: "requested"
        };
        console.log(payload);
        axios.post(apiBaseUrl + "friends/request", payload, {headers: this.headers})
            .then(response =>{
                this.setState(
                    {
                        loading: true
                    },
                    () => {
                        console.log(this.state);
                        let page = [];
                        page.push(this.renderNewFriends());
                        this.setState({page: page});
                        this.timer = setTimeout(() => {
                            this.setState({
                                loading: false,
                            }, () => this.setState({newPost: true}));
                            alert("New Friend Request sent!");
                            this.refreshPosts();
                        }, 1000);
                    }
                );

            }).catch(error => {
                alert(error);
        });

    };

    renderFriends() {
        const {classes} = this.props;
        let page = [(<Button variant="fab" color='primary' onClick={this.handleNewFriend}>
            <AddIcon/>
            </Button>
        )];
        page.push(
            <div>{this.state.friendsList}</div>
        );

        page.push(
            <div>
                {this.state.postData.map((row, index) => (
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <div className={classes.column}>
                                <Typography className={classes.heading}>{row.title}</Typography>
                            </div>
                            <div>
                                <Typography className={classes.secondaryHeading}>
                                    Create at: {row.created_at} by {row.creator}
                                </Typography>
                            </div>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.details}>
                            <Typography>
                                {row.content}
                            </Typography>
                        </ExpansionPanelDetails>
                        <Divider/>
                        <ExpansionPanelActions>
                            <Button
                                // type="submit"
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                                disabled={row.creator != this.props.userID}
                                onClick={() => this.setState({
                                    dialog: true,
                                    post_id: row.post_id
                                })}
                            >
                                <DeleteIcon className={classNames(classes.leftIcon)}/>
                                Delete
                                {console.log(row)}
                            </Button>

                            <Button
                                // type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={() => {
                                    let page = (<PostDetail appContext={this.props.appContext}
                                                       open={this.state.open}
                                                       userID={this.props.userID}
                                                       role={this.props.role}
                                                       token={this.props.token}
                                                        post_id={row.post_id}
                                                        title={row.title}
                                                        content={row.content}
                                                            creator={row.creator}
                                                            created_at={row.created_at}/>);
                                    this.props.appContext.setState({page: page})
                                }}
                            >
                                <VisibilityIcon className={classNames(classes.leftIcon)}/>
                                Details
                            </Button>
                        </ExpansionPanelActions>
                    </ExpansionPanel>
                ))}
            </div>
        );
        return page;
    }



    renderNewFriends() {
        const {classes} = this.props;
        return (
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Add New Friend
                </Typography>
                <form className={classes.form}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="last_name">netId</InputLabel>
                        <Input id="receiver_id" name="receiver_id" autoComplete="receiver_id"
                               onChange={(event) => this.setState({receiver_id: event.target.value})}/>
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="comment">Message (less than 200 words)</InputLabel>
                        <Input multiline id="comment" name="comment" autoComplete="Message (less than 200 words)"
                               onChange={(event) => this.setState({comment: event.target.value})}/>
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
                    <Button
                        // type="submit"
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        onClick={() => this.setState({newPost: false})}
                    >
                        <BackspaceIcon className={classNames(classes.leftIcon)}/>
                        Back
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
                                Friends
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    {this.state.openSearch &&
                    <Paper className={classes.searchpaper}>
                        <List>
                            {this.state.searchResult.map((row, index) => (
                                <ListItem button onClick={() => {
                                    let found=false;
                                    if (!found){
                                        alert("You are not in this course!");
                                        return;
                                    }
                                    let page = (<PostDetail appContext={this.props.appContext}
                                                            open={this.state.open}
                                                            userID={this.props.userID}
                                                            role={this.props.role}
                                                            token={this.props.token}
                                                            post_id={row.post_id}
                                                            title={row.title}
                                                            content={row.content} creator={row.creator}
                                                            created_at={row.created_at}/>);
                                    this.props.appContext.setState({page: page})
                                }}>
                                    <ListItemText primary={row.title} secondary={row.created_at}/>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>}
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
                        {this.state.newPost ? this.renderNewFriends() : this.renderFriends()}
                        <Dialog
                            open={this.state.dialog}
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"老铁，真的要删么？"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    一旦删除便无法撤回！
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => this.setState({dialog: false})} color="secondary">
                                    No
                                </Button>
                                <Button onClick={() => this.handleDelete(this.state.post_id)} color="primary" autoFocus>
                                    Yes
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </main>
                </MuiThemeProvider>
            </div>
        );
    }
}

Friends.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Friends);