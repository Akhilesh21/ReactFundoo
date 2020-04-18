import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Tooltip, Card, IconButton } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
import { getNotes } from "../Services/NoteServices";
import { restoreNote } from "../Services/NoteServices";
import { deleteNotes } from "../Services/NoteServices";

class trash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // id:Number,
      id: this.props.id,
      notes: [],
      istrash: Number,
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

   restore = (id) => {
    let data = {
      id: id,
    };
    console.log("dghhdsjhjjhdhhj", id);
    console.log("delted using id ", data);
    console.log(id, "id hell");

    if (this.state.id == "") {
      console.log("notes kjdhkah");
    } else {
      let formData = new FormData();
      formData.append("id", id);
      console.log(this.state.id);
      restoreNote(formData)
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

  deleteForever = (id) => {
    let data = {
      id: id,
       };
    console.log("dghhdsjhjjhdhhj", id);
    console.log("delted using id ", data);
    console.log(id, "id hell");

    if (this.state.id == "") {
      console.log("notes kjdhkah");
    } else {
      let formData = new FormData();
      formData.append("id", id);
      console.log(this.state.id);
      deleteNotes(formData)
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
  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
    if (nextProps.getNotes) {
      this.handleGetNotes();
    }
  }
 

  render() {
    let trashObj = this.state.notes.reverse().map((key, index) => {
      if (key.istrash === 1) {
        console.log("the dele is ", key.istrash);
        return (
          <div className="ttt">
            <div>
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
                        <div style={{ marginTop: "25px" }}>
                          {key.decription}
                        </div>
                      </div>
                    </div>
                    <div className="getnoteicons_trash">
                      <div>
                        <Tooltip title="Delete forever">
                          <IconButton
                            onClick={() => this.deleteForever(key.id)}
                          >
                            <DeleteForeverIcon />
                          </IconButton>
                        </Tooltip>
                      </div>
                      <div>
                        <Tooltip title="Restore">
                          <IconButton onClick={() => this.restore(key.id)}>
                            <RestoreFromTrashIcon />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        );
      }
    });

    return <div className="ttt">{trashObj}</div>;
  }
}
export default withRouter(trash);
