import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ListPanel from './ListPanel.jsx'

const props = {
  title: 'ListPanel Component',
  items: [
    {
      id: 1,
      name: 'Rocksolid Vault',
      symbol: 'VLT',
      value: 12489.51323
    }
  ]
}

describe('ListPanel component', () => {
  it('renders correctly', () => {
    expect(
      toJson(shallow(createComponentWithProps(ListPanel, props)))
    ).toMatchSnapshot()
  })
})