import React, { useState, useRef, useEffect } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

import ColorBox from "./ColorBox";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "75px"
    },
    colorBlock: {
      width: "20px",
      height: "20px",
      outline: "1px solid #cdcdcd",
      border: "1px solid #fff",
      marginRight: "5px"
    },
    color: {
      width: "36px",
      height: "14px",
      borderRadius: "2px"
    },
    paper: {
      border: "1px solid #d3d4d5"
    },

    card: { maxWidth: 500 }
  })
);

const ColorPicker = () => {
  const classes = useStyles();
  const [resultColor, setResultColor] = useState("");
  const [openSlider, setOpenSlider] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpenSlider(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenSlider(false);
    setAnchorEl(null);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenSlider(false);
    }
  }
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(openSlider);
  useEffect(() => {
    if (prevOpen.current === true && openSlider === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = openSlider;
  }, [openSlider]);

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {resultColor}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            ref={anchorRef}
            aria-controls={openSlider ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            value={resultColor}
            style={{ background: `${resultColor}` }}
          >
            Set color in slider
          </Button>
          <Popper
            open={openSlider}
            anchorEl={anchorRef.current}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={openSlider}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem>
                        <ColorBox
                          resultColor={resultColor}
                          setResultColor={setResultColor}
                        />
                      </MenuItem>
                      <Button onClick={handleClose}>Close</Button>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            Set color in select
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClose={handleClose}
              onClick={() => {
                setResultColor("#9c27b0");
                setAnchorEl(null);
              }}
            >
              <div
                className={classes.colorBlock}
                style={{ background: "#9c27b0" }}
              ></div>
              Purple
            </MenuItem>
            <MenuItem
              onClose={handleClose}
              onClick={() => {
                setResultColor("#f44336");
                setAnchorEl(null);
              }}
            >
              <div
                className={classes.colorBlock}
                style={{ background: "#f44336" }}
              ></div>
              Red
            </MenuItem>
            <MenuItem
              onClose={handleClose}
              onClick={() => {
                setResultColor("#3f51b5");
                setAnchorEl(null);
              }}
            >
              <div
                className={classes.colorBlock}
                style={{ background: "#3f51b5" }}
              ></div>
              Indigo
            </MenuItem>
          </Menu>
        </CardActions>
      </Card>
    </div>
  );
};

export default ColorPicker;
