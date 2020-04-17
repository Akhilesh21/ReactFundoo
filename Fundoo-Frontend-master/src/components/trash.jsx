import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { getNotes } from "../Services/NoteServices";
class trash extends Component {
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
          notes: res.data.data,
        });
        console.log("res in notesData", this.state.notes);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  render() {
    let trashObj = this.state.notes.map((el, index) => {
      if (el.istrash === 1) {
        console.log("the dele is ", el.istrash);
        return (
          <div
            style={{
              height: "200px",
              width: "400px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span>{el.title}</span>
            <span>{el.decription}</span>
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
export default withRouter(trash);
