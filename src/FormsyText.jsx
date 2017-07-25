import React, { Component } from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import { HOC } from 'formsy-react';
import TextField from 'material-ui/TextField';
import { setMuiComponentAndMaybeFocus, debounce } from './utils';

class FormsyText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Controled value ?
    };
  }

  componentWillMount() {
    this.setValue(this.controlledValue());
  }

  componentWillReceiveProps(nextProps) {
    const isValueChanging = nextProps.value !== this.props.value;
    if (isValueChanging || nextProps.defaultValue !== this.props.defaultValue) {
      const value = this.controlledValue(nextProps);
      const isValid = this.isValidValue(value);

      if (isValueChanging || this.props.defaultValue === this.getValue()) {
        this.setState({ value, isValid });
        if (this.getValue() !== value) this.setValue(value);
      }
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState._isPristine && // eslint-disable-line no-underscore-dangle
      nextState._isPristine !== this.state._isPristine) { // eslint-disable-line no-underscore-dangle
      // Calling state here is valid, as it cannot cause infinite recursion.
      const value = this.controlledValue(nextProps);
      const isValid = this.isValidValue(value);
      this.setValue(value);
      this.setState({ value, isValid });
    }
  }

  setValue = this.props.setValue;

  controlledValue(props = this.props) {
    return props.value || props.defaultValue || this.convertValue('');
  }

  handleBlur(event) {
    this.setValue(this.convertValue(event.currentTarget.value));
    delete this.changeValue;
    if (this.props.onBlur) this.props.onBlur(event);
  }

  handleChange(event) {
    // Update the value (and so display any error) after a timeout.
    if (this.props.updateImmediately) {
      if (!this.changeValue) {
        this.changeValue = debounce(this.setValue, 400);
      }
      this.changeValue(this.convertValue(event.currentTarget.value));
    } else {
      // If there was an error (on loss of focus) update on each keypress to resolve same.
      if (this.props.getErrorMessage() != null) {
        this.setValue(this.convertValue(event.currentTarget.value));
      } else {
        // Only update on valid values, so as to not generate an error until focus is lost.
        if (this.isValidValue(event.target.value)) {
          this.setValue(this.convertValue(event.currentTarget.value));
          // If it becomes invalid, and there isn't an error message, invalidate without error.
        }
      }
    }

    // Controlled component
    this.setState({ value: event.currentTarget.value, isValid: this.isValidValue(event.currentTarget.value) });
    if (this.props.onChange) this.props.onChange(event, event.currentTarget.value);
  }

  handleKeyDown(event) {
    if (keycode(event) === 'enter') this.setValue(this.convertValue(event.currentTarget.value));
    if (this.props.onKeyDown) this.props.onKeyDown(event, event.currentTarget.value);
  }

  convertValue(value) {
    if (this.props.convertValue) {
      return this.props.convertValue(value);
    } else {
      return value;
    }
  }

  render() {
    const {
      defaultValue, // eslint-disable-line no-unused-vars
      convertValue, // eslint-disable-line no-unused-vars
      requiredError,
      underlineFocusStyle,
      underlineStyle,
      updateImmediately, // eslint-disable-line no-unused-vars
      validations, // eslint-disable-line no-unused-vars
      validationError, // eslint-disable-line no-unused-vars
      validationErrors, // eslint-disable-line no-unused-vars
      value, // eslint-disable-line no-unused-vars
      validationColor,
      ...rest } = this.props;

    const { isRequired, isPristine, isValid, isFormSubmitted, isFormDisabled, getErrorMessage } = this.props;
    const isRequiredError = isRequired() && !isPristine() && !isValid() && isFormSubmitted() && requiredError;
    const errorText = getErrorMessage() || isRequiredError;

    return (
      <TextField
        disabled={isFormDisabled()}
        {...rest}
        errorText={errorText}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        ref={setMuiComponentAndMaybeFocus}
        value={this.state.value}
        underlineStyle={this.state.isValid ? { borderColor: validationColor } : underlineStyle}
        underlineFocusStyle={this.state.isValid ? { borderColor: validationColor } : underlineFocusStyle}
      />
    );
  }
}

FormsyText.propTypes = {
  convertValue: PropTypes.func,
  defaultValue: PropTypes.any,
  getErrorMessage: PropTypes.func.isRequired,
  isFormDisabled: PropTypes.func.isRequired,
  isFormSubmitted: PropTypes.func.isRequired,
  isPristine: PropTypes.func.isRequired,
  isRequired: PropTypes.func.isRequired,
  isValid: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  requiredError: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  underlineFocusStyle: PropTypes.object,
  underlineStyle: PropTypes.object,
  updateImmediately: PropTypes.bool,
  validationColor: PropTypes.string,
  validationError: PropTypes.string,
  validationErrors: PropTypes.object,
  validations: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  value: PropTypes.any,
};

FormsyText.defaultProps = {
  underlineFocusStyle: {},
  underlineStyle: {},
  validationColor: '#4CAF50',
};

export default HOC(FormsyText);

// OLD ================================

// const FormsyText = createClass({

