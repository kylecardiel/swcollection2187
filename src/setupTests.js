import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-canvas-mock';

Enzyme.configure({ adapter: new Adapter() });

global.shallow = shallow;
global.mount = mount;