import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Tooltip, Button, Menu, MenuItem, IconButton } from "@material-ui/core";

class reminder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reminder: ""
    };
  }
  reminderMenuOpen = e => {
    this.setState({ reminderAnchorEl: e.currentTarget });
  };
  reminderMenuClose = () => {
    this.setState({ reminderAnchorEl: null });
  };
  handleTodayDate = async () => {
    this.reminderMenuClose();
    let date = new Date().toDateString();
    let reminder = date + ", 8:00 PM";
    this.props.handleReminderDate(reminder);
  };
  handleTommorowDate = async () => {
    this.reminderMenuClose();
    let tommorow = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 1
    );
    let date = tommorow.toDateString();
    let reminder1 = date + ", 8:00 PM";
    this.props.handleReminderDate(reminder1);
  };
  handleNextWeekDate = async () => {
    this.reminderMenuClose();
    let nextweek = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 7
    );
    let date = nextweek.toDateString();
    let reminder1 = date + ", 8:00 PM";
    await this.setState({ reminder: reminder1 });
    this.props.handleReminderDate(reminder1);
  };
  handleDate = (v,e) =>{
    let date1 = v.toString().slice(3,15);
    this.setState({date:date1});
    console.log(this.state.date);
  }
  handleTime = (v, e) => {
    let time1 = v;
    console.log(time1);
    this.setState({ time: time1 });
    console.log(this.state.time);
  };
  handleSave = () => {
    this.reminderMenuClose();
    let time1 = this.state.time;
    let time = time1.toString().slice(15, 24);
    console.log(time);
    this.setState({ reminder: this.state.date + "," + time });
    this.props.handleReminderDate(this.state.date + "," + time);
    this.setState({ openReminderMenu: !this.state.openReminderMenu });
  };


  render() {
    //      let reminderMenuItem = !this.state.openReminderMenu
    return (
      <div>
        <Menu id="reminder-menu" anchorEl={this.state.reminderAnchorEl}>
          open={Boolean(this.state.reminderAnchorEl)}
          onClose={this.reminderMenuClose}
          <MenuItem onClick={this.handleTodayDate}>Later Today 8:00PM</MenuItem>
          <MenuItem onClick={this.handleTommorowDate}>Tommorow 8:00AM</MenuItem>
          <MenuItem onClick={this.handleNextWeekDate}>
            Next week Mon,8:00AM
          </MenuItem>
          <MenuItem onClick={this.setDateOpen}>Pick date & time</MenuItem>
        </Menu>
      </div>
    );
  }
}
export default withRouter(reminder);
