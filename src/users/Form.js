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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Form(props) {
    const classes = useStyles();

    const [formdata, setFormdata] = React.useState({
        email: '',
        password: '',
        repassword: '',
        role: '',
        firstname: '',
        middlename: '',
        lastname: '',
        phone: '',
    });

    const [formdataerrs, setFormdataerrs] = React.useState({
        email: '',
        password: '',
        repassword: '',
        role: '',
        firstname: '',
        middlename: '',
        lastname: '',
        phone: '',
    });

    function handleChange(event) {
        event.persist();
        const value = event.target.value;
        setFormdata(oldValues => ({
            ...oldValues,
            [event.target.name]: value,
        }));
    }

    function handleSave(e) {
        e.preventDefault();
        console.log(JSON.stringify(formdata));

        fetch('http://localhost/api/users', {
            method: "POST",
            body: JSON.stringify(formdata),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + props.app.state.userdata.token
            },
            credentials: "same-origin"
        }).then(function(response) {
            if (response.status === 200) {
                response.json().then(function(res) {
                    if (res.errors != null) {
                        for (var one of res.errors) {
                            console.log(one);
                            setFormdataerrs(oldValues => ({
                                ...oldValues,
                                [one.item]: one.msg,
                            }));
                            if (one.item == 'json') {
                                alert(one.msg);
                            }
                        }
                    } else {
                        console.log(res.data);
                        props.handleClose();
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

    return (
        <div>
        <div className={classes.buttonsWrap}>
            <Button variant="outlined" color="primary" onClick={props.handleClickCreate}>
              <AddIcon />
              Add New User
            </Button>
        </div>
      <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="Close">
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
                <Grid item xs={6}>
                    <TextField
                        value={formdata.email}
                        onChange={handleChange}
                        error={(formdataerrs.email == '') ? false : true}
                        helperText={formdataerrs.email}
                        variant="outlined"
                        margin="normal"
                        required
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
                        required
                        fullWidth
                        name="password"
                        label="Password"
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
                        required
                        fullWidth
                        name="repassword"
                        label="Re Password"
                        type="password"
                        id="repassword"
                    />
                    <FormControl fullWidth>
                        <InputLabel htmlFor="role-helper">Role</InputLabel>
                        <Select
                            value={formdata.role}
                            onChange={handleChange}
                            error={(formdataerrs.role == '') ? false : true}
                            helperText={formdataerrs.role}
                            input={<Input name="role" id="role-helper" />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"user"}>User</MenuItem>
                            <MenuItem value={"admin"}>Admin</MenuItem>
                        </Select>
                        <FormHelperText>Some important helper text</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        value={formdata.firstname}
                        onChange={handleChange}
                        error={(formdataerrs.firstname == '') ? false : true}
                        helperText={formdataerrs.firstname}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="firstname"
                        label="Firstname"
                        id="firstname"
                    />
                    <TextField
                        value={formdata.middlename}
                        onChange={handleChange}
                        error={(formdataerrs.middlename == '') ? false : true}
                        helperText={formdataerrs.middlename}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="middlename"
                        label="Middlename"
                        id="middlename"
                    />
                    <TextField
                        value={formdata.lastname}
                        onChange={handleChange}
                        error={(formdataerrs.lastname == '') ? false : true}
                        helperText={formdataerrs.lastname}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="lastname"
                        label="Lastname"
                        id="lastname"
                    />
                    <TextField
                        value={formdata.phone}
                        onChange={handleChange}
                        error={(formdataerrs.phone == '') ? false : true}
                        helperText={formdataerrs.phone}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="phone"
                        label="Phone"
                        id="phone"
                    />
                </Grid>
            </Grid>
        </form>
      </Dialog>
    </div>
    );
}
