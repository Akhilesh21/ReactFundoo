import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { getNotes } from "../Services/NoteServices";

class reminderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      istrash: "",
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
          notes: res,
        });
        console.log("res in notesData", this.state.notes);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  render() {
    let Obj = this.state.notes.map((key, index) => {
      if ((key.reminder !== null) && (key.archieve === 0)) {
        console.log("the dele is ", key.reminder);
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
        {Obj}
      </div>
    );
  }
}
export default withRouter(reminderComponent);
