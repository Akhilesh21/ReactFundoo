import React, { Component } from 'react';
import { withRouter } from "react-router-dom";


class Collaborator extends Component {

    constructor(props) {
        super(props);
        this.state = {
          open: false,
          anchorEl: null,
          search: "",
          listOpen: false,
          listAnchorEl: null,
          searchedList: [],
         
        };
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
export default withRouter(Collaborator);