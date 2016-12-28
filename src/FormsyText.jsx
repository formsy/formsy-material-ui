import React from 'react';
import keycode from 'keycode';
import Formsy from 'formsy-react';
import TextField from 'material-ui/TextField';
import { setMuiComponentAndMaybeFocus, debounce } from './utils';

const FormsyText = React.createClass({

  propTypes: {
    defaultValue: React.PropTypes.any,
    name: React.PropTypes.string.isRequired,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    requiredError: React.PropTypes.string,
    updateImmediately: React.PropTypes.bool,
    underlineStyle: React.PropTypes.object,
    validationColor: React.PropTypes.string,
    validationError: React.PropTypes.string,
    validationErrors: React.PropTypes.object,
    validations: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
    value: React.PropTypes.any,
  },

  mixins: [Formsy.Mixin],


  componentWillMount() {
    this.setValue(this.controlledValue());
  },

  componentWillReceiveProps(nextProps) {
    const isValueChanging = nextProps.value !== this.props.value;
    if (isValueChanging || nextProps.defaultValue !== this.props.defaultValue) {
      const value = this.controlledValue(nextProps);
      const isValid = this.isValidValue(value);

      if (isValueChanging || this.props.defaultValue === this.getValue()) {
        this.setState({ isValid });
        this.setValue(value);
      }
    }
  },

  componentWillUpdate(nextProps, nextState) {
    if (nextState._isPristine && // eslint-disable-line no-underscore-dangle
      nextState._isPristine !== this.state._isPristine) { // eslint-disable-line no-underscore-dangle
      // Calling state here is valid, as it cannot cause infinite recursion.
      const value = this.controlledValue(nextProps);
      const isValid = this.isValidValue(value);
      this.setValue(value);
      this.setState({ isValid });
    }
  },

  controlledValue(props = this.props) {
    return props.value || props.defaultValue || '';
  },

  validationColor(props = this.props) {
    return props.validationColor || '#4CAF50';
  },

  handleBlur(event) {
    this.setValue(event.currentTarget.value);
    delete this.changeValue;
    if (this.props.onBlur) this.props.onBlur(event);
  },

  handleChange(event) {
    // Update the value (and so display any error) after a timeout.
    if (this.props.updateImmediately) {
      if (!this.changeValue) {
        this.changeValue = debounce(this.setValue, 400);
      }
      this.changeValue(event.currentTarget.value);
    } else {
      // If there was an error (on loss of focus) update on each keypress to resolve same.
      if (this.getErrorMessage() != null) {
        this.setValue(event.currentTarget.value);
      } else {
        // Only update on valid values, so as to not generate an error until focus is lost.
        if (this.isValidValue(event.target.value)) {
          this.setValue(event.currentTarget.value);
          // If it becomes invalid, and there isn't an error message, invalidate without error.
        } else {
          this.setState({ _value: event.currentTarget.value, _isPristine: false });
        }
      }
    }

    this.setState({ isValid: this.isValidValue(event.currentTarget.value) });
    if (this.props.onChange) this.props.onChange(event, event.currentTarget.value);
  },

  handleKeyDown(event) {
    if (keycode(event) === 'enter') this.setValue(event.currentTarget.value);
    if (this.props.onKeyDown) this.props.onKeyDown(event, event.currentTarget.value);
  },

  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,

  render() {
    const {
      defaultValue, // eslint-disable-line no-unused-vars
      requiredError,
      updateImmediately, // eslint-disable-line no-unused-vars
      underlineStyle, // eslint-disable-line no-unused-vars
      validations, // eslint-disable-line no-unused-vars
      validationError, // eslint-disable-line no-unused-vars
      validationErrors, // eslint-disable-line no-unused-vars
      value, // eslint-disable-line no-unused-vars
      ...rest,
    } = this.props;

    const { isRequired, isPristine, isValid, isFormSubmitted } = this;
    const isRequiredError = isRequired() && !isPristine() && !isValid() && isFormSubmitted() && requiredError;
    const errorText = this.getErrorMessage() || isRequiredError;

    return (
      <TextField
        {...rest}
        errorText={errorText}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        ref={this.setMuiComponentAndMaybeFocus}
        value={this.getValue()}
        underlineStyle={[underlineStyle, this.state.isValid && {color: this.validationColor()}]}
        underlineFocusStyle={this.state.isValid ? { color: this.validationColor() } : {}}
      />
    );
  },
});

export default FormsyText;
