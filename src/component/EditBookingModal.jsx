import { DateTimePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateBookingByBookId } from "./autoflexSlice";


export default function EditBookingModal({ showEditModal, handleCloseEditModal, booking }) {

    if (!booking) {
        console.log("booking is null")
        return null; // or render a loading indicator or placeholder
    }


    const [newStartDate, setNewStartDate] = useState(null)
    const [newEndDate, setNewEndDate] = useState(null)

    const newEditStartDate = new Date(newStartDate)
    const convertedNewEditStartDate = `${newEditStartDate.getFullYear()}-${newEditStartDate.getMonth() + 1}-${newEditStartDate.getDate()}`;
    const convertedStartBookTime = `${newEditStartDate.getHours()}:${newEditStartDate.getMinutes()}`;

    const newEditEndDate = new Date(newEndDate)
    const convertedEndBookDate = `${newEditEndDate.getFullYear()}-${newEditEndDate.getMonth() + 1}-${newEditEndDate.getDate()}`;
    const convertedEndBookTime = `${newEditEndDate.getHours()}:${newEditEndDate.getMinutes()}`;

    const timeDifference = newEditEndDate.getTime() - newEditStartDate.getTime();
    const hoursDifference = Math.ceil(timeDifference / (1000 * 60 * 60));

    const carList = useSelector((state) => state.cars.cars);
    const carBooking = carList.find((car) => car.model == booking.model);
    console.log(carBooking)
    const newTotalPrice = carBooking.hourly_rate * hoursDifference;

    const dispatch = useDispatch();

    console.log(booking)

    function handleEditBooking() {

        if (newTotalPrice <= 0) {
            alert("Please check your dates")
        }
        const newBookingData = {
            start_date: convertedNewEditStartDate,
            start_time: convertedStartBookTime,
            end_date: convertedEndBookDate,
            end_time: convertedEndBookTime,
            total_price: newTotalPrice,
            booking_id: booking.booking_id
        }

        dispatch(updateBookingByBookId(newBookingData));
        setNewStartDate(null)
        setNewEndDate(null)
        handleCloseEditModal();
    }

    return (
        <Modal show={showEditModal} onHide={handleCloseEditModal}>
            <Modal.Header closeButton>
                Booking ID {booking.booking_id}
            </Modal.Header>
            <Modal.Body>
                <p>Changing start date/time from <strong>{booking.start_schedule}</strong> to :</p>
                <p><DateTimePicker
                    label="Start"
                    value={newStartDate}
                    onChange={(e) => setNewStartDate(e)} /></p>
                <p>Changing end date/time from <strong>{booking.end_schedule}</strong> to :</p>
                <p><DateTimePicker
                    label="End"
                    value={newEndDate}
                    onChange={(e) => setNewEndDate(e)} /></p>
                <br />
                <p>Your new total price is:
                    {newTotalPrice <= 0 ? (
                        0
                    ) : (
                        newTotalPrice
                    )}
                </p>
                <Button className="mt-3" variant="warning" onClick={handleEditBooking}>Confirm update</Button>
            </Modal.Body>
        </Modal>
    )
}