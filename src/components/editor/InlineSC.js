import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';

var INLINE_STYLES = [{
        title: 'bold',
        label: <FormatBoldIcon />,
        style: 'BOLD'
    },
    {
        title: 'italic',
        label: <FormatItalicIcon />,
        style: 'ITALIC'
    },
    {
        title: 'underline',
        label: <FormatUnderlinedIcon />,
        style: 'UNDERLINE'
    },
    {
        title: 'align left',
        label: <FormatAlignLeftIcon />,
        style: 'LEFT'
    },
    {
        title: 'align center',
        label: <FormatAlignCenterIcon />,
        style: 'CENTER'
    },
    {
        title: 'align right',
        label: <FormatAlignRightIcon />,
        style: 'RIGHT'
    },
];

const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle();

    let changeF = function(e) {
        e.preventDefault();
        props.onToggle(e.currentTarget.getAttribute('data-style'));
    }

    return (
        <div className="RichEditor-controls" style={{display:"inline"}}>
            {INLINE_STYLES.map((type) =>
                <Button
                    size="small"
                    key={type.title}
                    active={currentStyle.has(type.style) ? "true" : "false"}
                    label={type.label}
                    data-style={type.style}
                    onClick={changeF}
                >{type.label}</Button>
            )}
          </div>
    );
};

export default InlineStyleControls;
