import { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../component/AuthProvider";
import { deleteBookingById, fetchAllCar, fetchBookingsByUser } from "../component/autoflexSlice";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import EditBookingModal from "../component/EditBookingModal";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {

    const { currentUser } = useContext(AuthContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user_id = currentUser ? currentUser.uid : "missing";
    console.log(user_id)

    useEffect(() => {
        dispatch(fetchBookingsByUser(user_id));
        dispatch(fetchAllCar());
    }, [dispatch, user_id])

    useEffect(() => {
        if (currentUser === null) {
            alert("NOT SIGNED IN")
            navigate('/login')
        }
    })

    const bookingList = useSelector((state) => state.bookings.bookings);

    useEffect(() => {
        console.log(bookingList)
    }, [bookingList])

    function handleBookingDelete({ booking_id }) {
        dispatch(deleteBookingById(booking_id))
    }

    const [showEditModal, setShowEditModal] = useState(false);
    const [bookingToEdit, setBookingToEdit] = useState(null);

    function handleShowEditModal(row) {
        setBookingToEdit(row)
        setShowEditModal(true);
    }

    const handleCloseEditModal = () => setShowEditModal(false);

    return (
        <>
            <Container className="mt-5">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Booking ID</TableCell>
                                <TableCell>Model</TableCell>
                                <TableCell>Start Date / Time</TableCell>
                                <TableCell>End Date / Time</TableCell>
                                <TableCell>Total Price</TableCell>
                                <TableCell>Booked on</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookingList.map((row) => (
                                <TableRow key={row.booking_id}>
                                    <TableCell component="th" scope="row">{row.booking_id}</TableCell>
                                    <TableCell>{row.model}</TableCell>
                                    <TableCell>{row.start_schedule}</TableCell>
                                    <TableCell>{row.end_schedule}</TableCell>
                                    <TableCell>{row.total_price}</TableCell>
                                    <TableCell>{row.created_at}</TableCell>
                                    <TableCell align="center">
                                        <Button className="me-3" size="sm" variant="light" onClick={() => handleShowEditModal(row)}>edit</Button>
                                        <Button size="sm" variant="outline-danger" onClick={() => handleBookingDelete(row)}>delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Container>
            <EditBookingModal
                showEditModal={showEditModal}
                handleCloseEditModal={handleCloseEditModal}
                booking={bookingToEdit}
            />
        </>
    )
}

