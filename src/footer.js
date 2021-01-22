import React from 'react';
import {
    Toolbar,
    makeStyles,
    AppBar
  } from '@material-ui/core';
import {THEMES} from './constants';
import clsx from 'clsx';

  const useStyles = makeStyles((theme) => ({
    root: {
        position:"fixed",
        color:"primary",
        top: 'auto',
        bottom: 0,
        marginTop: 1,
        
    },
    toolbar: {
      minHeight: 64,
      justifyContent: 'center',
    },
  }));

  const BottomBar = ({
    className,
    onMobileNavOpen,
    ...rest
  }) => {
    const classes = useStyles();
    return (
      <footer>
        <AppBar
        className={clsx(classes.root, className)}
        {...rest}>
            <Toolbar className={classes.toolbar}>
            <div>
                    <h3>Kalpas Internship Task</h3>
            </div>
            </Toolbar>
        </AppBar>
      </footer>
    );
  };

  export default BottomBar;