import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userInformation: (state, action) => {
            state.userInfo = action.payload;
        },
        userInfoRemove: (state) => {
            state.userInfo = null;
        },
    },
});

export const { userInformation, userInfoRemove } = userSlice.actions;
export default userSlice.reducer;