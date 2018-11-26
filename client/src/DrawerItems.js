import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import InfoIcon from '@material-ui/icons/Info';
import ClassIcon from '@material-ui/icons/Class';
import HomeIcon from '@material-ui/icons/Home';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Login from "./Login";
import MyCourses from "./MyCourses"
import List from "@material-ui/core/List/List";
import Divider from "@material-ui/core/Divider/Divider";
import Profile from "./Profile";
import Forum from "./Forum";
import Badge from "@material-ui/core/Badge/Badge";

const handleAbout = () => {
    alert("True fact: Zhengyang Feng is wonderfully handsome!");
};

export class about {
    render() {
        return (
            <div>
                <ListItem button onClick={handleAbout}>
                    <ListItemIcon>
                        <InfoIcon/>
                    </ListItemIcon>
                    <ListItemText primary="About"/>
                </ListItem>
            </div>
        );
    }
}

class logout {
    constructor(appContext, open) {
        this.appContext = appContext;
        this.open = open;
    }

    handleLogout = () => {
        let self = this;
        let page = [];
        page.push(<Login appContext={self.appContext}
                         open={self.open}/>);
        self.appContext.setState({page: page});
    };

    render() {
        return (
            <div>
                <ListItem button onClick={this.handleLogout}>
                    <ListItemIcon>
                        <PowerSettingsNewIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Logout"/>
                </ListItem>
            </div>
        );
    }
}

class courses {
    constructor(appContext, userID, role, open,token) {
        this.appContext = appContext;
        this.open = open;
        this.userID = userID;
        this.role = role;
        this.token=token;
    }

    handleCourses = () => {
        let self = this;
        let page = [];
        page.push(<MyCourses appContext={self.appContext}
                             open={self.open}
                             userID={self.userID}
                             role={self.role}
                            token={self.token}/>);
        self.appContext.setState({page: page});
    };

    render() {
        return (
            <div>
                <ListItem button onClick={this.handleCourses}>
                    <ListItemIcon>
                        <ClassIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Courses"/>
                </ListItem>
            </div>
        );
    }
}

class forum {
    constructor(appContext, userID, role, open,token) {
        this.appContext = appContext;
        this.open = open;
        this.userID = userID;
        this.role = role;
        this.token=token;
    }

    handleCourses = () => {
        let self = this;
        let page = [];
        page.push(<Forum appContext={self.appContext}
                             open={self.open}
                             userID={self.userID}
                             role={self.role}
                            token={self.token}/>);
        self.appContext.setState({page: page});
    };

    render() {
        return (
            <div>
                <ListItem button onClick={this.handleCourses}>
                    <ListItemIcon>
                        <Badge color="secondary" badgeContent={4} invisible={false}>
                            <QuestionAnswerIcon/>
                        </Badge>
                    </ListItemIcon>
                    <ListItemText primary="Courses"/>
                </ListItem>
            </div>
        );
    }
}

class home {
    constructor(appContext, userID, role, open,token) {
        this.appContext = appContext;
        this.open = open;
        this.userID = userID;
        this.role = role;
        this.token=token;
    }

    handleHome = () => {
        let self = this;
        let page = [];
        page.push(<Profile appContext={self.appContext}
                           open={self.open}
                           userID={self.userID}
                           role={self.role}
                            token={self.token}/>);
        self.appContext.setState({page: page});
    };

    render() {
        return (
            <div>
                <ListItem button onClick={this.handleHome}>
                    <ListItemIcon>
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Home"/>
                </ListItem>
            </div>
        );
    }
}

export function drawerItemLogged(appContext, userID, role, open,token) {
    return (
        <div>
            <List>{
                new home(appContext,
                    userID,
                    role,
                    open,
                    token).render()
            }{
                new courses(appContext,
                    userID,
                    role,
                    open,
                    token).render()
            } {
                new forum(appContext,
                    userID,
                    role,
                    open,
                    token).render()
            }</List>
            <Divider/>
            <List>{new logout(appContext, open).render()} {new about().render()}</List>
        </div>
    );
}
