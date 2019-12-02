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
import MenuIcon from '@material-ui/icons/ArrowDropDown';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Form from './Form.js';
import AlertDialogSlide from './AlertDialogSlide.js';

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
{
  "errors": null,
  "data": [
    {
      "ID": 1,
      "CreatedAt": "2019-07-03T23:27:14Z",
      "UpdatedAt": "2019-07-03T23:27:14Z",
      "DeletedAt": null,
      "email": "admin@admin.a",
      "password": "af4b4f7bf36d59a2a1c7b8c3ae318ae43fa7d1714962690303ec41022ae8764a",
      "role": "admin",
      "token": "",
      "CallBackUrl": "",
      "profile": {
        "ID": 0,
        "CreatedAt": "0001-01-01T00:00:00Z",
        "UpdatedAt": "0001-01-01T00:00:00Z",
        "DeletedAt": null,
        "firstname": "",
        "middlename": "",
        "lastname": "",
        "phone": ""
      },
      "profileID": 0
    },
    {
      "ID": 2,
      "CreatedAt": "2019-07-03T23:27:14Z",
      "UpdatedAt": "2019-07-03T23:27:14Z",
      "DeletedAt": null,
      "email": "testuser@test.t",
      "password": "67dcd00e86fbb3ec0b796b9d435f157f00dd4e4978ff0143baabbc70cc70a6c4",
      "role": "user",
      "token": "",
      "CallBackUrl": "",
      "profile": {
        "ID": 0,
        "CreatedAt": "0001-01-01T00:00:00Z",
        "UpdatedAt": "0001-01-01T00:00:00Z",
        "DeletedAt": null,
        "firstname": "",
        "middlename": "",
        "lastname": "",
        "phone": ""
      },
      "profileID": 0
    }
  ]
}
`;

//<Divider className={classes.divider} />

export default function Users(props) {
    const classes = useStyles();
    const [editID, setEditID] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [deleteopen, setDeleteOpen] = React.useState(false);
    const [data, setData] = React.useState({});
    const [datachange, setDataChange] = React.useState(0);
    const [deleteitem, setDeleteItem] = React.useState(0);

    React.useEffect(() => {
        fetch('http://localhost/api/users', {
            method: "GET",
            //body: JSON.stringify(a),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + props.app.state.userdata.token
            },
            credentials: "same-origin"
        }).then(function(response) {
            if (response.status === 200) {
                response.json().then(function(res) {
                    if (res.errors != null) {
                        console.log(res.errors);
                    } else {
                        console.log(res.data);
                        setData(res.data);
                    }
                });
            } else if (response.status === 401) {
                sessionStorage.clear();
                location.reload();
            } else {
                alert(response.text());
            }
        }, function(error) {
            alert(error.message); //=> String
        });
    }, [datachange]);

    /*setTimeout(function() {
        setDataChange(datachange + 1);
    }, 5000);*/

    function handleClickEdit(id) {
        console.log(id);
        setOpen(true);
    }

    function handleClickCreate() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
        setDataChange(datachange + 1);
    }

    function handleDeleteAsk(id) {
        setDeleteOpen(true);
        setDeleteItem(id);
    }

    function handleDeleteAbort() {
        setDeleteOpen(false);
        setDeleteItem(0);
    }

    function handleDelete() {
        fetch('http://localhost/api/users/' + deleteitem, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + props.app.state.userdata.token
            },
            credentials: "same-origin"
        }).then(function(response) {
            if (response.status === 200) {
                response.json().then(function(res) {
                    if (res.errors != null) {
                        console.log(res.errors);
                    } else {
                        setDeleteItem(0);
                        setDeleteOpen(false);
                        setDataChange(datachange + 1);
                    }
                });
            } else if (response.status === 401) {
                sessionStorage.clear();
                location.reload();
            } else {
                alert(response.text());
            }
        }, function(error) {
            alert(error.message); //=> String
        });
    }


    return (
        <div>
            <AlertDialogSlide open={deleteopen} handleDeleteAbort={handleDeleteAbort} handleDelete={handleDelete} />
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
            <Form
                app={props.app}
                open={open}
                handleClickCreate={handleClickCreate}
                handleClose={handleClose}/>
            {
                Object.keys(data).map((index) => {
                    return (
                        <Paper key={'userID_'+data[index].ID} className={classes.items}>
                            <Avatar
                                alt="Remy Sharp"
                                src="https://lh3.googleusercontent.com/a-/AAuE7mAmekuYgBj8w1wXk81CVdg1N1Tmq1EJdKR6YyiEXA=s96"
                                className={classes.avatar} />
                            <div className={classes.name}>
                                {data[index].email}
                            </div>
                            <div className={classes.name}>
                                {data[index].role}
                            </div>
                            <IconButton className={classes.iconButton} aria-label="Edit" onClick={handleClickEdit.bind(this,data[index].ID)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton className={classes.iconButton} aria-label="Delete" onClick={handleDeleteAsk.bind(this, data[index].ID)}>
                                <DeleteIcon />
                            </IconButton>
                        </Paper>
                    );
                })
            }
        </div>
    );
}
