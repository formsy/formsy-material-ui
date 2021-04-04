import 'core-js/stable';
import 'regenerator-runtime/runtime';

import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new Adapter() });
