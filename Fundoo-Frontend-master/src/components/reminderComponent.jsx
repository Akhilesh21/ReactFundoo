import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { getNotes } from "../Services/NoteServices";
import { Tooltip, Card, Chip,IconButton } from "@material-ui/core";
import unPin from "../assets/unpin.svg";
import pin from "../assets/pin.svg";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import ColorComponent from "./colorNote";
import Reminder from "./reminder";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
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
      ispinned: Number,
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
  handleReminderDate = date => {
    this.setState({ reminder: date });
};
 removeReminder = () => {
    this.setState({ reminder: null });
};
  render() {
    let trashObj = this.state.notes.map((key, index) => {
      if (key.reminder !== null && key.isarchive === 0) {
        //console.log("the dele is ", key.reminder);
        return (
          <div className="notes_">
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
                  <div>{key.decription}</div>
                </div>
                <div>
                  {key.reminder !== null ? (
                    <Chip
                      style={{
                        display: "flex",
                        marginLeft: "-6em",
                        marginTop: "5em",
                      }}
                      icon={<AccessTimeIcon />}
                      label={key.reminder}
                      onDelete={this.removeReminder}
                      variant="outlined"
                    />
                  ) : null}
                </div>

                <div>
                  <div
                  //  style={{ background: "#d2cece", marginLeft: "-25px" }}
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
              <div className="icons2">
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
                  <Tooltip title="Un Archive">
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
                  <IconButton
                                onClick={() => this.handleDelete(key.id)}
                              >
                    <MoreVertOutlinedIcon
                      onClick={this.menuItem}
                      aria-owns="simple-menu"
                    />
                    </IconButton>
                  </Tooltip>
                {/*  <More
                    anchorEl={this.state.anchorEl}
                    closeMenu={this.handleClose}
                    id={key.id}
                    handleGetNotes={this.handleGetNotes}
                />*/}
                </div>
              </div>
            </Card>
          </div>
        );
      }
    });
    return <div>{trashObj}</div>;
  }
}
export default withRouter(reminderComponent);
