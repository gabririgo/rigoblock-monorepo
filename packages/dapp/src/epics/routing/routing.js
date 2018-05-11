import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/mergeMap'
import { LOCATION_CHANGE } from 'react-router-redux'
import { actionTypes } from '../../constants/action-types'
import { empty } from 'rxjs/observable/empty'
import { merge } from 'rxjs/observable/merge'
import { of } from 'rxjs/observable/of'
import ROUTES from '../../constants/routes'
import routerActions from '../../actions/router-actions'

export const logoutEpic = (action$, store) => {
  const action$1 = action$
    .filter(
      action =>
        action.type === LOCATION_CHANGE ||
        action.type === actionTypes.GLOBAL_INIT
    )
    .mergeMap(() => {
      const state = store.getState()
      return !state.blockChain.account &&
        window.location.pathname !== ROUTES.LOGIN
        ? of(routerActions.logout())
        : empty()
    })

  const action$2 = action$
    .filter(
      action =>
        action.type === actionTypes.LOGGED_OUT ||
        action.type === actionTypes.BLOCKCHAIN_ERROR
    )
    .mergeMap(() => of(routerActions.logout()))

  return merge(action$1, action$2)
}

export const loginEpic = action$ => {
  return action$
    .filter(action => action.type === actionTypes.LOGGED_IN)
    .mergeMap(() => {
      return window.location.pathname === ROUTES.LOGIN
        ? of(routerActions.login())
        : empty()
    })
}

export default [logoutEpic, loginEpic]