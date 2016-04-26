import React from 'react';
import Formsy from 'formsy-react';
import DatePicker from 'material-ui/DatePicker';
import {_setMuiComponentAndMaybeFocus} from './utils';

const FormsyDate = React.createClass({
  mixins: [Formsy.Mixin],

  propTypes: {
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    value: React.PropTypes.object,
  },
  
  componentDidMount: function() {
    const {defaultDate} = this.props;
    let value = this.getValue();

    if (typeof value === 'undefined' && typeof defaultDate !== 'undefined') {
      this.setValue(defaultDate);
    }
  },

  handleChange: function (event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },

  _setMuiComponentAndMaybeFocus: _setMuiComponentAndMaybeFocus,

  render: function () {
    const {defaultDate, ...rest} = this.props;
    
    return (
      <DatePicker
        {...rest}
        errorText={this.getErrorMessage()}
        onChange={this.handleChange}
        ref={this._setMuiComponentAndMaybeFocus}
        value={this.getValue()}
      />
    );
  }
});

export default FormsyDate;
