import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Tooltip,
  Card,
  InputBase,
  Button,
  IconButton,
  Chip ,
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
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import {
  getNotes,
  trashNote,
  archiveNote,
  noteColor,
  editNote,
  updatePin
} from "../Services/NoteServices";

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
      ispinned:0,
      isarchive:0,
      reminder: "",
      showIcon: false,
      anchorEl: null,
      labels: null,
      istrash: 0,
      openReminderMenu: false,
      menuOpen: false,
    };
    this.handleGetNotes();
  }
  menuOpen = () => {
    this.setState({ open: !this.state.open });
  };
  menuItem = e => {
    this.setState({anchorEl: e.currentTarget });
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

  colorChange = () => {
    this.setState();
  };

  paletteProps = async (event, data) => {
    this.setState({
      color: data,
    });
  };

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
     // this.handleGetNotes();
  };

  handleEditNote = (id, title, decription) => {
    let data = {
      id: id,
      title: title,
      decription: decription,
    };
    console.log("dghhdsjhjjhdhhj", id);
    console.log("delted using id ", data);
    console.log(this.props.id, "id hell");
    if (this.state.id == "") {
      console.log("notes kjdhkah");
    } else {
      let formData = new FormData();
      formData.append("id", id);
      formData.append("title", title);
      formData.append("decription", decription);

      console.log(this.state.id);
      editNote(formData)
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
    }
  };


  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
    if (nextProps.getNotes) {
      this.handleGetNotes();
    }
  }



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
/**
 * 
 */
  handleReminderDate = date => {
    this.setState({ reminder: date });
  };

  removeReminder = () => {
    this.setState({ reminder: null });
  };
  
  paletteProps = (key, id) => {
    let data = {
      id: this.props.id,
      color: id,
    };
    console.log("dghhdsjhjjhdhhj", id);
    console.log("delted using id ", this.state.id);
    console.log(this.props.id, "id hell");
    if (this.state.id == "") {
      console.log("notes kjdhkah");
    } else {
      let formData = new FormData();
      formData.append("id", this.props.id);
      formData.append("id", key.id);

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
    }
  };
  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
    if (nextProps.getNotes) {
      this.handleGetNotes();
    }
  }

  render() {
    return (
      <div className={this.props.noteStyle}>
        <div className="_notes">
          {!this.state.open ? (
            <div className="_notes_">
              {this.state.notes.map((key) => {
                if (key.istrash === 0 && key.isarchive === 0) {
                  //  console.log("data", key.istrash);
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
                              {key.reminder !== null ?
                                <Chip
                                style={{
                                  display: "flex",
                                  marginLeft: "-1em",
                                  marginBottom: "-3em",
                                  //marginTop: "1em",
                                }}
                                  icon={<AccessTimeIcon />}
                                  id={key.id}
                                  label={key.reminder}
                                  onDelete={this.removeReminder}
                                  variant="outlined"
                                />
                                : null}
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
                                  key.description
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
                                    key.description
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="getnoteicons">
                        <div >
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

                          <div>
                            <Tooltip title="More">
                              <div
                                onClick={() => this.handleDelete(key.id)}
                              >
                                <MoreVertOutlinedIcon
                                  onClick={this.menuItem}
                                  aria-owns="simple-menu"
                                />
                              </div>
                            </Tooltip>

                            {/*  <More
                              anchorEl={this.state.anchorEl}
                              open={this.state.menuOpen}
                              closeMenu={this.handleClose} id={key.id}
                              
                              // key={key}
                              handleGetNotes={this.handleGetNotes}
                         />*/}
                          </div>
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
                <Card className="dialogCard">
                  <div className="editcard">
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
