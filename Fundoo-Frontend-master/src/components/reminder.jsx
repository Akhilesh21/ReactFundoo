import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class reminder extends Component {
    constructor(props){
        super(props)
        this.state={
            reminder: "",
        }
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
export default withRouter(reminder)
