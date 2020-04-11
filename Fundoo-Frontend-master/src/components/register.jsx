import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Card, Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import "./User.css";
import { register } from "../Services/UserServices";
//import Alert from '@material-ui/lab/Alert'

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

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Firstname: "",
      Lastname: "",
      Email: "",
      Password: "",
      Passwordagain: "",
      snackbarOpen: false,
      snackbarMessage: "",
      error: false,
      message: "",
    };
  }

  loginPage = () => {
    this.props.history.push("/login");
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

  onchangeFirstname = (event) => {
    if (event.target.value.match("^[a-zA-Z]*$") != null) {
      console.log("on click function is working", event.target.value);
      this.setState({ Firstname: event.target.value });
    } else {
      console.log("on click function is not working", event.target.value);
      this.setState({
        snackbarOpen: true,
        snackbarMessage: "first name should contain characters",
      });
    }
  };

  onchangeLastname = (event) => {
    if (event.target.value.match("^[a-zA-Z]*$") != null) {
      console.log("on click function is working", event.target.value);
      this.setState({ Lastname: event.target.value });
    } else {
      console.log("on click function is not working", event.target.value);
      this.setState({
        snackbarOpen: true,
        snackbarMessage: "last name should contain characters",
      });
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

  onchangePasswordagain = async (event) => {
    await this.setState({
      Passwordagain: event.target.value,
    });
    this.checkPassword();
  };
  checkPassword() {
    if (this.state.Password === this.state.Passwordagain) {
      this.setState({ snackbarOpen: true, snackbarMessage: "done" });
    } else {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: "enter same password",
      });
    }
  }

  onSubmit = () => {
    if (this.state.Firstname === "") {
      console.log("firstname is empty");
      this.setState({
        snackbarOpen: true,
        snackbarMessage: "Enter first name",
      });
    } else if (this.state.Lastname === "") {
      this.setState({ snackbarOpen: true, snackbarMessage: "Enter last name" });
      console.log("lastname is empty");
    } else if (this.state.Email === "") {
      this.setState({ snackbarOpen: true, snackbarMessage: "Enter email" });
      console.log("email is empty");
    } else if (this.state.Password === "") {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: "Enter correct password",
      });
      console.log("password is empty");
    } else if (this.state.confirmPassword === "") {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: "Enter same password",
      });
      console.log("requires same password");
    } else {
      let formaData = new FormData();
      formaData.append("fname", this.state.Firstname);
      formaData.append("lname", this.state.Lastname);
      formaData.append("email", this.state.Email);
      formaData.append("password", this.state.Password);
      formaData.append("c_password", this.state.Passwordagain);

      var registrationDetails = {
        fname: this.state.Firstname,
        lname: this.state.Lastname,
        email: this.state.Email,
        password: this.state.Password,
        c_password: this.state.Passwordagain,
      };
      console.log(registrationDetails);
      register(formaData)
        .then((response) => {
          if (response.status === 200) {
            this.setState({
              snackbarOpen: true,
              snackbarMessage: response.statusText,
            });

            setTimeout(() => {
              this.props.history.push("/login");
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
      <div
        className="card_style"
        style={{
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2016/04/15/04/02/water-1330252__340.jpg)",
          backgroundSize: "30000% 20000%",
        }}
      >
        <Card
          style={{
            width: "35%",
            display: "flex",
            justifyContent: "left-center",
            flexDirection: "column",
            height: "86vh",
            boxShadow: "0px 0px 10px 2px",
          }}
        >
          <div className="mainReg">
            <div maxWidth="5px" fixed>
              <form className="Register">
                <h1 className="fundoohead">FUNDOONOTES</h1>

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

                <div style={{ width: "100%" }}>
                  <div className="col s6 Reg-Firstname">
                    <TextField
                      required={true}
                      error={this.state.err1}
                      id="Firstname"
                      label="Firstname"
                      variant="outlined"
                      value={this.state.Firstname}
                      onChange={this.onchangeFirstname}
                      className={classes.paper}
                    />
                  </div>
                  <br></br>
                </div>

                <div>
                  <TextField
                    required={true}
                    error={this.state.err1}
                    id="Lastname"
                    label="Lastname"
                    variant="outlined"
                    value={this.state.Lastname}
                    onChange={this.onchangeLastname}
                    helperText={this.helpermailMethod}
                    className={classes.paper}
                  />
                </div>
                <br></br>
                <div>
                  <TextField
                    required={true}
                    id="Email"
                    label="Email"
                    variant="outlined"
                    value={this.state.Email}
                    onChange={this.onchangeEmail}
                    helperText={this.helpermailMethod}
                  />
                </div>
                <br></br>

                <div>
                  {/* <div className="col s6 Reg-Password"> */}
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
                <br></br>

                <div>
                  <div className="col s6 Reg-Passwordagain">
                    <TextField
                      required={true}
                      error={this.state.error}
                      id="Passwordagain"
                      label="Confirm Password"
                      type="password"
                      variant="outlined"
                      value={this.state.Passwordagain}
                      onChange={this.onchangePasswordagain}
                      className={classes.paper}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col s6 Reg-button">
                    <Button
                      variant="outlined"
                      size="medium"
                      color="primary"
                      className={classes.paper}
                      style={{ color: "blue", margin: "10px" }}
                      onClick={this.onSubmit}
                    >
                      Submit
                    </Button>
                  </div>
                  <div className="col s6 Reg-button">
                    <Button
                      variant="outlined"
                      size="medium"
                      color="primary"
                      className={classes.paper}
                      style={{
                        color: "blue",
                        margin: "10px",
                        marginBottom: "10px",
                      }}
                      onClick={this.loginPage}
                    >
                      login
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default withRouter(Registration);
