import { createReducer } from '@reduxjs/toolkit'

import {
  resetSettings,
  setGasPrice,
  setMaxSlippage,
  setTransactionDeadline,
  toggleExpertMode,
  toggleMultihop,
  toggleShowDetails,
} from './actions'

export enum GasPrice {
  CUSTOM = 0,
  FAST = 155,
  TRADER = 175,
  DEFAULT = 175,
}

export enum MaxSlippage {
  CUSTOM = 0,
  P01 = 0.1,
  P05 = 0.5,
  DEFAULT = 0.5,
}

export interface Settings {
  gasPrice: [GasPrice, number?]
  maxSlippage: [MaxSlippage, number?]
  transactionDeadline: number
  expertMode: boolean
  multihop: boolean
}

export interface SwapState extends Settings {
  showDetails: boolean
}

const initialSettings: Settings = {
  gasPrice: [GasPrice.DEFAULT],
  maxSlippage: [MaxSlippage.DEFAULT],
  transactionDeadline: 40,
  expertMode: false,
  multihop: true,
}

export const initialState: SwapState = {
  showDetails: false,
  ...initialSettings,
}

export default createReducer<SwapState>(initialState, (builder) =>
  builder
    .addCase(toggleShowDetails, (state) => {
      state.showDetails = !state.showDetails
    })
    .addCase(resetSettings, (state) => ({ ...state, ...initialSettings }))
    .addCase(setGasPrice, (state, { payload }) => {
      if (payload.length === 1) {
        state.gasPrice[0] = payload[0]
      } else {
        state.gasPrice = payload
      }

      // prevent invalid state
      const [value, custom] = state.gasPrice
      if ((value || custom) === undefined) {
        state.gasPrice = [GasPrice.DEFAULT]
      }
    })
    .addCase(setMaxSlippage, (state, { payload }) => {
      if (payload.length === 1) {
        state.maxSlippage[0] = payload[0]
      } else {
        state.maxSlippage = payload
      }

      // prevent invalid state
      const [value, custom] = state.maxSlippage
      if ((value || custom) === undefined) {
        state.maxSlippage = [MaxSlippage.DEFAULT]
      }
    })
    .addCase(setTransactionDeadline, (state, { payload: value }) => {
      state.transactionDeadline = value
    })
    .addCase(toggleExpertMode, (state) => {
      state.expertMode = !state.expertMode
    })
    .addCase(toggleMultihop, (state) => {
      state.multihop = !state.multihop
    })
)
