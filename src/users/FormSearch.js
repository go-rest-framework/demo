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
    form: {
        padding: '2em',
    }
}));

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
    phone: '',
    role: '',
    name: '',
    id: '',
    status: '',
};

export default function Form(props) {
    const classes = useStyles();

    const [formdata, setFormdata] = React.useReducer(enhancedReducer, initialState);

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

    //function handleSave(e) {
    //e.preventDefault();
    //console.log(JSON.stringify(formdata));

    //fetch('http://localhost/api/users', {
    //method: "POST",
    //body: JSON.stringify(formdata),
    //headers: {
    //"Content-Type": "application/json",
    //"Authorization": "Bearer " + props.app.state.userdata.token
    //},
    //credentials: "same-origin"
    //}).then(function(response) {
    //if (response.status === 200) {
    //response.json().then(function(res) {
    //if (res.errors != null) {
    //for (var one of res.errors) {
    //console.log(one);
    //setFormdataerrs({
    //[one.item]: one.msg,
    //});
    //if (one.item == 'json') {
    //alert(one.msg);
    //} else {

    //}
    //}
    //} else {
    //clearFormData();
    //props.handleClose();
    //}
    //});
    //} else if (response.status === 401) {
    //sessionStorage.clear();
    //location.reload();
    //} else {
    ////TODO dont work!!!
    //alert(response.text());
    //}
    //}, function(error) {
    //alert(error.message); //=> String
    //});
    //}

    //function clearFormData() {
    //var list = objectKeysToString(initialState, []);
    //list.forEach(function name(name, index) {
    //const updatePath = name.split(".");

    //if (updatePath.length === 1) {
    //const [key] = updatePath;

    //setFormdata({
    //[key]: ""
    //});
    //}

    //if (updatePath.length === 2) {
    //setFormdata({
    //_path: updatePath,
    //_value: ""
    //});
    //}
    //});
    //}

    //function objectKeysToString(obj, storage, prefix) {
    //if (obj.constructor === Object) {
    //for (var prop in obj) {
    //if (obj[prop].constructor === Object) {
    //objectKeysToString(obj[prop], storage, prop)
    //} else {
    //if (prefix == undefined) {
    //storage.push(prop);
    //} else {
    //storage.push(prefix + '.' + prop);
    //}
    //}
    //}
    //}

    //return storage;
    //}

    return (
        <div>
        <form className={classes.form} noValidate>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <TextField
                        value={formdata.email}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="search_email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                    />
                    <TextField
                        value={formdata.phone}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="phone"
                        label="Phone"
                        id="search_phone"
                    />
                    <FormControl fullWidth>
                        <InputLabel
                            htmlFor="role-helper"
                        >Role</InputLabel>
                        <Select
                            value={formdata.role}
                            onChange={handleChange}
                            input={<Input name="role" id="search-role-helper" />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"user"}>User</MenuItem>
                            <MenuItem value={"admin"}>Admin</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        value={formdata.name}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="name"
                        label="By name"
                        id="search_name"
                    />
                    <TextField
                        value={formdata.id}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="id"
                        label="By ID"
                        id="search_id"
                    />
                    <FormControl fullWidth>
                        <InputLabel
                            htmlFor="status-helper"
                        >Status</InputLabel>
                        <Select
                            value={formdata.status}
                            onChange={handleChange}
                            input={<Input name="status" id="status-search-helper" />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"active"}>Active</MenuItem>
                            <MenuItem value={"blocked"}>Blocked</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </form>
    </div>
    );
}
