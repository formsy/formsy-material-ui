import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { Form } from 'formsy-react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { mount } from 'enzyme';

import FormsyText from '../src/FormsyText';

// @ts-ignore
import { mountTestForm } from './support';

function makeChildrenFn(props) {
  const fn = () => (
    <FormsyText
      ref="text"
      name="text"
      validations="maxLength:10"
      validationErrors={{ maxLength: 'Text is too long' }}
      {...props}
    />
  );
  fn.DisplayName = 'FormsyText';
  return fn;
}

const setup = (props = {}) => {
  const childrenFn = makeChildrenFn(props);
  const formWrapper = mountTestForm(childrenFn);
  const formsyTextWrapper = formWrapper.find(FormsyText);
  return {
    formWrapper,
    formsyTextWrapper,
  };
};

interface ITestFormProps {
  defaultValue?: string;
  value?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

class TestForm extends Component<ITestFormProps> {
  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  static propTypes = {
    children: PropTypes.node,
    defaultValue: PropTypes.string,
    value: PropTypes.string,
  };

  getChildContext() {
    return { muiTheme: getMuiTheme() };
  }

  componentWillMount() {
    const { value, defaultValue } = this.props;
    this.state = { value, defaultValue };
  }

  render() {
    const { value, defaultValue, children, ...extraProps } = {
      ...this.props,
      ...this.state,
    };
    return (
      <Form {...extraProps}>
        {children ? children : <FormsyText ref="text" name="text" value={value} defaultValue={defaultValue} />}
      </Form>
    );
  }
}

function makeTestParent(props) {
  const parent = mount(<TestForm {...props} />);
  const formWrapper = parent.find(Form);
  const formsyTextWrapper = parent.find(FormsyText);
  return { parent, formWrapper, formsyTextWrapper };
}

const getFormInstance = (wrapper): any => {
  return wrapper.find(Form).instance();
};

const getInputInstance = (wrapper): any => {
  return wrapper.find('input').instance();
};

const fillInText = (wrapper, value) => {
  const input = wrapper.find('input').first();
  input.simulate('focus');
  input.instance().value = value;
  input.simulate('blur');
};

describe('FormsyText', () => {
  it('renders a material-ui TextField', () => {
    const { formsyTextWrapper } = setup();
    expect(formsyTextWrapper.exists(TextField)).toEqual(true);
  });

  it('sends input to the form', () => {
    const { formsyTextWrapper, formWrapper } = setup();
    fillInText(formsyTextWrapper, 'some text');
    const formsyForm = getFormInstance(formWrapper);
    const formValues = formsyForm.getCurrentValues();
    expect(formValues.text).toEqual('some text');
  });

  it('renders validation information', () => {
    const { formsyTextWrapper, formWrapper } = setup();

    expect(formsyTextWrapper.text()).not.toContain('Text is too long');

    const formsyForm = getFormInstance(formWrapper);
    fillInText(formsyTextWrapper, 'toooooooo loooooong');
    formsyForm.validateForm();
    expect(formsyTextWrapper.text()).toContain('Text is too long');

    fillInText(formsyTextWrapper, 'just fine');
    formsyForm.validateForm();
    expect(formsyTextWrapper.text()).not.toContain('Text is too long');
  });

  describe('value properties handle', () => {
    describe('initial', () => {
      it('value', () => {
        const { formsyTextWrapper, formWrapper } = setup({
          value: 'VALUE',
        });
        const formsyForm = getFormInstance(formWrapper);
        let formValues = formsyForm.getCurrentValues();
        expect(formValues.text).toEqual('VALUE');
        fillInText(formsyTextWrapper, 'some text');
        formValues = formsyForm.getCurrentValues();
        expect(formValues.text).toEqual('some text');
      });

      it('defaultValue', () => {
        const { formsyTextWrapper, formWrapper } = setup({
          defaultValue: 'DEFAULT-VALUE',
        });
        const formsyForm = getFormInstance(formWrapper);
        let formValues = formsyForm.getCurrentValues();
        expect(formValues.text).toEqual('DEFAULT-VALUE');
        fillInText(formsyTextWrapper, 'some text');
        formValues = formsyForm.getCurrentValues();
        expect(formValues.text).toEqual('some text');
      });

      it('value + defaultValue', () => {
        const { formsyTextWrapper, formWrapper } = setup({
          value: 'VALUE',
          defaultValue: 'DEFAULT-VALUE',
        });
        const formsyForm = getFormInstance(formWrapper);
        let formValues = formsyForm.getCurrentValues();
        expect(formValues.text).toEqual('VALUE');
        fillInText(formsyTextWrapper, 'some text');
        formValues = formsyForm.getCurrentValues();
        expect(formValues.text).toEqual('some text');
      });

      it('propagates disabled status', () => {
        const wrapper = mount(
          <TestForm disabled={true}>
            <FormsyText name="text" />
          </TestForm>,
        );

        const inputDOM = getInputInstance(wrapper);
        expect(inputDOM.disabled).toEqual(true);

        // Next, we set `disabled` to false and check the DOM node updates accordingly
        wrapper.setProps({
          disabled: false,
        });
        expect(inputDOM.disabled).toEqual(false);
      });

      it('allows overriding disabled status locally', () => {
        let wrapper = mount(
          <TestForm disabled={true}>
            <FormsyText name="text" disabled={false} />
          </TestForm>,
        );

        // Here we check we can disable a single input in a globally enabled form
        let inputDOM = getInputInstance(wrapper);
        expect(inputDOM.disabled).toEqual(false);

        wrapper = mount(
          <TestForm disabled={false}>
            <FormsyText name="text" disabled={true} />
          </TestForm>,
        );

        // Likewise, we are able to keep a specific input enabled even if the form is marked as disabled
        inputDOM = getInputInstance(wrapper);
        expect(inputDOM.disabled).toEqual(true);
      });
    });

    describe('updating', () => {
      it('value', () => {
        const props = {
          value: 'VALUE',
        };
        const { parent, formWrapper, formsyTextWrapper } = makeTestParent(props);
        const formsyForm = getFormInstance(formWrapper);
        parent.setState({ value: 'NEW VALUE' });
        let formValues = formsyForm.getCurrentValues();
        expect(formValues.text).toEqual('NEW VALUE');
        fillInText(formsyTextWrapper, 'some text');
        formValues = formsyForm.getCurrentValues();
        expect(formValues.text).toEqual('some text');
        parent.setState({ value: 'NEWER VALUE' });
        formValues = formsyForm.getCurrentValues();
        expect(formValues.text).toEqual('NEWER VALUE');
      });

      it('defaultValue', () => {
        const props = {
          defaultValue: 'VALUE',
        };
        const { parent, formWrapper, formsyTextWrapper } = makeTestParent(props);
        const formsyForm = getFormInstance(formWrapper);
        parent.setState({ defaultValue: 'NEW VALUE' });
        let formValues = formsyForm.getCurrentValues();
        expect(formValues.text).toEqual('NEW VALUE');
        fillInText(formsyTextWrapper, 'some text');
        formValues = formsyForm.getCurrentValues();
        expect(formValues.text).toEqual('some text');
        parent.setState({ defaultValue: 'NEWER VALUE' });
        // defaultValues does not override the typed in value.
        formValues = formsyForm.getCurrentValues();
        expect(formValues.text).toEqual('some text');
      });

      it('calls onChange once per text update', () => {
        const calls = [];
        const { parent, formsyTextWrapper } = makeTestParent({
          onChange: (...args) => calls.push(args),
          value: 'initial',
        });

        const inputDOM = getInputInstance(formsyTextWrapper);
        inputDOM.value = 'updated';
        parent.setState({ value: 'updated' });

        expect(calls.length < 3).toEqual(true);
      });
    });

    describe('resetting to', () => {
      it('value', () => {
        const { formsyTextWrapper, formWrapper } = setup({
          value: 'VALUE',
        });
        const formsyForm = getFormInstance(formWrapper);
        fillInText(formsyTextWrapper, 'some text');
        formsyForm.reset();
        const formValues = formsyForm.getCurrentValues();
        expect(formValues.text).toEqual('VALUE');
      });

      it('defaultValue', () => {
        const { formsyTextWrapper, formWrapper } = setup({
          defaultValue: 'VALUE',
        });
        const formsyForm = getFormInstance(formWrapper);
        fillInText(formsyTextWrapper, 'some text');
        formsyForm.reset();
        const formValues = formsyForm.getCurrentValues();
        expect(formValues.text).toEqual('VALUE');
      });

      it('value + defaultValue', () => {
        const { formsyTextWrapper, formWrapper } = setup({
          value: 'VALUE',
          defaultValue: 'DEFAULT-VALUE',
        });
        const formsyForm = getFormInstance(formWrapper);
        fillInText(formsyTextWrapper, 'some text');
        formsyForm.reset();
        const formValues = formsyForm.getCurrentValues();
        expect(formValues.text).toEqual('VALUE');
      });

      it('updated value', () => {
        const props = {
          value: 'VALUE',
        };
        const { parent, formWrapper, formsyTextWrapper } = makeTestParent(props);
        const formsyForm = getFormInstance(formWrapper);
        parent.setState({ value: 'NEW VALUE' });
        fillInText(formsyTextWrapper, 'some text');
        formsyForm.reset();
        // Reset reverts to the last value that has been set.
        const formValues = formsyForm.getCurrentValues();
        expect(formValues.text).toEqual('NEW VALUE');
      });
    });

    describe('with convertValue', () => {
      it('converts to number', () => {
        const { formsyTextWrapper, formWrapper } = setup({
          value: 1,
          type: 'number',
          convertValue: v => Number(v),
        });
        const formsyForm = getFormInstance(formWrapper);
        let formValues = formsyForm.getCurrentValues();
        expect(formValues.text).toEqual(1);
        fillInText(formsyTextWrapper, '2');
        formValues = formsyForm.getCurrentValues();
        expect(formValues.text).toEqual(2);
      });

      it('and defaultValue', () => {
        const { formWrapper } = setup({
          defaultValue: 1,
          type: 'number',
          convertValue: v => Number(v),
        });
        const formsyForm = getFormInstance(formWrapper);
        const formValues = formsyForm.getCurrentValues();
        expect(formValues.text).toEqual(1);
      });

      it('and no value', () => {
        const { formWrapper } = setup({
          type: 'number',
          convertValue: v => Number(v),
        });
        const formsyForm = getFormInstance(formWrapper);
        const formValues = formsyForm.getCurrentValues();
        expect(formValues.text).toEqual(0);
      });
    });
  });
});
