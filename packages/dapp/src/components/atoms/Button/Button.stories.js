import '../../_settings/_base.scss'
import { select, text, withKnobs } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import Button, { BUTTON_TYPES } from './Button'
import React from 'react'

const testFunction = () => console.log('button got clicked!')

storiesOf('Atoms/Button', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Button
      appearance={select('Button type', BUTTON_TYPES)}
      onClick={testFunction}
    >
      {text('button text', 'example button')}
    </Button>
  ))
