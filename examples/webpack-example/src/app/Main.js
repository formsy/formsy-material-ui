import React from 'react';
import Formsy from 'formsy-react';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import FormsyCheckbox from 'formsy-material-ui/lib/FormsyCheckbox';
import FormsyDate from 'formsy-material-ui/lib/FormsyDate';
import FormsyRadio from 'formsy-material-ui/lib/FormsyRadio';
import FormsyRadioGroup from 'formsy-material-ui/lib/FormsyRadioGroup';
import FormsySelect from 'formsy-material-ui/lib/FormsySelect';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import FormsyTime from 'formsy-material-ui/lib/FormsyTime';
import FormsyToggle from 'formsy-material-ui/lib/FormsyToggle';

const muiTheme = getMuiTheme();

const Main = React.createClass({
  
  getInitialState() {
    return {
      canSubmit: false,
    };
  },

  errorMessages: {
    wordsError: "Please only use letters",
    numericError: "Please provide a number",
    urlError: "Please provide a valid URL",
  },

  styles: {
    paperStyle: {
      width: 300,
      margin: 'auto',
      padding: 20,
    },
    switchStyle: {
      marginBottom:16,
    },
    submitStyle: {
      marginTop: 32,
    },
  },

  enableButton() {
    this.setState({
      canSubmit: true,
    });
  },

  disableButton() {
    this.setState({
      canSubmit: false,
    });
  },

  submitForm(data) {
    alert(JSON.stringify(data, null, 4));
  },

  notifyFormError(data) {
    console.error('Form error:', data);
  },

  render() {
    let {paperStyle, switchStyle, submitStyle } = this.styles;
    let { wordsError, numericError, urlError } = this.errorMessages;

    return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <Paper style={paperStyle}>
            <Formsy.Form
                onValid={this.enableButton}
                onInvalid={this.disableButton}
                onValidSubmit={this.submitForm}
                onInvalidSubmit={this.notifyFormError}
            >
              <FormsyText
                  name="name"
                  validations="isWords"
                  validationError={wordsError}
                  required
                  hintText="What is your name?"
                  floatingLabelText="Name"
              />
              <FormsyText
                  name="age"
                  validations="isNumeric"
                  validationError={numericError}
                  hintText="Are you a wrinkly?"
                  floatingLabelText="Age (optional)"
              />
              <FormsyText
                  name="url"
                  validations="isUrl"
                  validationError={urlError}
                  required
                  defaultValue="http://"
                  hintText="http://www.example.com"
                  floatingLabelText="URL"
              />
              <FormsySelect
                  name="frequency"
                  required
                  floatingLabelText="How often do you?"
                  menuItems={this.selectFieldItems}
              >
                <MenuItem value={'never'} primaryText="Never" />
                <MenuItem value={'nightly'} primaryText="Every Night" />
                <MenuItem value={'weeknights'} primaryText="Weeknights" />
              </FormsySelect>
              <FormsyDate
                  name="date"
                  required
                  floatingLabelText="Date"
              />
              <FormsyTime
                  name="time"
                  required
                  floatingLabelText="Time"
              />
              <FormsyCheckbox
                  name="agree"
                  label="Do you agree to disagree?"
                  style={switchStyle}
              />
              <FormsyToggle
                  name="toggle"
                  label="Toggle"
                  style={switchStyle}
              />
              <FormsyRadioGroup name="shipSpeed" defaultSelected="not_light">
                <FormsyRadio
                    value="light"
                    label="prepare for light speed"
                    style={switchStyle}
                />
                <FormsyRadio
                    value="not_light"
                    label="light speed too slow"
                    style={switchStyle}
                />
                <FormsyRadio
                    value="ludicrous"
                    label="go to ludicrous speed"
                    style={switchStyle}
                    disabled={true}
                />
              </FormsyRadioGroup>
              <RaisedButton
                  style={submitStyle}
                  type="submit"
                  label="Submit"
                  disabled={!this.state.canSubmit}
              />
            </Formsy.Form>
          </Paper>
        </MuiThemeProvider>
    );
  },
});

export default Main;
