import { configureStore } from '@reduxjs/toolkit';
import notificationreducer from './notificationreducer';




const store = configureStore({
    reducer: {
        notification: notificationreducer
    },
});

export default store;