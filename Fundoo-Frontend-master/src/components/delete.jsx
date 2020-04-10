import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Menu,
  MenuItem,
} from "@material-ui/core";

import { trashNote,getNote } from "../Services/NoteServices";


class More extends Component {
  constructor(props) {
    super(props);
    this.state={
      istrash: false,
      id:this.props.id
    }
    console.log("delete Id :  ",this.state.id)
  }

  handleDelete= ()=> {
    if(this.state.id == ""){
      console.log("notes kjdhkah");
    }else{
        let formData = new FormData();
        formData.append("id", this.state.id);
        formData.append("istrash", this.state.istrash);
       console.log(this.state.id)
      trashNote(formData)
        .then(response => {
          console.log("response in ", response);
          this.props.handleGetNotes();
          if (response.status === 200) {
            console.log("RESPONSE :", response);
          } else {
            console.log("qwerty");
          }
        })
        .catch(err => {
          console.log(err);
        });
      
    }
  };

    
   
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
