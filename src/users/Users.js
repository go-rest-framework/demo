import React from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Form from './Form.js';

const useStyles = makeStyles({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        width: 0,
        height: '1em',
        margin: 4,
    },
    items: {
        display: 'flex',
        padding: '1em',
        marginBottom: '0.5em',
    },
    avatar: {
        margin: '0 1em 0 0',
    },
    name: {
        fontSize: '1.2em',
        lineHeight: '2.5',
        flex: 1,
    },
});

let testJsonData = `
[
  {
    "userId": 1,
    "id": 1,
    "name": "Test Testovich",
    "role": "admin"
  },
  {
    "userId": 1,
    "id": 2,
    "name": "Test Testovich",
    "role": "user"
  },
  {
    "userId": 1,
    "id": 3,
    "name": "Test Testovich",
    "role": "user"
  }
]
`;

//<Divider className={classes.divider} />

export default function Users(props) {
    const classes = useStyles();

    let data = JSON.parse(testJsonData);
    let keys = Object.keys(data);

    return (
        <div>
            <Paper className={classes.root}>
              <IconButton className={classes.iconButton} aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <InputBase
                className={classes.input}
                placeholder="Start type for search..."
                inputProps={{ 'aria-label': 'Start type for search...' }}
              />
              <IconButton className={classes.iconButton} aria-label="Search">
                <SearchIcon />
              </IconButton>
            </Paper>
            <Form />
            {
                keys.map((index) => {
                    return (
                        <Paper key={'userID_'+data[index].id} className={classes.items}>
                            <Avatar
                                alt="Remy Sharp"
                                src="https://lh3.googleusercontent.com/a-/AAuE7mAmekuYgBj8w1wXk81CVdg1N1Tmq1EJdKR6YyiEXA=s96"
                                className={classes.avatar} />
                            <div className={classes.name}>
                                {data[index].name}
                            </div>
                            <div className={classes.name}>
                                {data[index].role}
                            </div>
                            <IconButton className={classes.iconButton} aria-label="Edit">
                                <EditIcon />
                            </IconButton>
                            <IconButton className={classes.iconButton} aria-label="Delete">
                                <DeleteIcon />
                            </IconButton>
                        </Paper>
                    );
                })
            }
        </div>
    );
}
