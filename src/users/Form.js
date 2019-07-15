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

export default function Form() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [values, setValues] = React.useState({
        role: '',
        name: 'hai',
    });

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleChange(event) {
        setValues(oldValues => ({
            oldValues,
            [event.target.name]: event.target.value,
        }));
    }

    return (
        <div>
        <div className={classes.buttonsWrap}>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
              <AddIcon />
              Add New User
            </Button>
        </div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Add New User
            </Typography>
            <Button color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <form className={classes.form} noValidate>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <TextField
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
                        value={values.role}
                        onChange={handleChange}
                        input={<Input name="role" id="role-helper" />}
                        >
                            <MenuItem value="">
                            <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>User</MenuItem>
                            <MenuItem value={20}>Admin</MenuItem>
                        </Select>
                        <FormHelperText>Some important helper text</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="firstname"
                        label="Firstname"
                        id="firstname"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="middlename"
                        label="Middlename"
                        id="middlename"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="lastname"
                        label="Lastname"
                        id="lastname"
                    />
                    <TextField
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
