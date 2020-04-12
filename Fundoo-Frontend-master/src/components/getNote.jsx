import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Tooltip, Card, InputBase, Button, Avatar } from "@material-ui/core";

import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import { createMuiTheme } from "@material-ui/core";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import ColorComponent from "./colorNote";
//import Reminder from "./reminder";
import More from "./delete";

import Dialog from "@material-ui/core/Dialog";
import unPin from "../assets/unpin.svg";
import pin from "../assets/pin.svg";

import { getNotes } from "../Services/NoteServices";

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
      reminder: "",
      istrash: false,
      openReminderMenu: false,
      menuOpen: false,
    };
    // this.handleGetNotes()
  }
  menuOpen = () => {
    this.setState({ open: !this.state.open });
  };
  menuItem = (e) => {
    this.setState({
      anchorEl: e.currentTarget,
      menuOpen: !this.state.menuOpen,
    });
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

  paletteProps = (event, data) => {
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
  };

  render() {
    return (
      <div className={this.props.noteStyle}>
        <div className="_notes">
          {!this.state.open ? (
            <div className="_notes_">
              {this.state.notes.map((key) => {
                //console.log("data", key.isPinned);
                return (
                  <div className="notes_">
                    <Card
                      style={{
                        width: "250px",
                        minHeight: "135px",
                        height: "auto",
                        margin: "5px",
                        padding: "10px",
                        boxShadow: "0px 1px 7px 0px",
                        marginTop: "10%",
                        borderRadius: "15px",
                        //backgroundColor: this.state.color,
                        background: key.color
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

                          <div style={{ marginTop: "30px" }}>
                            {key.decription}
                          </div>
                        </div>

                        <div>
                          <div
                            style={{
                              //  background: "#d2cece",
                              marginLeft: "-25px",
                            }}
                            // onClick={() => this.handlePin(key.id)}
                          >
                            {key.isPinned === true ? (
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
                              style={{ cursor: "pointer" }}
                              onClick={() => this.archiveNote(key.id)}
                            >
                              <ArchiveOutlinedIcon />
                            </div>
                          </Tooltip>
                        </div>

                        <div>
                          <Tooltip title="More">
                            <MoreVertOutlinedIcon
                              onClick={this.menuItem}
                              aria-owns="simple-menu"
                            />
                          </Tooltip>
                          {this.state.menuOpen ? (
                            <More
                              anchorEl={this.state.anchorEl}
                              open={this.state.menuOpen}
                              closeMenu={this.handleClose}
                              id={key.id}
                              // key={key}
                              handleGetNotes={this.handleGetNotes}
                            />
                          ) : null}
                        </div>
                      </div>
                    </Card>
                  </div>
                );
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
