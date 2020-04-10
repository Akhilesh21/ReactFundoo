import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Tooltip, Card } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
import { getNotes } from "../Services/NoteServices";
class trash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      notes: [],
      istrash: "",
    };
   // this.handleGetNotes()
  }


  componentDidMount() {
    this.handleGetNotes();
  }
  handleGetNotes = () => {
    getNotes()
      .then(async (res) => {
        await this.setState({
          notes:res.data.data,
        });
        console.log("res in notesData", this.state.notes);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  
  render() {
    let trashObj=this.state.notes.map((el,index)=>{
      if (el.istrash===1) {
        console.log("the dele is ", el.istrash)
        return <div>
        <span>{el.title}</span>
        </div>
        
      }
    })
    return (
      <div className="_notes">
        <div
          className="_notes_"
          style={{ marginTop: "95px", flexWrap: "wrap" }}
        >
          {this.state.notes.map(key => {
            if (key.istrash === true) {
              console.log("the dele is ", key.istrash);
              return (
                <div className="notes_">
                  <Card
                  //  style={{ backgroundColor: this.props.color }}
                    className="get_Nottes_card"
                     style={{
                      width: "250px",
                      minHeight: "135px",
                      height: "auto",
                      margin: "5px",
                      padding: "10px",
                      boxShadow: "0px 1px 7px 0px",
                      marginTop: "10%",
                      borderRadius: "15px",
                     
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "5px",
                      }}
                    >
                      <div>
                        <div>{key.title}</div>
                        <div style={{ marginTop: "25px" }}>
                          {key.decription}
                        </div>
                      </div>
                    </div>
                    <div className="getnoteicons_trash">
                      <div>
                        <Tooltip title="Delete forever">
                          <DeleteForeverIcon />
                        </Tooltip>
                      </div>
                      <div>
                        <Tooltip title="Restore">
                          <RestoreFromTrashIcon />
                        </Tooltip>
                      </div>
                      {trashObj}
                    </div>
                  </Card>
                </div>
              );
            }
          })}
        </div>
      </div>
    )
  }
}
export default withRouter(trash);
