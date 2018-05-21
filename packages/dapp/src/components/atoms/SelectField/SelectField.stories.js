import '../../_settings/_base.scss'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'
import React from 'react'
import SelectField from './SelectField'

const itemList = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6']

storiesOf('Atoms/SelectField', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <SelectField
      items={itemList}
      placeholder={'placeholder'}
      id={'0'}
      onChange={() => 'changed!'}
    />
  ))
