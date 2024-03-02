import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    user: {
        uid?: string;
        profileUrl?: string;
    };
}

const initialState: UserState = {
    user: {}
};

export const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<{ uid: string, profileUrl: string }>) => {
            state.user.uid = action.payload.uid;
            state.user.profileUrl = action.payload.profileUrl;
        },
        removeUser: (state) => {
            state.user = {};
        }
    }
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
