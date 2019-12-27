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

export default function Form(props) {
    const classes = useStyles();
    const [status, setStatus] = React.useState(null);
    const [role, setRole] = React.useState(null);

    function handleFilterByEmail(e) {
        var v = e.target.value;
        var c = props.searchData;
        c["email"] = v;
        props.setSearchData(c);
        props.setDataChange(props.datachange + 1);
    }

    function handleFilterByPhone(e) {
        var v = e.target.value;
        var c = props.searchData;
        c["phone"] = v;
        props.setSearchData(c);
        props.setDataChange(props.datachange + 1);
    }

    function handleFilterByRole(e) {
        var v = e.target.value;
        var c = props.searchData;
        c["role"] = v;
        props.setSearchData(c);
        props.setDataChange(props.datachange + 1);
        setRole(v)
    }

    function handleFilterByName(e) {
        var v = e.target.value;
        var c = props.searchData;
        c["name"] = v;
        props.setSearchData(c);
        props.setDataChange(props.datachange + 1);
    }

    function handleFilterById(e) {
        var v = e.target.value;
        var c = props.searchData;
        c["id"] = v;
        props.setSearchData(c);
        props.setDataChange(props.datachange + 1);
    }

    function handleFilterByStatus(e) {
        var v = e.target.value;
        var c = props.searchData;
        c["status"] = v;
        props.setSearchData(c);
        props.setDataChange(props.datachange + 1);
        setStatus(v)
    }

    return (
        <div>
        <form className={classes.form} noValidate>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <TextField
                        onChange={handleFilterByEmail}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="search_email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                    />
                    <TextField
                        onChange={handleFilterByPhone}
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
                            value={role}
                            onChange={handleFilterByRole}
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
                        onChange={handleFilterByName}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="name"
                        label="By name"
                        id="search_name"
                    />
                    <TextField
                        onChange={handleFilterById}
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
                            value={status}
                            onChange={handleFilterByStatus}
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
