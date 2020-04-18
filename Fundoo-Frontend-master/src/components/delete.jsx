import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Menu, MenuItem } from "@material-ui/core";

import { trashNote,getNotes} from "../Services/NoteServices";
//import { el } from "date-fns/locale";

class More extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      title: "",
      description: "",
      istrash: 0,
      isarchive: 0,
      ispinned: 0,
      // istrash: false,
        key:"",
    //  id: this.props.id,
    };
  }
 

  componentDidMount() {
    this.handleGetNotes();
  }
  handleGetNotes = () => {
    getNotes()
      .then(async (res) => {
        await this.setState({
          notes: res.data.data,
        });
        console.log("res in notesData", this.state.notes);
        this.state.notes.map((key) => {
        })
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  handleDelete = (id) => {
    let data = {
      id: id,
    };
    console.log("dghhdsjhjjhdhhj", id);
    console.log("delted using id ", data);
    console.log(this.props.id, "id hell");
    if (this.state.id === "") {
      console.log("notes kjdhkah");
    } else {
      let formData = new FormData();
      formData.append("id", id);

      console.log(this.state.id);
      trashNote(formData)
        .then((response) => {
          console.log("response in ", response);

          if (response.status === 200) {
            console.log("RESPONSE :", response);
          } else {
            console.log("qwerty");
          }
        })
        .catch((err) => {
          console.log(err);
        });
       this.handleGetNotes();
    }
  };


  
  // handleDelete = (event, id) => {
  //   let data = {
  //     noteId: this.props.id,
  //     istrash: true,
  //   };
  //   console.log("dghhdsjhjjhdhhj", id);
  //   console.log("hsdg", event.target.value);
  //   console.log("delted using id ", data);
  //   console.log(this.props.id, "id hell");

  //   if (this.state.id == "") {
  //     console.log("notes kjdhkah");
  //   } else {
  //     let formData = new FormData();
  //     formData.append("id", this.state.id);
  //     // formData.append("istrash", this.state.istrash);
  //     console.log(this.state.id);
  //     trashNote(formData)
  //       .then((response) => {
  //         console.log("response in ", response);
         
  //         if (response.status === 200) {
  //           console.log("RESPONSE :", response);
  //         } else {
  //           console.log("qwerty");
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // };

  render() {
    var noteData = this.state.notes.map(key => {
     
    console.log(this.props.id);

    return (
      <Menu
        className="x1"
        id="simple-menu"
        anchorEl={this.props.anchorEl}
        open={this.props.open}
        onClose={this.props.closeMenu}
      >
        <div className="x1">
          <div className="2">
            {/*<MenuItem
              // onClick={(event) => this.handleDelete(event, this.props.id)}
              // id={this.state.id}
             // onClick={() => this.handleDelete(key.id)}
            >
              Delete note
            </MenuItem>*/}

            <MenuItem onClick={this.handleDelete} >Delete</MenuItem>
            <MenuItem onClick={this.handleClose}>Add Label</MenuItem>
           {/* <MenuItem>Add drawing</MenuItem>
            <MenuItem>Make a copy</MenuItem>
            <MenuItem>Show checkboxes</MenuItem>
           <MenuItem>Copy to google docs</MenuItem>*/}
          </div>
        </div>
      </Menu>
      
    );
  });
  return (
    <div>
      {noteData}
    </div>

    
  );
 }
}

export default withRouter(More);