//   // propTypes: {
//   //   convertValue: PropTypes.func,
//   //   defaultValue: PropTypes.any,
//   //   name: PropTypes.string.isRequired,
//   //   onBlur: PropTypes.func,
//   //   onChange: PropTypes.func,
//   //   onKeyDown: PropTypes.func,
//   //   requiredError: PropTypes.string,
//   //   underlineFocusStyle: PropTypes.object,
//   //   underlineStyle: PropTypes.object,
//   //   updateImmediately: PropTypes.bool,
//   //   validationColor: PropTypes.string,
//   //   validationError: PropTypes.string,
//   //   validationErrors: PropTypes.object,
//   //   validations: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
//   //   value: PropTypes.any,
//   // },

//   // defaultProps: {
//   //   underlineFocusStyle: {},
//   //   underlineStyle: {},
//   //   validationColor: '#4CAF50',
//   // },

//   getInitialState() {
//     const value = this.controlledValue();
//     return { value };
//   },

//   // componentWillMount() {
//   //   this.setValue(this.controlledValue());
//   // },

//   // componentWillReceiveProps(nextProps) {
//   //   const isValueChanging = nextProps.value !== this.props.value;
//   //   if (isValueChanging || nextProps.defaultValue !== this.props.defaultValue) {
//   //     const value = this.controlledValue(nextProps);
//   //     const isValid = this.isValidValue(value);

//   //     if (isValueChanging || this.props.defaultValue === this.getValue()) {
//   //       this.setState({ value, isValid });
//   //       if (this.getValue() !== value) this.setValue(value);
//   //     }
//   //   }
//   // },

//   componentWillUpdate(nextProps, nextState) {
//     if (nextState._isPristine && // eslint-disable-line no-underscore-dangle
//       nextState._isPristine !== this.state._isPristine) { // eslint-disable-line no-underscore-dangle
//       // Calling state here is valid, as it cannot cause infinite recursion.
//       const value = this.controlledValue(nextProps);
//       const isValid = this.isValidValue(value);
//       this.setValue(value);
//       this.setState({ value, isValid });
//     }
//   },

//   controlledValue(props = this.props) {
//     return props.value || props.defaultValue || this.convertValue('');
//   },

//   handleBlur(event) {
//     this.setValue(this.convertValue(event.currentTarget.value));
//     delete this.changeValue;
//     if (this.props.onBlur) this.props.onBlur(event);
//   },

//   handleChange(event) {
//     // Update the value (and so display any error) after a timeout.
//     if (this.props.updateImmediately) {
//       if (!this.changeValue) {
//         this.changeValue = debounce(this.setValue, 400);
//       }
//       this.changeValue(this.convertValue(event.currentTarget.value));
//     } else {
//       // If there was an error (on loss of focus) update on each keypress to resolve same.
//       if (this.getErrorMessage() != null) {
//         this.setValue(this.convertValue(event.currentTarget.value));
//       } else {
//         // Only update on valid values, so as to not generate an error until focus is lost.
//         if (this.isValidValue(event.target.value)) {
//           this.setValue(this.convertValue(event.currentTarget.value));
//           // If it becomes invalid, and there isn't an error message, invalidate without error.
//         }
//       }
//     }

//     // Controlled component
//     this.setState({ value: event.currentTarget.value, isValid: this.isValidValue(event.currentTarget.value) });
//     if (this.props.onChange) this.props.onChange(event, event.currentTarget.value);
//   },

//   handleKeyDown(event) {
//     if (keycode(event) === 'enter') this.setValue(this.convertValue(event.currentTarget.value));
//     if (this.props.onKeyDown) this.props.onKeyDown(event, event.currentTarget.value);
//   },

//   convertValue(value) {
//     if (this.props.convertValue) {
//       return this.props.convertValue(value);
//     } else {
//       return value;
//     }
//   },

//   setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,

//   render() {
//     const {
//       defaultValue, // eslint-disable-line no-unused-vars
//       convertValue, // eslint-disable-line no-unused-vars
//       requiredError,
//       underlineFocusStyle,
//       underlineStyle,
//       updateImmediately, // eslint-disable-line no-unused-vars
//       validations, // eslint-disable-line no-unused-vars
//       validationError, // eslint-disable-line no-unused-vars
//       validationErrors, // eslint-disable-line no-unused-vars
//       value, // eslint-disable-line no-unused-vars
//       validationColor,
//       ...rest } = this.props;

//     const { isRequired, isPristine, isValid, isFormSubmitted } = this;
//     const isRequiredError = isRequired() && !isPristine() && !isValid() && isFormSubmitted() && requiredError;
//     const errorText = this.getErrorMessage() || isRequiredError;

//     return (
//       <TextField
//         disabled={this.isFormDisabled()}
//         {...rest}
//         errorText={errorText}
//         onBlur={this.handleBlur}
//         onChange={this.handleChange}
//         onKeyDown={this.handleKeyDown}
//         ref={this.setMuiComponentAndMaybeFocus}
//         value={this.state.value}
//         underlineStyle={this.state.isValid ? { borderColor: validationColor } : underlineStyle}
//         underlineFocusStyle={this.state.isValid ? { borderColor: validationColor } : underlineFocusStyle}
//       />
//     );
//   },
// });
