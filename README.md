# formsy-material-ui
A [Formsy](https://github.com/christianalfoni/formsy-react) compatibility wrapper for [Material-UI](http://material-ui.com/) form components.

## Usage

### ES6:

```js
let FMUI = require('formsy-material-ui');
let { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup, FormsySelect, FormsyText, FormsyTime, FormsyToggle } = FMUI;
```

### ES5:

```js
VAR FMUI = require('formsy-material-ui');
var FormsyCheckbox = FMUI.FormsyCheckbox;
var FormsyDate = FMUI.FormsyDate;
var FormsyRadio = FMUI.FormsyRadio;
var FormsyRadioGroup = FMUI.FormsyRadioGroup;
var FormsySelect = FMUI.FormsySelect;
var FormsyText = FMUI.FormsyText;
var FormsyTime = FMUI.FormsyTime;
var FormsyToggle = FMUI.FormsyToggle;
```

### Example:

```jsx
let FMUI = require('formsy-material-ui');
let { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup, FormsySelect, FormsyText, FormsyTime, FormsyToggle } = FMUI;
let { RaisedButton } = MUI;

NewEventForm = React.createClass({

  getDefaultProps: function () {
    return {
      errorMessages: {
        wordsError: "Please only use letters",
        numericError: "Please provide a number",
        urlError: "Please provide a valid URL"
      }
    };
  },

  getInitialState: function () {
    return {
      canSumbit: false
    };
  },

  getStyles () {
    return {
      form: {
        float: 'left',
        margin: 16,
        width: 320
      },
      submit: {
        float: 'left',
        clear: 'left',
        marginTop: 32
      }
    };
  },

  selectFieldItems: [
    { payload: 'never', text: 'Never' },
    { payload: 'nightly', text: 'Every Night' },
    { payload: 'weeknights', text: 'Weeknights' },
    { payload: 'weekends', text: 'Weekends' },
    { payload: 'weekly', text: 'Weekly' }
  ],

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
    Dispatcher.dispatch( { actionType: "CREATE_NEW_EVENT", data: model } );
  },

  notifyFormError: function (model) {
    console.error('Form error:', model);
  },

  render: function () {
    let styles = this.getStyles();
    let { wordsError, numericError, urlError } = this.props.errorMessages;

    return (
      <div style={styles.form} className="none">
        <Formsy.Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.submitForm}
          onInvalidSubmit={this.notifyFormError}
          style={styles.form}
          mapping={this.mapInputs} >

          <FormsyText
            name='eventName'
            validations='isWords'
            validationError={wordsError}
            required
            hintText="What is the name of the event?"
            floatingLabelText="Event name" />

          <FormsyText
            name='organiser'
            validations='isWords'
            validationError={wordsError}
            required
            hintText="Who is organising this event?"
            floatingLabelText="Organiser" />

          <FormsyText
            name='locationName'
            validations='isWords'
            validationError={wordsError}
            required
            hintText="Where is the event being held?"
            floatingLabelText="Location" />

          <FormsySelect
            name='select'
            required
            floatingLabelText="Label"
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
            name='checkbox'
            value={false}
            label="Checkbox" />

          <FormsyToggle
            name='toggle'
            value={false}
            label="Toggle" />

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
      </div>
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

## Acknowledgements
Based on an example from: https://github.com/rblakeley/pro-camper/blob/master/app/components/Form.js
         
