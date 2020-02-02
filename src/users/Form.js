import React from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';
import produce from "immer";
import {
    set,
    has
} from "lodash";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from './Avatar.js';

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    buttonsWrap: {
        textAlign: 'right',
        margin: '1em 0',
    },
    buttonsWrapHidden: {
        display: 'none',
    },
    form: {
        padding: '2em',
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function enhancedReducer(state, updateArg) {
    // check if the type of update argument is a callback function
    if (updateArg.constructor === Function) {
        return {
            ...state,
            ...updateArg(state)
        };
    }

    // if the type of update argument is an object
    if (updateArg.constructor === Object) {
        // does the update object have _path and _value as it's keys
        // if yes then use them to update deep object values
        if (has(updateArg, "_path") && has(updateArg, "_value")) {
            const {
                _path,
                _value
            } = updateArg;

            return produce(state, draft => {
                set(draft, _path, _value);
            });
        } else {
            return {
                ...state,
                ...updateArg
            };
        }
    }
}

const initialState = {
    email: '',
    password: '',
    repassword: '',
    role: '',
    status: '',
    profile: {
        firstname: '',
        middlename: '',
        lastname: '',
        phone: '',
        avatar: '',
    }
};

export default function Form(props) {
    const classes = useStyles();

    const [formdata, setFormdata] = React.useReducer(enhancedReducer, initialState);

    const [formdataerrs, setFormdataerrs] = React.useReducer(enhancedReducer, initialState);

    const handleChange = React.useCallback(({
        target: {
            value,
            name,
            type
        }
    }) => {
        const updatePath = name.split(".");

        // if the input is a checkbox then use callback function to update
        // the toggle state based on previous state
        if (type === 'checkbox') {
            setFormdata((prevState) => ({
                [name]: !prevState[name]
            }))

            return
        }

        // if we have to update the root level nodes in the form
        if (updatePath.length === 1) {
            const [key] = updatePath;

            setFormdata({
                [key]: value
            });
        }

        // if we have to update nested nodes in the form object
        // use _path and _value to update them.
        if (updatePath.length === 2) {
            setFormdata({
                _path: updatePath,
                _value: value
            });
        }
    }, []);

    React.useEffect(() => {
        if (props.itemid != 0) {
            fetch('/api/users/' + props.itemid, {
                method: "GET",
                //body: JSON.stringify(a),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + props.token
                },
                credentials: "same-origin"
            }).then(function(response) {
                if (response.status === 200) {
                    response.json().then(function(res) {
                        if (res.errors != null) {
                            console.log(res.errors);
                        } else {
                            console.log(res.data);

                            setFormdata({
                                email: res.data.email,
                                password: '',
                                repassword: '',
                                role: res.data.role,
                                status: res.data.status,
                                profile: {
                                    firstname: res.data.profile.firstname,
                                    middlename: res.data.profile.middlename,
                                    lastname: res.data.profile.lastname,
                                    phone: res.data.profile.phone,
                                    avatar: res.data.profile.avatar,
                                }
                            });
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
    }, [props.itemid]);


    function changeAva(val) {
        name = "profile.avatar"
        const updatePath = name.split(".");

        setFormdata({
            _path: updatePath,
            _value: val
        });
    }

    function handleSave(e) {
        e.preventDefault();
        var method = "POST";
        var url = "/api/users";
        if (props.itemid != 0) {
            method = "PATCH";
            url = "/api/users/" + props.itemid;
        }
        fetch(url, {
            method: method,
            body: JSON.stringify(formdata),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + props.token
            },
            credentials: "same-origin"
        }).then(function(response) {
            if (response.status === 200) {
                response.json().then(function(res) {
                    if (res.errors != null) {
                        for (var one of res.errors) {
                            console.log(one);
                            setFormdataerrs({
                                [one.item]: one.msg,
                            });
                            if (one.item == 'json') {
                                alert(one.msg);
                            }
                        }
                    } else {
                        props.handleClose();
                        clearFormData();
                        clearErrorData();
                    }
                });
            } else if (response.status === 401) {
                sessionStorage.clear();
                location.reload();
            } else {
                //TODO dont work!!!
                alert(response.text());
            }
        }, function(error) {
            alert(error.message); //=> String
        });
    }

    function handleClose(e) {
        props.handleClose(e);
        clearFormData();
        clearErrorData();
    }

    function clearFormData() {
        var list = objectKeysToString(initialState, []);
        props.setItemId(0);
        list.forEach(function name(name, index) {
            const updatePath = name.split(".");

            if (updatePath.length === 1) {
                const [key] = updatePath;

                setFormdata({
                    [key]: ""
                });
            }

            if (updatePath.length === 2) {
                setFormdata({
                    _path: updatePath,
                    _value: ""
                });
            }
        });
    }

    function clearErrorData() {
        var list = objectKeysToString(initialState, []);
        list.forEach(function name(name, index) {
            const updatePath = name.split(".");

            if (updatePath.length === 1) {
                const [key] = updatePath;

                setFormdataerrs({
                    [key]: ""
                });
            }

            if (updatePath.length === 2) {
                setFormdataerrs({
                    _path: updatePath,
                    _value: ""
                });
            }
        });
    }

    function objectKeysToString(obj, storage, prefix) {
        if (obj.constructor === Object) {
            for (var prop in obj) {
                if (obj[prop].constructor === Object) {
                    objectKeysToString(obj[prop], storage, prop)
                } else {
                    if (prefix == undefined) {
                        storage.push(prop);
                    } else {
                        storage.push(prefix + '.' + prop);
                    }
                }
            }
        }

        return storage;
    }

    return (
        <div>
        <div className={(props.handleClickCreate != undefined) ? classes.buttonsWrap : classes.buttonsWrapHidden}>
            <Button variant="outlined" color="primary" onClick={props.handleClickCreate}>
              <AddIcon />
              Add New User
            </Button>
        </div>
      <Dialog fullScreen open={props.open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Add New User
            </Typography>
            <Button color="inherit" onClick={handleSave}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <form className={classes.form} noValidate>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <TextField
                        value={formdata.email}
                        onChange={handleChange}
                        error={(formdataerrs.email == '') ? false : true}
                        helperText={formdataerrs.email}
                        variant="outlined"
                        margin="normal"
                        required={(props.itemid == 0) ? true : false}
                        disabled={(props.itemid != 0) ? true : false}
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                    />
                    <TextField
                        value={formdata.password}
                        onChange={handleChange}
                        error={(formdataerrs.password == '') ? false : true}
                        helperText={formdataerrs.password}
                        variant="outlined"
                        margin="normal"
                        required={(props.itemid == 0) ? true : false}
                        //disabled={(props.itemid != 0) ? true : false}
                        fullWidth
                        name="password"
                        label={(props.itemid == 0) ? "Password" : "New Password"}
                        type="password"
                        id="password"
                    />
                    <TextField
                        value={formdata.repassword}
                        onChange={handleChange}
                        error={(formdataerrs.repassword == '') ? false : true}
                        helperText={formdataerrs.repassword}
                        variant="outlined"
                        margin="normal"
                        required={(props.itemid == 0) ? true : false}
                        //disabled={(props.itemid != 0) ? true : false}
                        fullWidth
                        name="repassword"
                        label={(props.itemid == 0) ? "Re Password" : "Re New Password"}
                        type="password"
                        id="repassword"
                    />
                    <FormControl fullWidth>
                        <InputLabel
                            htmlFor="role-helper"
                            helperText={formdataerrs.role}
                        >Role</InputLabel>
                        <Select
                            value={formdata.role}
                            onChange={handleChange}
                            error={(formdataerrs.role == '') ? false : true}
                            input={<Input name="role" id="role-helper" />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"user"}>User</MenuItem>
                            <MenuItem value={"admin"}>Admin</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel
                            htmlFor="status-helper"
                            helperText={formdataerrs.status}
                        >Status</InputLabel>
                        <Select
                            value={formdata.status}
                            onChange={handleChange}
                            error={(formdataerrs.status == '') ? false : true}
                            input={<Input name="status" id="status-helper" />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"active"}>Active</MenuItem>
                            <MenuItem value={"blocked"}>Blocked</MenuItem>
                            <MenuItem value={"draft"}>Draft</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        value={formdata.profile.phone}
                        onChange={handleChange}
                        error={(formdataerrs.profile.phone == '') ? false : true}
                        helperText={formdataerrs.profile.phone}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="profile.phone"
                        label="Phone"
                        id="phone"
                    />
                    <TextField
                        value={formdata.profile.firstname}
                        onChange={handleChange}
                        error={(formdataerrs.profile.firstname == '') ? false : true}
                        helperText={formdataerrs.profile.firstname}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="profile.firstname"
                        label="Firstname"
                        id="firstname"
                    />
                    <TextField
                        value={formdata.profile.middlename}
                        onChange={handleChange}
                        error={(formdataerrs.profile.middlename == '') ? false : true}
                        helperText={formdataerrs.profile.middlename}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="profile.middlename"
                        label="Middlename"
                        id="middlename"
                    />
                    <TextField
                        value={formdata.profile.lastname}
                        onChange={handleChange}
                        error={(formdataerrs.profile.lastname == '') ? false : true}
                        helperText={formdataerrs.profile.lastname}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="profile.lastname"
                        label="Lastname"
                        id="lastname"
                    />
                </Grid>
                <Grid item xs={4}>
                    <Avatar changeAva={changeAva} formdata={formdata} />
                </Grid>
            </Grid>
        </form>
      </Dialog>
    </div>
    );
}
