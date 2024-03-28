import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import ItemCards from "../component/ItemCards";
import { useState } from "react";


export default function Home() {

    const [searchBrand, setSearchBrand] = useState("");


    return (
        <>
            <Container style={{ borderBottom: "1px solid #d9d9d9" }}>
                <Row className="d-flex justify-content-center text-center">
                    <Col className="mt-5">
                        <h2>Rent Anything on Wheels, Unleash Everything Inside</h2>
                        <h4>From Two Wheels to Four, We Got Your Journey Covered</h4>
                    </Col>
                </Row>
                <br />
                <Row className="d-flex justify-content-center text-center my-4">
                    <InputGroup size="lg" className="mb-5" style={{ width: "900px" }}>
                        <Form.Control
                            placeholder="Search by Brands"
                            value={searchBrand}
                            onChange={(e) => setSearchBrand(e.target.value)}
                        />
                    </InputGroup>
                </Row>
            </Container>
            <ItemCards searchBrand={searchBrand} />
        </>
    )
}
