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
    updateImmediately: React.PropTypes.bool,
    validationError: React.PropTypes.string,
    validationErrors: React.PropTypes.object,
    validations: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
    value: React.PropTypes.any,
  },

  mixins: [Formsy.Mixin],


  getInitialState() {
    return { value: this.controlledValue() };
  },

  componentWillMount() {
    this.setValue(this.controlledValue());
  },

  componentWillReceiveProps(nextProps) {
    const isValueChanging = nextProps.value !== this.props.value;
    if (isValueChanging || nextProps.defaultValue !== this.props.defaultValue) {
      const value = this.controlledValue(nextProps);
      if (isValueChanging || this.props.defaultValue === this.getValue()) {
        this.setState({ value });
        this.setValue(value);
      }
    }
  },

  componentWillUpdate(nextProps, nextState) {
    if (nextState._isPristine && // eslint-disable-line no-underscore-dangle
      nextState._isPristine !== this.state._isPristine) { // eslint-disable-line no-underscore-dangle
      // Calling state here is valid, as it cannot cause infinite recursion.
      const value = this.controlledValue(nextProps);
      this.setValue(value);
      this.setState({ value });
    }
  },

  controlledValue(props = this.props) {
    return props.value || props.defaultValue || '';
  },

  handleBlur: function handleBlur(event) {
    this.setValue(event.currentTarget.value);
    delete this.changeValue;
    if (this.props.onBlur) this.props.onBlur(event);
  },

  handleChange: function handleChange(event) {
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
          this.resetValue();
        }
      }
    }

    // Controlled component
    if (this.props.onChange) {
      this.props.onChange(event, event.currentTarget.value);
    // Uncontrolled component
    } else {
      this.setState({ value: event.currentTarget.value });
    }
  },

  handleKeyDown: function handleKeyDown(event) {
    if (keycode(event) === 'enter') this.setValue(event.currentTarget.value);
    if (this.props.onKeyDown) this.props.onKeyDown(event, event.currentTarget.value);
  },

  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,

  render() {
    const {
      defaultValue, // eslint-disable-line no-unused-vars
      validations, // eslint-disable-line no-unused-vars
      validationError, // eslint-disable-line no-unused-vars
      validationErrors, // eslint-disable-line no-unused-vars
      value, // eslint-disable-line no-unused-vars
      ...rest,
    } = this.props;

    return (
      <TextField
        {...rest}
        errorText={this.getErrorMessage()}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        ref={this.setMuiComponentAndMaybeFocus}
        value={this.state.value}
      />
    );
  },
});

export default FormsyText;
