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

const useStyles = makeStyles({
    root: {
        padding: '2px 4px',
        display: 'flex',
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
});


let testJsonData = `
{
  "errors": null,
  "data": [
    {
        "ID": 1,
        "CreatedAt": "2019-07-24T01:26:27Z",
        "UpdatedAt": "2019-07-24T01:26:27Z",
        "DeletedAt": null,
        "urld": "nihil",
        "userID": 1,
        "parent": 0,
        "title": "OCCAECATI VOLUPTATEM",
        "description": "quasi et ullam natus recusandae sed vero. pariatur repellat quae recusandae veritatis occaecati! quod dolorem ipsa facilis adipisci. sed quas nesciunt odit autem. voluptatem alias qui magni beatae a! modi temporibus iste omnis. et qui numquam quia aut.",
        "content": "Culpa pariatur id nulla fugit modi Quisquam libero debitis similique assumenda ea dolorem Ipsum sint eligendi accusamus corporis nihil! Quo aperiam delectus consequatur nam cumque voluptates? Perspiciatis vitae dolorum atque error ab doloremque sequi Accusamus nobis cumque molestiae placeat voluptatum. Consectetur reiciendis facilis autem nulla reprehenderit amet delectus dicta. Quo suscipit numquam atque dolorum aperiam Beatae velit necessitatibus laborum molestiae ut unde. Ducimus minima architecto harum earum nisi Quam et laudantium temporibus delectus facere similique, sit eaque deserunt laboriosam. Dolores qui perspiciatis nostrum sit exercitationem! Officiis voluptate sint assumenda sequi quibusdam aliquid",
        "meta_title": "NECESSITATIBUS VOLUPTATEM CONSEQUATUR VERO ACCUSANTIUM",
        "meta_descr": "tempora doloremque dolores officia exercitationem autem commodi porro. minima illo qui quo. adipisci blanditiis eum commodi facere et!",
        "kind": 1,
        "status": 1,
        "tags": "news",
        "elements": [
            {
                "ID": 3,
                "CreatedAt": "2019-07-24T01:26:27Z",
                "UpdatedAt": "2019-07-24T01:26:27Z",
                "DeletedAt": null,
                "urld": "quia",
                "userID": 1,
                "parent": 1,
                "title": "FFDDDDKKFFFF FFFKDDDKDDSSSSS",
                "description": "in qui veritatis veniam mollitia laudantium amet. quia sed enim. sed natus quidem assumenda labore. voluptate qui molestiae quia vel vel rem minima. voluptatem voluptatum ut voluptatem quos et quam. dolore voluptas voluptas. omnis deleniti est perspiciatis veniam soluta voluptatem eius.",
                "content": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
                "meta_title": "SEQUI UT",
                "meta_descr": "libero voluptate deleniti dignissimos et explicabo magni. autem consequatur porro. repellendus officia et. sed enim non error placeat quod natus. et vero quia. assumenda et commodi. tempore excepturi quibusdam laborum. quis deleniti quidem deserunt et quaerat cupiditate aut. qui vel sed voluptatem.",
                "kind": 1,
                "status": 1,
                "tags": "news,test",
                "elements": null,
                "comments": null
            },
            {
                "ID": 4,
                "CreatedAt": "2019-07-24T01:26:27Z",
                "UpdatedAt": "2019-07-24T01:26:27Z",
                "DeletedAt": null,
                "urld": "quia",
                "userID": 1,
                "parent": 1,
                "title": "KKKKLSSLSSKKKK IISII IIIII",
                "description": "in qui veritatis veniam mollitia laudantium amet. quia sed enim. sed natus quidem assumenda labore. voluptate qui molestiae quia vel vel rem minima. voluptatem voluptatum ut voluptatem quos et quam. dolore voluptas voluptas. omnis deleniti est perspiciatis veniam soluta voluptatem eius.",
                "content": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
                "meta_title": "SEQUI UT",
                "meta_descr": "libero voluptate deleniti dignissimos et explicabo magni. autem consequatur porro. repellendus officia et. sed enim non error placeat quod natus. et vero quia. assumenda et commodi. tempore excepturi quibusdam laborum. quis deleniti quidem deserunt et quaerat cupiditate aut. qui vel sed voluptatem.",
                "kind": 1,
                "status": 1,
                "tags": "news,test",
                "elements": null,
                "comments": null
            }
        ],
        "comments": null
    },
    {
        "ID": 2,
        "CreatedAt": "2019-07-24T01:26:27Z",
        "UpdatedAt": "2019-07-24T01:26:27Z",
        "DeletedAt": null,
        "urld": "quia",
        "userID": 1,
        "parent": 1,
        "title": "TEMPORA EARUM ET",
        "description": "in qui veritatis veniam mollitia laudantium amet. quia sed enim. sed natus quidem assumenda labore. voluptate qui molestiae quia vel vel rem minima. voluptatem voluptatum ut voluptatem quos et quam. dolore voluptas voluptas. omnis deleniti est perspiciatis veniam soluta voluptatem eius.",
        "content": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        "meta_title": "SEQUI UT",
        "meta_descr": "libero voluptate deleniti dignissimos et explicabo magni. autem consequatur porro. repellendus officia et. sed enim non error placeat quod natus. et vero quia. assumenda et commodi. tempore excepturi quibusdam laborum. quis deleniti quidem deserunt et quaerat cupiditate aut. qui vel sed voluptatem.",
        "kind": 1,
        "status": 1,
        "tags": "news,test",
        "elements": null,
        "comments": null
    }
  ]
}
`;

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
                <div className={classes.name}>
                    {data[index].title}
                </div>
                <div className={classes.name}>
                    {data[index].urld}
                </div>
                <div>
                    {data[index].kind}
                </div>
                <div>
                    {data[index].status}
                </div>
                <IconButton className={classes.iconButton} aria-label="Edit" onClick={props.handleClickOpen}>
                    <EditIcon />
                </IconButton>
                <IconButton className={classes.iconButton} aria-label="Delete" onClick={props.handleDeleteAsk}>
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
                            handleClickOpen={props.handleClickOpen}
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
    const [open, setOpen] = React.useState(false);
    const [deleteopen, setDeleteOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    let data = JSON.parse(testJsonData);
    data = data.data
    let keys = Object.keys(data);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleDeleteAsk() {
        setDeleteOpen(true);
    }

    function handleDeleteAbort() {
        setDeleteOpen(false);
    }

    function handleDelete() {
        setDeleteOpen(false);
        alert('send request for delete element');
    }

    function handleSMClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleSMClose() {
        setAnchorEl(null);
    }


    return (
        <div>
            <AlertDialogSlide open={deleteopen} handleDeleteAbort={handleDeleteAbort} handleDelete={handleDelete} />
            <Paper className={classes.root}>
              <IconButton
                  className={classes.iconButton}
                  aria-label="Menu"
                  onClick={handleSMClick}
              >
                <MenuIcon />
              </IconButton>
              <UMenu
                  id="user-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleSMClose}
              >
                  <UMenuItem onClick={handleSMClose}>Menu1</UMenuItem>
                  <UMenuItem onClick={handleSMClose}>Menu2</UMenuItem>
                  <UMenuItem onClick={handleSMClose}>Menu3</UMenuItem>
              </UMenu>
              <InputBase
                className={classes.input}
                placeholder="Start type for search..."
                inputProps={{ 'aria-label': 'Start type for search...' }}
              />
              <IconButton className={classes.iconButton} aria-label="Search">
                <SearchIcon />
              </IconButton>
            </Paper>
            <Form open={open} handleClickOpen={handleClickOpen} handleClose={handleClose}/>
            {
                keys.map((index) => {
                    return (
                        <Item
                            data={data}
                            index={index}
                            key={'elementID_'+data[index].ID}
                            handleClickOpen={handleClickOpen}
                            handleDeleteAsk={handleDeleteAsk}
                            lvl={0}
                        />
                    );
                })
            }
        </div>
    );
}
