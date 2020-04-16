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
        isarchive: 0,
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
      if ((key.reminder !== null) && (key.isarchive === 0)) {
        //console.log("the dele is ", key.reminder);
        return (
            <div className="notes_" >
            <Card
                className="get_Nottes_card"
                style={{
                    width: "250px",
                    minHeight: "100px",
                    height: "auto",
                    margin: "5px",
                    padding: "10px",
                    boxShadow: "0px 1px 7px 0px",
                    marginTop: "10%",
                    borderRadius: "15px",
                    background: key.color
                }}
            >
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
