import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


class reminder extends Component {
    constructor(props){
        super(props)
        this.state={
            reminder: "",
        }
    }
    reminderMenuOpen = (e) =>{
        this.setState({ reminderAnchorEl:e.currentTarget });
    }
    reminderMenuClose = () =>{
        this.setState({reminderAnchorEl:null});
    }
    handleTodayDate = async () =>{
        this.reminderMenuClose()
        let date = new Date().toDateString();
        let reminder = date + ", 8:00 PM";
        this.props.handleReminderDate(reminder)
    }
    handleTommorowDate = async () => {
        this.reminderMenuClose()
        let tommorow = new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate() + 1);
        let date = tommorow.toDateString();
        let reminder1 = date + ", 8:00 PM";
        this.props.handleReminderDate(reminder1)
    }
    handleNextWeekDate = async () =>{
        this.reminderMenuClose()
        let nextweek = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7 );
        let date = nextweek.toDateString();
        let reminder1 = date + ", 8:00 PM";
        await this.setState({reminder:reminder1})
        this.props.handleReminderDate(reminder1)
    }
    render() {
        let reminderMenuItem = !this.state.openReminderMenu 
        return (
            <div>
            <Menu>
            </Menu>
                
            </div>
        )
    }
}
export default withRouter(reminder)
