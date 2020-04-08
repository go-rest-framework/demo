import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CodeIcon from '@material-ui/icons/Code';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';

const BLOCK_TYPES = [{
        title: 'H1',
        label: 'H1',
        style: 'header-one'
    },
    {
        title: 'H2',
        label: 'H2',
        style: 'header-two'
    },
    {
        title: 'H3',
        label: 'H3',
        style: 'header-three'
    },
    {
        title: 'H4',
        label: 'H4',
        style: 'header-four'
    },
    {
        title: 'H5',
        label: 'H5',
        style: 'header-five'
    },
    {
        title: 'H6',
        label: 'H6',
        style: 'header-six'
    },
    {
        title: 'blockquote',
        label: <FormatQuoteIcon />,
        style: 'blockquote'
    },
    {
        title: 'list bulleted',
        label: <FormatListBulletedIcon />,
        style: 'unordered-list-item'
    },
    {
        title: 'list numbered',
        label: <FormatListNumberedIcon />,
        style: 'ordered-list-item'
    },
    {
        title: 'code block',
        label: <CodeIcon />,
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
        <div className="RichEditor-controls" style={{display:"inline"}}>
            {BLOCK_TYPES.map((type) =>
                <Button
                    size="small"
                    key={type.title}
                    active={(type.style === blockType) ? "true" : "false"}
                    label={type.label}
                    data-style={type.style}
                    onClick={changeF}
                >{type.label}</Button>
            )}
        </div>
    );
};

export default BlockStyleControls;
