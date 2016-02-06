# formsy-material-ui [![npm version](https://badge.fury.io/js/formsy-material-ui.svg)](https://badge.fury.io/js/formsy-material-ui)

[formsy-react](https://github.com/christianalfoni/formsy-react) is a form validation component for React forms.
This is a wrapper for [Material-UI](http://material-ui.com/) form components to allow them to be used with formsy-react.

## Installation

`$ npm install formsy-material-ui`

Note: For React 0.13.x compatibility, specify formsy-react 0.14.1 in your app.

**NB**: Material-UI 0.14.1 introduced a regression that made it incompatible with CommonJS require(). Please use [Material-UI 0.14.2]( https://github.com/callemall/material-ui/releases/tag/v0.14.2) or above.

## Usage

Note: for `FormsyText` you must use `value` instead of `defaultValue` to set a default value.

As of 0.3.0 the library is split into separate modules, so you can import only those needed for a particular form.
This will save overhead particularly if you are not using the Date and / or Time components.

```js
var FormsyCheckbox = require('formsy-material-ui/lib/FormsyCheckbox');
var FormsyDate = require('formsy-material-ui/lib/FormsyDate');
var FormsyRadio = require('formsy-material-ui/lib/FormsyRadio');
var FormsyRadioGroup = require('formsy-material-ui/lib/FormsyRadioGroup');
var FormsySelect = require('formsy-material-ui/lib/FormsySelect');
var FormsyText = require('formsy-material-ui/lib/FormsyText');
var FormsyTime = require('formsy-material-ui/lib/FormsyTime');
var FormsyToggle = require('formsy-material-ui/lib/FormsyToggle');
```

If you prefer you can import the whole library, and associated MUI components, by requiring `formsy-material-ui`
this will have the same footprint, regardless of which components you chose to assign in the following line(s):

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
      canSubmit: false
    };
  },

  errorMessages: {
    wordsError: "Please only use letters"
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
    // Submit your validated form
    console.log("Model: ", model);
  },

  render: function () {
    let { wordsError } = this.errorMessages;

    return (
      <Formsy.Form
        onValid={this.enableButton}
        onInvalid={this.disableButton}
        onValidSubmit={this.submitForm}
      >

         <FormsyText
           name='name'
           validations='isWords'
           validationError={wordsError}
           required
           hintText="What is your name?"
           value="Bob"
           floatingLabelText="Name"
         />

      <FormsySelect
        name='frequency'
        required
        floatingLabelText="How often?">
        <MenuItem value={'never'} primaryText="Never" />
        <MenuItem value={'nightly'} primaryText="Every Night" />
        <MenuItem value={'weeknights'} primaryText="Weeknights" />
      </FormsySelect>

        <FormsyDate
          name='date'
          required
          floatingLabelText="Date"
        />

        <FormsyTime
          name='time'
          required
          floatingLabelText="Time"
        />

        <FormsyCheckbox
          name='agree'
          label="Do you agree to disagree?"
          defaultChecked={true}
        />

        <FormsyToggle
          name='toggle'
          label="Toggle"
        />

        <FormsyRadioGroup name="shipSpeed" defaultSelected="not_light">
          <FormsyRadio
            value="light"
            label="prepare for light speed"
          />
          <FormsyRadio
            value="not_light"
            label="light speed too slow"
          />
          <FormsyRadio
            value="ludicrous"
            label="go to ludicrous speed"
            disabled={true}
          />
        </FormsyRadioGroup>

        <RaisedButton
          type="submit"
          label="Submit"
          disabled={!this.state.canSubmit}
        />
      </Formsy.Form>
    );
  }
});
```

Material-ui provides a `.focus()` method for some its components, such as `TextField`.  formsy-material-ui components wrap Material-UI components, and if the underlying Material-UI component has a `.focus()` method, then the formsy-material-ui components will also expose a `.focus()` method, which just delegates to the underlying Material-UI component's `.focus()`.

In the example below, we implement part of a chat-messaging application.  The component is a form that provides a text input and a submit button; users can enter their message in the input and send it with the submit button.  As a UX feature, we clear the form (`resetForm()`) and put the user's cursor back in the text field (`this.messageInput.focus()`) so that the user can easily begin to type his or her next message.  We set a React `ref` on the `FormsyText` component (setting it to `this.messageInput`) in order to have access to it and use `.focus()`.


```jsx
import React, { Component, PropTypes } from 'react'
import { Form } from 'formsy-react'
import RaisedButton from 'material-ui/lib/raised-button'
import FormsyText from 'formsy-material-ui/lib/FormsyText'

export default class ChatMessageForm extends Component {
  constructor (props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.refMessageInput = c => this.messageInput = c
  }

  submit (model, resetForm) {
    this.props.submitMessage(model.message)
    resetForm()
    this.messageInput.focus()
  }

  render () {
    return (
      <Form onValidSubmit={this.submit}>

        <FormsyText
         ref={this.refMessageInput}
         name="message"
         required
         formNoValidate
         hintText="What's on your mind?"
         validations="isAlpha,minLength:1,maxLength:1000"
        />

        <RaisedButton
         type="submit"
         primary={true}
         label="SEND"
        />

      </Form>
    )
  }
}

ChatMessageForm.propTypes = {
  submitMessage: PropTypes.func.isRequired
}
```


## Known Issues

See [issues](https://github.com/mbrookes/formsy-material-ui/issues).

## Release History

See [CHANGELOG.md](https://github.com/mbrookes/formsy-material-ui/blob/master/CHANGELOG.md)

## Acknowledgements

Originally based on an example by [Ryan Blakeley](https://github.com/rblakeley).

Thanks to our [contributors](https://github.com/mbrookes/formsy-material-ui/graphs/contributors).
