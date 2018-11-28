import {createMuiTheme, MuiThemeProvider, withStyles} from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";
import pink from "@material-ui/core/colors/pink";
import red from "@material-ui/core/colors/red";
import {fade} from "@material-ui/core/es/styles/colorManipulator";
import green from "@material-ui/core/es/colors/green";
import React from "react";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import AppBar from "@material-ui/core/AppBar/AppBar";
import classNames from "classnames";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import RateReviewIcon from '@material-ui/icons/RateReview';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VisibilityIcon from '@material-ui/icons/Visibility';
import BackspaceIcon from '@material-ui/icons/Backspace';
import SearchIcon from '@material-ui/icons/Search';
import Typography from "@material-ui/core/Typography/Typography";
import InputBase from "@material-ui/core/InputBase/InputBase";
import Paper from "@material-ui/core/Paper/Paper";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Drawer from "@material-ui/core/Drawer/Drawer";
import Divider from "@material-ui/core/Divider/Divider";
import {drawerItemLogged} from "./DrawerItems";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Switch from "@material-ui/core/Switch/Switch";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import Forum from "./Forum";
import Grid from "@material-ui/core/Grid/Grid";


let apiBaseUrl = "http://localhost:3001/";

const drawerWidth = 240;

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: pink,
        error: red,
        success: green,
        // contrastThreshold: 3,
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
    RightIcon: {
        marginRight: theme.spacing.unit,
        align: "right",
        marginBottom: "10px",
        size: "small",
        textAlign: "right"
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
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
        // alignItems: 'center',
        marginBottom: "30px",
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    searchpaper: {
        position: 'absolute',
        height: 'auto',
        width: 'auto',
        marginLeft: '1100px',
        marginTop: '80px',
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

class PostDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dialog: false,
            open: props.open,
            openSearch: false,
            page: [],
            loading: false,
            success: false,
            content: "",
            newPost: false,
            reviewData: [],
            post_id: 0,
            keyword: "",
            searchResult: []
        };
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': this.props.token
        };
        this.crn = [
            {
                value: 0,
                label: "Select a course:"
            }
        ]
    };

    componentWillMount() {
        this.refreshReview();
    }

    refreshReview() {
        axios.get(apiBaseUrl + "forum/review/" + this.props.post_id.toString(), {headers: this.headers})
            .then((response) => {
                console.log(response.data.data);
                this.setState({reviewData: response.data.data});
            })
            .catch(function (err) {
                alert(err.toString())
            });
    }

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    handleEndorse = (review_id) => {
        let putdata = {
            review_id: review_id,
            endorsed: 1
        };
        axios.put(apiBaseUrl + "forum/review", putdata, {headers: this.headers})
            .then((response) => {
                this.refreshReview();
            })
            .catch(function (err) {
                alert(err.toString())
            });
    };

    handleCancelEndorse = (review_id) => {
        let putdata = {
            review_id: review_id,
            endorsed: 0
        };
        axios.put(apiBaseUrl + "forum/review", putdata, {headers: this.headers})
            .then((response) => {
                this.refreshReview();
            })
            .catch(function (err) {
                alert(err.toString())
            });
    };
    handleDelete = (review_id) => {
        axios.delete(apiBaseUrl + "forum/review/" + review_id.toString(), {headers: this.headers})
            .then((response) => {
                this.refreshReview();
            })
            .catch(function (err) {
                alert(err.toString())
            });
    };

    handleKeywordChange = (event) => {
        if (event.target.value.length == 0) {
            this.setState({openSearch: false});
            return;
        }
        axios.get(apiBaseUrl + "forum/search/" + event.target.value, {headers: this.headers})
            .then((response) => {
                if (response.data.data.length == 0) {
                    this.setState({openSearch: false});
                    return;
                }
                this.setState({searchResult: response.data.data}
                    , () => this.setState({
                        openSearch: true,
                        newPost: false
                    }));
            })
            .catch(function (err) {
                alert(err.toString())
            });
    };

    handleSubmit = () => {
        let payload = {
            content: this.state.content,
            creator: this.props.userID,
            endorsed: this.props.role == "teacher" ? 1 : 0,
            post_id: this.props.post_id
        };
        axios.post(apiBaseUrl + "forum/review", payload, {headers: this.headers})
            .then((response) => {
                this.refreshReview();
            })
            .catch(function (err) {
                alert(err.toString())
            });
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
                                Post Detail
                            </Typography>
                            {/*<div className={classes.search}>*/}
                                {/*<div className={classes.searchIcon}>*/}
                                    {/*<SearchIcon/>*/}
                                {/*</div>*/}
                                {/*<InputBase*/}
                                    {/*placeholder="Search…"*/}
                                    {/*classes={{*/}
                                        {/*root: classes.inputRoot,*/}
                                        {/*input: classes.inputInput,*/}
                                    {/*}}*/}
                                    {/*onChange={(event) => this.handleKeywordChange(event)}*/}
                                {/*/>*/}
                            {/*</div>*/}
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
                        <Paper className={classes.paper}>
                            <Typography component="h1" variant="h4" align="center">
                                {this.props.title}
                            </Typography>
                            <Divider/>
                            <Typography variant="h6">
                                {this.props.content}
                            </Typography>
                        </Paper>
                        <Paper className={classes.paper}>
                            <Typography component="h1" variant="h5">
                                Reviews
                            </Typography>
                            <Divider/>
                            <List>
                                {this.state.reviewData.map((row, index) => (
                                        <div>
                                            <ListItem>
                                                <ListItemIcon color="primary">
                                                    <AccountCircleIcon/>
                                                </ListItemIcon>
                                                <ListItemText primary={row.creator} secondary={row.created_at}/>
                                            </ListItem>
                                            <ListItemText primary={row.content}/>
                                            {row.endorsed == 1 && <Typography component="p" color="primary">
                                                This review was endorsed by instructor
                                            </Typography>}

                                            <Grid container className={classes.root}
                                                  direction="row"
                                                  justify="flex-end">
                                                {this.props.role == "teacher" &&
                                                (row.endorsed == 0 ?
                                                    <Button
                                                        sizeSmall
                                                        variant="contained"
                                                        color="primary"
                                                        className={classes.RightIcon}
                                                        onClick={() => this.handleEndorse(row.review_id)}
                                                    >
                                                        Endorse
                                                    </Button> :
                                                    <Button
                                                        variant="contained"
                                                        color="success"
                                                        className={classes.RightIcon}
                                                        onClick={() => this.handleCancelEndorse(row.review_id)}
                                                    >
                                                        <DoneIcon className={classNames(classes.leftIcon)}/>
                                                        Endorsed
                                                    </Button>)}
                                                {row.creator == this.props.userID &&
                                                <Button
                                                    // type="submit"
                                                    sizeSmall
                                                    variant="contained"
                                                    color="secondary"
                                                    className={classes.RightIcon}
                                                    onClick={() => this.handleDelete(row.review_id)}
                                                >
                                                    <DeleteIcon className={classNames(classes.leftIcon)}/>
                                                    Delete
                                                </Button>}
                                            </Grid>
                                            <Divider/>
                                        </div>
                                    )
                                )}
                            </List>
                            <form className={classes.form}>
                                <FormControl margin="normal" required fullWidth>

                                </FormControl>
                                <Divider/>
                                <FormControl margin="normal" fullWidth>
                                    <InputLabel htmlFor="content">Write a Review (less than 5000 words)</InputLabel>
                                    <Input multiline id="content" name="content"
                                           autoComplete="Write a Review (less than 5000 words)"
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
                                    <RateReviewIcon className={classNames(classes.leftIcon)}/>
                                    Submit
                                </Button>
                                <Button
                                    // type="submit"
                                    variant="contained"
                                    color="secondary"
                                    className={classes.submit}
                                    onClick={() => this.props.appContext.setState({
                                        page: (<Forum appContext={this.props.appContext}
                                                      open={this.state.open}
                                                      userID={this.props.userID}
                                                      role={this.props.role}
                                                      token={this.props.token}/>)
                                    })}
                                    align="right"
                                >
                                    <BackspaceIcon className={classNames(classes.leftIcon)}/>
                                    Back
                                </Button>
                                {this.state.loading && <CircularProgress size={60} className={classes.buttonProgress}/>}
                            </form>
                        </Paper>
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

PostDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostDetail);