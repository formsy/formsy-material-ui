# ⚠️ Help Wanted ⚠️

This package is currently under active restoration after a long hiatus, and all help is appreciated, especially MUI users.

# formsy-material-ui [![npm version](https://badge.fury.io/js/formsy-material-ui.svg)](https://badge.fury.io/js/formsy-material-ui) [![Build Status](https://travis-ci.org/mbrookes/formsy-material-ui.svg?branch=master)](https://travis-ci.org/mbrookes/formsy-material-ui)

This library is a wrapper for [Material-UI](http://material-ui.com/) form components to allow them to be used with
[formsy-react](https://github.com/formsy/formsy-react), a form validation component for React forms.

## Installation

To and install formsy-material-ui and add it to your `package.json`, run:

```
$ yarn add formsy-material-ui
```

You will also need to add these peer dependencies if not already installed:

- `create-react-class`
- `formsy-react@0.19.5`
- `material-ui@0.18.7`
- `react-dom`
- `react`

## Usage

```ts
import {
  FormsyAutoComplete,
  FormsyCheckbox,
  FormsyDate,
  FormsyRadio,
  FormsyRadioGroup,
  FormsySelect,
  FormsyText,
  FormsyTime,
  FormsyToggle,
} from 'formsy-material-ui';
```

### Events

Components allow for `onChange` event handlers in props. They are fired when the value of the component changes,
regardless of the underlying handler (eg, `FormsyToggle` uses `onToggle` internally, but we still use `onChange` in
props to hook into the event.)

The call back signatures for all `onChange` handlers conform to Material-UI's proposed
[Standardized Callback Signatures](https://github.com/mui-org/material-ui/issues/2957).

An example usage of this would be to use an `onChange` for the FormsySelect and receive notifications when it changes.

### Example Form

```tsx
import React from 'react';
import createClass from 'create-react-class';
import Formsy from 'formsy-react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import {
  FormsyCheckbox,
  FormsyDate,
  FormsyRadio,
  FormsyRadioGroup,
  FormsySelect,
  FormsyText,
  FormsyTime,
  FormsyToggle,
  FormsyAutoComplete,
} from 'formsy-material-ui/lib';

const Main = createClass<any, any>({
  /**
   * As an alternative to `MuiThemeProvider` you can add a theme directly into context.
   * See the [Material-UI themes](http://www.material-ui.com/#/customization/themes) docs for details.
   *
   * childContextTypes: {
   *   muiTheme: PropTypes.object,
   * },
   * getChildContext(){
   *   return {
   *     muiTheme: getMuiTheme(),
   *   }
   * },
   */

  getInitialState() {
    return {
      canSubmit: false,
    };
  },

  errorMessages: {
    wordsError: 'Please only use letters',
    numericError: 'Please provide a number',
    urlError: 'Please provide a valid URL',
  },

  styles: {
    paperStyle: {
      width: 300,
      margin: 'auto',
      padding: 20,
    },
    switchStyle: {
      marginBottom: 16,
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
    let { paperStyle, switchStyle, submitStyle } = this.styles;
    let { wordsError, numericError, urlError } = this.errorMessages;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Paper style={paperStyle}>
          <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.submitForm}
            onInvalidSubmit={this.notifyFormError}
          >
            <FormsyDate name="date" required floatingLabelText="Date" />
            <FormsyTime name="time" required floatingLabelText="Time" />
            <FormsySelect name="frequency" required floatingLabelText="How often do you?">
              <MenuItem value={'never'} primaryText="Never" />
              <MenuItem value={'nightly'} primaryText="Every Night" />
              <MenuItem value={'weeknights'} primaryText="Weeknights" />
            </FormsySelect>
            <FormsyAutoComplete
              name="frequency-auto-complete"
              required
              floatingLabelText="How often do you?"
              dataSource={['Never', 'Every Night', 'Weeknights']}
            />
            <FormsyCheckbox name="agree" label="Do you agree to disagree?" style={switchStyle} />
            <FormsyToggle name="toggle" label="Toggle" style={switchStyle} />
            <FormsyRadioGroup name="shipSpeed" defaultSelected="not_light">
              <FormsyRadio value="light" label="prepare for light speed" style={switchStyle} />
              <FormsyRadio value="not_light" label="light speed too slow" style={switchStyle} />
              <FormsyRadio value="ludicrous" label="go to ludicrous speed" style={switchStyle} disabled={true} />
            </FormsyRadioGroup>
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
              hintText="http://www.example.com"
              floatingLabelText="URL"
              updateImmediately
            />
            <RaisedButton style={submitStyle} type="submit" label="Submit" disabled={!this.state.canSubmit} />
          </Formsy.Form>
        </Paper>
      </MuiThemeProvider>
    );
  },
});

export default Main;
```

## Known Issues

See [issues](https://github.com/formsy/formsy-material-ui/issues).

## Release History

See [CHANGELOG.md](https://github.com/formsy/formsy-material-ui/blob/master/CHANGELOG.md)

## Acknowledgements

Originally started by [Matt Brookes](https://github.com/mbrookes), later transfered to [Ryan Blakeley](@rojobuffalo)
before joining the Formsy Organization.

Thanks to our [contributors](https://github.com/formsy/formsy-material-ui/graphs/contributors).

## Alternatives

Here are some alternative solutions you might also wish to consider:

- [Validation component for material-ui forms](https://github.com/NewOldMax/react-material-ui-form-validator)
- Redux Form [Material-UI example](https://redux-form.com/6.6.2/examples/material-ui/)
- [MobX React Form](https://github.com/foxhound87/mobx-react-form)
