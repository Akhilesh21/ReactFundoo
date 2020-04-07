import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
class trash extends Component {
    constructor(props){
        super(props)
        this.state={
            note:[],
            isDeleted:"",
        }
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
export default withRouter(trash);