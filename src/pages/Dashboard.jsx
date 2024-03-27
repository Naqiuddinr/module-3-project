import { useContext, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../component/AuthProvider";
import { fetchBookingsByUser } from "../component/autoflexSlice";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";


export default function Dashboard() {

    const { currentUser } = useContext(AuthContext);
    const dispatch = useDispatch();
    const user_id = currentUser ? currentUser.uid : "missing";
    console.log(user_id)

    useEffect(() => {
        dispatch(fetchBookingsByUser(user_id));
    }, [dispatch, user_id])

    const bookingList = useSelector((state) => state.bookings.bookings);

    useEffect(() => {
        console.log(bookingList)
    }, [bookingList])

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
                                        <Button className="me-3" size="sm" variant="light">edit</Button>
                                        <Button size="sm" variant="outline-danger">delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Container>
        </>
    )
}
