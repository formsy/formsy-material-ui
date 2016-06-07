import React from 'react';
import keycode from 'keycode';
import Formsy from 'formsy-react';
import TextField from 'material-ui/TextField';
import { setMuiComponentAndMaybeFocus } from './utils';

const FormsyText = React.createClass({

  propTypes: {
    defaultValue: React.PropTypes.any,
    name: React.PropTypes.string.isRequired,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    value: React.PropTypes.any,
  },

  mixins: [Formsy.Mixin],

  controlledValue(props = this.props) {
    return props.value || props.defaultValue || '';
  },

  getInitialState() {
    const value = this.controlledValue();
    return { value };
  },

  componentWillMount() {
    const value = this.controlledValue();
    this.setValue(value);
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value || nextProps.defaultValue !== this.props.defaultValue) {
      const value = this.controlledValue(nextProps);
      this.setValue(value);
      this.setState({ value });
    }
  },
  
  componentWillReceiveProps(props) {
    this.setState({ value: this.getValue() || '' });
  },

  handleBlur: function handleBlur(event) {
    this.setValue(event.currentTarget.value);
    if (this.props.onBlur) this.props.onBlur(event);
  },

  handleChange: function handleChange(event) {
    this.setState({
      value: event.currentTarget.value,
    });
    if (this.props.onChange) this.props.onChange(event);
  },

  handleKeyDown: function handleKeyDown(event) {
    if (keycode(event) === 'enter') this.setValue(event.currentTarget.value);
    if (this.props.onKeyDown) this.props.onKeyDown(event, event.currentTarget.value);
  },

  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,

  render() {
    const {
      defaultValue, // eslint-disable-line no-unused-vars
      onFocus,
      value, // eslint-disable-line no-unused-vars
      ...rest } = this.props;
    return (
      <TextField
        {...rest}
        errorText={this.getErrorMessage()}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onFocus={onFocus}
        onKeyDown={this.handleKeyDown}
        ref={this.setMuiComponentAndMaybeFocus}
        value={this.state.value}
      />
    );
  },
});

export default FormsyText;
