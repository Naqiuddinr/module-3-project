import { combineReducers, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { storage } from "../firebase"
import { ref, getDownloadURL, uploadBytes } from "firebase/storage"


const API_URL = import.meta.env.VITE_API_URL

//ASYNC THUNK FOR USER SIGNUP

export const sendUserDataToBackend = createAsyncThunk(
    "users/sendUserDataToBackend",
    async (newUserData) => {

        const response = await axios.post(`${API_URL}/users`, newUserData);

        return response.json();
    }
)

//ASYNC THUNK FOR CARS

export const fetchAllCar = createAsyncThunk(
    "cars/fetchAllCar",
    async () => {
        const response = await fetch(`${API_URL}/cars`);

        return response.json();
    }
)

//ASYNC THUNK FOR ADDING NEW CARS TO BACK END

export const sendNewCarDataToBackend = createAsyncThunk(
    "cars/sendNewCarDataToBackend",
    async (newCarData) => {

        const { brand, model, hourly_rate, imageFile } = newCarData;
        const storeRef = ref(storage, `cars/${imageFile.name}`);
        const imageResponse = await uploadBytes(storeRef, imageFile);
        const imageurl = await getDownloadURL(imageResponse.ref);

        const response = await axios.post(`${API_URL}/cars`, { brand, model, hourly_rate, imageurl });

        return response.data;
    }
);

//ASYNC THUNK FOR DELETING A CAR

export const deleteCarById = createAsyncThunk(
    "cars/deleteCarById",
    async (car_id) => {

        await axios.delete(`${API_URL}/cars/${car_id}`)

        return { car_id }
    }
)

// ASYNC THUNK TO CHANGE HOURLY RATE BY CAR ID

export const changeHourRateByCarId = createAsyncThunk(
    "cars/changeHourRateByCarId",
    async (newHourRateData) => {

        const response = await axios.put(`${API_URL}/cars`, newHourRateData);

        return response.data;
    }
)

//ASYNC THUNK TO FETCH ALL BOOKINGS

export const fetchAllBookings = createAsyncThunk(
    "bookings/fetchAllBookings",
    async () => {

        const response = await axios.get(`${API_URL}/booking`);

        console.log(response.data)

        return response.data
    }
)

//ASYNC THUNK FOR SAVE BOOKINGS

export const saveBooking = createAsyncThunk(
    "bookings/saveBooking",
    async (bookingData) => {

        console.log(bookingData)

        const response = await axios.post(`${API_URL}/booking`, bookingData)

        return response.data;
    }
);

//ASYNC THUNK TO FETCH ALL BOOKINGS BY A USER

export const fetchBookingsByUser = createAsyncThunk(
    "bookings/fetchBookingsByUser",
    async (user_id) => {

        const response = await axios.get(`${API_URL}/booking/${user_id}`);

        return response.data;
    }
)

//ASYNC THUNK TO DELETE A BOOKING BY BOOKING_ID

export const deleteBookingById = createAsyncThunk(
    "bookings/deleteBookingById",
    async (booking_id) => {

        await axios.delete(`${API_URL}/booking/${booking_id}`)

        return { booking_id }

    }
)

//ASYNC THUNK TO EDIT A BOOKING BY BOOKING_ID

export const updateBookingByBookId = createAsyncThunk(
    "bookings/updateBookingByBookId",
    async (newBookingData) => {

        const { booking_id } = newBookingData

        const response = await axios.put(`${API_URL}/booking/${booking_id}`, newBookingData);

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
        builder.addCase(fetchAllBookings.fulfilled, (state, action) => {
            state.bookings = action.payload;
        })
        builder.addCase(fetchBookingsByUser.fulfilled, (state, action) => {
            state.bookings = action.payload;
        })
        builder.addCase(deleteBookingById.fulfilled, (state, action) => {
            state.bookings = state.bookings.filter((booking) => booking.booking_id !== action.payload.booking_id);
        })
        builder.addCase(updateBookingByBookId.fulfilled, (state, action) => {
            const updatedBooking = action.payload[0];
            const index = state.bookings.findIndex(booking => booking.booking_id === updatedBooking.booking_id);
            if (index !== -1) {
                state.bookings[index] = updatedBooking;
            }
        })
    }
});

const carsSlice = createSlice({
    name: "cars",
    initialState: { cars: [], loading: true },
    extraReducers: (builder) => {
        builder.addCase(fetchAllCar.fulfilled, (state, action) => {
            state.cars = action.payload;
            state.loading = false;
        })
        builder.addCase(deleteCarById.fulfilled, (state, action) => {
            state.cars = state.cars.filter((car) => car.car_id !== action.payload.car_id);
        })
        builder.addCase(changeHourRateByCarId.fulfilled, (state, action) => {
            const updatedCar = action.payload[0];
            const index = state.cars.findIndex(car => car.car_id === updatedCar.car_id);
            if (index !== -1) {
                state.cars[index] = updatedCar;
            }
        })
    }
})


const rootReducer = combineReducers({
    bookings: bookingsSlice.reducer,
    cars: carsSlice.reducer
})

export { bookingsSlice, carsSlice, rootReducer };