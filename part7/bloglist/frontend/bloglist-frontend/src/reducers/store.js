import { configureStore } from '@reduxjs/toolkit';
import notificationreducer from './notificationreducer';
import blogReducer from './blogReducer';




const store = configureStore({
    reducer: {
        blogs: blogReducer,
        notification: notificationreducer
    },
});

export default store;