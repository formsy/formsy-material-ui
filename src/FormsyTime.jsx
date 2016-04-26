import React from 'react';
import Formsy from 'formsy-react';
import TimePicker from 'material-ui/TimePicker';
import {_setMuiComponentAndMaybeFocus} from './utils';

let FormsyTime = React.createClass({
  mixins: [Formsy.Mixin],

  propTypes: {
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    value: React.PropTypes.object,
  },

  componentDidMount: function() {
    const {defaultTime} = this.props;
    let value = this.getValue();

    if (typeof value === 'undefined' && typeof defaultTime !== 'undefined') {
      this.setValue(defaultTime);
    }
  },
  
  handleChange: function (event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },

  _setMuiComponentAndMaybeFocus: _setMuiComponentAndMaybeFocus,

  render: function () {
    const {defaultTime, ...rest} = this.props;

    return (
      <TimePicker
        {...rest}
        errorText={this.getErrorMessage()}
        onChange={this.handleChange}
        ref={this._setMuiComponentAndMaybeFocus}
        value={this.getValue()}
      />
    );
  }
});

export default FormsyTime;
