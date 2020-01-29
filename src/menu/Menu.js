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
import Form from '../users/Form.js';
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
        margin: '0.3em 1em 0 0',
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

    const [open, setOpen] = React.useState(false);

    const [openEditForm, setOpenEditForm] = React.useState(false);

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

    function handleEditFormClose() {
        setOpenEditForm(false);
        setAnchorEl(null);
    }

    function handleLogout(e) {
        e.preventDefault();
        sessionStorage.clear();
        localStorage.clear();
        location.reload();
    }

    function handleProfileEdit(e) {
        e.preventDefault();
        setOpenEditForm(true);
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
            <Breadcrumbs curpage={app.el.el.state.content} />
            <Notifications />
            <div className={classes.curusername}>
                {app.el.el.state.userdata.email}
            </div>
            <Avatar
                onClick={handleClick}
                alt={app.el.el.state.userdata.email}
                src={(app.el.el.state.userdata.avatar != "")? app.el.el.state.userdata.avatar : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAAMFBMVEX29u/d3dfc3Nb39/Dr6+Tm5t7z8+zt7ebn5+Hh4dvx8erk5N7g4Nr09Ozc3NXt7eUtlyuvAAAFBklEQVR4nO2d6XKrMAxGg0XMmvT93/ZC0xBDwOBFku/Md351urg6yAZvMbcbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAID/ByoJBjlbD9XTlMCzGmqbVZKo7uaSq1KYg+nqbIrUVOW4fTBVk8eQhhL1ZsyQwZBskel7YSqbrGi1JU6wqQnUFjglLYXltr83ae2QGsdP9+G3wQkr6V5qHL22L6Uzc+tbR9EkJLBeijHDLX//KJoplE/bMXV0YNQthbTl2L2gdjHs4gXNkr/S/Nz7n4kOrl+KyBlZNpbo+sgCliZYXgWdWSppdCOkIfUS8bJUsNgGtPRiyqyhzkMsVjC9FbOSHN+1AvQej/yC07dtP2F/vxSHW5BsM/z1BO7DT/rALBheQbJt9ekQGjPW4lnkFay3A30zZpoiyRNfWgFk98aJpk6OOVN8yQXYbnccLNzj4RN87PvNhulhZ4gvuYDjeYyEsVnG+BILcIbBO/RyhlyC3onEaeQvBpOgP4HTyEMshUyCdvT5SQ7+eQSp9yZw4pEn/Mj4kgtwJnsOUijWoWES7I7M3r8s9rRnaoP+Jhh7H6Um/LrwCJ6vNsUIzmuswYZagl3Ef2pi6jaP4INB8G+NJ9RQSTC8Df7mL8JQ6yZzD61pzedvgwyZHhNnS6KhAwpqnEsWZMgk6O+KToRNgzv5CzXk6os+/X5j2P9oNtcrwJBruOSvo2E19MsvxJBruNR7UziG7OvY8QswZJuy8KUwKIGb9hdqyCboGREGPQQP/C4bsglSf+gXUkF362eIId+sGv0cxBUy5eTxu2jIObO9W7mm/GXyu2bIuTZB/fh9fx/y+V0yZF18oc3qi3mOTUjRZ35XDJnXB8m23bKBrRqCVs8u+F0wZF/hpVvftPf70LaNDVocpJ9LexjPDCXW6F8/CFymv5S/C4ZCmxDCi73qd2ZYqODF+vk25IyPRTAgf2c5LFIw0M9rWKJgsJ/PsEDBCD9POyxPMMrvOIfFCUb6HRqWJhjtd1RLFQS9j+V4v4MciguS9Wx1SvLbz6G0INnueDNXot9uDqUF5/1dz4NJtWS/PUNhwdf+rv1pwwx+O7VUVJDe+/P2cpjF7zuHkoL02X/4ncNMfvPKnJYgufsrt4bZ/KaiV9OucoK03j+6rqUZ/TYfaBUTpO3+WDeH5+uJxQt++c05XH6YM386gjt+n1qa2U9DcNfvXUtz+ykIHvi9DLP7yQse+v0aZvcTF/T4TZztSyxf0O/HgXQGpf1kBeXzJyuo4ScpqOInKKjjJyeo5CcmqOUnJajmJySo5ycjqOgnIqjpJyKo6SciqOknIXi4lVIEAUHdk/IgCEEIQpAVCEIQghBkBYIQhKBVPcxYQvCuxzCIzMmons8sIFgOEGQvgBkIshfADATZC2AmXfB9IMC6A1EM9i04xgre/0qQOyothGUjVfARPV8lJLwPgJHlhLf46/8wyUXw8bn8JvqwQeeNNgqnTPshZ9wWHdvSCCvRg1Gv4BwYEt0Eb877AOYPLVjVccQa6xwhmfIuBXI/LWC6ti6DtnPfaZN2B6xcNMfyK1ZRpehdOC5Vm9Qjd/N+7CE/6eden54Iq0qO01oZtpZnI08HhOz36T9FEHTEkl+xrra3Lm3meDIeO0/U14P2s2HFUPeZXzYzdx+aui2Busn7ktqVZBlwyAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4OIfpwBXYNTDKQYAAAAASUVORK5CYII="}
                className={classes.avatar} />
            <UMenu
                id="user-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <UMenuItem onClick={handleProfileEdit}>Profile</UMenuItem>
                <UMenuItem onClick={handleClose}>My account</UMenuItem>
                <UMenuItem onClick={handleLogout}>Logout</UMenuItem>
            </UMenu>
            <Form
                token={app.el.el.state.userdata.token}
                //setItemId={setItemId}
                itemid={app.el.el.state.userdata.id}
                open={openEditForm}
                handleClose={handleEditFormClose}/>
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
