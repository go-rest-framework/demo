import React from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles(theme => ({
    root: {
        justifyContent: 'center',
        flexWrap: 'wrap',
        flexGrow: 1,
        padding: '1em',
    },
    paper: {
        padding: theme.spacing(1, 2),
    },
}));

function handleClick(event) {
    event.preventDefault();
    alert('You clicked a breadcrumb.');
}

export default function CustomSeparator(prop) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              <Link color="inherit" href="/" onClick={handleClick}>
                My site admin panel
              </Link>
              <Typography color="textPrimary">{prop.curpage}</Typography>
            </Breadcrumbs>
        </div>
    );
}
