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
import MyEditor from '../components/editor/Editor.js';
import ColorEditor from '../components/editor/demo/Color.js';
import ConvertEditor from '../components/editor/demo/Convert.js';
import EntityEditor from '../components/editor/demo/Entity.js';
import LinkEditor from '../components/editor/demo/Link.js';
import PlainTextEditor from '../components/editor/demo/PlainText.js';
import RichEditor from '../components/editor/demo/Rich.js';
import MyUploader from '../components/uploader/Uploader.js';
import AutocompleteSelect from './AutocompleteSelect.js'

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
    },
    divider: {
        width: 0,
        height: '1em',
        margin: 4,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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
    urld: '',
    parent: 0,
    title: '',
    description: '',
    content: '',
    meta_title: '',
    meta_descr: '',
    status: '',
    tags: '',
};

export default function Form(props) {
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

    React.useEffect(() => {
        if (props.itemid != 0) {
            fetch('/api/contentelements/' + props.itemid, {
                method: "GET",
                //body: JSON.stringify(a),
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

                            setFormdata({
                                urld: res.data.urld,
                                parent: res.data.parent,
                                title: res.data.title,
                                description: res.data.description,
                                content: res.data.content,
                                meta_title: res.data.meta_title,
                                meta_descr: res.data.meta_descr,
                                status: res.data.status,
                                tags: res.data.tags,
                            });
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
    }, [props.itemid]);


    function handleSave(e) {
        e.preventDefault();
        console.log(formdata);
        var method = "POST";
        var url = "/api/contentelements";
        if (props.itemid != 0) {
            method = "PATCH";
            url = "/api/contentelements/" + props.itemid;
        }
        fetch(url, {
            method: method,
            body: JSON.stringify(formdata),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + props.token
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
                        props.handleClose();
                        clearFormData();
                        clearErrorData();
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

    function handleClose(e) {
        props.handleClose(e);
        clearFormData();
        clearErrorData();
    }

    function clearFormData() {
        var list = objectKeysToString(initialState, []);
        props.setItemId(0);
        list.forEach(function name(name, index) {
            const updatePath = name.split(".");

            if (updatePath.length === 1) {
                const [key] = updatePath;

                setFormdata({
                    [key]: ""
                });
            }

            if (updatePath.length === 2) {
                setFormdata({
                    _path: updatePath,
                    _value: ""
                });
            }
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
        <div>
            <div className={classes.buttonsWrap}>
                <Button variant="outlined" color="primary" onClick={props.handleClickCreate}>
                    <AddIcon />
                    Add New Element
                </Button>
            </div>
            <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Add New Element
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
                                value={formdata.urld}
                                onChange={handleChange}
                                error={(formdataerrs.urld == '') ? false : true}
                                helperText={formdataerrs.urld}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="urld"
                                label="Urld"
                                id="urld"
                            />
                            <TextField
                                value={formdata.title}
                                onChange={handleChange}
                                error={(formdataerrs.title == '') ? false : true}
                                helperText={formdataerrs.title}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="title"
                                label="Title"
                                name="title"
                            />
                            <AutocompleteSelect
                                url="/api/parents"
                                setFormdata={setFormdata}
                                formdata={formdata}
                                formdataerrs={formdataerrs}
                                value={formdata.parent}
                            />
                            <TextField
                                value={formdata.description}
                                onChange={handleChange}
                                error={(formdataerrs.description == '') ? false : true}
                                helperText={formdataerrs.description}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="description"
                                label="Description"
                                name="description"
                            />
                            <TextField
                                value={formdata.meta_title}
                                onChange={handleChange}
                                error={(formdataerrs.meta_title == '') ? false : true}
                                helperText={formdataerrs.meta_title}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="meta_title"
                                label="Meta title"
                                name="meta_title"
                            />
                            <TextField
                                value={formdata.meta_descr}
                                onChange={handleChange}
                                error={(formdataerrs.meta_descr == '') ? false : true}
                                helperText={formdataerrs.meta_descr}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="meta_descr"
                                label="Meta description"
                                name="meta_descr"
                            />
                            <TextField
                                value={formdata.tags}
                                onChange={handleChange}
                                error={(formdataerrs.tags == '') ? false : true}
                                helperText={formdataerrs.tags}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="tags"
                                label="Key words"
                                name="tags"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel
                                    htmlFor="status-helper"
                                >
                                    Status
                                </InputLabel>
                                <Select
                                    value={formdata.status}
                                    onChange={handleChange}
                                    error={(formdataerrs.status == '') ? false : true}
                                    input={<Input name="status" id="status-helper" />}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="draft">Draft</MenuItem>
                                    <MenuItem value="active">Active</MenuItem>
                                </Select>
                                <FormHelperText style={{color:"red"}}>
                                    {formdataerrs.status}
                                </FormHelperText>
                            </FormControl>
                            <Divider className={classes.divider} />
                            <MyEditor
                                setFormdata={setFormdata}
                                value={formdata.content}
                            />
                            {
                            /*<MyUploader
                                title="Testing documents"
                                hint=""
                                token={props.token}
                                group="test"
                                maxSize={500000}
                                extensions={["image/jpg", "image/jpeg", "image/png"]}
                            />*/
                            }
                        </Grid>
                    </Grid>
                </form>
            </Dialog>
        </div>
    );
}
