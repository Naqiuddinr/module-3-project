import { combineReducers, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = 'https://f83c5890-a46c-48d4-ac93-9163a3f59c3f-00-1g1snjyottvwx.kirk.replit.dev';

//ASYNC THUNK FOR CARS

export const fetchAllCar = createAsyncThunk(
    "cars/fetchAllCar",
    async () => {
        const response = await fetch(`${API_URL}/cars`);

        return response.json();
    }
)

//ASYNC THUNK FOR BOOKINGS

export const saveBooking = createAsyncThunk(
    "bookings/saveBooking",
    async (bookingData) => {

        console.log(bookingData)

        const response = await axios.post(`${API_URL}/booking`, bookingData)

        return response.data;
    }
);

export const fetchBookingsByUser = createAsyncThunk(
    "bookings/fetchBookingsByUser",
    async (user_id) => {

        const response = await axios.get(`${API_URL}/booking/${user_id}`);

        return response.data;
    }
)

//REDUX SLICES

const bookingsSlice = createSlice({
    name: "bookings",
    initialState: { bookings: [] },
    extraReducers: (builder) => {
        builder.addCase(saveBooking.fulfilled, (state, action) => {
            state.bookings = [...state.bookings, action.payload];
        })
        builder.addCase(fetchBookingsByUser.fulfilled, (state, action) => {
            state.bookings = action.payload;
        })
    }
});

const carsSlice = createSlice({
    name: "cars",
    initialState: { cars: [] },
    extraReducers: (builder) => {
        builder.addCase(fetchAllCar.fulfilled, (state, action) => {
            state.cars = action.payload;
        })
    }
})


const rootReducer = combineReducers({
    bookings: bookingsSlice.reducer,
    cars: carsSlice.reducer
})

export { bookingsSlice, carsSlice, rootReducer };