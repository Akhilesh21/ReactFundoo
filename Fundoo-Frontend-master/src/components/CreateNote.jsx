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
import { getNotes,noteColor } from "../Services/NoteServices";
class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardOpen: false,
      anchorEl: null,
      color: "",
      title: "",
      description: "",
      ispinned: Number,
      
      isarchive:Number,
      remainder: null,
      date: "",
      time: "",
      anchorElPooper: false,
      openReminderMenu: false,
    };
  }

  
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

  

  handleClosePin = () => {
    this.setState({ ispinned: 0 });
  };
  handleColorClose = () => {
    this.setState({ color: true });
  };
  paletteProps = (event, data) => {
    this.setState({
      color: data,
    });

  };
  

  colorChange = () => {
    this.setState();
  };
  

  newNote  = () => {
   // this.props.initiateGetNotes(true);
    if (this.state.title === "") {
      console.log("title and description are empty");
      this.setState({ cardOpen: false });
    } else {
      let formData = new FormData(data);
      formData.append("title", this.state.title);
      formData.append("decription", this.state.description);
      formData.append("userid", this.state.noteId);
      formData.append("color", this.state.color);
      formData.append("reminder", this.state.reminder);

    //  formData.append("ispinned", this.state.ispinned);
    //formData.append("isarchive", this.state.isarchive);
    
    
      var data = {
        userid:this.state.userid,
        title: this.state.title,
        desription: this.state.description,
        color:this.state.color,
        reminder: this.state.reminder,
      //  ispinned:this.state.ispinned ,
  //    isarchive:this.state.isarchive
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
      this.setState({ cardOpen: false });
    }
  };

  createArchieveNote  = async () => {
    try {
      await this.setState({ ispinned: 0, isarchive: 1 });
      this.newNote();
    } catch (error) {
      console.log(error);
    }
  };

  // handleOpenPin = async () => {
  //   try {
  //     await this.setState({ ispinned: 1, isarchive: 0 });
  //     this.newNote();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };








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
                  {!this.state.isPinned ? (
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
                  <ArchiveOutlinedIcon onClick={this.createArchieveNote}/>
                </Tooltip>
              </div>

              <div className="full_label">
                <Tooltip title="More">
                  <MoreVertIcon />
                </Tooltip>
                <div className="lc"></div>
              </div>
              {/*      <div>
                <Tooltip title="Undo">
                  <UndoTwoToneIcon />
                </Tooltip>
              </div>
              <div>
                <Tooltip title="Redo">
                  <RedoTwoToneIcon />
                </Tooltip>
                </div>    */}
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
