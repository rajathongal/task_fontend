/**import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    body: {
        height: '100%',
    },
    header: {
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        zindex: 2,
      },
  });

export default function Header() {
    const classes = useStyles();

    return(
        <>
       <br/>
        <head>
            <link href="//cdn.muicss.com/mui-latest/css/mui.min.css" rel="stylesheet" type="text/css" />
        </head>
        <header class={classes.header}>
            <td class="mui--text-title">Brand.io</td>
        </header>
        <br/>
        </>
    )
}; */

import React from 'react';
import {
    AppBar,
    Toolbar,
    makeStyles,
    SvgIcon
  } from '@material-ui/core';
  import {THEMES} from './constants';
  import clsx from 'clsx';
  import MenuComponent from './MenuComponent';

  const useStyles = makeStyles((theme) => ({
    root: {
      zIndex: theme.zIndex.drawer + 100,
      ...theme.name === THEMES.LIGHT ? {
        boxShadow: 'none',
        backgroundColor: theme.palette.primary.main
      } : {},
      ...theme.name === THEMES.ONE_DARK ? {
        backgroundColor: theme.palette.background.default
      } : {}
    },
    toolbar: {
      minHeight: 64
    },
    header: {
        paddingBottom: 80
    }
  }));


  const TopBar = ({
    className,
    onMobileNavOpen,
    ...rest
  }) => {
    const classes = useStyles();
    return (
    <header class={classes.header}>
        <AppBar
            className={clsx(classes.root, className)}
            {...rest}
        >
            <Toolbar className={classes.toolbar}>
                <MenuComponent/>
            </Toolbar>
        </AppBar>
    </header>
    );
  };

  export default TopBar;