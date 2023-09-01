import { createSlice } from "@reduxjs/toolkit";

export const tootSlice = createSlice({
  name: "allToots",
  initialState: {
    value: [],
    newest: [],
    oldest: [],
    loading: false,
    authAppData: null,
    authUserData: null,
    authURL: null,
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
      state.oldest.push(action.payload);
    },
    cleanOldest: (state, action) => {
      state.oldest = state.oldest.filter((e) => e !== action.payload);
    },
    seeToot: (state, action) => {
      state.seenToots.push(action.payload);
    },
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    setAuthUserData: (state, action) => {
      state.authUserData = action.payload;
      const j = JSON.stringify(action.payload, null, 2)
      localStorage.setItem("FediUser", j);
    },
    setAuthAppData: (state, action) => {
      state.authAppData = action.payload;
      console.log("setAuthAppData", action.payload);
      const j = JSON.stringify(action.payload, null, 2)
      localStorage.setItem("FediApp", j);
      console.log("setAuthAppData2", localStorage.getItem("FediApp"));
    },
    clearAuthData: (state) => {
      state.authUserData = null;
      state.authAppData = null;
      localStorage.removeItem("FediUser");
      localStorage.removeItem("FediApp");
    },
  },
});
export const {
  addToots,
  updateNewest,
  updateOldest,
  seeToot,
  cleanOldest,
  startLoading,
  stopLoading,
  setAuthUserData,
  setAuthAppData,
  clearAuthData,
} = tootSlice.actions;
export default tootSlice.reducer;
