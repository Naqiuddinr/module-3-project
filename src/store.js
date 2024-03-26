import { configureStore } from "@reduxjs/toolkit";
import autoflexReducer from './component/autoflexSlice'


export default configureStore({
    reducer: {
        bookings: autoflexReducer,
    }
})