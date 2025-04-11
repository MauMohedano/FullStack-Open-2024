import { configureStore } from '@reduxjs/toolkit';
import notificationreducer from './notificationreducer';
import blogReducer from './blogReducer';
import userReducer from 'react';




const store = configureStore({
    reducer: {
        blogs: blogReducer,
        user: userReducer,
        notification: notificationreducer
    },
});

export default store;