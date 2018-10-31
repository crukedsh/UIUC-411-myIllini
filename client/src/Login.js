import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import UploadPage from './UploadPage';
import Drawer from 'material-ui/Drawer';

import MyCourses from "./MyCourses";
//var apiBaseUrl = "http://chenzhu2.web.illinois.edu/";

var apiBaseUrl = "http://localhost:3001/";
class Login extends Component {
  constructor(props){
    super(props);
    var localloginComponent=[];
    localloginComponent.push(
      <MuiThemeProvider>
        <div>
         <TextField
           hintText="Enter your Illinois netID"
           floatingLabelText="Student Id"
           onChange = {(event,newValue)=>this.setState({username:newValue})}
           />
         <br/>
           <TextField
             type="password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
       </div>
       </MuiThemeProvider>
    )
    this.state={
      username:'',
      password:'',
      menuValue:1,
      loginComponent:localloginComponent,
      loginRole:'student',
        open:false
    }
  }
  componentWillMount(){
  // console.log("willmount prop values",this.props);
  if(this.props.role != undefined){
    if(this.props.role == 'student'){
      console.log("in student componentWillMount");
      var localloginComponent=[];
      localloginComponent.push(
        <MuiThemeProvider >
          <div>
           <TextField
             hintText="Enter your netID"
             floatingLabelText="Student Id"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      )
      this.setState({menuValue:1,loginComponent:localloginComponent,loginRole:'student'})
    }
    else if(this.props.role == 'teacher'){
      console.log("in teacher componentWillMount");
      var localloginComponent=[];
      localloginComponent.push(
        <MuiThemeProvider >
          <div>
           <TextField
             hintText="Enter your NetID"
             floatingLabelText="Teacher Id"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      )
      this.setState({menuValue:2,loginComponent:localloginComponent,loginRole:'teacher'})
    }
  }
  }
  handleClick(event){
    var self = this;
    var payload={
        "netID":this.state.username,
        "password":this.state.password,
      //"role":this.state.loginRole
    };
    axios.post(apiBaseUrl+'users/login', payload)
   .then(function (response) {
     console.log(response);
     if(response.status == 200){
       console.log("Login successful!");
       let uploadScreen=[];
       uploadScreen.push(<MyCourses appContext={self.props.appContext} role={self.state.loginRole} userID={self.state.username}/>);
       self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
     }
     else if(response.status == 204){
       console.log("Username password do not match");
       alert("Username password do not match")
     }
     else{
       console.log("Username does not exists");
       alert("Username does not exist");
     }
   })
   .catch(function (error) {
     console.log(error);
   });
  }
  handleMenuChange(value){
    console.log("menuvalue",value);
    var loginRole;
    if(value==1){
      var localloginComponent=[];
      loginRole='student';
      localloginComponent.push(
        <MuiThemeProvider >
          <div>
           <TextField
             hintText="Enter your College Rollno"
             floatingLabelText="Student Id"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      )
    }
    else if(value == 2){
      var localloginComponent=[];
      loginRole='teacher';
      localloginComponent.push(
        <MuiThemeProvider>
          <div>
           <TextField
             hintText="Enter your netId"
             floatingLabelText="Teacher Id"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      )
    }
    this.setState({menuValue:value,
                   loginComponent:localloginComponent,
                   loginRole:loginRole})
  }

  handleToggle = () => this.setState({open: !this.state.open});
  render() {
    return (
      <div>
        <MuiThemeProvider >
            <Drawer open={this.state.open}>
                <MenuItem onClick={()=>this.setState({open: !this.state.open})}>About</MenuItem>
            </Drawer>
        <AppBar
             title="Login"
             onLeftIconButtonClick={this.handleToggle}
           />
        </MuiThemeProvider>
        <MuiThemeProvider>
        <div>
        <p>Login as:</p>
        <DropDownMenu value={this.state.menuValue} onChange={(event,index,value)=>this.handleMenuChange(value)}>
          <MenuItem value={1} primaryText="Student" />
          <MenuItem value={2} primaryText="Professor" />
        </DropDownMenu>
        </div>
        </MuiThemeProvider>
        {this.state.loginComponent}
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Login;
