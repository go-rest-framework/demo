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

export default function SignRe(parent) {
    const classes = useStyles();

    const [erroremail, setErrEmail] = React.useState(false);
    const [erroremailmsg, setErrEmailMsg] = React.useState(null);

    function switchToSignIn(e) {
        e.preventDefault();
        parent.el.setState({
            page: "signin"
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        let a = {};

        for (var pair of data.entries()) {
            a[pair[0]] = pair[1];
        }

        a["callBackUrl"] = window.location.href;

        fetch('http://localhost/api/users/resetrequest', {
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
                    parent.el.setState({
                        page: "signin",
                        sysmsg: "Check your email for password restore instructions."
                    });
                } else {
                    for (var one of res.errors) {
                        console.log(one);
                        if (one.item == 'email') {
                            setErrEmail(true)
                            setErrEmailMsg(one.msg)
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
                    Restore Password
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Restore Password
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2" onClick={switchToSignIn}>
                                {"Remembered your password? Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
