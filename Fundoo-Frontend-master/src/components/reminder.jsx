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
        
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
export default withRouter(reminder)
