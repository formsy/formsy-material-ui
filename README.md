# formsy-material-ui
[formsy-react](https://github.com/christianalfoni/formsy-react) is a form validation component for React forms.
This is a wrapper for [Material-UI](http://material-ui.com/) form components to allow them to be used with formsy-react.

## Installation

`$ npm install formsy-material-ui`

Note: For React 0.13.x compatibility, specify formsy-react 0.14.1 in your app.

## Usage

### ES6:

```js
const FMUI = require('formsy-material-ui');
const { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup, FormsySelect, FormsyText, FormsyTime, FormsyToggle } = FMUI;
```

### ES5:

```js
var FMUI = require('formsy-material-ui');
var FormsyCheckbox = FMUI.FormsyCheckbox;
var FormsyDate = FMUI.FormsyDate;
var FormsyRadio = FMUI.FormsyRadio;
var FormsyRadioGroup = FMUI.FormsyRadioGroup;
var FormsySelect = FMUI.FormsySelect;
var FormsyText = FMUI.FormsyText;
var FormsyTime = FMUI.FormsyTime;
var FormsyToggle = FMUI.FormsyToggle;
```

### Examples

#### Example App
[Live demo](http://formsy-material-ui.meteor.com), code: [formsy-material-ui](https://github.com/mbrookes/formsy-mui-demo)

#### Example Code
```jsx
const FMUI = require('formsy-material-ui');
const { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup, FormsySelect, FormsyText, FormsyTime, FormsyToggle } = FMUI;
const RaisedButton = require('material-ui/lib/raised-button');

const Form = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext(){
    return {
      muiTheme: Styles.ThemeManager.getMuiTheme(Styles.LightRawTheme)
    }
  },

  getInitialState: function () {
    return {
      canSumbit: false
    };
  },

  errorMessages: {
    wordsError: "Please only use letters",
    numericError: "Please provide a number",
    urlError: "Please provide a valid URL"
  },

  selectFieldItems: [
    { payload: 'never', text: 'Never' },
    { payload: 'nightly', text: 'Every Night' },
    { payload: 'weeknights', text: 'Weeknights' },
    { payload: 'weekends', text: 'Weekends' },
    { payload: 'weekly', text: 'Weekly' }
  ],

  styles: {
    paper: {
      width: 300,
      margin: 20,
      padding: 20
    },
    submit: {
      marginTop: 32
    }
  },

  enableButton: function () {
    this.setState({
      canSubmit: true
    });
  },

  disableButton: function () {
    this.setState({
      canSubmit: false
    });
  },

  submitForm: function (model) {
    console.log("Model: ", model);
    alert(
      `Name:  ${model.name}\n
      Chucked: ${model.chuck}\n
      URL: ${model.url}\n
      Frequency: ${model.frequency}\n
      Date: ${model.date}\n
      Time: ${model.time}\n
      Agree: ${model.agree}\n
      Toggle: ${model.toggle}\n
      Speed: ${model.shipSpeed}\n
    `);
  },

  notifyFormError: function (model) {
    console.error('Form error:', model);
  },

  render: function () {
    let styles = this.styles;
    let { wordsError, numericError, urlError } = this.errorMessages;

    return (
      <Paper style={styles.paper}>
        <Formsy.Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.submitForm}
          onInvalidSubmit={this.notifyFormError}
          style={styles.form} >

            <FormsyText
            name='name'
            validations='isWords'
            validationError={wordsError}
            required
            hintText="What is your name?"
            floatingLabelText="Name" />

          <FormsyText
            name='chuck'
            validations='isNumeric'
            validationError={numericError}
            required
            hintText="wood could a woodchuck chuck?"
            floatingLabelText="How much" />

          <FormsyText
            name='url'
            validations='isUrl'
            validationError={urlError}
            required
            hintText="Where can we find out more?"
            floatingLabelText="URL" />

          <FormsySelect
            name='frequency'
            required
            floatingLabelText="How often do you?"
            menuItems={this.selectFieldItems}/>

          <FormsyDate
            name='date'
            required
            floatingLabelText="Date" />

          <FormsyTime
            name='time'
            required
            floatingLabelText="Time" />

          <FormsyCheckbox
            name='agree'
            label="Do you agree to disagree?"
            defaultChecked={true}
            style={{marginBottom:16}} />

          <FormsyToggle
            name='toggle'
            label="Toggle"
            style={{marginBottom:16}} />

          <FormsyRadioGroup name="shipSpeed" defaultSelected="not_light">
            <FormsyRadio
              value="light"
              label="prepare for light speed"
              style={{marginBottom:16}} />
            <FormsyRadio
              value="not_light"
              label="light speed too slow"
              style={{marginBottom:16}}/>
            <FormsyRadio
              value="ludicrous"
              label="go to ludicrous speed"
              style={{marginBottom:16}}
              disabled={true}/>
          </FormsyRadioGroup>

          <RaisedButton
            style={styles.submit}
            type="submit"
            label="Submit"
            disabled={!this.state.canSubmit} />
        </Formsy.Form>
      </Paper>
    );
  }
});
```

## Known Issues

`required` is not being enforced directly on the SelectField component, 
it does correctly affect `canSubmit` state however, so use that to disable the submit button as in the example above.


## Release History

* 0.1.0 Initial release
* 0.1.1 Fix exports
* 0.1.2 Babelify same!
* 0.1.3 Fix Checkbox & Toggle to return value when unchanged, don't import all of MUI (!), update example in README.
* 0.1.4 Add formsy-react dependency (previously assumed it was already installed)
* 0.1.5 Add react-components keyword to package.json


## Acknowledgements

Based on an example from [Ryan Blakeley](https://github.com/rblakeley).