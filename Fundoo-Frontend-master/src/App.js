import React from "react";
import "./App.css";
import "./note.css";
//import "./AppBar.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Registration from "./components/register";
import Login from "./components/login";
import Forgotpassword from "./components/forgotpassword";
import Dashboard from "./components/dashboard";
import ResponsePage from "./components/newPage";
import PrimarySearchAppBar from "./components/AppBar";
import SideNavBar from "./components/sideBar";
import Notes from "./components/CreateNote";
import ColorComponent from "./components/colorNote";
import GetNote from "./components/getNote";
import reminder from "./components/reminder";
//import more from "./components/delete";
import More from "./components/more";
import trash from "./components/trash";
import getTrashh from "./components/getTrash";
import archive from "./components/archive";
import reminderComponent from "./components/reminderComponent";

class App extends React.Component {
  render() {
    return (
      <Router>
        {/* <Route path="/test" component={Register}/> 
         <Route path="/register"  component={Register}/>  */}
        {/* <Route path="/" exact  component={Registration}/> */}
        {/* <p>
          hello world!
          </p>
         */}
        {/* <Route path="/" exact component={Registration}/> */}
        <Switch>
          <Route path="/login" exact={true} component={Login} />
          <Route path="/register" component={Registration} />
          <Route path="/forgot" component={Forgotpassword} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/newpage" component={ResponsePage} />
          <Route path="/AppBar" component={PrimarySearchAppBar} />
          <Route path="/sideBar" component={SideNavBar} />

          <Route path="/note" component={Notes} />
          <Route path="/getNote" component={GetNote} />
          <Route path="/ColorComponent" component={ColorComponent} />
         {/* <Route path="/more" component={more} />*/}
         <Route path="/more" component={More} />
          <Route path="/reminder" component={reminder} />
          <Route path="/trash" component={trash} />
          <Route path="/getTrash" component={getTrashh} />
          <Route path="/archive" component={archive} />
          <Route path="/reminderComponent" component={reminderComponent} />
          
          
        </Switch>
      </Router>
    );
  }
}
export default App;
