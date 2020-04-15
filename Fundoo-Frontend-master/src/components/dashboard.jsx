import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AppNavBar from "./AppBar";
import SideNavBar from "./sideBar";
import Notes from "./CreateNote";
import GetNote from "./getNote";
import Trash from "./getTrash";
import Archive from "./archive";

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
       
        
        {this.state.noteRender === 'createNote'?(<GetNote />)
        :this.state.noteRender === 'archive'?(<Archive />)
        :this.state.noteRender === 'trash'?(<Trash />)//<div>trash</div>
        :(<GetNote />)}
        
      </div>
    );
  }
}

export default withRouter(Dashboard);
