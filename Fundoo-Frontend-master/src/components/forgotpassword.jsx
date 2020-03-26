import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
//import { Container } from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import "./User.css";
import Box from "@material-ui/core/Box";
import { forgotpassword } from "../Services/UserServices";
import { Snackbar, IconButton } from "@material-ui/core";
//import { IconButton } from '@material-ui/core';
import CloseIcon from "@material-ui/icons/Close";

const defaultProps = {
  bgcolor: "background.paper",
  m: 1,
  border: 1.5,
  style: { width: "49rem", height: "25rem", margin: "85px" }
};

const useStyles = makeStyles(theme => ({
  root: {},

  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

class Forgotpassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Email: "",
      snackbarOpen: false,
      snackbarMessage: "",
      error: false,
      message: ""
    };
  }

  SnackbarClose = e => {
    this.setState({ snackbarOpen: false });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.setState({ [e.target.name]: e.target.value }));
  };

  onchangeEmail = event => {
    if (
      event.target.value.match("!/[a-z0-9._%+-]+@[a-z][0-9,-]+.[a-z]{2,3}$/") ==
      null
    ) {
      console.log("on click functon is working", event.target.value);
      this.setState({ Email: event.target.value });
      this.setState({
        snackbarOpen: true,
        snackbarMessage: "enter proper email"
      });
    } else {
      console.log("on click function is working", event.target.value);
      console.log("not email");
    }
  };

  onSubmit = () => {
    if (this.state.Email === "") {
      console.log("email is empty");
      this.setState({ snackbarOpen: true, snackbarMessage: "Enter email" });
    } else {
      let formData = new FormData();
      formData.append("email", this.state.Email);

      var forgotDetails = {
        email: this.state.Email
      };
      console.log(forgotDetails);
      forgotpassword(formData)
        .then(response => {
          if (response.status === 200) {
            this.setState({
              snackbarOpen: true,
              snackbarMessage: response.statusText
            });
            setTimeout(() => {
              this.props.history.push("/newpage");
            }, 2000);

            console.log("RESPONSE :", response);
          } else {
            console.log("fgtgybhbyunyuhnjunujuju");
          }
        })
        .catch();
    }
  };
  handleCloseSnackbar = () => {
    this.setState({ snackbarOpen: false });
  };

  render() {
    const classes = { useStyles };

    return (
      <div style={{ paddingRight: "40%", marginLeft: "100px" }}>
        <Box
          display="flex"
          justifyContent="center"
          borderColor="text.primary"
          {...defaultProps}
        >
          <div style={{ marginTop: "10px", marginLeft: "50px" }}></div>
          <div
            style={{
              color: "#616161",
              fontSize: "35px",
              fontWeight: "lighter",
              marginTop: "35px"
            }}
          >
            Fundoo
          </div>

          <div style={{ width: "100%", marginTop: "-105px" }}>
            <div style={{ marginTop: "130px" }}>
              <div
                style={{
                  color: "#616161",
                  fontSize: "30px",
                  fontFamily: "serif",
                  padding: "73px",
                  marginLeft: "-175px",
                  paddingBottom: "45px"
                }}
              >
                Forgot Password
              </div>
              <div style={{ paddingBottom: "23px", paddingRight: "176px" }}>
                <TextField
                  required={true}
                  error={this.state.error}
                  id="Email"
                  label="Email"
                  variant="outlined"
                  value={this.state.Email}
                  onChange={this.onchangeEmail}
                />
              </div>
            </div>

            <Snackbar
              anchorOrigin={{
                vertical: "top",
                horizontal: "center"
              }}
              open={this.state.snackbarOpen}
              autoHideDuration={6000}
              onClose={this.snackbarOpen}
              action={
                <IconButton>
                  aria-label="close" color="inherit" onClick=
                  {this.handleCloseSnackbar}
                  >
                  <CloseIcon />
                </IconButton>
              }
              message={
                <span id="message-id"> {this.state.snackbarMessage} </span>
              }
            ></Snackbar>

            <div style={{ paddingRight: "114px" }}>
              <Button
                variant="outlined"
                size="medium"
                color="primary"
                className={classes.paper}
                style={{ color: "blue" }}
                onClick={this.onSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </Box>
      </div>
    );
  }
}

export default Forgotpassword;
