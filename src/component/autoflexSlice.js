import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = 'https://f83c5890-a46c-48d4-ac93-9163a3f59c3f-00-1g1snjyottvwx.kirk.replit.dev';

export const fetchAllCar = createAsyncThunk(
    "cars/fetchAllCar",
    async () => {
        const response = await fetch(`${API_URL}/cars`);

        return response.json();
    }
)

export const saveBooking = createAsyncThunk(
    "bookings/saveBooking",
    async (bookingData) => {

        console.log(bookingData)

        const response = await axios.post(`${API_URL}/booking`, bookingData)

        return response.data;
    }
);


const autoflexSlice = createSlice({
    name: "bookings",
    initialState: { bookings: [], cars: [] },
    extraReducers: (builder) => {
        builder.addCase(fetchAllCar.fulfilled, (state, action) => {
            state.cars = action.payload;
        })
        builder.addCase(saveBooking.fulfilled, (state, action) => {
            state.bookings = [...state.bookings, action.payload];
        })
    }
});

export default autoflexSlice.reducer;