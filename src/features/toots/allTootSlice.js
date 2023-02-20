import { createSlice } from '@reduxjs/toolkit';

export const tootSlice = createSlice({
  name: 'allToots',
  initialState: {
    value: [],
    newest: null,
    oldest: null,
  },
  reducers: {
    addToots: (state, action) => {
      state.value = [
        ...new Map(
          state.value
            .concat(action.payload)
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((t) => [t[`id`], t])
        ).values(),
      ];
    },
    updateNewest: (state, action) => {
      state.newest = { ...state.newest, ...action.payload };
    },
    updateOldest: (state, action) => {
      state.oldest = { ...state.oldest, ...action.payload };
    },
  },
});
export const { addToots, updateNewest, updateOldest } = tootSlice.actions;
export default tootSlice.reducer;
