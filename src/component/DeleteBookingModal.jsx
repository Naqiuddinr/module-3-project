import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteBookingById } from "./autoflexSlice";


export default function DeleteBookingModal({ showDeleteModal, handleCloseDeleteModal, bookingToDelete }) {

    const dispatch = useDispatch();

    function handleDeleteBooking() {
        if (bookingToDelete && bookingToDelete.booking_id) {
            dispatch(deleteBookingById(bookingToDelete.booking_id))
        }

        handleCloseDeleteModal();
    }

    return (
        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Confirm Delete Booking ID {bookingToDelete ? bookingToDelete.booking_id : "N/A"}</Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={handleDeleteBooking}>Delete</Button>
            </Modal.Footer>
        </Modal>
    )
}
