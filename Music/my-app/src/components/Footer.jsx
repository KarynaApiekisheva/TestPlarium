import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";

const useStyles = makeStyles(theme => ({
  footerWrapper: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    left: 0,
    background: indigo[300]
  },
  title: {
    color: theme.palette.primary.contrastText,
    textAlign: "center"
  }
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.footerWrapper}>
      <p variant="h6" className={classes.title}>
        {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default Footer;
