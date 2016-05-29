# formsy-material-ui [![npm version](https://badge.fury.io/js/formsy-material-ui.svg)](https://badge.fury.io/js/formsy-material-ui)

This library is a wrapper for [Material-UI](http://material-ui.com/) form components to allow them to be used
with [formsy-react](https://github.com/christianalfoni/formsy-react), a form validation component for React forms.

## Installation

To add formsy-material-ui to you package.json and install it, run:

```
$ npm install --save formsy-material-ui
```

You will also need to add formsy-react if not already installed:

```
$ npm install --save formsy-react
```

Note: For React 15.0.x compatibility, specify `"formsy-react": "^0.18.0"`.

## Usage

### ES6 Imports

```js
import FormsyCheckbox from 'formsy-material-ui/lib/FormsyCheckbox';
import FormsyDate from 'formsy-material-ui/lib/FormsyDate';
import FormsyRadio from 'formsy-material-ui/lib/FormsyRadio';
import FormsyRadioGroup from 'formsy-material-ui/lib/FormsyRadioGroup';
import FormsySelect from 'formsy-material-ui/lib/FormsySelect';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import FormsyTime from 'formsy-material-ui/lib/FormsyTime';
import FormsyToggle from 'formsy-material-ui/lib/FormsyToggle';
```

OR:

```js
import { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup, 
  FormsySelect, FormsyText, FormsyTime, FormsyToggle } from 'formsy-material-ui/lib';
```

### Events

Components allow for `onChange` event handlers in props. They are fired when the value of the 
component changes, regardless of the underlying handler (eg, `FomrsyToggle` uses `onToggle` internally, but we
still use `onChange` in props to hook into the event.)

The call back signatures for all `onChange` handlers conform to 
 Material-UI's proposed [Standardized Callback Signatures](https://github.com/callemall/material-ui/issues/2957).  

An example usage of this would be to use an `onChange` for the FormsySelect and receive notifications when it changes.

### Examples

#### Example App

The `formsy-material-ui` repo contains a [sample webpack SPA](https://github.com/mbrookes/formsy-material-ui/tree/master/examples/webpack-example).

#### Example Code

You can find an [example form](https://github.com/mbrookes/formsy-material-ui/blob/master/examples/webpack-example/src/app/Main.js#L80) in the example app directory.

## Known Issues

See [issues](https://github.com/mbrookes/formsy-material-ui/issues).

## Release History

See [CHANGELOG.md](https://github.com/mbrookes/formsy-material-ui/blob/master/CHANGELOG.md)

## Acknowledgements

Originally based on an example by [Ryan Blakeley](https://github.com/rblakeley).

Thanks to our [contributors](https://github.com/mbrookes/formsy-material-ui/graphs/contributors).
