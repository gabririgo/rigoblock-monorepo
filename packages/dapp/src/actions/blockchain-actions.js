import { actionTypes } from '../constants/action-types'

export default {
  blockChainInit: () => ({
    type: actionTypes.BLOCKCHAIN_INIT
  }),
  blockChainError: err => ({
    type: actionTypes.BLOCKCHAIN_ERROR,
    payload: err.toString()
  }),
  blockChainLogIn: account => ({
    type: actionTypes.LOGGED_IN,
    payload: account
  }),
  blockChainLogout: () => ({
    type: actionTypes.LOGGED_OUT
  })
}