import React from 'react';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
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

    function handleSubmit(e) {
        e.preventDefault();
        let a = {};

        var url_string = window.location.href;
        var url = new URL(url_string);
        var repasstoken = url.searchParams.get("token");

        a["checkToken"] = repasstoken;

        fetch('http://localhost/api/users/confirm', {
            method: "POST",
            body: JSON.stringify(a),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        }).then(function(response) {
            response.json().then(function(res) {
                if (res.errors === null) {
                    parent.el.setState({
                        page: "signin",
                        sysmsg: "You successfully confirmed your email."
                    });
                } else {
                    for (var one of res.errors) {
                        alert(one)
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
                    User Agreement
                </Typography>
                <Paper style={{maxHeight: 250, overflow: 'auto'}}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                    tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
                    vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
                    no sea takimata sanctus est Lorem ipsum dolor sit amet.

                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                    tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
                    vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
                    no sea takimata sanctus est Lorem ipsum dolor sit amet.

                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                    tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
                    vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
                    no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </Paper>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Apply
                    </Button>
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
