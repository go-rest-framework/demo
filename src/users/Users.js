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
import Grow from '@material-ui/core/Grow';

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

//<Divider className={classes.divider} />

export default function Users(props) {
    const classes = useStyles();
    const [editID, setEditID] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [deleteopen, setDeleteOpen] = React.useState(false);
    const [data, setData] = React.useState({});
    const [datachange, setDataChange] = React.useState(0);
    const [deleteitem, setDeleteItem] = React.useState(0);

    const [checked, setChecked] = React.useState(false);

    function handleChange() {
        setChecked(prev => !prev);
    }

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

    function handleSearch(e) {
        var v = e.target.value;
        if (v.length == 0) {
            setDataChange(datachange + 1);
        }
        if (v.length > 2) {
            fetch('http://localhost/api/users?all=' + v, {
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
        }
    }

    return (
        <div>
            <AlertDialogSlide open={deleteopen} handleDeleteAbort={handleDeleteAbort} handleDelete={handleDelete} />
            <Paper className={classes.root}>
              <IconButton
                className={classes.iconButton}
                aria-label="Menu"
                onClick={handleChange}
              >
                <MenuIcon />
              </IconButton>
              <InputBase
                className={classes.input}
                placeholder="Start type for search..."
                inputProps={{ 'aria-label': 'Start type for search...' }}
                onChange={handleSearch}
              />
              <IconButton
                  className={classes.iconButton}
                  aria-label="Search"
              >
                <SearchIcon />
              </IconButton>
            </Paper>
            <Grow in={checked}>
              <Paper className={classes.root}>
                  dkdkdkdkdkd
                  dkdkdkdkdkd
                  dkdkdkdkdkd
              </Paper>
            </Grow>
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
                                src={(data[index].profile.avatar != "")? data[index].profile.avatar : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAAMFBMVEX29u/d3dfc3Nb39/Dr6+Tm5t7z8+zt7ebn5+Hh4dvx8erk5N7g4Nr09Ozc3NXt7eUtlyuvAAAFBklEQVR4nO2d6XKrMAxGg0XMmvT93/ZC0xBDwOBFku/Md351urg6yAZvMbcbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAID/ByoJBjlbD9XTlMCzGmqbVZKo7uaSq1KYg+nqbIrUVOW4fTBVk8eQhhL1ZsyQwZBskel7YSqbrGi1JU6wqQnUFjglLYXltr83ae2QGsdP9+G3wQkr6V5qHL22L6Uzc+tbR9EkJLBeijHDLX//KJoplE/bMXV0YNQthbTl2L2gdjHs4gXNkr/S/Nz7n4kOrl+KyBlZNpbo+sgCliZYXgWdWSppdCOkIfUS8bJUsNgGtPRiyqyhzkMsVjC9FbOSHN+1AvQej/yC07dtP2F/vxSHW5BsM/z1BO7DT/rALBheQbJt9ekQGjPW4lnkFay3A30zZpoiyRNfWgFk98aJpk6OOVN8yQXYbnccLNzj4RN87PvNhulhZ4gvuYDjeYyEsVnG+BILcIbBO/RyhlyC3onEaeQvBpOgP4HTyEMshUyCdvT5SQ7+eQSp9yZw4pEn/Mj4kgtwJnsOUijWoWES7I7M3r8s9rRnaoP+Jhh7H6Um/LrwCJ6vNsUIzmuswYZagl3Ef2pi6jaP4INB8G+NJ9RQSTC8Df7mL8JQ6yZzD61pzedvgwyZHhNnS6KhAwpqnEsWZMgk6O+KToRNgzv5CzXk6os+/X5j2P9oNtcrwJBruOSvo2E19MsvxJBruNR7UziG7OvY8QswZJuy8KUwKIGb9hdqyCboGREGPQQP/C4bsglSf+gXUkF362eIId+sGv0cxBUy5eTxu2jIObO9W7mm/GXyu2bIuTZB/fh9fx/y+V0yZF18oc3qi3mOTUjRZ35XDJnXB8m23bKBrRqCVs8u+F0wZF/hpVvftPf70LaNDVocpJ9LexjPDCXW6F8/CFymv5S/C4ZCmxDCi73qd2ZYqODF+vk25IyPRTAgf2c5LFIw0M9rWKJgsJ/PsEDBCD9POyxPMMrvOIfFCUb6HRqWJhjtd1RLFQS9j+V4v4MciguS9Wx1SvLbz6G0INnueDNXot9uDqUF5/1dz4NJtWS/PUNhwdf+rv1pwwx+O7VUVJDe+/P2cpjF7zuHkoL02X/4ncNMfvPKnJYgufsrt4bZ/KaiV9OucoK03j+6rqUZ/TYfaBUTpO3+WDeH5+uJxQt++c05XH6YM386gjt+n1qa2U9DcNfvXUtz+ykIHvi9DLP7yQse+v0aZvcTF/T4TZztSyxf0O/HgXQGpf1kBeXzJyuo4ScpqOInKKjjJyeo5CcmqOUnJajmJySo5ycjqOgnIqjpJyKo6SciqOknIXi4lVIEAUHdk/IgCEEIQpAVCEIQghBkBYIQhKBVPcxYQvCuxzCIzMmons8sIFgOEGQvgBkIshfADATZC2AmXfB9IMC6A1EM9i04xgre/0qQOyothGUjVfARPV8lJLwPgJHlhLf46/8wyUXw8bn8JvqwQeeNNgqnTPshZ9wWHdvSCCvRg1Gv4BwYEt0Eb877AOYPLVjVccQa6xwhmfIuBXI/LWC6ti6DtnPfaZN2B6xcNMfyK1ZRpehdOC5Vm9Qjd/N+7CE/6eden54Iq0qO01oZtpZnI08HhOz36T9FEHTEkl+xrra3Lm3meDIeO0/U14P2s2HFUPeZXzYzdx+aui2Busn7ktqVZBlwyAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4OIfpwBXYNTDKQYAAAAASUVORK5CYII="}
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
