import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../component/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Image, InputGroup, Row } from "react-bootstrap";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeHourRateByCarId, fetchAllCar } from "../../component/autoflexSlice";
import AddInventoryModal from "./AddInventoryModal";
import DeleteInventoryModal from "./DeleteInventoryModal";


export default function AdminInventory() {

    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {

        if (currentUser.uid !== import.meta.env.VITE_ADMIN_ID) {
            alert("Only AutoFlex admin can access this page")
            navigate("/")
        }
    })

    useEffect(() => {
        dispatch(fetchAllCar())
    }, [dispatch])

    const CarCollection = useSelector((state) => state.cars.cars)

    const [showAddModal, setShowAddModal] = useState(false)

    const handleShowAddModal = () => setShowAddModal(true)
    const handleCloseAddModal = () => setShowAddModal(false)

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [carToDelete, setCarToDelete] = useState(null)

    function handleShowDeleteModal(row) {
        setCarToDelete(row)
        setShowDeleteModal(true);
    }

    const handleCloseDeleteModal = () => setShowDeleteModal(false)

    const [editHourRate, setEditHourRate] = useState({});
    const [newHourRate, setNewHourRate] = useState("");

    // const toggleEditHour = () => setEditHour(!editHour)

    const toggleEditHourRate = (carId) => {
        setEditHourRate((prevState) => ({
            ...prevState,
            [carId]: !prevState[carId] // Toggle edit mode for the specific car ID
        }));
    };

    function saveNewHourRate({ car_id }) {

        const newHourRateData = {
            newHourRate,
            car_id
        }

        dispatch(changeHourRateByCarId(newHourRateData));
        setEditHourRate((prevState) => ({
            ...prevState,
            [car_id]: !prevState[car_id] // Toggle edit mode for the specific car ID
        }));
        setNewHourRate("");
    }

    return (
        <>
            <Container style={{ borderBottom: "1px solid #d9d9d9" }}>
                <h1 className="my-3">Inventory Management</h1>
                <Row>
                    <Col>
                        <Button className="my-3" variant="outline-secondary" href="/admin"><i className="bi bi-arrow-left"></i>  Back</Button>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button className="my-3 ms-auto" onClick={handleShowAddModal}>Add Vehicle</Button>
                    </Col>
                </Row>
            </Container>
            <Container className="mt-4">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Car ID</b></TableCell>
                                <TableCell align="center"><b>Image</b></TableCell>
                                <TableCell align="center"><b>Brand</b></TableCell>
                                <TableCell align="center"><b>Model</b></TableCell>
                                <TableCell align="center"><b>Hourly Rate(RM)</b></TableCell>
                                <TableCell align="center"><b>Action</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {CarCollection.map((row) => (
                                <TableRow key={row.car_id}>
                                    <TableCell>{row.car_id}</TableCell>
                                    <TableCell align="center">
                                        <Image src={row.imageurl} style={{ height: "100px" }} />
                                    </TableCell>
                                    <TableCell align="center">{row.brand}</TableCell>
                                    <TableCell align="center">{row.model}</TableCell>
                                    <TableCell align="center">
                                        {editHourRate[row.car_id] ? (
                                            <InputGroup size="sm">
                                                <Form.Control
                                                    style={{ width: "50px" }}
                                                    value={newHourRate}
                                                    onChange={(e) => setNewHourRate((e.target.value))} />
                                                <Button variant="warning" onClick={() => saveNewHourRate(row)}>Save</Button>
                                            </InputGroup>
                                        ) : (
                                            row.hourly_rate
                                        )}

                                    </TableCell>
                                    <TableCell align="center">
                                        <Button size="sm" className="me-3" variant="outline-secondary" onClick={() => toggleEditHourRate(row.car_id)}>
                                            <i className="bi bi-pencil-square"></i>
                                        </Button>
                                        <Button size="sm" className="me-3" variant="outline-danger" onClick={() => handleShowDeleteModal(row)}>
                                            <i className="bi bi-trash3-fill"></i>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            <AddInventoryModal showAddModal={showAddModal} handleCloseAddModal={handleCloseAddModal} />
            <DeleteInventoryModal
                showDeleteModal={showDeleteModal}
                handleCloseDeleteModal={handleCloseDeleteModal}
                carToDelete={carToDelete}
            />
        </>
    )
}

