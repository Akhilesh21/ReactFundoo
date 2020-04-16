import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { getNotes } from "../Services/NoteServices";

class reminderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        notes: [],
        color: "",
        noteId: "",
        title: "",
        description: "",
        color: "",
        istrash: 0,
        archieve: 0,
        ispinned: 0,
        anchorEl: null,
        reminder: null,
    };
    this.handleGetNotes();
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
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  render() {
    let trashObj = this.state.notes.map((key, index) => {
      if (key.istrash === 1) {
        //console.log("the dele is ", key.reminder);
        return (
          <div
            style={{
              height: "200px",
              width: "400px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span>{key.title}</span>
            <span>{key.decription}</span>
          </div>
        );
      }
    });
    return (
      <div>
        {trashObj}
      </div>
    );
  }
}
export default withRouter(reminderComponent);
