import { createSlice } from "@reduxjs/toolkit";

export const tootSlice = createSlice({
  name: "allToots",
  initialState: {
    value: [],
    newest: [],
    oldest: [],
    loading: false,
    loginToken: null,
    myServerURL: null,
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
    setToken: (state, action) => {
      state.loginToken = action.payload;
      // Avoid accidentally setting code to "null" string
      if (state.loginToken == null) {
        localStorage.removeItem("Fedicode");
      } else {
        localStorage.setItem("Fedicode", state.loginToken);
      }
    },
    clearToken: (state) => {
      state.loginToken = null;
      localStorage.removeItem("Fedicode");
    },
    setMyServerURL: (state, action) => {
      state.myServerURL = action.payload;
      console.log("setMyServerURL", state.myServerURL);
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
  setToken,
  clearToken,
  setMyServerURL,
} = tootSlice.actions;
export default tootSlice.reducer;
