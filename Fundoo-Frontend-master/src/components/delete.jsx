import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Menu, MenuItem } from "@material-ui/core";

import { trashNote } from "../Services/NoteServices";
import { el } from "date-fns/locale";

class More extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // istrash: false,
        key:"",
      id: this.props.id,
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      // id:props.id
    });
  }
  handleDelete = (event, id) => {
    let data = {
      noteId: this.props.id,
      istrash: true,
    };
    console.log("dghhdsjhjjhdhhj", id);
    console.log("hsdg", event.target.value);
    console.log("delted using id ", data);
    console.log(this.props.id, "id hell");

    if (this.state.id == "") {
      console.log("notes kjdhkah");
    } else {
      let formData = new FormData();
      formData.append("id", this.state.id);
      // formData.append("istrash", this.state.istrash);
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
    }
  };

  render() {
    console.log(this.props.id);

    return (
      <Menu
        className="x1"
        id="simple-menu"
        anchorEl={this.props.anchorEl}
        open={this.props.open}
        onClose={this.props.closeMenu}
      >
        <div className="x2">
          <div className="x3">
            <MenuItem
              onClick={(event) => this.handleDelete(event, this.props.id)}
              id={this.state.id}
            >
              Delete note
            </MenuItem>

            <MenuItem>Add label</MenuItem>
            <MenuItem>Add drawing</MenuItem>
            <MenuItem>Make a copy</MenuItem>
            <MenuItem>Show checkboxes</MenuItem>
            <MenuItem>Copy to google docs</MenuItem>
          </div>
        </div>
      </Menu>
    );
  }
}

export default withRouter(More);
