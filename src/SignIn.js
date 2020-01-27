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

    const [erroremail, setErrEmail] = React.useState(false);
    const [errorpass, setErrPass] = React.useState(false);

    const [erroremailmsg, setErrEmailMsg] = React.useState(null);
    const [errorpassmsg, setErrPassMsg] = React.useState(null);

    function switchToSignUp(e) {
        e.preventDefault();
        parent.el.setState({
            page: "signup"
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
            if (pair[0] != 'rememberme') {
                a[pair[0]] = pair[1];
            } else {
                parent.el.setState({
                    rememberuser: true,
                });
            }
        }

        fetch('http://localhost/api/users/login', {
            method: "POST",
            body: JSON.stringify(a),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        }).then(function(response) {
            response.json().then(function(res) {
                if (res.errors === null) {
                    console.log(res.data);
                    if (parent.el.state.rememberuser) {
                        localStorage.setItem('userid', res.data.ID);
                        localStorage.setItem('useremail', res.data.email);
                        localStorage.setItem('userrole', res.data.role);
                        localStorage.setItem('usertoken', res.data.token);
                        localStorage.setItem('useravatar', res.data.profile.avatar);
                    } else {
                        sessionStorage.setItem('userid', res.data.ID);
                        sessionStorage.setItem('useremail', res.data.email);
                        sessionStorage.setItem('userrole', res.data.role);
                        sessionStorage.setItem('usertoken', res.data.token);
                        sessionStorage.setItem('useravatar', res.data.profile.avatar);
                    }
                    parent.el.setState({
                        userdata: {
                            id: res.data.ID,
                            token: res.data.token,
                            email: res.data.email,
                            role: res.data.role,
                        },
                    });
                    parent.el.setState({
                        page: "layout",
                    });
                } else {
                    for (var one of res.errors) {
                        console.log(one);
                        if (one.item == 'email') {
                            setErrEmail(true)
                            setErrEmailMsg(one.msg)
                        }
                        if (one.item == 'password') {
                            setErrPass(true)
                            setErrPassMsg(one.msg)
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
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            error={erroremail}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            helperText={erroremailmsg}
          />
          <TextField
            error={errorpass}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            helperText={errorpassmsg}
          />
          <FormControlLabel
            control={<Checkbox value="1" name="rememberme" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            //onClick={switchToDashboard}
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" onClick={switchToSignRe}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick={switchToSignUp}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    );
}
