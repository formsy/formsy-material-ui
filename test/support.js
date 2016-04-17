import { mount } from 'enzyme'
import { Form } from 'formsy-react'

export const mountTestForm = (childrenFn, formProps={}) => {
  class TestForm extends React.Component {
    render () {
      return (
        <Form {...this.props}>
          {childrenFn()}
        </Form>
      )
    }
  }

  const formWrapper = mount(<TestForm {...formProps} />);
  return formWrapper
}
