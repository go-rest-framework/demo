import React from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Dashboard from './dashboard/Dashboard.js';
import Menu from './menu/Menu.js';
import Users from './users/Users.js';
import ContentElements from './contentElements/ContentElements.js';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        //...theme.mixins.toolbar,
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    fixedHeight: {
        height: 240,
    },
}));

export default function Layout(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Menu el={props} />
            <main
                className={classes.content}
                onScroll={e=> console.log("scroll " + e.target.scrollTop)}
            >
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    {
                        props.el.state.content == "dashboard" && <Dashboard />
                        || props.el.state.content == "users" && <Users app={props.el} />
                        || props.el.state.content == "elements" && <ContentElements app={props.el} />
                    }
                </Container>
            </main>
        </div>
    );
}
