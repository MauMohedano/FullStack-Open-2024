import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification(state, action) {
            return action.payload;
        },
        clearNotification() {
            return null;
        },
    },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const showNotification = (message, type, time = 3) => {
    return dispatch => {
        dispatch(setNotification({message, type}))
        setTimeout(() => {
            dispatch(clearNotification())
        }, time * 1000)
    }
}

export default notificationSlice.reducer;