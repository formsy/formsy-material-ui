import React from 'react';
import Formsy from 'formsy-react';
import SelectField from 'material-ui/SelectField';
import { setMuiComponentAndMaybeFocus } from './utils';

const FormsySelect = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    validationError: React.PropTypes.string,
    validationErrors: React.PropTypes.object,
    validations: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
    value: React.PropTypes.any,
  },

  mixins: [Formsy.Mixin],

  getInitialState() {
    return {
      hasChanged: false,
    };
  },

  handleChange(event, index, value) {
    this.setValue(value);

    this.setState({
      hasChanged: value !== '',
    });

    if (this.props.onChange) this.props.onChange(event, value, index);
  },

  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,

  render() {
    let { value } = this.props;

    const { validations, // eslint-disable-line no-unused-vars
        validationError, // eslint-disable-line no-unused-vars
        validationErrors, // eslint-disable-line no-unused-vars
      ...rest } = this.props;

    value = this.state.hasChanged ? this.getValue() : value;

    return (
      <SelectField
        {...rest}
        errorText={this.getErrorMessage()}
        onChange={this.handleChange}
        ref={this.setMuiComponentAndMaybeFocus}
        value={value}
      >
        {this.props.children}
      </SelectField>
    );
  },
});

export default FormsySelect;
