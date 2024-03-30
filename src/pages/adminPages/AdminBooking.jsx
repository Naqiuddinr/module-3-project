import { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { fetchAllBookings } from "../../component/autoflexSlice";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";


export default function AdminBooking() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllBookings())
    }, [dispatch])

    const allBookings = useSelector((state) => state.bookings.bookings);

    return (
        <>
            <Container style={{ borderBottom: "1px solid #d9d9d9" }}>
                <h1 className="my-3">Booking Management</h1>
                <Button className="my-3" variant="outline-secondary" href="/admin"><i className="bi bi-arrow-left"></i>  Back</Button>
            </Container>
            <Container className="mt-4">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Booking ID</b></TableCell>
                                <TableCell align="center"><b>User (email)</b></TableCell>
                                <TableCell align="center"><b>Car Model (ID)</b></TableCell>
                                <TableCell align="center"><b>Booked on</b></TableCell>
                                <TableCell align="center"><b>Total Price (RM)</b></TableCell>
                                <TableCell align="center"><b>Booking Dates</b></TableCell>
                                <TableCell align="center"><b>Action</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allBookings.map((row) => (
                                <TableRow key={row.booking_id}>
                                    <TableCell>{row.booking_id}</TableCell>
                                    <TableCell align="center">{row.email}</TableCell>
                                    <TableCell align="center">{row.model} ({row.car_id})</TableCell>
                                    <TableCell align="center">{row.created_date}</TableCell>
                                    <TableCell align="center">{row.total_price}</TableCell>
                                    <TableCell align="center">
                                        Start: {row.start_date} at {row.start_time}
                                        <br />
                                        End: {row.end_date} at {row.end_time}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button size="sm" className="me-3" variant="outline-danger">
                                            <i className="bi bi-trash3-fill"></i>
                                        </Button>
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
