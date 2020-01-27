import React from 'react'
import ReactDOM from 'react-dom'
import Avatar from 'react-avatar-edit'

class App extends React.Component {

    constructor(props) {
        super(props)
        //const src = props.formdata.profile.avatar;
        this.state = {
            preview: null,
            src: null,
        }
        this.onCrop = this.onCrop.bind(this)
        this.onClose = this.onClose.bind(this)
        this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this)
    }

    componentWillMount() {
        if (this.state.preview != this.props.formdata.profile.avatar) {
            this.setState({
                preview: this.props.formdata.profile.avatar
            });
        }
        console.log("Avatar component will mount");
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.preview != this.props.formdata.profile.avatar) {
            this.setState({
                preview: this.props.formdata.profile.avatar
            });
        }
        console.log("Avatar component updated");
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
                {
                (this.state.preview != null && this.state.preview != '') && <img src={this.state.preview} alt="Preview" />
                }
            </div>
        )
    }
}

export default App;
