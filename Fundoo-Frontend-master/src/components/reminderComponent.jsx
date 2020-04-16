import React, { Component } from 'react'
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
              notes: res.data.data,
            });
            console.log("res in notesData", this.state.notes);
          })
          .catch((err) => {
            console.log("err", err);
          });
      };

      
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
