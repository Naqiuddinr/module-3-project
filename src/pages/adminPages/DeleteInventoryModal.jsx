import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteCarById } from "../../component/autoflexSlice";


export default function DeleteInventoryModal({ showDeleteModal, handleCloseDeleteModal, carToDelete }) {

    const dispatch = useDispatch();

    function handleCarDelete() {
        if (carToDelete && carToDelete.car_id) {
            dispatch(deleteCarById(carToDelete.car_id))
        }

        handleCloseDeleteModal();
    }

    return (
        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Confirm Delete {carToDelete ? carToDelete.model : "N/A"} with Car ID {carToDelete ? carToDelete.car_id : ""}?</Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={handleCarDelete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    )
}
