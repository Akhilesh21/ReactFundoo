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
            <div className="_notes">
            <div className="_notes_" style={{marginTop:"95px",flexWrap:"wrap",}}>
            return(
                <div className="notes_">
                
                </div>
            )
            </div>
            
                
            </div>
        )
    }
}
export default withRouter(trash);