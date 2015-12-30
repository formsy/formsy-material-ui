import React              from 'react';
import Formsy             from 'formsy-react';
import TimePicker         from 'material-ui/lib/time-picker/time-picker';
import FormComponentMixin from './FormComponentMixin';

export default React.createClass({
  mixins: [ Formsy.Mixin, FormComponentMixin ],

  render: function () {
    return (
      <TimePicker
        {...this.props}
        onChange={this.handleValueChange} />
    );
  }
});