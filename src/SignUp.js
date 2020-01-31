import React from 'react';
import produce from "immer";
import {
    set,
    has
} from "lodash";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {
    makeStyles
} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
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
    password: '',
    repassword: '',
    role: '',
    status: '',
    callBackUrl: window.location.href,
    profile: {
        firstname: '',
        middlename: '',
        lastname: '',
        phone: '',
        avatar: '',
    }
};

export default function SignUp(props) {
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

    function switchToSignIn(e) {
        e.preventDefault();
        props.el.setState({
            page: "signin"
        });
    }

    function handleSave(e) {
        e.preventDefault();
        var method = "POST";
        var url = "http://localhost/api/users/register";
        fetch(url, {
            method: method,
            body: JSON.stringify(formdata),
            headers: {
                "Content-Type": "application/json",
                //"Authorization": "Bearer " + props.token
            },
            credentials: "same-origin"
        }).then(function(response) {
            if (response.status === 200) {
                response.json().then(function(res) {
                    if (res.errors != null) {
                        clearErrorData();
                        for (var one of res.errors) {
                            console.log(one);
                            setFormdataerrs({
                                [one.item]: one.msg,
                            });
                            if (one.item == 'json') {
                                alert(one.msg);
                            } else {

                            }
                        }
                    } else {
                        props.el.setState({
                            page: "signin",
                            sysmsg: "You have successfully registered, please check your email for further instructions."
                        });
                    }
                });
            } else {
                //TODO dont work!!!
                alert(response.text());
            }
        }, function(error) {
            alert(error.message); //=> String
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
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                value={formdata.email}
                                onChange={handleChange}
                                error={(formdataerrs.email == '') ? false : true}
                                helperText={formdataerrs.email}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={formdata.password}
                                onChange={handleChange}
                                error={(formdataerrs.password == '') ? false : true}
                                helperText={formdataerrs.password}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={formdata.repassword}
                                onChange={handleChange}
                                error={(formdataerrs.repassword == '') ? false : true}
                                helperText={formdataerrs.repassword}
                                variant="outlined"
                                required
                                fullWidth
                                name="repassword"
                                label="Password Re"
                                type="password"
                                id="repassword"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={formdata.profile.firstname}
                                onChange={handleChange}
                                error={(formdataerrs.profile.firstname == '') ? false : true}
                                helperText={formdataerrs.profile.firstname}
                                autoComplete="fname"
                                variant="outlined"
                                fullWidth
                                name="profile.firstname"
                                label="Firstname"
                                id="firstname"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={formdata.profile.lastname}
                                onChange={handleChange}
                                error={(formdataerrs.profile.lastname == '') ? false : true}
                                helperText={formdataerrs.profile.lastname}
                                autoComplete="lname"
                                variant="outlined"
                                fullWidth
                                name="profile.lastname"
                                label="Lastname"
                                id="lastname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSave}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2" onClick={switchToSignIn}>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
