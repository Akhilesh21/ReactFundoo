import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Tooltip, Card, IconButton } from "@material-ui/core";

import { getNotes } from "../Services/NoteServices";


class archive extends Component {
    constructor(props) {
        super(props);
        this.state = {
          notes: [],
          isarchive: "",
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
          if ((key.isarchive === 1)&&(key.istrash === 0)) {
            console.log("the dele is ", key.istrash);
            return (
              <div className="_notes">
                <div className="notes_">
                  <Card
                    style={{ backgroundColor: this.props.color }}
                    className="get_Nottes_card"
                    style={{
                      width: "250px",
                      minHeight: "135px",
                      height: "auto",
                      margin: "5px",
                      padding: "10px",
                      boxShadow: "0px 1px 7px 0px",
                      marginTop: "10%",
                      borderRadius: "15px",
                      background: key.color,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "5px",
                      }}
                    >
                      <div>
                        <div>{key.id}</div>
                        <div>{key.title}</div>
                        <div style={{ marginTop: "25px" }}>{key.decription}</div>
                      </div>
                    </div>
                    <div className="getnoteicons_trash">
                      <div>
                        
                      </div>
                      <div>
                        
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            );
          }
        });
    
        return <div>{trashObj}</div>;
      }
    }
    export default withRouter(archive);
    