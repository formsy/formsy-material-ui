import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import Checkbox from 'material-ui/Checkbox';
import { setMuiComponentAndMaybeFocus } from './utils';

const FormsyCheckbox = createClass({
  propTypes: {
    defaultChecked: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    validationError: PropTypes.string,
    validationErrors: PropTypes.object,
    validations: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  },

  mixins: [Formsy.Mixin],

  componentDidMount() {
    this.setValue(this.muiComponent.isChecked());
  },

  handleChange(event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },

  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,

  render() {
    const {
      defaultChecked, // eslint-disable-line no-unused-vars
      validations, // eslint-disable-line no-unused-vars
      validationErrors, // eslint-disable-line no-unused-vars
      validationError, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;
    let value = this.getValue();

    if (typeof value === 'undefined') {
      value = typeof defaultChecked !== 'undefined' ? defaultChecked : false;
    }
    return (
      <Checkbox
        disabled={this.isFormDisabled()}
        {...rest}
        checked={value}
        onCheck={this.handleChange}
        ref={this.setMuiComponentAndMaybeFocus}
      />
    );
  },
});

export default FormsyCheckbox;
