import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HOC } from 'formsy-react';
import Checkbox from 'material-ui/Checkbox';
import { setMuiComponentAndMaybeFocus } from './utils';


class FormsyCheckbox extends Component {
  componentDidMount() {
    this.setValue(this.muiComponent.isChecked());
  }

  setValue = this.props.setValue;

  handleChange = (event, value) => {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  }

  render() {
    const {
      defaultChecked, // eslint-disable-line no-unused-vars
      isFormDisabled,
      validations, // eslint-disable-line no-unused-vars
      validationErrors, // eslint-disable-line no-unused-vars
      validationError, // eslint-disable-line no-unused-vars
      ...rest } = this.props;
    let value = this.props.getValue();

    if (typeof value === 'undefined') {
      value = (typeof defaultChecked !== 'undefined') ? defaultChecked : false;
    }
    return (
      <Checkbox
        disabled={isFormDisabled()}
        checked={value}
        onCheck={this.handleChange}
        ref={setMuiComponentAndMaybeFocus}
        {...rest}
      />
    );
  }
}

FormsyCheckbox.propTypes = {
  defaultChecked: PropTypes.bool,
  getValue: PropTypes.func.isRequired,
  isFormDisabled: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  setValue: PropTypes.func.isRequired,
  validationError: PropTypes.string,
  validationErrors: PropTypes.object,
  validations: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default HOC(FormsyCheckbox);
