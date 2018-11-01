import React, {Component} from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Button from "@material-ui/core/Button/Button";
import ClearIcon from "@material-ui/icons/Clear";
import MenuIcon from "@material-ui/icons/Menu";
import DoneIcon from "@material-ui/icons/Done";
import Profile from "./Profile";
import MyCourse from "./MyCourses";
import TextField from "@material-ui/core/TextField/TextField";

const apiBaseUrl = "http://localhost:3001/";

class AddEditCourse extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tableData: []
        };
    }

    componentWillMount() {
        // axios.get(apiBaseUrl + "students/course-selected/" + this.props.userID)
        //     .then((response) => {
        //         console.log(response.data)
        //         if (response.status == 400) {
        //             console.log("Username does not exists");
        //             alert("Username does not exist");
        //         } else if (response.status == 200) {
        //             this.setState({
        //                 tableData: response.data.data
        //             });
        //             console.log(this.state)
        //         } else {
        //             alert("unknown error")
        //         }
        //     })
    }

    handleClickProfile(){
        console.log("Profile!");
        let uploadScreen=[];
        uploadScreen.push(<Profile
            appContext={this.props.appContext}
            role={this.props.role}
            userID={this.props.userID}/>);
        this.props.appContext.setState({uploadScreen:uploadScreen})
    }

    handleClickBack(){
        console.log("Back to course!");
        let uploadScreen=[];
        uploadScreen.push(<MyCourse
            appContext={this.props.appContext}
            role={this.props.role}
            userID={this.props.userID}/>);
        this.props.appContext.setState({uploadScreen:uploadScreen})
    }

    render() {
        const styles =  ({
            root: {
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
            },
            longTextField: {
                marginLeft: 10,
                marginRight: 10,
                width: 480,
            },
        });
        console.log(this.state.tableData);
        return (
            <MuiThemeProvider>
                {this.props.isAdd?<AppBar title="Add Course"/>:<AppBar title="Edit Course"/>}
                <div style={styles.root}>
                    <form style={styles.container} noValidate>
                        {this.props.isAdd ?
                            <TextField
                                required
                                id="crn"
                                label="CRN"
                                value={this.props.crn}
                                margin="normal"
                                style={styles.textField}
                            />
                            :
                            <TextField
                                required
                                disabled
                                id="crn"
                                label="CRN"
                                value={this.props.crn}
                                margin="normal"
                                style={styles.textField}
                            />}

                    <TextField
                        id="title"
                        label="Title"
                        value={this.props.title}
                        margin="normal"
                        style={styles.longTextField}
                    />
                    <TextField
                        id="capacity"
                        label="Capacity"
                        value={this.props.capacity}
                        type="number"
                        margin="normal"
                        style={styles.textField}
                    />

                    <TextField
                        disabled
                        id="detail"
                        label="Detail"
                        multiline
                        rows="5"
                        style={{ margin: 10 }}
                        fullWidth
                        margin="normal"
                    />

                    </form>
                </div>
                <div>
                    <Button color="primary" aria-label="Done">
                        <DoneIcon/>
                    </Button>
                    <Button color="primary" aria-label="Back" onClick={()=>this.handleClickBack()}>
                        <ClearIcon/>
                    </Button>
                    <Button color="primary" aria-label="Profile" onClick={()=>this.handleClickProfile()}>
                        <MenuIcon/>
                    </Button>

                </div>

            </MuiThemeProvider>
        );
    }
}

export default (AddEditCourse);
