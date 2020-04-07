import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
// import Grid from "@material-ui/core/Grid";
// import { Container } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { login } from "../Services/UserServices";
import CloseIcon from "@material-ui/icons/Close";
import { Card, Snackbar, IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      Password: "",
      snackbarOpen: false,
      snackbarMessage: "",
      error: false,
      message: "",
    };
  }
  signupPage = () => {
    this.props.history.push("/register");
  };
  onchangeEmail = async (event) => {
    let emailData = event.target.value;
    await this.setState({ Email: emailData });
    console.log("email validation state", this.state.Email);
    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.Email)) {
      console.log("email");
    } else {
      console.log("not email");
    }
  };

  onchangePassword = (event) => {
    this.setState({ Password: event.target.value });
  };

  SnackbarClose = (e) => {
    this.setState({ snackbarOpen: false });
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.setState({ [e.target.name]: e.target.value }));
  };

  onchangeEmail = (event) => {
    if (
      event.target.value.match("!/[a-z0-9._%+-]+@[a-z][0-9,-]+.[a-z]{2,3}$/") ==
      null
    ) {
      console.log("on click function is working", event.target.value);

      this.setState({ Email: event.target.value });
      this.setState({
        snackbarOpen: true,
        snackbarMessage: "enter proper email",
      });
    } else {
      console.log("on click function is working", event.target.value);
    }
  };

  onchangePassword = (event) => {
    if (event.target.value.match("^[A-Za-z0-9]*$") != null) {
      console.log("on click function is working", event.target.value);
      this.setState({ Password: event.target.value });
    } else {
      console.log("on click function is not working", event.target.value);
      this.setState({
        snackbarOpen: true,
        snackbarMessage: "enter correct password",
      });
    }
  };

  onSubmit = () => {
    if (this.state.Email === "") {
      console.log("email is empty");
      this.setState({ snackbarOpen: true, snackbarMessage: "Enter email" });
    } else if (this.state.Password === "") {
      console.log("password is empty");
      this.setState({ snackbarOpen: true, snackbarMessage: "Enter password" });
    } else {
      let formaData = new FormData();
      formaData.append("email", this.state.Email);
      formaData.append("password", this.state.Password);

      var loginDetails = {
        email: this.state.Email,
        password: this.state.Password,
      };
      console.log(loginDetails);
      login(formaData)
        .then((response) => {
          if (response.status === 200) {
            this.setState({
              snackbarOpen: true,
              snackbarMessage: response.statusText,
            });
            setTimeout(() => {
              this.props.history.push("/dashboard");
            }, 2000);

            console.log("RESPONSE :", response.data);
            localStorage.setItem("usertoken", response.data.token);
          } else {
            console.log("qwerty");
          }
        })
        .catch();
    }
  };

  render() {
    const classes = { useStyles };

    return (
      <div className="mainLogin">
        <Card
          style={{
            width: "35%",
            display: "flex",
            justifyContent: "right-center",
            flexDirection: "column",
            height: "60vh",
            boxShadow: "0px 0px 10px 2px",
          }}
        >
          <form
            className="Login"
            style={{
              width: "100%",
            }}
          >
            <center>
              <h1 className="fundoohead">Fundoonotes</h1>
            </center>

            <Snackbar
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={this.state.snackbarOpen}
              autoHideDuration={6000}
              onClose={this.snackbarOpen}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  onClick={this.handleCloseSnackbar}
                >
                  <CloseIcon />
                </IconButton>
              }
              message={
                <span id="message-id"> {this.state.snackbarMessage} </span>
              }
            ></Snackbar>

            <div className="row">
              <div className="col s6 Reg-Email">
                <TextField
                  required={true}
                  error={this.state.error}
                  id="Email"
                  label="Email"
                  variant="outlined"
                  value={this.state.Email}
                  onChange={this.onchangeEmail}
                />
              </div>{" "}
            </div>
            <br></br>

            <div className="row">
              <div className="col s6 Reg-Password">
                <TextField
                  required={true}
                  error={this.state.error}
                  id="Password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={this.state.Password}
                  onChange={this.onchangePassword}
                  className={classes.paper}
                />
              </div>
            </div>
            <br></br>

            <div className="row">
              <div style={{ paddingBlockEnd: "20px", paddingBottom: "10px" }}>
                <a href="/forgot">forgot password?</a>
              </div>
            </div>

            <div className="row">
              <div className="col s6 Reg-button">
                <Button
                  variant="outlined"
                  size="medium"
                  color="primary"
                  className={classes.paper}
                  style={{ color: "blue" }}
                  onClick={this.onSubmit}
                >
                  Login
                </Button>
              </div>
            </div>

            <div className="row">
              <div className="col s6 Reg-button">
                <Button
                  variant="outlined"
                  size="medium"
                  color="primary"
                  className={classes.paper}
                  style={{ color: "blue" }}
                  onClick={this.signupPage}
                >
                  Signup
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    );
  }
}

export default withRouter(Login);
