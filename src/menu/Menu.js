import React from 'react';
import clsx from 'clsx';
import {
    makeStyles
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Breadcrumbs from './Breadcrumbs.js';
import Notifications from './Notifications.js';
import Avatar from '@material-ui/core/Avatar';
import UMenu from '@material-ui/core/Menu';
import UMenuItem from '@material-ui/core/MenuItem';
import {
    mainListItems,
    secondaryListItems
} from './listItems';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        //...theme.mixins.toolbar,
    },
    appBar: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'absolute',
        width: `calc(100% - ${theme.spacing(9)}px)`,
        marginLeft: theme.spacing(9),
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
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
        marginRight: 8,
    },
    menuButtonHidden: {
        display: 'none',
    },
    menuButtonShow: {
        display: 'block',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        height: '100vh',
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
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    avatar: {
        margin: '0 1em 0 0',
        cursor: 'pointer',
    },
    curusername: {
        padding: '1em',
    }
}));


export default function Menu(app) {
    console.log(app);
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function switchToUsers(e) {
        e.preventDefault();
        app.el.el.setState({
            content: "users"
        });
    }

    function switchToElements(e) {
        e.preventDefault();
        app.el.el.setState({
            content: "elements"
        });
    }

    function switchToDash(e) {
        e.preventDefault();
        app.el.el.setState({
            content: "dashboard"
        });
    }

    return (
        <div>
        <div className={clsx(classes.appBar, open && classes.appBarShift)}>
            <Breadcrumbs />
            <Notifications />
            <div className={classes.curusername}>
                testuser@test.com
            </div>
            <Avatar
                onClick={handleClick}
                alt="Remy Sharp"
                src="https://lh3.googleusercontent.com/a-/AAuE7mAmekuYgBj8w1wXk81CVdg1N1Tmq1EJdKR6YyiEXA=s96"
                className={classes.avatar} />
            <UMenu
                id="user-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <UMenuItem onClick={handleClose}>Profile</UMenuItem>
                <UMenuItem onClick={handleClose}>My account</UMenuItem>
                <UMenuItem onClick={handleClose}>Logout</UMenuItem>
            </UMenu>
        </div>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton
              onClick={handleDrawerClose}
              className={clsx(classes.menuButtonHidden, open && classes.menuButtonShow)}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button onClick={switchToDash}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={switchToUsers}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem button onClick={switchToElements}>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Elements" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListSubheader inset>Saved logs</ListSubheader>
            <ListItem button>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Current month" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Last quarter" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Year-end sale" />
            </ListItem>
          </List>
        </Drawer>
        </div>
    );
}
