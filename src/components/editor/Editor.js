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
    convertFromRaw
} from 'draft-js';
import Paper from '@material-ui/core/Paper';
import BlockStyleControls from './BlockSC.js';
import InlineStyleControls from './InlineSC.js';
import Button from '@material-ui/core/Button';

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
    }
});

export default function MyEditor(props) {
    const classes = useStyles();
    const [editorState, setEditorState] = React.useState(
        EditorState.createEmpty(),
    );

    const [showURLInput, setShowURLInput] = React.useState(false);
    const [url, setUrl] = React.useState('');
    const [urlType, setUrlType] = React.useState('');

    const textInput = React.createRef();
    const urlInput = React.createRef();

    const focus = () => textInput.current.focus();
    const urlfocus = () => urlInput.current.focus();

    const onChange = (editorState) => {
        setEditorState(editorState);
        const content = editorState.getCurrentContent();
        console.log(JSON.stringify(convertToRaw(content)));
        //props.setFormdata({
        //content: JSON.stringify(convertToRaw(content)),
        //});
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

    const onURLChange = (e) => setUrl(e.target.value);

    const onURLInputKeyDown = (e) => {
        if (e.which === 13) {
            confirmMedia(e);
        }
    }

    const confirmMedia = (e) => {
        e.preventDefault();
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            urlType,
            'IMMUTABLE', {
                src: url
            }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(
            editorState, {
                currentContent: contentStateWithEntity
            }
        );
        console.log(url);
        console.log(newEditorState);
        console.log(entityKey);
        console.log(AtomicBlockUtils.insertAtomicBlock(
            newEditorState,
            entityKey,
            ' '
        ));
        onChange(
            AtomicBlockUtils.insertAtomicBlock(
                newEditorState,
                entityKey,
                ' '
            )
        );
        setShowURLInput(false);
        setUrl('');
        //focus();
    }

    let urlForm;
    if (showURLInput) {
        urlForm =
            <div className={classes.urlInputContainer}>
                <input
                    onChange={onURLChange}
                    className={classes.urlInput}
                    type="text"
                    value={url}
                    onKeyDown={onURLInputKeyDown}
                    ref={urlInput}
                />
                <Button onMouseDown={confirmMedia}>
                    Confirm
                </Button>
            </div>;
    }

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
                <BlockStyleControls
                    editorState={editorState}
                    onToggle={toggleBlockType}
                />
                <InlineStyleControls
                    editorState={editorState}
                    onToggle={toggleInlineStyle}
                />
                <div>
                    <Button
                        size="small"
                        onMouseDown={addAudio}
                    >
                        Add Audio
                    </Button>
                    <Button
                        size="small"
                        onMouseDown={addImage}
                    >
                        Add Image
                    </Button>
                    <Button
                        size="small"
                        onMouseDown={addVideo}
                    >
                        Add Video
                    </Button>
                </div>
            </Paper>
            {urlForm}
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
