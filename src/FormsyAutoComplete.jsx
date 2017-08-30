import React, { Component } from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import { HOC } from 'formsy-react';
import AutoComplete from 'material-ui/AutoComplete';
import { setMuiComponentAndMaybeFocus } from 'formsy-react/src/utils';

class FormsyAutoComplete extends Component {
  constructor(props) {
    super(props);
    const { defaultValue, value } = props;
    this.state = {
      value: defaultValue || value || '',
    };
  }

  componentWillMount() {
    this.setValue(this.props.defaultValue || this.props.value || '');
  }

  setValue = this.props.setValue;

  handleBlur = (event) => {
    this.setValue(event.currentTarget.value);
    if (this.props.onChange) this.props.onChange(event);
  }

  handleChange = (event) => {
    this.setState({
      value: event.currentTarget.value,
    });
    if (this.props.onChange) this.props.onChange(null, event.currentTarget.value);
  }

  handleUpdateInput = (value) => {
    this.setState({
      value,
    });
    if (this.props.onChange) this.props.onChange(null, value);
  }

  handleKeyDown = (event) => {
    if (keycode(event) === 'enter') this.setValue(event.currentTarget.value);
    if (this.props.onKeyDown) this.props.onKeyDown(event, event.currentTarget.value);
  }

  render() {
    const {
      defaultValue, // eslint-disable-line no-unused-vars
      onFocus,
      value, // eslint-disable-line no-unused-vars
      validations, // eslint-disable-line no-unused-vars
      validationError, // eslint-disable-line no-unused-vars
      validationErrors, // eslint-disable-line no-unused-vars
      isFormDisabled,
      getErrorMessage,
      ...rest } = this.props;
    return (
      <AutoComplete
        disabled={isFormDisabled()}
        errorText={getErrorMessage()}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onUpdateInput={this.handleUpdateInput}
        onFocus={onFocus}
        onKeyDown={this.handleKeyDown}
        ref={setMuiComponentAndMaybeFocus}
        value={this.state.value}
        {...rest}
      />
    );
  }
}

FormsyAutoComplete.propTypes = {
  defaultValue: PropTypes.any,
  getErrorMessage: PropTypes.func.isRequired,
  isFormDisabled: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  setValue: PropTypes.func.isRequired,
  validationError: PropTypes.string,
  validationErrors: PropTypes.object,
  validations: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  value: PropTypes.any,
};

export default HOC(FormsyAutoComplete);
