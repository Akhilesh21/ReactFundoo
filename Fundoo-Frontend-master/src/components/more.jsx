import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Menu, MenuItem } from "@material-ui/core";
import { trashNote, getNotes } from "../Services/NoteServices";
class More extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      noteData: this.props.noteData,
    };
  }

  handleGetNotes = () => {
    getNotes()
      .then(async (res) => {
        await this.setState({
          notes: res.data.data,
        });
        console.log("res in notesData", this.state.notes);
        this.state.notes.map((key) => {});
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
    if (nextProps.getNotes) {
      this.handleGetNotes();
    }
  }

  handleDelete = () => {
    // let data = {
    //   id: id,
    // };
    // console.log("dghhdsjhjjhdhhj", id);
    // console.log("delted using id ", data);
    // console.log(this.props.id, "id hell");
    if (this.state.id == "") {
      console.log("notes kjdhkah");
    } else {
      let formData = new FormData();
      formData.append("id", this.state.noteData.id);
  //    formData.append("id", this.state.notes.id);

      console.log(this.state.noteData);
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

  render() {
    return (
      <div>
        <Menu
          className=""
          id="simple-menu"
          anchorEl={this.props.anchorEl}
          open={Boolean(this.props.anchorEl)}
          onClose={this.props.closeMenu}
        >
          <div className="">
            <div className="">
              <MenuItem onClick={this.handleDelete}>Delete</MenuItem>
              <MenuItem>Label</MenuItem>
            </div>
          </div>
        </Menu>
      </div>
    );
  }
}
export default withRouter(More);
