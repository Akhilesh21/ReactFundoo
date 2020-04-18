import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Tooltip, Card, Chip } from "@material-ui/core";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import UnarchiveOutlinedIcon from "@material-ui/icons/UnarchiveOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import ColorComponent from "./colorNote";
// import Dialog from "@material-ui/core/Dialog";
import unPin from "../assets/unpin.svg";
import   pin from "../assets/pin.svg";
import Reminder from "./reminder";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

import { getNotes, trashNote, unarchiveNote,updatePin } from "../Services/NoteServices";

class archive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      title: "",
      description: "",
      istrash: 0,
      isarchive: 0,
      ispinned: 0,
      pin_open: false,
      showIcon: false,
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

  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
    if (nextProps.getNotes) {
      this.handleGetNotes();
    }
  }

  handlePin= (id) => {
    let data = {
      id: id,
    };
    console.log("dghhdsjhjjhdhhj", id);
    if (this.state.id == "") {
      console.log("notes kjdhkah");
    } else {
      let formData = new FormData();
      formData.append("id", id);

      console.log(this.state.id);
      updatePin(formData)
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

  handleDelete = (id) => {
    let data = {
      id: id,
    };
    console.log("dghhdsjhjjhdhhj", id);
    console.log("delted using id ", data);
    console.log(this.props.id, "id hell");
    if (this.state.id == "") {
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

  unarchiveNote = (id) => {
    let data = {
      id: id,
    };
    console.log("dghhdsjhjjhdhhj", id);
    console.log("delted using id ", data);
    console.log(this.props.id, "id hell");
    if (this.state.id == "") {
      console.log("notes kjdhkah");
    } else {
      let formData = new FormData();
      formData.append("id", id);

      console.log(this.state.id);
      unarchiveNote(formData)
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
  handleClosePin = () => {
    this.setState({ ispinned: 0 });
  };
  render() {
   
    let trashObj = this.state.notes.reverse().map((key, index) => {
      if ((key.isarchive === 1) && (key.istrash === 0) && (key.ispinned ===0)) {
        console.log("the dele is ", key.istrash);
        return (
          <div >
          <div className="ttt">
          <div className="">
         
            <div className="">
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
                    <div style={{ marginTop: "5px" }}>{key.decription}</div>
                    <div>
                      {key.reminder !== null ? (
                        <Chip
                          //style={{ display: "flex", marginLeft: "-6em", marginTop: "5em" }}
                          icon={<AccessTimeIcon />}
                          id={key.id}
                          label={key.reminder}
                          onDelete={this.removeReminder}
                          variant="outlined"
                        />
                      ) : null}
                    </div>
                  </div>
                  <div>
                  <div
                    style={{
                      //  background: "#d2cece",
                      marginLeft: "-25px",
                    }}
                    onClick={() => this.handlePin(key.id)}
                  >
                    {key.ispinned === 1 ? (
                      <img className="pin-out" src={unPin} />
                    ) : (
                      <img className="pin-over" src={pin} />
                    )}
                  </div>
                </div>
                </div>

                <div className="getnoteicons_trash">
                  <div>
                    <Reminder
                      anchorEl={this.state.anchorEl}
                      closeMenu={this.handleClose}
                      handleGetNotes={this.handleGetNotes}
                      handleReminderDate={this.handleReminderDate}
                    />
                  </div>

                  <div>
                    <Tooltip title="Collbrate">
                      <PersonAddOutlinedIcon />
                    </Tooltip>
                  </div>
                  <div>
                    <ColorComponent
                      //onClick={() => this.archiveNote(key.id)}
                      paletteProps={this.paletteProps}
                      id={key.id}
                    />
                  </div>
                  <div>
                    <Tooltip title="Add image">
                      <ImageOutlinedIcon />
                    </Tooltip>
                  </div>
                  <div>
                    <Tooltip title="Archive">
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => this.unarchiveNote(key.id)}
                      >
                        <UnarchiveOutlinedIcon />
                      </div>
                    </Tooltip>
                  </div>

                  <div>
                    <Tooltip title="More">
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => this.handleDelete(key.id)}
                      >
                        <MoreVertOutlinedIcon />
                      </div>
                    </Tooltip>
                  </div>
                  <div></div>
                </div>
              </Card>
            </div>
            </div>
          </div>
          </div>
        );
      }
    });

    return <div>{trashObj}</div>;
  }
}
export default withRouter(archive);
