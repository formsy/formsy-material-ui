# formsy-material-ui
[formsy-react](https://github.com/christianalfoni/formsy-react) is a form validation component for React forms.
This is a wrapper for [Material-UI](http://material-ui.com/) form components to allow them to be used with formsy-react.

## Installation

`$ npm install formsy-material-ui`

Note: For React 0.13.x compatibility, specify formsy-react 0.14.1 in your app.

## Usage

Note for `FormsyText` you must use `value` instead of `defaultValue` to set a default value.

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
[Live demo](http://formsy-mui-demo.meteor.com), code: [formsy-material-ui](https://github.com/mbrookes/formsy-mui-demo)

#### Example Code
```jsx
const FMUI = require('formsy-material-ui');
const { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup, FormsySelect, FormsyText, FormsyTime, FormsyToggle } = FMUI;
const RaisedButton = require('material-ui/lib/raised-button');

const Form = React.createClass({

  getInitialState: function () {
    return {
      canSumbit: false
    };
  },

  errorMessages: {
    wordsError: "Please only use letters"
  },

  selectFieldItems: [
    { payload: 'never', text: 'Never' },
    { payload: 'nightly', text: 'Every Night' },
    { payload: 'weeknights', text: 'Weeknights' }
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
    // Submit your validated form
    console.log("Model: ", model);
  },

  render: function () {
    let { wordsError } = this.errorMessages;

    return (
      <Formsy.Form
        onValid={this.enableButton}
        onInvalid={this.disableButton}
        onValidSubmit={this.submitForm} >

         <FormsyText
          name='name'
          validations='isWords'
          validationError={wordsError}
          required
          hintText="What is your name?"
          value="Bob"
          floatingLabelText="Name" />

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
          defaultChecked={true} />

        <FormsyToggle
          name='toggle'
          label="Toggle" />

        <FormsyRadioGroup name="shipSpeed" defaultSelected="not_light">
          <FormsyRadio
            value="light"
            label="prepare for light speed" />
          <FormsyRadio
            value="not_light"
            label="light speed too slow" />
          <FormsyRadio
            value="ludicrous"
            label="go to ludicrous speed"
            disabled={true} />
        </FormsyRadioGroup>

        <RaisedButton
          type="submit"
          label="Submit"
          disabled={!this.state.canSubmit} />
      </Formsy.Form>
    );
  }
});
```

## Known Issues

See [issues](https://github.com/mbrookes/formsy-material-ui/issues).

## Release History

See [CHANGELOG.md](https://github.com/mbrookes/formsy-material-ui/blob/master/CHANGELOG.md)

## Acknowledgements

Originally based on an example by [Ryan Blakeley](https://github.com/rblakeley).

Thanks to our [contributors](https://github.com/mbrookes/formsy-material-ui/graphs/contributors).