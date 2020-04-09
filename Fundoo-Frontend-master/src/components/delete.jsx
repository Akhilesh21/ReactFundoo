import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Menu,
  MenuItem,
} from "@material-ui/core";

import { trashNote } from "../Services/NoteServices";
//import { getTrash } from "../Services/NoteServices";
import { getNotes } from "../Services/NoteServices";

class More extends Component {
  constructor(props) {
    super(props);
    this.state={
      istrash: false,
     // notes: [''],
      id:this.props.id
    }
  }

   handleDelete= ()=> {
    if(this.state.id == ""){
      console.log("notes kjdhkah");
    }else{
        let formData = new FormData();
        formData.append("id", this.state.id);
        var data ={

        id: this.state.id,
        // id:this.props.id,
       istrash:true
        
      };
      console.log(data);
      trashNote(formData)
        .then(response => {
          console.log("response in ", response);
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
  componentDidMount() {
    this.handleGetNotes();
  }
  handleGetNotes = () => {
    getNotes()
      .then((res) => {
        this.setState({
          notes:res.data.data,
        });
        console.log("res in notesData", this.state.notes);
      })
      .catch((err) => {
        console.log("err", err);
      });
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
