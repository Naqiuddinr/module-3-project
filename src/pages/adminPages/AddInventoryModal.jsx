import { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { sendNewCarDataToBackend } from "../../component/autoflexSlice";
import { useNavigate } from "react-router-dom";


export default function AddInventoryModal({ showAddModal, handleCloseAddModal }) {

    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [hourlyRate, setHourlyRate] = useState(0)
    const [imageFile, setImageFile] = useState(null)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleImageUpload = (e) => {
        setImageFile(e.target.files[0]);
    }

    function handleAddCars() {

        console.log(imageFile)
        const newCarData = {
            brand,
            model,
            hourly_rate: hourlyRate,
            imageFile
        }

        dispatch(sendNewCarDataToBackend(newCarData))

        handleCloseAddModal();
        navigate("/admin/inventory")

    }

    return (
        <>
            <Modal show={showAddModal} onHide={handleCloseAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Fill up the form below</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="my-3">
                        <InputGroup.Text id="brand">Brand</InputGroup.Text>
                        <Form.Control
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            placeholder="Type in the brand here"
                        />
                    </InputGroup>
                    <InputGroup className="mt-4">
                        <InputGroup.Text id="brand">Model</InputGroup.Text>
                        <Form.Control
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            placeholder="Type in the model here"
                        />
                    </InputGroup>
                    <InputGroup className="mt-4">
                        <InputGroup.Text id="brand">Hourly Rate (RM)</InputGroup.Text>
                        <Form.Control
                            value={hourlyRate}
                            onChange={(e) => setHourlyRate(e.target.value)}
                            placeholder="Type in the Hourly Rate here"
                        />
                    </InputGroup>
                    <Form.Control
                        className="mt-4"
                        type="file"
                        onChange={(handleImageUpload)}
                    />
                    <Button variant="outline-success" className="mt-5" onClick={handleAddCars}>Confirm</Button>
                </Modal.Body>
            </Modal>
        </>
    )
}
