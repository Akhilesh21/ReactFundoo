import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Tooltip,
  Card,
  InputBase,
  Button,
  IconButton,
  Chip,
} from "@material-ui/core";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import { createMuiTheme } from "@material-ui/core";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import ColorComponent from "./colorNote";
import Dialog from "@material-ui/core/Dialog";
import unPin from "../assets/unpin.svg";
import pin from "../assets/pin.svg";
import Reminder from "./reminder";
import More from "./more";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import {
  getNotes,
  // trashNote,
  archiveNote,
  noteColor,
  editNote,
  updatePin,
  getLabel
} from "../Services/NoteServices";
//import correct from "../assets/correct.svg";

const thm = createMuiTheme({
  overrides: {
    MuiCard: {
      root: {
        borderRadius: "16px",
        marginTop: "35px",
        width: "20em",
      },
    },
  },
});
class GetNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      open: false,
      noteId: "",
      title: "",
      description: "",
      color: "",
      ChangeColor: "",
      ispinned: 0,
      isarchive: 0,
      reminder: "",
      showIcon: false,
      anchorEl: null,
      labels: null,
      istrash: 0,
      openReminderMenu: false,
      menuOpen: false,
      noteData: "",
      
    };
    this.handleGetNotes();
  }
  menuOpen = () => {
    this.setState({ open: !this.state.open });
  };
  menuItem = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  };
  handleClosePin = () => {
    this.setState({ ispinned: 0 });
  };
  handleClose = (event) => {
    this.setState({ anchorEl: null });
  };
  componentDidMount() {
    this.handleGetNotes();
  }

  handleColorClose = () => {
    this.setState({ color: true });
  };

  componentDidMount() {
    this.handleGetNotes();
    this.getLabels();
  }
  getLabels = () => {
    getLabel().then(res => {
      console.log('label resuly',res);
      
      this.setState({ labels: res })
    })
    .catch(err => {
      console.log("err", err);
    });
  }
  removeLabel = () => {
    this.setState({ labels: null })
  }

  handleGetNotes = () => {
    getNotes()
      .then((res) => {
        this.setState({
          notes: res.data.data,
        });
        console.log("res in notesData", this.state.notes);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  handleOpenDialogue = () => {
    this.setState({
      open: !this.state.open
    });
  };
  handleTitle = event => {
    let title = event.target.value;
    this.setState({
      title: title
    });
  };

  handleDescription = event => {
    let description = event.target.value;
    this.setState({
      description: description
    });
  };
  handleTimeChange = event => {
    let time = event.target.value
    this.setState({
      time: time
    })
  }

  handleEditNote = async (id, title, decription, color, reminder) => {
    await this.setState({
      noteId: id,
      open: false,
      title: title,
      description: decription,
      color: color,
      reminder: reminder
    });

  };
  saveEditNote = () => {
    
    let data = {
      id: this.state.noteId,
      title: this.state.title,
      decription: this.state.description,
      reminder: this.state.reminder,
      color:this.state.color

    };
    console.log("result of editData", data);
    
    editNote(data)
      .then(res => {
        console.log("result of  editNote", res);
        this.setState({ open: false })
        this.handleGetNotes();
      })
      .catch(err => {
        console.log("err in editNote component ", err);
      });
  }



  // handleEditNote = (id, title, decription) => {
  //   let data = {
  //     id: id,
  //     title: title,
  //     decription: decription,
  //   };
  //   console.log("dghhdsjhjjhdhhj", id);
  //   console.log("delted using id ", data);
  //   console.log(this.props.id, "id hell");
  //   if (this.state.id == "") {
  //     console.log("notes kjdhkah");
  //   } else {
  //     let formData = new FormData();
  //     formData.append("id", id);
  //     formData.append("title", title);
  //     formData.append("decription", desription);
  //  formData.append("color", "Yellow");

  //     console.log(this.state.id);
  //     editNote(formData)
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

  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
    if (nextProps.getNotes) {
      this.handleGetNotes();
    }
  }

  archiveNote = (id) => {
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
      archiveNote(formData)
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

  handlePin = (id) => {
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
  /**
   *
   */
  handleReminderDate = (date) => {
    this.setState({ reminder: date });
  };

  removeReminder = () => {
    this.setState({ reminder: null });
  };

  ChangeColor = (color) => {
    this.setState(color);
  };
  paletteProps = async (id, data) => {
    console.log(id);
    this.setState({
      color: data,
    });
    const dataa = {
      id: id,
      color: this.state.color,
    };
    let formData = new FormData();
    formData.append("id", id);
    formData.append("color", "Red");
    //formData.append("color", "Orange");
    //formData.append("color", "Yellow");

    console.log(this.state.id);
    noteColor(formData)
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
  };

  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
    if (nextProps.getNotes) {
      this.handleGetNotes();
    }
  }
  removeReminder = () => {
    this.setState({ reminder: null });
  };

  render() {
    return (
      <div className={this.props.noteStyle}>
        <div className="_notes">
          {!this.state.open ? (
            <div className="_notes_">
              {this.state.notes.map((key, index) => {
                if (key.istrash === 0 && key.isarchive === 0 ) {
                  //  console.log("data", key);
                  console.log("The labels are ", key.labelname);
                  return (
                    <div className="notes_">
                      <Card
                        style={{
                          width: "250px",
                          minHeight: "135px",
                          height: "auto",
                          // height: "9em",
                          //height:"12px",
                          margin: "5px",
                          padding: "10px",
                          boxShadow: "0px 1px 7px 0px",
                          marginTop: "10%",
                          borderRadius: "15px",
                          //backgroundColor: this.state.color,
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

                            <div style={{ marginTop: "5px" }}>
                              {key.decription}
                            </div>
                            <div>
                              {key.reminder !== null ? (
                                <Chip
                                  style={{
                                    display: "flex",
                                    marginLeft: "-1em",
                                    marginBottom: "-3em",
                                    //marginTop: "1em",
                                  }}
                                  icon={<AccessTimeIcon />}
                                  id={key.id}
                                  label={key.reminder }
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
                        <div onClick={this.handleOpenDialogue}>
                          <div className="base">
                            <InputBase
                              multiline
                              onClick={() =>
                                this.handleEditNote(
                                  key.id,
                                  key.title,
                                  key.decription,
                                  key.color,
                                  key.reminder
                                )
                              }
                            />

                            <div onClick={this.handleOpenDialogue}>
                              <InputBase
                                value={key.description}
                                multiline
                                onClick={() =>
                                  this.handleEditNote(
                                    key.id,
                                    key.title,
                                    key.description,
                                    key.color,
                                    key.reminder
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="getnoteicons">
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
                                // style={{ cursor: "pointer" }}
                                onClick={() => this.archiveNote(key.id)}
                              >
                                <ArchiveOutlinedIcon />
                              </div>
                            </Tooltip>
                          </div>
                          {/* testing*/}
                          <div>
                            <Tooltip title="  ">
                              <MoreVertOutlinedIcon
                                onClick={this.menuItem}
                                aria-owns="simple-menu"
                              />
                            </Tooltip>
                          </div>
                          <More
                            //noteData={key}
                            noteData={key.id}
                            anchorEl={this.state.anchorEl}
                            closeMenu={this.handleClose}
                            id={key.id}
                            handleGetNotes={this.handleGetNotes}
                          />
                        </div>
                      </Card>
                    </div>
                  );
                }
              })}
            </div>
          ) : (
            <div className="cd">
                <Dialog
                  open={this.state.open}
                  onClose={this.handleOpenDialogue}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <Card className="dialogCard"
                  style={{
                    
                    background: this.state.color
                  }}  >
                    <div className="editcard" >
                      <div>
                        <InputBase
                          multiline
                          placeholder="Title"
                          value={this.state.title}
                          onChange={this.handleTitle}

                        />
                      </div>
                      <div className="inputNote">
                        <InputBase
                          multiline
                          placeholder="Take a note..."
                          value={this.state.description}
                          onChange={this.handleDescription}
                        />
                      </div>
                    </div>
                    <div className="imageAndClose">
                      <div className="dialogIcon">
                        <div>
                          <Reminder
                            anchorEl={this.state.anchorEl}
                            closeMenu={this.handleClose}
                            handleGetNotes={this.handleGetNotes}
                            handleReminderDate={this.handleReminderDate}
                          />
                        </div>
                      <div>
                        <PersonAddOutlinedIcon />
                      </div>
                      <div>
                        <ColorComponent paletteProps={this.paletteProps} />
                      </div>
                      <div>
                        <ImageOutlinedIcon />
                      </div>
                      <div>
                        <ArchiveOutlinedIcon />
                      </div>
                      <div>
                        <MoreVertOutlinedIcon />
                      </div>
                      <Button
                        className="button"
                        color="Primary"
                        onClick={this.saveEditNote}
                        style={{ cursor: "pointer" }}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </Card>
              </Dialog>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default withRouter(GetNote);
