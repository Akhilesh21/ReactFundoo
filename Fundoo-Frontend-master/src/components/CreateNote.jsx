import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Tooltip, Card, InputBase, Chip,Popover, MenuItem,
  Menu,IconButton, Button,Checkbox, FormControlLabel } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import CancelIcon from "@material-ui/icons/Cancel";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
//import UndoTwoToneIcon from "@material-ui/icons/UndoTwoTone";
//import RedoTwoToneIcon from "@material-ui/icons/RedoTwoTone";
//import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import { create } from "../Services/NoteServices";
import Reminder from "./reminder";
import ColorComponent from "./colorNote";
// import './Note.css'
//import { keys } from "@material-ui/core/styles/createBreakpoints";
import unPin from "../assets/unpin.svg";
import pin from "../assets/pin.svg";
import correct from "../assets/correct.svg";
import { getNotes,createLabel } from "../Services/NoteServices";
class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardOpen: false,
      anchorEl: null,
      color: "",
      title: "",
      description: "",
      ispinned: 0,
      anchorElPooper: false,
      isarchive: 0,
      reminder: null,
      date: "",
      time: "",
      labelAnchorEl: null,
      createLabelAnchorEl: null,
      displayButton: "button-hide",
      label: "",
      labels: [],
      openReminderMenu: false,
    };
  }

  createLabelDialogOpen = e => {
    this.setState({
      createLabelAnchorEl: e.currentTarget,
      labelAnchorEl: null
    });
  };

  createLabel = () => {
    this.setState({ createLabelAnchorEl: null });

    if (this.state.label !== "") {
      const data = {
        label: this.state.label
      };
      let formData = new FormData();
     // formData.append("userid", this.state.noteId);
      formData.append("token", "1");
      formData.append("labelname", this.state.label);
      
      createLabel(formData).then(res => {
        console.log("result label", res);
        this.setState({ labels: res, labelname: "", displayButton: "button-hide" });
        //  this.props.updateLabel();
        this.handleGetNotes()
      });
    }
  };
  handleLabel = async e => {
    await this.setState({
      label: e.target.value,
      displayButton: "button-display"
    });
    this.state.label === ""
      ? this.setState({ displayButton: "button-hide" })
      : this.setState({ displayButton: "button-display" });
  };

  createLabelDialogClose = () => {
    this.setState({ createLabelAnchorEl: null });
  };

  labelMenuOpen = e => {
    this.setState({ labelAnchorEl: e.currentTarget });
  };

  labelMenuClose = () => {
    this.setState({ labelAnchorEl: null });
  };

  menuOpen = () => {
    this.setState({ open: !this.state.open });
  };
  menuItem = e => {
    this.setState({ anchorEl: e.currentTarget });
  };
  handleCheckBoxClick = e => {
    if (e.target.checked) {
      this.setState({
        labels: [
          ...this.state.labels,
          { id: e.target.id, label: e.target.value }
        ]
      });
    }
  };
  removeLabel = e => {
    const labels = this.state.labels.filter(item => item.id !== e.target.id);
    this.setState({ labels: labels });
  };






  openCard = () => {
    this.setState({ cardOpen: true });
  };
  changeTitle = (e) => {
    this.setState({ title: e.currentTarget.value });
  };
  changeDescription = (e) => {
    this.setState({ description: e.currentTarget.value });
  };

  componentDidMount() {
    this.handleGetNotes();
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

  handleOpen = () => {
    this.setState({
      cardOpen: true,
    });
  };

  handleColorClose = () => {
    this.setState({ color: true });
  };
  paletteProps = (event, data) => {
    this.setState({
      color: data,
    });
  };

  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
    if (nextProps.getNotes) {
      this.handleGetNotes();
    }
  }

  colorChange = () => {
    this.setState();
  };

  newNote = () => {
    this.props.initiateGetNotes(true);
    if (this.state.title === "" && this.state.description === "") {
      this.setState({ cardOpen: false });
    } else {
      let formData = new FormData(data);
      formData.append("title", this.state.title);
      formData.append("decription", this.state.description);
      formData.append("userid", this.state.noteId);
      formData.append("color", this.state.color);
      formData.append("reminder", this.state.reminder);
      formData.append("ispinned", this.state.ispinned);
      formData.append("isarchive", this.state.isarchive);
      
      //formData.append("labelname", this.state.labels);

      var data = {
        userid: this.state.userid,
        title: this.state.title,
        desription: this.state.description,
        color: this.state.color,
        reminder: this.state.reminder,
        ispinned: this.state.ispinned,
        isarchive: this.state.isarchive,
        //labelname: this.state.labels,
      };
      console.log(data);
      create(formData)
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
      this.setState({ cardOpen: false });
    }
  };

  createArchieveNote = async () => {
    try {
      await this.setState({ ispinned: 0, isarchive: 1 });
      this.newNote();
    } catch (error) {
      console.log(error);
    }
  };

  handleOpenPin = () => {
    this.setState({ ispinned: 1 });
  };
  handleClosePin = () => {
    this.setState({ ispinned: 0 });
  };

  handleClose = (event) => {
    this.setState({ anchorEl: null });
  };

  handleReminderDate = (date) => {
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
              opacity: "0.9",
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
                  {!this.state.ispinned ? (
                    <div className="pin-over" onClick={this.handleOpenPin}>
                      <img className="pin-over" src={pin} />
                    </div>
                  ) : (
                    <div className="pin-out" onClick={this.handleClosePin}>
                      <img className="pin-over" src={correct} />
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
                    style={{
                      display: "flex",
                      marginLeft: "0em",
                      display: "table-cell",
                    }}
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
                  <ArchiveOutlinedIcon onClick={this.createArchieveNote} />
                </Tooltip>
              </div>

              <div className="full_label">
                  <IconButton
                    aria-controls="label-menu"
                    aria-haspopup="true"
                    onClick={this.labelMenuOpen} >
                    <Tooltip title="More">
                      <MoreVertIcon />
                    </Tooltip>
                  </IconButton>
                  <Menu
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center"
                    }}

                    id="label-menu"
                    anchorEl={this.state.labelAnchorEl}
                    keepMounted
                    open={Boolean(this.state.labelAnchorEl)}
                    onClose={this.labelMenuClose}>
                    <MenuItem
                      onClick={this.createLabelDialogOpen}
                      aria-controls="create-label-menu"
                      aria-haspopup="true">
                      Add Label
                  </MenuItem>
                    <MenuItem>Add Darawing</MenuItem>
                  </Menu>
                  <div className="lc">
                    <Popover style={{ height: "250px" }}
                      id="create-label-menu"
                      anchorEl={this.state.createLabelAnchorEl}
                      open={Boolean(this.state.createLabelAnchorEl)}
                      onClose={this.createLabelDialogClose}>
                      <div className="label-input">
                        <div className="label-note">
                          <span>Label Note</span>
                        </div>
                        <div>
                          <div>
                            <InputBase
                              name="label"
                              value={this.state.label}
                              onChange={this.handleLabel}
                              placeholder="Enter label Name"
                              id="inputRoot" />

                          </div>
                          <div className="search_icon">
                            <SearchIcon />
                          </div>
                        </div>

                        <div className="label1">
                          {/*labelData*/}
                        </div>
                        <div className={this.state.displayButton}>
                          <Button
                            variant="contained"
                            color="default"
                            startIcon={<AddIcon />}
                            onClick={this.createLabel}>
                            Create
                    </Button>
                          "{this.state.label}"
                  </div>
                      </div>
                    </Popover>
                  </div>
                </div>

              <div onClick={this.newNote}>Close</div>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}
export default withRouter(Notes);
