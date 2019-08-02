import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const BLOCK_TYPES = [{
        label: 'H1',
        style: 'header-one'
    },
    {
        label: 'H2',
        style: 'header-two'
    },
    {
        label: 'H3',
        style: 'header-three'
    },
    {
        label: 'H4',
        style: 'header-four'
    },
    {
        label: 'H5',
        style: 'header-five'
    },
    {
        label: 'H6',
        style: 'header-six'
    },
    {
        label: 'Blockquote',
        style: 'blockquote'
    },
    {
        label: 'UL',
        style: 'unordered-list-item'
    },
    {
        label: 'OL',
        style: 'ordered-list-item'
    },
    {
        label: 'Code Block',
        style: 'code-block'
    },
];

const BlockStyleControls = (props) => {
    const {
        editorState
    } = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    let changeF = function(e) {
        e.preventDefault();
        props.onToggle(e.currentTarget.getAttribute('data-style'));
    }
    return (
        <div className="RichEditor-controls">
            <ButtonGroup size="small" aria-label="small contained button group">
                {BLOCK_TYPES.map((type) =>
                    <Button
                        key={type.label}
                        active={(type.style === blockType) ? "true" : "false"}
                        label={type.label}
                        data-style={type.style}
                        onClick={changeF}
                    >{type.label}</Button>
                )}
            </ButtonGroup>
          </div>
    );
};

export default BlockStyleControls;
