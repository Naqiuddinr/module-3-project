import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../component/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Button, Container, Image, Modal } from "react-bootstrap";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCar } from "../../component/autoflexSlice";
import AddInventoryModal from "./AddInventoryModal";


export default function AdminInventory() {

    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {

        if (currentUser.uid !== "MsXoEPUGhNMaJ2teRh6eouDxnac2") {
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

    return (
        <>
            <Container style={{ borderBottom: "1px solid #d9d9d9" }}>
                <h1 className="my-3">Inventory</h1>
                <Button className="my-3" onClick={handleShowAddModal}>Add Vehicle</Button>
            </Container>
            <Container className="mt-4">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Car ID</b></TableCell>
                                <TableCell><b>Image</b></TableCell>
                                <TableCell><b>Brand</b></TableCell>
                                <TableCell><b>Model</b></TableCell>
                                <TableCell><b>Hourly Rate(RM)</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {CarCollection.map((row) => (
                                <TableRow key={row.car_id}>
                                    <TableCell>{row.car_id}</TableCell>
                                    <TableCell>
                                        <Image src={row.imageurl} style={{ height: "100px" }} />
                                    </TableCell>
                                    <TableCell>{row.brand}</TableCell>
                                    <TableCell>{row.model}</TableCell>
                                    <TableCell>{row.hourly_rate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            <AddInventoryModal showAddModal={showAddModal} handleCloseAddModal={handleCloseAddModal} />
        </>
    )
}

