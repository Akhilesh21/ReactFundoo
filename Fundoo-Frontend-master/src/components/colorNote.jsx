import React, { Component } from 'react'
import { Tooltip, IconButton, Popper, Paper, ClickAwayListener, } from '@material-ui/core'
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import { withRouter } from 'react-router-dom';
const colorPalette = [{ name: "Default", colorCode: "#FDFEFE" },
{ name: "Red", colorCode: "#f28b82" },
{ name: "Orange", colorCode: "#fbbc04" },
{ name: "Yellow", colorCode: "#fff475" },
{ name: "Green", colorCode: "#ccff90" },
{ name: "Teal", colorCode: "#a7ffeb" },
{ name: "Blue", colorCode: "#cbf0f8" },
{ name: "Dark-blue", colorCode: "#aecbfa" },
{ name: "Purple", colorCode: "#d7aefb" },
{ name: "Pink", colorCode: "#f48fb1" },
{ name: "Brown", colorCode: "#e6c9a8" },
{ name: "Gray", colorCode: "#e8eaed" },
]
class ColorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
           //  open: false,
            anchorEl: false
        }
    }
    handleClickAway = () => {
        this.setState({
            anchorEl: false
        })
    }
    handleChangeColor = (e) => {
        console.log("hiii" + e);
        this.props.paletteProps(e.target.value, this.props.id)
    }
    handleClose = () => {
        this.setState({
            anchorEl: false
        })
    }
    handleClick(event) {

        this.setState({
            anchorEl: this.state.anchorEl ? false : event.target
        });
    };
    render() {
        const colorChange = colorPalette.map((key) => {
            return (
                <div className="color-map" >
                    <Tooltip title={key.name}>
                        <IconButton style={{ backgroundColor: key.colorCode, border: "silver 2px solid" }}
                            value={key.colorCode}
                            onClick={this.handleChangeColor}>
                        </IconButton>
                    </Tooltip>
                </div>
            )
        })
        return (
            <div className="colorpalette-div">
                <Tooltip title="Change color">
                    <ClickAwayListener onClickAway={this.handleClickAway}>
                        <ColorLensOutlinedIcon onClick={(event) => this.handleClick(event)} cursor="pointer" />
                    </ClickAwayListener>
                </Tooltip>
                <div className="Change" Style={{ width: "25em", display: "flex", flexDirection: "row", margin: "25px" }}>
                     <Popper
                        open={this.state.anchorEl}
                        anchorEl={this.state.anchorEl}
                        className="paint"
                        style={{
                            zIndex: "9999", width: "25em", display: "flex", 
                            flexDirection: "row", margin: "25px"}}>
                        <Paper className="color-styles" style={{ display: "contents", width: "21em" }}>
                            {colorChange}
                        </Paper>
                    </Popper>
                </div>
            </div>
        )
    }
}
export default withRouter(ColorComponent)