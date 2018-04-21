import React from 'react'
import PropTypes from 'prop-types'
import './ItemName.scss'

const ItemName = ({ symbol, name }) => {
  return (
    <div>
      <span className="item-symbol">{symbol}</span>
      <span className="item-name">{name}</span>
    </div>
  )
}

ItemName.propTypes = {
  name: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired
}

export default ItemName