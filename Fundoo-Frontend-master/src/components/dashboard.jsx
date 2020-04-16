import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AppNavBar from "./AppBar";
import SideNavBar from "./sideBar";
import Notes from "./CreateNote";
import GetNote from "./getNote";
import Trash from "./getTrash";
import Archive from "./archive";
import Reminders from "./reminderComponent"
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,

      notesOpen: true,
      openDialog: false,
      getNoteArr: [],
      noteArray: [],
      color: "",
      note: true,
      ispinned:1,
      archive: false,
      isDeleted: false,
      trash: false,
      getNotesProps: false,
      noteRender:'createNote'
    };
  }

  noteRendering = (data) => {
    this.setState({noteRender:data})
  }
  handleDialogClose = (data) => {
    this.setState({ openDialog: false });
  };

  handleDraweropen = () => {
    this.setState({ open: !this.state.open });
  };
  handleView = () => {
    this.setState({ listView: !this.state.listView });
  };
  handleNote = () => {
    this.setState({ note: true, archive: false, trash: false });
  };

  initiateGetNotes = (getDataProps) => {
    console.log("getDataProps", getDataProps);
    this.setState({
      getNotesProps: getDataProps
    })
  }


  render() {
    console.log("Daashboar-----------");
    return (
      <div>
        <div>
          <AppNavBar handleDraweropen={this.handleDraweropen} />

        </div>

        <div style={{ display: "flex", background: "" }}>
          <SideNavBar


            show={this.state.open}
            handleDialogOpen={this.handleDialogOpen}
            noteRendering={this.noteRendering.bind(this)}
          />
        </div>
                
        :{this.state.noteRender === 'createNote'?(<React.Fragment><Notes initiateGetNotes={this.initiateGetNotes} colorChange={this.colorChange} color={this.state.color}/><GetNote getNotes={this.state.getNotesProps} color={this.state.color} /></React.Fragment>)
        :this.state.noteRender === 'reminder'?(<React.Fragment><Notes /><Reminders/></React.Fragment>) 
        :this.state.noteRender === 'archive'?(<Archive />)
        :this.state.noteRender === 'trash'?(<Trash />)//<div>trash</div>
        :(<GetNote />)}
        
      </div>
    );
  }
}

export default withRouter(Dashboard);
