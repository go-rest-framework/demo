import React from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';
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
    const [status, setStatus] = React.useState('');
    const [kind, setKind] = React.useState('');
    const [user, setUser] = React.useState('');

    function handleFilterByTitle(e) {
        var v = e.target.value;
        var c = props.searchData;
        c["title"] = v;
        props.setSearchData(c);
        props.setDataChange(props.datachange + 1);
    }

    function handleFilterByParent(e) {
        var v = e.target.value;
        var c = props.searchData;
        c["parent"] = v;
        props.setSearchData(c);
        props.setDataChange(props.datachange + 1);
    }

    function handleFilterByCreatedAt(e) {
        var v = e.target.value;
        var c = props.searchData;
        c["created_at"] = v;
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

    function handleFilterByKind(e) {
        var v = e.target.value;
        var c = props.searchData;
        c["kind"] = v;
        props.setSearchData(c);
        props.setDataChange(props.datachange + 1);
        setKind(v)
    }

    function handleFilterByUser(e) {
        var v = e.target.value;
        var c = props.searchData;
        c["user"] = v;
        props.setSearchData(c);
        props.setDataChange(props.datachange + 1);
        setUser(v)
    }

    return (
        <div>
        <form className={classes.form} noValidate>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <TextField
                        onChange={handleFilterByTitle}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="search_title"
                        label="Title"
                        name="title"
                    />
                    <TextField
                        onChange={handleFilterByParent}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="parent"
                        label="Parent"
                        id="search_parent"
                    />
                    <TextField
                        onChange={handleFilterByCreatedAt}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="created_at"
                        label="Create Date"
                        id="search_created_at"
                    />
                </Grid>
                <Grid item xs={6}>
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
                    <FormControl fullWidth>
                        <InputLabel
                            htmlFor="kind-helper"
                        >Kind</InputLabel>
                        <Select
                            value={kind}
                            onChange={handleFilterByKind}
                            input={<Input name="kind" id="kind-search-helper" />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"active"}>Active</MenuItem>
                            <MenuItem value={"blocked"}>Blocked</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel
                            htmlFor="user-helper"
                        >User</InputLabel>
                        <Select
                            value={user}
                            onChange={handleFilterByUser}
                            input={<Input name="user" id="user-search-helper" />}
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
