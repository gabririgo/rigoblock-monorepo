import { shallow } from 'enzyme'
import Amount from './Amount.jsx'
import toJson from 'enzyme-to-json'

const props = { value: 8000.23, symbol: 'ETH' }

describe('Amount component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(Amount, props)))
    ).toMatchSnapshot()
  })
})
