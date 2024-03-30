import { useContext, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { AuthContext } from "../../component/AuthProvider";
import { useNavigate } from "react-router-dom";

import userIcon from "./user.png";
import carIcon from "./fleet.png";
import laptopIcon from "./laptop.png";


export default function AdminHome() {

    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {

        if (currentUser.uid !== import.meta.env.VITE_ADMIN_ID) {
            alert("Only AutoFlex admin can access this page")
            navigate("/")
        }
    })




    return (
        <>
            <Container>
                <h1 className="my-3">AutoFlex Management</h1>
                <Row className="mt-5">
                    <Col sm={4}>
                        <Card className="d-flex justify-content-center align-items-center">
                            <Card.Img
                                src={userIcon}
                                variant="top"
                                style={{ width: "200px" }}
                                className="my-5" />
                            <Card.Body className="text-center">
                                <Card.Title>Manage User</Card.Title>
                                <Button variant="outline-warning" className="my-3">In Progress</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={4}>
                        <Card className="d-flex justify-content-center align-items-center">
                            <Card.Img
                                src={carIcon}
                                variant="top"
                                style={{ width: "200px" }}
                                className="my-5" />
                            <Card.Body className="text-center">
                                <Card.Title>Manage Inventory</Card.Title>
                                <Button variant="outline-success" className="my-3" href="/admin/inventory">Proceed</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={4}>
                        <Card className="d-flex justify-content-center align-items-center">
                            <Card.Img
                                src={laptopIcon}
                                variant="top"
                                style={{ width: "200px" }}
                                className="my-5" />
                            <Card.Body className="text-center">
                                <Card.Title>Manage Booking</Card.Title>
                                <Button variant="outline-warning" className="my-3" href="/admin/booking">In Progress</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
