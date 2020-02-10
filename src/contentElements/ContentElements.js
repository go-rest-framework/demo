import React from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MenuIcon from '@material-ui/icons/ArrowDropDown';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Form from './Form.js';
import AlertDialogSlide from './AlertDialogSlide.js';
import UMenu from '@material-ui/core/Menu';
import UMenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import FilterListIcon from '@material-ui/icons/FilterList';
import Chip from '@material-ui/core/Chip';
import Collapse from '@material-ui/core/Collapse';
import FormSearch from './FormSearch.js';

const useStyles = makeStyles({
    root: {
        padding: '2px 4px',
        alignItems: 'center',
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        width: 0,
        height: '1em',
        margin: 4,
    },
    items: {
        display: 'flex',
        padding: '1em',
        marginBottom: '0.5em',
    },
    avatar: {
        margin: '0 1em 0 0',
    },
    name: {
        fontSize: '1.2em',
        lineHeight: '2.5',
        flex: 1,
    },
    hide: {
        display: 'none',
    },
    flex: {
        display: 'flex',
    },
});


//<Divider className={classes.divider} />

function Item(props) {
    const classes = useStyles();
    let data = props.data;
    let index = props.index;
    let keys = [];
    let elements = null;
    if (data[index] != undefined && data[index].elements != null && data[index].elements.length > 0) {
        keys = Object.keys(data[index].elements);
        elements = data[index].elements;
    }
    return (
        <div>
            <Paper className={classes.items} style={{marginLeft:props.lvl+'em'}}>
                <div>
                    {data[index].ID}
                </div>
                <div className={classes.name}>
                    {data[index].title}
                </div>
                <div className={classes.name}>
                    {data[index].urld}
                </div>
                <div>
                    {data[index].parent}
                </div>
                <div>
                    {data[index].kind}
                </div>
                <div>
                    {data[index].status}
                </div>
                <IconButton className={classes.iconButton} aria-label="Edit" onClick={props.handleClickEdit.bind(this,data[index].ID)}>
                    <EditIcon />
                </IconButton>
                <IconButton className={classes.iconButton} aria-label="Delete" onClick={props.handleDeleteAsk.bind(this, data[index].ID)}>
                    <DeleteIcon />
                </IconButton>
            </Paper>
            {
                keys.map((index) => {
                    return (
                        <Item
                            data={elements}
                            index={index}
                            key={'elementID_'+elements[index].ID}
                            handleClickEdit={props.handleClickEdit}
                            handleDeleteAsk={props.handleDeleteAsk}
                            lvl={props.lvl+1}
                        />
                    );
                })
            }
        </div>
    );
}

