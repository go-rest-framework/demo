//TODO add after base
//https://github.com/facebook/draft-js/blob/master/examples/draft-0-10-0/media/media.html
//https://github.com/facebook/draft-js/blob/master/examples/draft-0-10-0/link/link.html
//https://github.com/facebook/draft-js/blob/master/examples/draft-0-10-0/convertFromHTML/convert.html
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
    convertToRaw
} from 'draft-js';
import BlockStyleControls from './BlockSC.js';
import InlineStyleControls from './InlineSC.js';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        padding: '1em',
    },
}));

export default class MyEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            showURLInput: false,
            url: '',
            urlType: '',
        };
        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => this.setState({
            editorState
        });
        this.logState = () => {
            const content = this.state.editorState.getCurrentContent();
            console.log(content);
        };
        this.onURLChange = (e) => this.setState({
            urlValue: e.target.value
        });


        this.handleKeyCommand = this._handleKeyCommand.bind(this);
        this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
        this.toggleBlockType = this._toggleBlockType.bind(this);
        this.toggleInlineStyle = this._toggleInlineStyle.bind(this);

        this.addAudio = this._addAudio.bind(this);
        this.addImage = this._addImage.bind(this);
        this.addVideo = this._addVideo.bind(this);
        this.confirmMedia = this._confirmMedia.bind(this);
        this.onURLInputKeyDown = this._onURLInputKeyDown.bind(this);
    }
    _handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }
    _mapKeyToEditorCommand(e) {
        if (e.keyCode === 9 /* TAB */ ) {
            const newEditorState = RichUtils.onTab(
                e,
                this.state.editorState,
                4, /* maxDepth */
            );
            if (newEditorState !== this.state.editorState) {
                this.onChange(newEditorState);
            }
            return;
        }
        return getDefaultKeyBinding(e);
    }
    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }
    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }
    _confirmMedia(e) {
        e.preventDefault();
        const {
            editorState,
            urlValue,
            urlType
        } = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            urlType,
            'IMMUTABLE', {
                src: urlValue
            }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(
            editorState, {
                currentContent: contentStateWithEntity
            }
        );
        console.log(urlValue);
        this.setState({
            editorState: AtomicBlockUtils.insertAtomicBlock(
                newEditorState,
                entityKey,
                ' '
            ),
            showURLInput: false,
            urlValue: '',
        }, () => {
            setTimeout(() => this.focus(), 0);
        });
    }
    _onURLInputKeyDown(e) {
        if (e.which === 13) {
            this._confirmMedia(e);
        }
    }
    _promptForMedia(type) {
        this.setState({
            showURLInput: true,
            urlValue: '',
            urlType: type,
        }, () => {
            setTimeout(() => this.refs.url.focus(), 0);
        });
    }
    _addAudio(e) {
        e.preventDefault();
        this._promptForMedia('audio');
    }
    _addImage(e) {
        e.preventDefault();
        this._promptForMedia('image');
    }
    _addVideo(e) {
        e.preventDefault();
        this._promptForMedia('video');
    }

    render() {
        let urlInput;
        if (this.state.showURLInput) {
            urlInput =
                <div style={styles.urlInputContainer}>
                    <input
                        onChange={this.onURLChange}
                        ref="url"
                        style={styles.urlInput}
                        type="text"
                        value={this.state.urlValue}
                        onKeyDown={this.onURLInputKeyDown}
                    />
                    <Button onMouseDown={this.confirmMedia}>
                        Confirm
                    </Button>
                </div>;
        }

        const {
            editorState
        } = this.state;
        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = 'RichEditor-editor';
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }
        return (
            <div className="RichEditor-root">
                <BlockStyleControls
                    editorState={editorState}
                    onToggle={this.toggleBlockType}
                />
                <InlineStyleControls
                    editorState={editorState}
                    onToggle={this.toggleInlineStyle}
                />
                <div>
                    <Button onMouseDown={this.addAudio} style={{marginRight: 10}}>
                        Add Audio
                    </Button>
                    <Button onMouseDown={this.addImage} style={{marginRight: 10}}>
                        Add Image
                    </Button>
                    <Button onMouseDown={this.addVideo} style={{marginRight: 10}}>
                        Add Video
                    </Button>
                </div>
                {urlInput}
                <div className={className} onClick={this.focus}>
                    <Editor
                        blockRendererFn={mediaBlockRenderer}
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        keyBindingFn={this.mapKeyToEditorCommand}
                        onChange={this.onChange}
                        placeholder="Tell a story..."
                        ref="editor"
                        spellCheck={true}
                    />
                </div>
                <input
                    onClick={this.logState}
                    type="button"
                    value="Log State"
                />
            </div>
        );
    }
}

function mediaBlockRenderer(block) {
    if (block.getType() === 'atomic') {
        return {
            component: Media,
            editable: false,
        };
    }
    return null;
}
const Audio = (props) => {
    return <audio controls src={props.src} style={styles.media} />;
};
const Image = (props) => {
    return <img src={props.src} style={styles.media} />;
};
const Video = (props) => {
    return <video controls src={props.src} style={styles.media} />;
};
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

// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote':
            return 'RichEditor-blockquote';
        default:
            return null;
    }
}

const styles = {
    root: {
        fontFamily: '\'Georgia\', serif',
        padding: 20,
        width: 600,
    },
    buttons: {
        marginBottom: 10,
    },
    urlInputContainer: {
        marginBottom: 10,
    },
    urlInput: {
        fontFamily: '\'Georgia\', serif',
        marginRight: 10,
        padding: 3,
    },
    editor: {
        border: '1px solid #ccc',
        cursor: 'text',
        minHeight: 80,
        padding: 10,
    },
    button: {
        marginTop: 10,
        textAlign: 'center',
    },
    media: {
        width: '100%',
        // Fix an issue with Firefox rendering video controls
        // with 'pre-wrap' white-space
        whiteSpace: 'initial'
    },
};
