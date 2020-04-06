import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Tooltip, Card, InputBase, Chip } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import UndoTwoToneIcon from "@material-ui/icons/UndoTwoTone";
import RedoTwoToneIcon from "@material-ui/icons/RedoTwoTone";
//import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import { create } from "../Services/NoteServices";
import Reminder from "./reminder";
import ColorComponent from "./colorNote";
// import './Note.css'
//import { keys } from "@material-ui/core/styles/createBreakpoints";
import unPin from "../assets/unpin.svg";
import pin from "../assets/pin.svg";
import {getNotes} from "../Services/NoteServices";
class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardOpen: false,
      anchorEl: null,
      color: "",
      title: "",
      description: "",
      isPinned: false,
      isDeleted: false,
      archieve: false,
      remainder: null,
      date: "",
      time: "",
      anchorElPooper: false,
      openReminderMenu: false
    };
  }

  componentDidMount() {
    this.handleGetNotes();
  }

  handleGetNotes = () => {
    getNotes()
     .then(res => {
       this.setState({
         notes: res.data.data
       });
       console.log("res in notesData", this.state.notes);
     })
     .catch(err => {
       console.log("err", err);
     });
 };

  openCard = () => {
    this.setState({ cardOpen: true });
  };
  changeTitle = e => {
    this.setState({ title: e.currentTarget.value });
  };
  changeDescription = e => {
    this.setState({ description: e.currentTarget.value });
  };
  handleOpen = () => {
    this.setState({
      cardOpen: true
    });
  };

  handleOpenPin = noteId => {
    this.setState({ isPinned: true });
    let date = {
      noteId: noteId,
      isPinned: this.state.isPinned
    };
  };

  handleClosePin = () => {
    this.setState({ isPinned: false });
  };
  handleColorClose = () => {
    this.setState({ color: true });
  };
  paletteProps = (event, data) => {
    this.setState({
      color: data
    });
  };
  colorChange = () => {
    this.setState();
  };

  newNote = () => {
    // try {
    if (this.state.title === "" && this.state.description === "") {
      console.log("title and description are empty");
      this.setState({ cardOpen: false });
    } else {
      let formData = new FormData();
      formData.append("title", this.state.title);
      formData.append("decription", this.state.description);
      formData.append("userid", this.state.userid);
      formData.append("color", this.state.color);
      var data = {
         title: this.state.title,
           desription: this.state.description,
         color:this.state.color,
      };
      console.log(data);
      create(formData)
        .then(response => {
          console.log("response in ", response);
          if (response.status === 200) {
            console.log("RESPONSE :", response);
          } else {
            console.log("qwerty");
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.setState({ cardOpen: false });
    }
  };
  handleReminderDate = date => {
    this.setState({ reminder: date });
  };
  removeReminder = () => {
    this.setState({ reminder: null });
  };

  render() {
    return !this.state.cardOpen ? (
      <div className="new_card" onClick={this.handleOpen}>
        <Card
          className="create"
          style={{ boxShadow: "0px 0px 3px 1px", opacity: "0.9" }}
        >
          <div className="a1">
            <div>
              <InputBase placeholder="Take a note..." />
            </div>
            <div className="create_icon">
              <div>
                <Tooltip title="New list">
                  <CheckBoxOutlinedIcon />
                </Tooltip>
              </div>
              <div>
                <Tooltip title="New note with drawing">
                  <ImageOutlinedIcon />
                </Tooltip>
              </div>
              <div>
                <Tooltip title="New note with image">
                  <CreateOutlinedIcon />
                </Tooltip>
              </div>
            </div>
          </div>
        </Card>
      </div>
    ) : (
      <div>
        <div className="card_open">
          <Card
            className="card1"
            style={{
              backgroundColor: this.state.color,
              boxShadow: "0px 0px 3px 1px",
              opacity: "0.9"
            }}
          >
            <div>
              <div className="pin-btnv">
                <div>
                  <InputBase
                    multiline
                    placeholder="title"
                    onChange={this.changeTitle}
                    value={this.state.title}
                  />
                </div>
                <div>
                  {!this.state.isPinned ? (
                    <div className="pin-over" onClick={this.handleOpenPin}>
                      <img className="pin-over" src={pin} />
                    </div>
                  ) : (
                    <div className="pin-out" onClick={this.handleClosePin}>
                      <img className="pin-out" src={unPin} />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div>
              <InputBase
                multiline
                placeholder="Take a note...."
                onChange={this.changeDescription}
                value={this.state.description}
              />
            </div>
            <div>
              <p>
                {this.state.reminder != null ? (
                  <Chip
                    style={{ display: "flex", marginLeft: "0em",display: "table-cell" }}
                    icon={<AccessTimeIcon />}
                    label={this.state.reminder}
                    onDelete={this.removeReminder}
                    variant="outlined"
                  />
                ) : null}
              </p>
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
                <ColorComponent paletteProps={this.paletteProps} />
              </div>

              <div>
                <Tooltip title="Add image">
                  <ImageOutlinedIcon />
                </Tooltip>
              </div>
              <div>
                <Tooltip title="Archive">
                  <ArchiveOutlinedIcon />
                </Tooltip>
              </div>

              <div className="full_label">
                <Tooltip title="More">
                  <MoreVertIcon />
                </Tooltip>
                <div className="lc"></div>
              </div>
              <div>
                <Tooltip title="Undo">
                  <UndoTwoToneIcon />
                </Tooltip>
              </div>
              <div>
                <Tooltip title="Redo">
                  <RedoTwoToneIcon />
                </Tooltip>
              </div>
              <div onClick={this.newNote}>
                {/* <Button color="primary" onClick={this.newNote} > */}
                Close
                {/* </Button> */}
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}
export default withRouter(Notes);
