import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { getNotes } from "../Services/NoteServices";
import {
    Tooltip,
    Card, Chip, Avatar
} from "@material-ui/core";
import unPin from "../assets/unpin.svg";
import pin from "../assets/pin.svg";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import ColorComponent from "./colorNote";
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
        ispinned: 0,
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

  render() {
      
    let trashObj = this.state.notes.map((key, index) => {
      if ((key.reminder !== null) && (key.isarchive === 0)) {
        //console.log("the dele is ", key.reminder);
        return (
            <div className="notes_" >
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
                    background: key.color
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
                <div>
                    {key.data().title}
                </div>
                <div>{key.data().description}</div>

            </div>
            <div>
                {key.data().reminder !== null ?
                    <Chip
                        style={{ display: "flex", marginLeft: "-6em", marginTop: "5em" }}
                        icon={<AccessTimeIcon />}
                        label={key.data().reminder}
                        onDelete={this.removeReminder}
                        variant="outlined" />
                    : null}
            </div>

            <div>
                <Avatar style={{ background: "#d2cece", marginLeft: "-25px" }}
                    onClick={() => this.handlePin(key.id)}>
                    {key.data().isPinned === true ? < pin /> : <pin />}
                </Avatar>

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
                <ColorComponent paletteProps={this.paletteProps} id={key.id} />
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
                    <MoreVertOutlinedIcon
                        onClick={this.menuItem}
                        aria-owns="simple-menu" />
                </Tooltip>
                <More
                    anchorEl={this.state.anchorEl}
                    closeMenu={this.handleClose} id={key.id}
                    handleGetNotes={this.handleGetNotes}
                />
            </div>
        </div>
    </Card>
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
export default withRouter(reminderComponent);
