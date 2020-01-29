import React from 'react';
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn(parent) {
    const classes = useStyles();

    const [errorpass, setErrPass] = React.useState(false);
    const [errorpassre, setErrPassRe] = React.useState(false);

    const [errorpassmsg, setErrPassMsg] = React.useState(null);
    const [errorpassremsg, setErrPassReMsg] = React.useState(null);

    function switchToSignUp(e) {
        e.preventDefault();
        parent.el.setState({
            page: "signup"
        });
    }

    function switchToSignIn(e) {
        e.preventDefault();
        parent.el.setState({
            page: "signin"
        });
    }

    function switchToSignRe(e) {
        e.preventDefault();
        parent.el.setState({
            page: "signre"
        });
    }

    function switchToDashboard(e) {
        e.preventDefault();
        parent.el.setState({
            page: "layout"
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        let a = {};

        for (var pair of data.entries()) {
            a[pair[0]] = pair[1];
        }

        var url_string = window.location.href;
        var url = new URL(url_string);
        var repasstoken = url.searchParams.get("repasstoken");

        a["checkToken"] = repasstoken;

        fetch('http://localhost/api/users/reset', {
            method: "POST",
            body: JSON.stringify(a),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        }).then(function(response) {
            response.json().then(function(res) {
                setErrPass(false)
                setErrPassMsg(null)
                setErrPassRe(false)
                setErrPassReMsg(null)
                if (res.errors === null) {
                    parent.el.setState({
                        page: "signin",
                        sysmsg: "Your password was successfully changed."
                    });
                } else {
                    for (var one of res.errors) {
                        console.log(one);
                        if (one.item == 'password') {
                            setErrPass(true)
                            setErrPassMsg(one.msg)
                        }
                        if (one.item == 'repassword') {
                            setErrPassRe(true)
                            setErrPassReMsg(one.msg)
                        }
                    }
                }
            });
        }, function(error) {
            alert(error.message); //=> String
        });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Change password
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        error={errorpass}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="New Password"
                        type="password"
                        id="newpass"
                        autoComplete="current-password"
                        helperText={errorpassmsg}
                    />
                    <TextField
                        error={errorpassre}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="repassword"
                        label="New Password Re"
                        type="password"
                        id="newpassRe"
                        helperText={errorpassremsg}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Submit
                    </Button>
                    <div>
                        <Link href="#" variant="body2" onClick={switchToSignIn}>
                            Remember password? Sign in
                        </Link>
                    </div>
                    <div>
                        <Link href="#" variant="body2" onClick={switchToSignUp}>
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </div>
                </form>
            </div>
        </Container>
    );
}
