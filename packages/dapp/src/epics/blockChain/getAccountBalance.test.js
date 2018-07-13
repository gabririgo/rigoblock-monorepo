import { ActionsObservable } from 'redux-observable'
import { ETH_TO_WEI } from '../../constants/utils'
import { TestScheduler } from 'rxjs'
import { VAULT } from '../../constants/blockchain'
import { of } from 'rxjs/observable/of'
import blockChainActions from '../../actions/blockchain-actions'

describe('getAccountBalanceEpic', () => {
  const owner = '0x242B2Dd21e7E1a2b2516d0A3a06b58e2D9BF9196'
  const otherAccount = '0x8BB7481495D45CCD5CFFAE1C3A84155FEA85A323'
  const getBalanceSpy = jest.fn()
  const apiMock = {
    web3: {
      _web3: {
        fromWei: val => val / ETH_TO_WEI
      },
      getBalanceInWeiAsync: getBalanceSpy
    }
  }
  const vaultEvent = {
    address: '0x001',
    args: {
      vault: '0xc1Eba7b6F9f06E4491a499E653878464e40AB70e',
      from: owner,
      to: '0x005',
      amount: '1',
      revenue: '1'
    },
    event: 'BuyVault'
  }

  let getAccountBalanceEpic
  let fromPromiseSpy

  beforeEach(() => {
    jest.resetModules()
    fromPromiseSpy = jest.fn()
    jest.doMock('../../api', () => apiMock)
    jest.doMock('rxjs/observable/fromPromise', () => ({
      fromPromise: fromPromiseSpy
    }))
    getAccountBalanceEpic = require('./getAccountBalance').getAccountBalanceEpic
  })

  it('dispatches an updateAccountBalance action upon user login', () => {
    fromPromiseSpy.mockReturnValueOnce(of('25999999999952600000'))
    const inputValues = {
      a: blockChainActions.blockChainLogIn('metamask', owner)
    }
    const expectedValues = {
      b: blockChainActions.updateAccountBalance(owner, '25999999999952600000')
    }

    const inputMarble = 'a'
    const expectedMarble = 'b'

    const ts = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })

    const action$ = new ActionsObservable(
      ts.createHotObservable(inputMarble, inputValues)
    )
    const outputAction = getAccountBalanceEpic(action$, null, ts)

    ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)
    ts.flush()
  })

  it('dispatches an updateAccountBalance action if we register a block which interests the current account', () => {
    fromPromiseSpy.mockReturnValueOnce(of('10000000000000000000'))
    const inputAction = blockChainActions.registerBlock(
      owner,
      VAULT,
      vaultEvent
    )

    const inputValues = {
      a: inputAction
    }
    const expectedValues = {
      b: blockChainActions.updateAccountBalance(owner, '10000000000000000000')
    }

    const inputMarble = 'a'
    const expectedMarble = addTimeFrames(50, 'b')

    const ts = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })

    const action$ = new ActionsObservable(
      ts.createHotObservable(inputMarble, inputValues)
    )
    const outputAction = getAccountBalanceEpic(action$, null, ts)

    ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)

    ts.maxFrames = 2000

    ts.flush()
  })

  it('dispatches the action after emissions stopped for 500ms, only taking last received value', () => {
    fromPromiseSpy
      .mockReturnValueOnce(of('10000000000000000000'))
      .mockReturnValueOnce(of('20000000000000000000'))

    const inputAction = blockChainActions.registerBlock(
      owner,
      VAULT,
      vaultEvent
    )
    const inputValues = {
      a: inputAction
    }
    const expectedValues = {
      a: blockChainActions.updateAccountBalance(owner, '10000000000000000000'),
      b: blockChainActions.updateAccountBalance(owner, '20000000000000000000')
    }

    const inputMarble = 'a' + addTimeFrames(50) + 'aaaaa'

    const expectedMarble = addTimeFrames(50, 'a') + addTimeFrames(54, 'b')

    const ts = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })

    const action$ = new ActionsObservable(
      ts.createHotObservable(inputMarble, inputValues)
    )
    const outputAction = getAccountBalanceEpic(action$, null, ts)

    ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)

    ts.maxFrames = 2000

    ts.flush()
  })

  it('dispatches multiple actions if we receive multiple registration for different accounts', () => {
    fromPromiseSpy
      .mockReturnValueOnce(of('10000000000000000000'))
      .mockReturnValueOnce(of('15000000000000000000'))
      .mockReturnValueOnce(of('20000000000000000000'))
      .mockReturnValueOnce(of('25000000000000000000'))

    const inputAction1 = blockChainActions.registerBlock(
      owner,
      VAULT,
      vaultEvent
    )
    const inputAction2 = blockChainActions.registerBlock(
      otherAccount,
      VAULT,
      vaultEvent
    )
    const inputValues = {
      a: inputAction1,
      b: inputAction2
    }
    const expectedValues = {
      a: blockChainActions.updateAccountBalance(owner, '10000000000000000000'),
      b: blockChainActions.updateAccountBalance(owner, '20000000000000000000'),
      c: blockChainActions.updateAccountBalance(
        otherAccount,
        '15000000000000000000'
      ),
      d: blockChainActions.updateAccountBalance(
        otherAccount,
        '25000000000000000000'
      )
    }

    const inputMarble = '(ab)' + addTimeFrames(50) + 'aaaaabbbbb'

    const expectedMarble =
      addTimeFrames(50, '(ac)') + addTimeFrames(54, 'b----d')

    const ts = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })

    const action$ = new ActionsObservable(
      ts.createHotObservable(inputMarble, inputValues)
    )
    const outputAction = getAccountBalanceEpic(action$, null, ts)

    ts.expectObservable(outputAction).toBe(expectedMarble, expectedValues)

    ts.maxFrames = 2000

    ts.flush()
  })
})
