import React, { Component } from "react";
import {
  Tooltip,
  Card,
  InputBase,
  Button,
  Avatar,
  Chip
} from "@material-ui/core";

import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import { createMuiTheme } from "@material-ui/core";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import ColorComponent from "./colorNote";

import Dialog from "@material-ui/core/Dialog";
import SvgPin from "../icons/svgPin";
import SvgPinned from "../icons/svgUnpin";
//import { getNotes } from "../Services/NoteServices";
const thm = createMuiTheme({
  overrides: {
    MuiCard: {
      root: {
        borderRadius: "16px",
        marginTop: "35px",
        width: "20em"
      }
    }
  }
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
      color: ""
    };
  }
  menuOpen = () => {
    this.setState({ open: !this.state.open });
  };
  menuItem = e => {
    this.setState({ anchorEl: e.currentTarget });
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
  paletteProps = (e) => {
    console.log(e)
    this.setState({
      color: e
    })

    this.props.colorChange(e)
    // console.log(this.state.color)
  }

  handleGetNotes = () => {
   //   let formData = new FormData();
  // formData.fetch("noteid", noteId);
  // var data = {
  //   noteId: this.state.noteId,
  // };
  
    // getNotes()
    //   .then(res => {
    //     this.setState({
    //       notes: res
    //     });
    //     console.log("res in notesData", this.state.notes);
    //   })
    //   .catch(err => {
    //     console.log("err", err);
    //   });
  };

  render() {
    return (
      <div className={this.props.noteStyle}>
        <div className="_notes">
          {!this.state.open ? (
            <div className="_notes_">
              {this.state.notes.map(key => {
                {
                  console.log("data", key.data().isPinned);
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
                          background: key.data().color
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "5px"
                          }}
                        >
                          <div>
                            <div>{key.data().title}</div>

                            <div style={{ marginTop: "25px" }}>
                              {key.data().description}
                            </div>
                          </div>

                          <div>
                            <Avatar
                                style={{
                                background: "#d2cece",
                                marginLeft: "-25px"
                              }}
                              onClick={() => this.handlePin(key.id)}
                            >
                              {key.data().isPinned === true ? (
                                <SvgPinned />
                              ) : (
                                <SvgPin />
                              )}
                            </Avatar>
                          </div>
                        </div>
                        <div onClick={this.handleOpenDialogue}>
                          <div className="base">
                            <InputBase
                              multiline
                              onClick={() =>
                                this.handleEditNote(
                                  key.id,
                                  key.data().title,
                                  key.data().description
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
                                    key.data().title,
                                    key.data().description
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
export default GetNote;
