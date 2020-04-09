import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Menu,
  MenuItem,
} from "@material-ui/core";

//import { trashNote } from "../Services/NoteServices";
import { getTrash } from "../Services/NoteServices";


class More extends Component {
  constructor(props) {
    super(props);
    this.state={
 
    }
  }
   handleDelete= ()=> {
    
    let data ={
      id: this.props.id,
      // id:this.props.id,
      istrash:true
      
    }
    console.log("trash using id " ,data);
    getTrash(data).then(res=>{
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
        className="x1"
        id="simple-menu"
       anchorEl={this.props.anchorEl}
       open={Boolean(this.props.anchorEl)}
        onClose={this.props.closeMenu}
      >
        <div className="x2">
          <div className="x3">
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
