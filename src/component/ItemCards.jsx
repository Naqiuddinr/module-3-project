import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCar } from "./autoflexSlice";




export default function ItemCards({ searchBrand }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const CarCollection = useSelector((state) => state.cars.cars)
    const loading = useSelector((state) => state.cars.loading)

    useEffect(() => {
        dispatch(fetchAllCar())
    }, [dispatch])

    function handleBooking({ car_id }) {
        navigate(`/booking/${car_id}`)
    }

    const filteredCars = searchBrand
        ? CarCollection.filter(car => car.brand.toLowerCase().includes(searchBrand.toLowerCase()))
        : CarCollection

    return (
        <Container className="mt-4">
            {loading && (
                <Container
                    className="mt-5 d-flex justify-content-center">
                    <Spinner className="mt-5" animation="border" />
                </Container>
            )}
            <Row className="my-4">
                <CardTemplate cars={filteredCars} handleBooking={handleBooking} />
            </Row>
        </Container>
    )
}


function CardTemplate({ cars, handleBooking }) {



    return cars.map((car) => {

        return (
            <Col key={car.id} md={3} style={{ marginBottom: "30px" }}>
                <Card sx={{ maxWidth: 345 }} elevation={1}>
                    <Row>
                        <CardMedia
                            sx={{ height: 140 }}
                            image={car.imageurl}
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