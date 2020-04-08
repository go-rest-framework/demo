import React from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';
import {
    Editor,
    EditorState,
    RichUtils,
    getDefaultKeyBinding,
    AtomicBlockUtils,
    convertToRaw,
    convertFromRaw,
    Modifier
} from 'draft-js';
import Paper from '@material-ui/core/Paper';
import BlockStyleControls from './BlockSC.js';
import InlineStyleControls from './InlineSC.js';
import LinkForm from './LinkForm.js';
import Button from '@material-ui/core/Button';
import AttachFileIcon from '@material-ui/icons/AttachFile';

const useStyles = makeStyles({
    maininput: {
        border: '1px solid #c7c7c7',
        borderRadius: '5px',
        padding: '1em',
        margin: '1em 0em',
        minHeight: '20em',
    },
    media: {
        width: '100%',
        // Fix an issue with Firefox rendering video controls
        // with 'pre-wrap' white-space
        whiteSpace: 'initial'
    },
    line: {
        display: 'block',
    },
    lineHidden: {
        display: 'none',
    }
});

export default function MyEditor(props) {
    const classes = useStyles();
    const [editorState, setEditorState] = React.useState(
        EditorState.createEmpty(),
    );

    const [showURLInput, setShowURLInput] = React.useState(false);

    const textInput = React.createRef();
    const urlInput = React.createRef();

    const focus = () => textInput.current.focus();
    const urlfocus = () => urlInput.current.focus();

    React.useEffect(() => {
        if (isJson(props.value)) {
            setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(props.value))));
        } else {
            const selection = editorState.getSelection();
            const contentState = editorState.getCurrentContent();
            const ncs = Modifier.insertText(contentState, selection, props.value);
            const es = EditorState.push(editorState, ncs, 'insert-fragment');
            setEditorState(es);
        }
    }, [props.value]);

    const isJson = (str) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    };

    const onChange = (editorState) => {
        setEditorState(editorState);
        const content = editorState.getCurrentContent();
        props.setFormdata({
            content: JSON.stringify(convertToRaw(content)),
        });
    };

    const toggleBlockType = (blockType) => {
        onChange(
            RichUtils.toggleBlockType(
                editorState,
                blockType
            )
        );
    };

    const toggleInlineStyle = (inlineStyle) => {
        onChange(
            RichUtils.toggleInlineStyle(
                editorState,
                inlineStyle
            )
        );
    };

    const promptForMedia = (type) => {
        setShowURLInput(true);
        setUrl('');
        setUrlType(type);
        //urlfocus();
    };

    const addAudio = (e) => {
        e.preventDefault();
        promptForMedia('audio');
    };
    const addImage = (e) => {
        e.preventDefault();
        promptForMedia('image');
    };
    const addVideo = (e) => {
        e.preventDefault();
        promptForMedia('video');
    };

    const onFileUploadHandler = (e) => {
        const data = new FormData()
        data.append('file', e.target.files[0])
        console.log(e.target.files[0]);

        if (e.target.files[0].size > props.maxSize) {
            alert('Wrong size!!');
            return false;
        }

        if (props.extensions.indexOf(e.target.files[0].type) < 0) {
            alert('Wrong filetype!!');
            return false;
        }

        var xhr = new XMLHttpRequest();
        xhr.upload.onprogress = function(e) {
            setLoaderShow(true);
            var pers = 100 * e.loaded / e.total;
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
                if (data.errors != null) {
                    for (var one of data.errors) {
                        console.log(one);
                    }
                } else {

                    const contentState = editorState.getCurrentContent();
                    const contentStateWithEntity = contentState.createEntity(
                        'image',
                        'IMMUTABLE', {
                            src: data.data.src
                        }
                    );
                    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
                    const newEditorState = EditorState.set(
                        editorState, {
                            currentContent: contentStateWithEntity
                        }
                    );
                    onChange(
                        AtomicBlockUtils.insertAtomicBlock(
                            newEditorState,
                            entityKey,
                            ' '
                        )
                    );

                    console.log(data.data);
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
    };

    //let urlForm;
    //if (showURLInput) {
    //urlForm =
    //<div className={classes.urlInputContainer}>
    //<input
    //onChange={onURLChange}
    //className={classes.urlInput}
    //type="text"
    //value={url}
    //onKeyDown={onURLInputKeyDown}
    //ref={urlInput}
    ///>
    //<Button onMouseDown={confirmMedia}>
    //Confirm
    //</Button>
    //</div>;
    //}

    const mediaBlockRenderer = (block) => {
        if (block.getType() === 'atomic') {
            return {
                component: Media,
                editable: false,
            };
        }
        return null;
    }

    const Media = (props) => {
        const entity = props.contentState.getEntity(
            props.block.getEntityAt(0)
        );
        const {
            src
        } = entity.getData();
        const type = entity.getType();
        console.log(type);
        let media;
        if (type === 'audio') {
            media = <Audio src={src} />;
        } else if (type === 'image') {
            media = <Image src={src} />;
        } else if (type === 'video') {
            media = <Video src={src} />;
        }
        return media;
    };

    const Audio = (props) => {
        return <audio controls src={props.src} className={classes.media} />;
    };
    const Image = (props) => {
        return <img src={props.src} className={classes.media} />;
    };
    const Video = (props) => {
        return <video controls src={props.src} className={classes.media} />;
    };


    return (
        <div>
            <Paper>
                <InlineStyleControls
                    editorState={editorState}
                    onToggle={toggleInlineStyle}
                />
                <BlockStyleControls
                    editorState={editorState}
                    onToggle={toggleBlockType}
                />
                <Button
                    component="label"
                >
                    <AttachFileIcon />
                    <input
                        type="file"
                        style={{ display: "none" }}
                        onChange={onFileUploadHandler}
                    />
                </Button>
                <LinkForm />
            </Paper>
            <div className={classes.maininput} onClick={focus}>
                <Editor
                    blockRendererFn={mediaBlockRenderer}
                    editorState={editorState}
                    onChange={setEditorState}
                    ref={textInput}
                />
            </div>
        </div>
    );
}
