import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCar } from "./autoflexSlice";




export default function ItemCards() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllCar())
    }, [dispatch])

    function handleBooking({ car_id }) {
        navigate(`/booking/${car_id}`)
    }

    return (
        <Container className="mt-4">
            <Row className="my-4">
                <CardTemplate handleBooking={handleBooking} />
            </Row>
        </Container>
    )
}


function CardTemplate({ handleBooking }) {

    const CarCollection = useSelector((state) => state.cars.cars)

    console.log(CarCollection)

    return CarCollection.map((car) => {

        return (
            <Col key={car.id} md={3} style={{ marginBottom: "30px" }}>
                <Card sx={{ maxWidth: 345 }} elevation={1}>
                    <Row>
                        <CardMedia
                            sx={{ height: 140 }}
                            image={car.imageUrl}
                            title={car.model}
                        />
                    </Row>
                    <Row>
                        <Col>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {car.brand}
                                    <Typography variant="body2" color="text.secondary">
                                        {car.model}
                                    </Typography>
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="sm" onClick={() => handleBooking(car)}>Book</Button>
                            </CardActions>
                        </Col>
                        <Col className="text-end">
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    RM{car.hourly_rate}
                                    <Typography variant="body2" color="text.secondary">
                                        /Hour
                                    </Typography>
                                </Typography>
                            </CardContent>
                        </Col>
                    </Row>
                </Card>
            </Col>
        )
    })

}