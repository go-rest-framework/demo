import React from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import GetAppIcon from '@material-ui/icons/GetApp';
import CachedIcon from '@material-ui/icons/Cached';
import AlertDialogSlide from '../AlertDialogSlide.js';
import Dialog from '@material-ui/core/Dialog';
import UpdateForm from './UpdateForm.js';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles({
    root: {
        padding: '0.5em 0',
    },
    line: {
        display: 'block',
    },
    lineHidden: {
        display: 'none',
    },
    items: {
        display: 'flex',
        marginTop: '0.5em',
        marginBottom: '0.5em',
    },
    buttonsWrap: {
        textAlign: 'right',
    },
    title: {
        fontWeight: 'bold',
        display: 'inline-block',
    },
    hint: {
        fontSize: '0.9em',
    },
    required: {
        color: 'tomato',
        display: 'inline-block',
        marginLeft: '0.25em',
    },
    name: {
        flex: 1,
        padding: '1em',
    },
    hidden: {
        display: 'none',
    },
    tooltip: {},
});

export default function ContentElements(props) {
    const classes = useStyles();
    const [loadershow, setLoaderShow] = React.useState(false);
    const [loaded, setLoaded] = React.useState(0);
    const [data, setData] = React.useState({});
    const [datachange, setDataChange] = React.useState(0);
    const [deleteopen, setDeleteOpen] = React.useState(false);
    const [deleteitem, setDeleteItem] = React.useState(0);

    const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);
    const [updatedItemId, setUpdatedItemId] = React.useState(0);
    const [updatedItemTitle, setUpdatedItemTitle] = React.useState('');
    const [updatedItemDescription, setUpdatedItemDescription] = React.useState('');

    function isImg(ext) {
        var elist = [".jpeg", ".png"];
        if (elist.indexOf(ext) == 1) {
            return true;
        }
        return false;
    }

    function handleClickEdit(id, title, description) {
        setOpenUpdateDialog(true);
        setUpdatedItemId(id);
        setUpdatedItemTitle(title);
        setUpdatedItemDescription(description);
    }

    function handleCloseUpdateDialog() {
        setOpenUpdateDialog(false);
        setUpdatedItemId(0);
        setDataChange(datachange + 1);
    }

    function handleDownload(src) {
        window.open(src, '_blank');
    }

    function handleDeleteAsk(id) {
        setDeleteOpen(true);
        setDeleteItem(id);
    }

    function handleDeleteAbort() {
        setDeleteOpen(false);
        setDeleteItem(0);
    }

    function handleDelete() {
        fetch('/api/attachments/' + deleteitem, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + props.token
            },
            credentials: "same-origin"
        }).then(function(response) {
            if (response.status === 200) {
                response.json().then(function(res) {
                    if (res.errors != null) {
                        console.log(res.errors);
                    } else {
                        setDeleteItem(0);
                        setDeleteOpen(false);
                        setDataChange(datachange + 1);
                    }
                });
            } else if (response.status === 401) {
                sessionStorage.clear();
                location.reload();
            } else {
                alert(response.text());
            }
        }, function(error) {
            alert(error.message); //=> String
        });
    }

    React.useEffect(() => {
        fetch('/api/attachments?group=' + props.group, {
            method: "GET",
            //body: JSON.stringify(a),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "same-origin"
        }).then(function(response) {
            if (response.status === 200) {
                response.json().then(function(res) {
                    if (res.errors != null) {
                        console.log(res.errors);
                    } else {
                        console.log(res.data);
                        setData(res.data);
                    }
                });
            } else if (response.status === 401) {
                sessionStorage.clear();
                location.reload();
            } else {
                alert(response.text());
            }
        }, function(error) {
            alert(error.message); //=> String
        });

    }, [datachange]);

    var onChangeHandler = event => {
        const data = new FormData()
        data.append('file', event.target.files[0])
        console.log(event.target.files[0]);

        if (event.target.files[0].size > props.maxSize) {
            alert('Wrong size!!');
            return false;
        }

        if (props.extensions.indexOf(event.target.files[0].type) < 0) {
            alert('Wrong filetype!!');
            return false;
        }

        var xhr = new XMLHttpRequest();
        xhr.upload.onprogress = function(event) {
            setLoaderShow(true);
            var pers = 100 * event.loaded / event.total;
            setLoaded(pers);
        }
        xhr.onload = xhr.onerror = function(data) {
            setTimeout(function() {
                setLoaderShow(false);
                setLoaded(0);
            }, 300);
            console.log(this);
            if (this.status == 200) {
                var data = JSON.parse(xhr.responseText);
                console.log(data);
                if (data.errors != null) {
                    for (var one of data.errors) {
                        console.log(one);
                    }
                } else {
                    console.log(data.data);
                    var adata = {
                        group: props.group,
                        fileID: data.data.ID,
                        title: data.data.name,
                        description: "",
                        isMain: 0,
                        index: 0,
                    };
                    fetch('/api/attachments', {
                        method: "POST",
                        body: JSON.stringify(adata),
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + props.token
                        },
                        credentials: "same-origin"
                    }).then(function(response) {
                        if (response.status === 200) {
                            response.json().then(function(res) {
                                if (res.errors != null) {
                                    console.log(res.errors);
                                } else {
                                    console.log(res.data);
                                    setDataChange(datachange + 1);
                                }
                            });
                        } else if (response.status === 401) {
                            sessionStorage.clear();
                            location.reload();
                        } else {
                            alert(response.text());
                        }
                    }, function(error) {
                        alert(error.message); //=> String
                    });
                }
            } else if (this.status == 401) {
                console.log("status 401");
                sessionStorage.clear();
                location.reload();
            } else {
                console.log("error " + this.status);
            }
        };
        xhr.open("POST", "/api/files", true);
        xhr.setRequestHeader("Authorization", "Bearer " + props.token);
        xhr.send(data);
    }


    var onReUploadHandler = (id, event) => {
        const data = new FormData()
        console.log(id);
        data.append('file', event.target.files[0])
        console.log(event.target.files[0]);

        var xhr = new XMLHttpRequest();
        xhr.upload.onprogress = function(event) {
            setLoaderShow(true);
            var pers = 100 * event.loaded / event.total;
            setLoaded(pers);
        }
        xhr.onload = xhr.onerror = function(data) {
            setTimeout(function() {
                setLoaderShow(false);
                setLoaded(0);
            }, 300);
            console.log(this);
            if (this.status == 200) {
                var data = JSON.parse(xhr.responseText);
                console.log(data);
                if (data.errors != null) {
                    for (var one of data.errors) {
                        console.log(one);
                    }
                } else {
                    console.log(data.data);
                    setDataChange(datachange + 1);
                }
            } else if (this.status == 401) {
                console.log("status 401");
                sessionStorage.clear();
                location.reload();
            } else {
                console.log("error " + this.status);
            }
        };
        xhr.open("PATCH", "/api/files/" + id, true);
        xhr.setRequestHeader("Authorization", "Bearer " + props.token);
        xhr.send(data);
    }

    return (
        <div className={classes.root}>
            <AlertDialogSlide
                open={deleteopen}
                handleDeleteAbort={handleDeleteAbort}
                handleDelete={handleDelete}
                msg="Confirm the inevitable deletion of the document?"
            />
            <UpdateForm
                token={props.token}
                id={updatedItemId}
                title={updatedItemTitle}
                description={updatedItemDescription}
                open={openUpdateDialog}
                handleClose={handleCloseUpdateDialog}
                setUpdatedItemTitle={setUpdatedItemTitle}
                setUpdatedItemDescription={setUpdatedItemDescription}
            />
            <Grid container spacing={3}>
                <Grid item xs={9}>
                    <div className={classes.title}>
                        {props.title}
                    </div>
                    <div className={classes.required}>
                        *
                    </div>
                    <div className={classes.hint}>
                        Max size {props.maxSize} byte and accept file types {JSON.stringify(props.extensions)}
                    </div>
                </Grid>
                <Grid item className={classes.buttonsWrap} xs={3}>
                    <Button
                        component="label"
                        variant="contained"
                        color="primary"
                    >
                        Upload Files...
                        <input
                            type="file"
                            style={{ display: "none" }}
                            onChange={onChangeHandler}
                        />
                    </Button>
                </Grid>
            </Grid>
            <div>
                {
                    Object.keys(data).map((index) => {
                        return (
                            <Paper key={'userID_'+data[index].ID} className={classes.items}>
                                <div
                                    className={classes.ava}
                                    style={{
                                        width:'50px',
                                        borderRight: '1px solid lightgrey',
                                        textAlign: 'center',
                                        lineHeight: '3',
                                        fontWeight: 'bold',
                                        background: 'lightgrey',
                                        backgroundSize: 'contain',
                                        backgroundImage:'url(\''+data[index].file.src+'\')',
                                        color: '#808080',
                                    }}
                                >
                                    {(isImg(data[index].file.ext)) ? '' : data[index].file.ext}
                                </div>
                                <div className={classes.name}>
                                    {(data[index].title != '') ? data[index].title : data[index].file.name}
                                </div>
                                <Tooltip
                                    className={(data[index].description != '') ? classes.tooltip : classes.hidden}
                                    title={data[index].description}
                                    aria-label={data[index].description}
                                    placement="left-start" >
                                    <IconButton
                                        className={classes.iconButton}
                                        aria-label="Info"
                                        //onClick={handleDownload.bind(this,data[index].file.src)}
                                    >
                                        <InfoOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                                <IconButton
                                    className={classes.iconButton}
                                    aria-label="Edit"
                                    onClick={handleDownload.bind(this,data[index].file.src)}
                                >
                                    <GetAppIcon />
                                </IconButton>
                                <IconButton
                                    component="label"
                                    className={classes.iconButton}
                                    aria-label="Edit"
                                    //onClick={handleClickReUpload.bind(this,data[index].ID)}
                                >
                                    <CachedIcon />
                                    <input
                                        type="file"
                                        style={{ display: "none" }}
                                        onChange={onReUploadHandler.bind(this, data[index].file.ID)}
                                    />
                                </IconButton>
                                <IconButton
                                    className={classes.iconButton}
                                    aria-label="Edit"
                                    onClick={handleClickEdit.bind(this,data[index].ID,data[index].title,data[index].description)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    className={classes.iconButton}
                                    aria-label="Delete"
                                    onClick={handleDeleteAsk.bind(this, data[index].ID)}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Paper>
                        );
                    })
                }
            </div>
            <LinearProgress
                variant="determinate"
                value={loaded}
                className={(!loadershow) ? classes.lineHidden : classes.line}
            />
        </div>
    );
}
