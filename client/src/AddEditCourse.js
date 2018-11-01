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
import axios from "axios";

const apiBaseUrl = "http://localhost:3001/";

class AddEditCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            crn: this.props.crn,
            title: this.props.title,
            capacity: this.props.capacity
        };
    }

    handleClickDone() {
        console.log(this.state);
        if (this.state.crn.length==0){
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

    componentWillMount() {
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
                margin: "normal"
            },
            longTextField: {
                marginLeft: 10,
                marginRight: 10,
                width: 480,
                margin: "normal"
            },
        });

        return (
            <MuiThemeProvider>
                {this.props.isAdd
                    ?
                    <AppBar title="Add Course"/>
                    :
                    <AppBar title="Edit Course"/>}
                <div style={styles.root}>
                    <form style={styles.container} noValidate>
                        {this.props.isAdd ?
                            <TextField
                                required
                                id="crn"
                                label="CRN"
                                defaultValue={this.props.crn}
                                style={styles.textField}
                                onChange={(event) => (this.setState({crn: event.target.value}))}
                            />
                            :
                            <TextField
                                required
                                disabled
                                id="crn"
                                label="CRN"
                                defaultValue={this.props.crn}
                                style={styles.textField}
                            />}

                    <TextField
                        id="title"
                        label="Title"
                        defaultValue={this.props.title}
                        style={styles.longTextField}
                        onChange={(event) => (this.setState({title: event.target.value}))}
                    />
                    <TextField
                        id="capacity"
                        label="Capacity"
                        defaultValue={this.props.capacity}
                        type="number"
                        style={styles.textField}
                        onChange={(event) => (this.setState({capacity: event.target.value}))}
                    />
                    <TextField
                        disabled
                        id="detail"
                        label="Detail"
                        multiline
                        rows="5"
                        style={{ margin: 10 }}
                        fullWidth
                    /></form>

                </div>
                <div>
                    <Button color="primary" aria-label="Done" onClick={()=>this.handleClickDone()}>
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
