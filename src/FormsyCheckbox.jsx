import React from 'react';
import Formsy from 'formsy-react';
import Checkbox from 'material-ui/lib/checkbox';

let FormsyCheckbox = React.createClass({
  mixins: [ Formsy.Mixin ],

  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  handleValueChange: function (event, value) {
    this.setValue(value);
  },

  componentDidMount: function () {
    this.setValue(this._checkbox.isChecked());
  },

  render: function () {
    return (
      <Checkbox
        {...this.props}
        ref={(c) => this._checkbox = c}
        onCheck={this.handleValueChange}
        checked={this.getValue()}
      />
    );
  }
});

module.exports = FormsyCheckbox;
