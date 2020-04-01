import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function AutocompleteSelect(props) {
    const [options, setOptions] = React.useState([]);
    const [datachange, setDataChange] = React.useState(0);
    const [loaded, setLoaded] = React.useState(0);
    const [curValue, setCurValue] = React.useState({
        Id: 0,
        Name: ''
    });

    React.useEffect(() => {
        fetch(props.url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                //"Authorization": "Bearer " + props.token
            },
            credentials: "same-origin"
        }).then(function(response) {
            if (response.status === 200) {
                response.json().then(function(res) {
                    if (res.errors != null) {
                        console.log(res.errors);
                    } else {
                        setOptions(res.data);
                        setLoaded(loaded + 1);
                    }
                });
            } else if (response.status === 401) {
                sessionStorage.clear();
                location.reload();
            } else {
                alert(response.text());
            }
        }, function(error) {
            alert(error.message); //=> String
        });
    }, [datachange]);

    React.useEffect(() => {
        if (props.formdata.parent != 0) {
            for (var prop in options) {
                var e = options[prop];
                if (e.Id == props.formdata.parent) {
                    setCurValue(e);
                }
            }
        }
    }, [props.formdata.parent, loaded]);

    return (
        <div>
            {
                (loaded == 0)
                    ?
                        <CircularProgress color="inherit" size={20} />
                    :
                    <Autocomplete
                        onChange={(event, value) => {
                            setCurValue(value);
                            if (value === null) {
                                props.setFormdata({
                                    ["parent"]: 0
                                });
                            }else{
                                props.setFormdata({
                                    ["parent"]: value.Id
                                });
                            }
                        }}
                        value={curValue}
                        options={options}
                        getOptionLabel={option => option.Name}
                        //getOptionSelected={(option, value) => option.Id === 2}
                        openOnFocus
                        renderInput={
                            params => <TextField {...params}
                                name="parent"
                                id="parent-helper"
                                error={(props.formdataerrs.parent == '') ? false : true}
                                helperText={(props.formdataerrs.parent != 0) ? props.formdataerrs.parent : null}
                                margin="normal"
                                label="Parent"
                                variant="outlined"
                            />
                        }
                   />
            }
        </div>
    )
}
