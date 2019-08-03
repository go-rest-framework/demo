import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

var INLINE_STYLES = [{
        label: 'Bold',
        style: 'BOLD'
    },
    {
        label: 'Italic',
        style: 'ITALIC'
    },
    {
        label: 'Underline',
        style: 'UNDERLINE'
    },
    {
        label: 'Monospace',
        style: 'CODE'
    },
];

const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle();

    let changeF = function(e) {
        e.preventDefault();
        props.onToggle(e.currentTarget.getAttribute('data-style'));
    }

    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map((type) =>
                <Button
                    size="small"
                    key={type.label}
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
