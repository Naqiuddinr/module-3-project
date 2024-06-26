import { useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../component/AuthProvider";
import { Button, Col, Container, Image, Row, Toast, ToastContainer } from "react-bootstrap";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useDispatch, useSelector } from "react-redux";
import { saveBooking } from "../component/autoflexSlice";


export default function Booking() {

    const { id } = useParams();
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser === null) {
            alert("NOT SIGNED IN")
            navigate('/login')
        }
    })

    console.log(currentUser)

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [show, setShow] = useState(false)

    const startBookDate = new Date(startDate)
    const convertedStartBookDate = `${startBookDate.getFullYear()}-${startBookDate.getMonth() + 1}-${startBookDate.getDate()}`;
    const convertedStartBookTime = `${startBookDate.getHours()}:${startBookDate.getMinutes()}`;

    const endBookDate = new Date(endDate)
    const convertedEndBookDate = `${endBookDate.getFullYear()}-${endBookDate.getMonth() + 1}-${endBookDate.getDate()}`;
    const convertedEndBookTime = `${endBookDate.getHours()}:${endBookDate.getMinutes()}`;

    const timeDifference = endBookDate.getTime() - startBookDate.getTime();
    const hoursDifference = Math.ceil(timeDifference / (1000 * 60 * 60));

    const carList = useSelector((state) => state.cars.cars);
    console.log(carList)
    const carBooking = carList.find((car) => car.car_id == id);
    console.log(carBooking)
    const totalPrice = carBooking.hourly_rate * hoursDifference;

    function handleBooking() {

        if (totalPrice <= 0) {
            alert("Please check your dates!")
            return
        }

        const bookingData = {
            user_id: currentUser.uid,
            car_id: carBooking.car_id,
            start_date: convertedStartBookDate,
            start_time: convertedStartBookTime,
            end_date: convertedEndBookDate,
            end_time: convertedEndBookTime,
            total_price: totalPrice
        }

        dispatch(saveBooking(bookingData))
        setShow(true)
        setTimeout(() => {
            navigate("/dashboard")
        }, 3500)
    }

    if (!carBooking) {
        return <h1>Car not found!</h1>
    }

    return (
        <>
            <Container>
                <Row>
                    <h1 className="mt-5">{carBooking.brand}</h1>
                    <h3>{carBooking.model}</h3>
                </Row>
                <Row className="mt-5" >
                    <Col>
                        <Image
                            src={carBooking.imageurl}
                            style={{ width: "600px", border: "1px solid #d9d9d9", borderRadius: "30px" }}
                        />
                    </Col>
                    <Col>
                        <h3>Ready to ride in style?</h3>
                        <p style={{ fontSize: "25px" }}>Fill in the detail below to book your ride!</p>
                        <DateTimePicker
                            className="mt-4"
                            label="Start"
                            value={startDate}
                            onChange={(e) => setStartDate(e)}
                        />
                        <DateTimePicker
                            className="mt-4 ms-5"
                            label="End"
                            value={endDate}
                            onChange={(e) => setEndDate(e)}
                        />
                        <h3 className="mt-5">
                            Total price: RM
                            {totalPrice <= 0 ? (
                                0
                            ) : (
                                totalPrice
                            )
                            }
                        </h3>
                        <Button variant="outline-success" onClick={handleBooking}>Proceed Booking</Button>
                    </Col>
                </Row>
                <ToastContainer
                    position="top-center"
                    style={{ zIndex: 1, marginTop: "30px" }}
                >
                    <Toast
                        onClose={() => setShow(false)}
                        show={show}
                        delay={3000}
                        autohide>
                        <Toast.Header>
                            <strong className="me-auto">AutoFlex</strong>
                        </Toast.Header>
                        <Toast.Body>Booking completed! Redirecting to your dashboard!</Toast.Body>
                    </Toast>
                </ToastContainer>
            </Container>
        </>
    )
}
