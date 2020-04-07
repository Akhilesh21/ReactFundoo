import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  MuiThemeProvider,
  createMuiTheme,
  Menu,
  MenuItem,
} from "@material-ui/core";


class More extends Component {
  constructor(props) {
    super(props);
  }
  handleDelete=  ()=>{
    let data ={
      noteId:this.props.id,
      isDeleted:true
    }
    console.log("delted using id " ,data);
  addNoteToTrash(data).then(res=>{
    console.log("result of deleted is ", res); 
    this.props.handleGetNotes();

  })
  .catch(err=>{
    console.log("Error occured during deletion ",err);
    
  })
  }
  
  render() {
    return (
      <Menu
        className="abc"
        id="simple-menu"
        anchorEl={this.props.anchorEl}
        open={Boolean(this.props.anchorEl)}
        onClose={this.props.closeMenu}
      >
        <div className="down">
          <div className="drop">
            <MenuItem onClick={this.handleDelete}>Delete note</MenuItem>
            <MenuItem>Add label</MenuItem>
            <MenuItem>Add drawing</MenuItem>
            <MenuItem>Make a copy</MenuItem>
            <MenuItem>Show checkboxes</MenuItem>
            <MenuItem>Copy to google docs</MenuItem>
          </div>
        </div>
      </Menu>
    );
  }
}

export default withRouter(More);