export default function ContentElements(props) {
    const classes = useStyles();
    const [editID, setEditID] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [deleteopen, setDeleteOpen] = React.useState(false);

    const [data, setData] = React.useState({});
    const [datachange, setDataChange] = React.useState(0);
    const [deleteitem, setDeleteItem] = React.useState(0);
    const [sortMenuAnchor, setSortMenuAnchor] = React.useState(null);
    const [searchData, setSearchData] = React.useState({});
    const [sortstring, setSortSting] = React.useState(null);
    const [itemid, setItemId] = React.useState(0);

    const [checked, setChecked] = React.useState(false);

    const [count, setCount] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [perpage, setPerPage] = React.useState(5);

    function encodeQueryData(data) {
        const ret = [];
        ret.push('?');
        for (let d in data)
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        return ret.join('&');
    }

    function handleChange() {
        setChecked(prev => !prev);
    }

    React.useEffect(() => {
        fetch('/api/contentelements' + encodeQueryData(searchData), {
            method: "GET",
            //body: JSON.stringify(a),
            headers: {
                "Content-Type": "application/json",
                //"Authorization": "Bearer " + props.app.state.userdata.token
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
                        setCount(res.count);
                    }
                });
            } else {
                alert(response.text());
            }
        }, function(error) {
            alert(error.message); //=> String
        });

    }, [datachange]);


    function handleClickEdit(id) {
        setItemId(id);
        setOpen(true);
    }

    function handleClickCreate() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
        setDataChange(datachange + 1);
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
        fetch('/api/contentelements/' + deleteitem, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + props.app.state.userdata.token
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

    function handleSearch(e) {
        var v = e.target.value;
        if (v.length == 0) {
            setSearchData({});
        }
        if (v.length > 2) {
            setSearchData({
                all: v,
            });
        }
        setDataChange(datachange + 1);
    }

    function handleClickSort(event) {
        setSortMenuAnchor(event.currentTarget);
    }

    function handleSelectSort(sort, e) {
        var c = searchData;
        c["sort"] = sort;
        setSearchData(c);
        setDataChange(datachange + 1);
        setSortSting(e.target.textContent)
        setSortMenuAnchor(null);
    }

    function handleCloseSort() {
        setSortMenuAnchor(null);
    }

    return (
        <div>
            <AlertDialogSlide open={deleteopen} handleDeleteAbort={handleDeleteAbort} handleDelete={handleDelete} />
            <Paper className={classes.root}>
                <div className={classes.flex}>
                    <IconButton
                        className={classes.iconButton}
                        aria-label="Menu"
                        onClick={handleChange}
                    >
                        <MenuIcon />
                    </IconButton>
                    <InputBase
                        className={classes.input}
                        placeholder="Start type for search..."
                        inputProps={{ 'aria-label': 'Start type for search...' }}
                        onChange={handleSearch}
                    />
                    <IconButton className={classes.iconButton} aria-label="Search">
                        <SearchIcon />
                    </IconButton>
                </div>
                <Collapse in={checked}>
                    <FormSearch
                        datachange={datachange}
                        searchData={searchData}
                        setDataChange={setDataChange}
                        setSearchData={setSearchData}
                    />
                </Collapse>
            </Paper>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <IconButton
                        onClick={handleClickSort}
                        className={classes.iconButton2}
                        aria-label="Filter Sort"
                    >
                        <FilterListIcon />
                    </IconButton>
                    <Chip
                        className={(sortstring == null) ? classes.hide : classes.sorttitle}
                        variant="outlined"
                        size="small"
                        label={sortstring}
                    />
                    <UMenu
                        id="sort-menu"
                        anchorEl={sortMenuAnchor}
                        keepMounted
                        open={Boolean(sortMenuAnchor)}
                        onClose={handleCloseSort}
                    >
                        <UMenuItem onClick={handleSelectSort.bind(this,"id")}>Sort by ID</UMenuItem>
                        <UMenuItem onClick={handleSelectSort.bind(this,"-id")}>Sort by ID DESC</UMenuItem>
                        <UMenuItem onClick={handleSelectSort.bind(this,"title")}>Sort by title</UMenuItem>
                        <UMenuItem onClick={handleSelectSort.bind(this,"-title")}>Sort by title DESC</UMenuItem>
                        <UMenuItem onClick={handleSelectSort.bind(this,"created_at")}>Sort by create date</UMenuItem>
                        <UMenuItem onClick={handleSelectSort.bind(this,"-created_at")}>Sort by create date DESC</UMenuItem>
                        <UMenuItem onClick={handleSelectSort.bind(this,"status")}>Sort by status</UMenuItem>
                        <UMenuItem onClick={handleSelectSort.bind(this,"-status")}>Sort by status DESC</UMenuItem>
                        <UMenuItem onClick={handleSelectSort.bind(this,"user")}>Sort by user</UMenuItem>
                        <UMenuItem onClick={handleSelectSort.bind(this,"-user")}>Sort by user DESC</UMenuItem>
                        <UMenuItem onClick={handleSelectSort.bind(this,"kind")}>Sort by kind</UMenuItem>
                        <UMenuItem onClick={handleSelectSort.bind(this,"-kind")}>Sort by kind DESC</UMenuItem>
                    </UMenu>
                </Grid>
                <Grid item xs={6}>
                    <Form
                        token={props.app.state.userdata.token}
                        setItemId={setItemId}
                        itemid={itemid}
                        open={open}
                        handleClickCreate={handleClickCreate}
                        handleClose={handleClose}/>
                </Grid>
            </Grid>
            {
                Object.keys(data).map((index) => {
                    return (
                        <Item
                            data={data}
                            index={index}
                            key={'elementID_'+data[index].ID}
                            handleClickEdit={handleClickEdit}
                            handleDeleteAsk={handleDeleteAsk}
                            lvl={0}
                        />
                    );
                })
            }
        </div>
    );
}
