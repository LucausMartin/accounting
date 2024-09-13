import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { AccountType } from '../../types';

interface AccountSliceType {
  value: AccountType | null;
}

const initialState: AccountSliceType = {
  value: null
};

export const accountSlice = createSlice({
  name: 'accounter',
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { setAccount } = accountSlice.actions;
export const selectAccount = (state: RootState) => state.accounter.value;
export default accountSlice.reducer;
