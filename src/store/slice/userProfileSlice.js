import { createSlice } from "@reduxjs/toolkit";

const initProfile = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNum: "",
  userName: "",
  password: "",
  userGroup: null,
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: initProfile,
  reducers: {
    setUserProfile: (state, action) => {
      const { payload } = action;
      return payload;
    },
    resetUserProfile: (state) => {
      return initProfile;
    },
  },
});

export const { setUserProfile, resetUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;
