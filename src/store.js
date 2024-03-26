import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./component/autoflexSlice";



export default configureStore({
    reducer: rootReducer
})