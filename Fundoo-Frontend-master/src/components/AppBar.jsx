import React,{useState } from "react";
import { fade, makeStyles, useTheme  } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import { Tooltip } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Grid } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import SettingsIcon from "@material-ui/icons/Settings";
import Divider from "@material-ui/core/Divider";
import AddAPhotoRoundedIcon from "@material-ui/icons/AddAPhotoRounded";
import AppsTwoToneIcon from "@material-ui/icons/AppsTwoTone";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import ViewListRoundedIcon from "@material-ui/icons/ViewListRounded";
import ViewCompactRoundedIcon from "@material-ui/icons/ViewCompactRounded";
import RefreshOutlinedIcon from "@material-ui/icons/RefreshOutlined";
import ImgUpload from "./ImgUpload"

import clsx from "clsx";
import "./User.css";

const drawerWidth = 244;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    top: "79px",
    width: drawerWidth,
  },

  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  palette: {
    backgroundColor: "#fafafa",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    width: "50%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function PrimarySearchAppBar(props) {
  let owner = localStorage.getItem("owner");
  let tooltip1 = "fundoo account :Akhilesh.";
  let tooltippic = tooltip1.concat(owner);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const theme = useTheme();
  const [changePic, setchangePic] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [view, setview] = useState(false);
  

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  /**
   * 
   */
  const handleViewAppbar = () => {
    let data=!view
    setview(!view);
    console.log(data,"doooono");
    
    props.handleView(data);
  };
  const handleEditPicture = async () => {
    await setchangePic(!changePic);
  };
    
  const handleMenuClickAway = async () => {
    setchangePic(false);
    setAnchorEl(null);
    console.log("the picture URL :", props.profilePicture);
  };
  const handleSignout = () => {
    
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Popover
    anchorEl={anchorEl}
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    keepMounted
    id="profile-popover"
    transformOrigin={{ vertical: "bottom", horizontal: "left" }}
    open={isMenuOpen}
    onClose={handleMenuClickAway}
  >
    <Card id="card_decor8">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "8px",
            paddingBottom: "5px",
          }}
        >
          <Badge
            badgeContent={
              <div>
                <Tooltip title="Edit" placement="right">
                  <IconButton onClick={handleEditPicture}>
                    <AddAPhotoRoundedIcon />
                  </IconButton>
                </Tooltip>
              </div>
            }
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <div>
              <Avatar
                edge="end"
                aria-controls={menuId}
                aria-haspopup="true"
                src={props.profilePicture}
                onClick={handleProfileMenuOpen}
                className={classes.large}
              />
              {/* <img
                src={profilePicture}
                style={{
                  height: "2cm",
                  width: "2cm",
                  borderRadius: "50%",
                  border: "2px solid grey",
                }}
              /> */}
            </div>
          </Badge>
        </div>
        <div className="profilepic-owner">
          <span style={{ fontWeight: "bold" }}>{owner}</span>
        </div>
        {changePic ? (
          <div>
            <Divider />
            <Toolbar id="profile-toolbar">
              <ImgUpload uploadImage={props.uploadImage} />
            </Toolbar>
          </div>
        ) : null}
        <Divider />
        <div className="signout-button-div">
          <button onClick={props.handleSignout} className="signout-button">
            Sign Out
          </button>
        </div>
      </div>
    </Card>
  </Popover>

  );

  
  return (
    
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.palette}>
          <Toolbar>
            <Grid
              item
              xs={1}
              style={{ marginTop: "-15px", marginLeft: "10px" }}
            >
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                className={clsx(classes.menuButton, open)}
                onClick={props.handleDraweropen}
              >
                <MenuIcon style={{ color: "#424242" }} />
              </IconButton>
            </Grid>
            <Grid
              item
              xs={1}
              style={{
                marginLeft: "-70px",
                marginTop: "5px",
              }}
            >
              <div>
                <img
                  src={
                    "https://www.gstatic.com/images/branding/product/1x/keep_48dp.png"
                  }
                  alt="Logo"
                />
              </div>
            </Grid>
            <Grid
              style={{
                marginLeft: "-60px",
                marginBottom: "-8px",
              }}
            >
            <Typography>
                <h2>
                    <span style={{color:"#aecbfa"}}>F</span>
                    <span style={{color:"#f28b82"}}>U</span>
                    <span style={{color:"#f28b82"}}>N</span>
                    <span style={{color:"#aecbfa"}}>D</span>
                    <span style={{color:"#ccff90"}}>O</span>
                    <span style={{color:"#f28b82"}}>O</span>
                 </h2>
            </Typography>
            
            </Grid>
            <Grid style={{ marginLeft: "15px", marginTop: "9px" }}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon style={{ paddingRight: "50%" }} />
                </div>
                <InputBase
                  className="input-text"
                  type="searchIcon"
                  placeholder="Search"
                />
              </div>
            </Grid>
            <div
              style={{
                // width: "14%",
                // paddingTop: "5px",
                // display: "flex",
                // justifyContent: "space-around",
                // paddingRight: "10px",
                 width: "14%",
               paddingTop: "5px",
              display: "flex",
              justifyContent: "space-around",
              paddingLeft: "44em",
              }}
            >
              <div>
              </div>
              {!view ? (
                <div>
                  <Tooltip title="List View">
                    <IconButton onClick={handleViewAppbar}>
                      <ViewListRoundedIcon
                        style={{ color: "#616161" }}
                        id="refresh-icon"
                      />
                    </IconButton>
                  </Tooltip>
                </div>
              ) : (
                <div>
                  <Tooltip title="Grid View">
                    <IconButton onClick={handleViewAppbar}>
                      <ViewCompactRoundedIcon
                        style={{ color: "#616161" }}
                        id="refresh-icon"
                      />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
              <div className="avatar-icon">
                <Tooltip title={tooltippic}>
                  <Avatar
                    edge="end"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    src={props.profilePicture}
                    onClick={handleProfileMenuOpen}
                    fontSize="large"
                  />
                </Tooltip>
              </div>
            </div>
         
          </Toolbar>
        </AppBar>
      
        {renderMenu}
      </div>
   
  );
}
