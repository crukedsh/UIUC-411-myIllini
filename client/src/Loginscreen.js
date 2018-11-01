import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import Login from './Login';
import Register from './Register';

const style = {
  margin: 15,
};

class Loginscreen extends Component {
  constructor(props){
    super(props);
    var loginButtons=[];
    loginButtons.push(
      <div>
      <MuiThemeProvider>
        <div>
           <RaisedButton label={"Register as Student"} primary={true} style={style} onClick={(event) => this.handleClick(event,'student')}/>
       </div>
       </MuiThemeProvider>
       <MuiThemeProvider>
       <div>
          <RaisedButton label={"Register as Teacher"} primary={true} style={style} onClick={(event) => this.handleClick(event,'teacher')}/>
      </div>
      </MuiThemeProvider>
      </div>
    )
    this.state={
      userID:'',
      password:'',
      loginScreen:[],
      loginMessage:'',
      loginButtons:loginButtons,
      studentButtonLabel:'Register as Student',
      teacherButtonLabel:'Register as Teacher',
      isLogin:true
    }
  }

  componentWillMount(){
    var loginscreen=[];
    loginscreen.push(<Login parentContext={this} appContext={this.props.appContext}/>);
    var loginmessage = "Not registered yet, Register Now";
    this.setState({
                  loginScreen:loginscreen,
                  loginMessage:loginmessage
                    })
  }

  handleClick(event,userRole){
    console.log("event",userRole);
    var loginmessage;
    if(this.state.isLogin){
      let loginscreen=[];
      loginscreen.push(<Register parentContext={this} appContext={this.props.appContext} role={userRole}/>);
      loginmessage = "Already registered. Go to Login";
      let loginButtons=[];
      loginButtons.push(
        <div key="login-button">
        <MuiThemeProvider>
          <div>
             <RaisedButton label={"Login"} primary={true} style={style} onClick={(event) => this.handleClick(event,userRole)}/>
         </div>
         </MuiThemeProvider>
        </div>
      );
      this.setState({
                     loginScreen:loginscreen,
                     loginMessage:loginmessage,
                     loginButtons:loginButtons,
                     isLogin:false
                   })
    }
    else{
      let loginscreen=[],loginButtons=[];
      loginButtons.push(
        <div>
        <MuiThemeProvider>
          <div>
             <RaisedButton label={this.state.studentButtonLabel} primary={true} style={style} onClick={(event) => this.handleClick(event,'student')}/>
         </div>
         </MuiThemeProvider>
         <MuiThemeProvider>
         <div>
            <RaisedButton label={this.state.teacherButtonLabel} primary={true} style={style} onClick={(event) => this.handleClick(event,'teacher')}/>
        </div>
        </MuiThemeProvider>
        </div>
      )
      loginscreen.push(<Login parentContext={this} appContext={this.props.appContext} role={userRole}/>);
      loginmessage = "Not Registered yet.Go to registration";
      this.setState({
                     loginScreen:loginscreen,
                     loginMessage:loginmessage,
                     loginButtons:loginButtons,
                     isLogin:true
                   })
    }
  }
  render() {
    return (
      <div className="loginscreen" key="loginscreen">
        {this.state.loginScreen}
        <div>
          {/*{this.state.loginmessage}*/}
          {this.state.loginButtons}
        </div>
      </div>
    );
  }
}


export default Loginscreen;
