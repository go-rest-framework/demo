import React from 'react'
import ReactDOM from 'react-dom'
import Avatar from 'react-avatar-edit'

class App extends React.Component {

    constructor(props) {
        super(props)
        //const src = './example/einshtein.jpg'
        this.state = {
            preview: null,
            src: null,
        }
        this.onCrop = this.onCrop.bind(this)
        this.onClose = this.onClose.bind(this)
        this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this)
    }

    onClose() {
        this.setState({
            preview: null
        })

        this.props.changeAva("");
    }

    onCrop(preview) {
        this.setState({
            preview
        });

        this.props.changeAva(preview);

        console.log(preview);
    }

    onBeforeFileLoad(elem) {
        if (elem.target.files[0].size > 1000000) {
            alert("File is too big!");
            elem.target.value = "";
        };
    }

    render() {
        return (
            <div>
        <Avatar
          width={390}
          height={295}
          onCrop={this.onCrop}
          onClose={this.onClose}
          onBeforeFileLoad={this.onBeforeFileLoad}
          src={this.state.src}
          label="Upload your avatar"
        />
      </div>
        )
    }
}

export default App;
