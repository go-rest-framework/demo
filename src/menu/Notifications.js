import React from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import DeleteIcon from '@material-ui/icons/Close';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
    root: {
        padding: '0.5em',
    },
    menuItem: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '1em',
    },
    menuItemTitle: {
        flexGrow: '1',
    },
    menuItemBtn: {},
}));

function handleClick(event) {
    event.preventDefault();
    alert('You clicked a breadcrumb.');
}

export default function CustomSeparator() {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    let data = [
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At",
        "vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        "test test test",
        "vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,",
    ];

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    return (
        <div className={classes.root}>
            <IconButton onClick={handleClick} color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Menu
                id="user-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {
                    Object.keys(data).map((index) => {
                        return (
                            <MenuItem
                                key={'notifications_'+index}
                                className={classes.menuItem}
                            >
                                <div
                                    onClick={handleClose}
                                    className={classes.menuItemTitle}
                                >
                                    {data[index]}
                                </div>
                                <IconButton
                                    className={classes.menuItemBtn}
                                    aria-label="Remove"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </MenuItem>
                        );
                    })
                }
            </Menu>
        </div>
    );
}
