import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendUserDataToBackend } from "../component/autoflexSlice";

export default function AuthPage() {

    const [toggleAuth, setToggleAuth] = useState("login")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("")

    const dispatch = useDispatch();

    function toggleSignup() {
        setToggleAuth("signup")
        setErrorMessage("")
    }

    function toggleLogin() {
        setToggleAuth("login")
        setErrorMessage("")
    }

    const navigate = useNavigate();

    async function handleSignup(e) {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setEmail("")
            setPassword("")
            setToggleAuth("login")

            const newUserData = {
                firebase_uid: auth.currentUser.uid,
                email: auth.currentUser.email
            }

            dispatch(sendUserDataToBackend(newUserData));
            alert("Succesfully signup")

        } catch (err) {
            if (err.code === 'auth/weak-password') {
                setErrorMessage("Password need to be at least 6 characters")
            } else if (err.code === 'auth/email-already-in-use') {
                setErrorMessage("Email already in use")
            }
        }
    }

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            console.log(user)
            navigate("/")
        } catch (error) {
            console.error(error)
            setErrorMessage("Wrong email/password, please check and try again")
        }
    }

    async function handleResetPassword(e) {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email)
        } catch (err) {
            console.error(err)
        } finally {
            alert("Please check your email")
        }
    }

    return (
        <>
            <Container className="p-5 mt-5">
                <Row>
                    <Col sm={7} className="d-flex align-items-center justify-content-center">
                        <h2>AutoFlex</h2>
                    </Col>
                    <Col sm={5} className="my-5">
                        {toggleAuth === "login" ? (
                            <h3 className="mb-3">Welcome Back to AutoFlex</h3>
                        ) : (
                            <h3 className="mb-3">Ride in Style with AutoFlex</h3>
                        )}
                        <Form>
                            <Form.Group className="my-3" controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email here"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="my-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your password here"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            {toggleAuth === "login" ? (
                                <Button
                                    variant="outline-secondary"
                                    className="my-3 rounded-pill"
                                    style={{ width: "250px" }}
                                    onClick={handleLogin}
                                >Login
                                </Button>
                            ) : (
                                <Button
                                    variant="outline-secondary"
                                    className="my-3 rounded-pill"
                                    style={{ width: "250px" }}
                                    onClick={handleSignup}
                                >Sign Up
                                </Button>
                            )}
                            <div className="text-danger">{errorMessage}</div>
                            {errorMessage === "Wrong email/password, please check and try again" && (
                                <Form.Text className="mt-3 text-muted">Reset password? Click <a href="" onClick={handleResetPassword}>here</a></Form.Text>
                            )}

                            <br />
                            <br />
                            <br />
                            <Form.Group>
                                {toggleAuth === "login" ? (
                                    <Form.Text className="text-muted">Don&apos;t have an account? Sign up <a style={{ color: "blue", cursor: "pointer" }} onClick={toggleSignup}>here</a></Form.Text>
                                ) : (
                                    <Form.Text className="text-muted">Already have an account? Sign in <a style={{ color: "blue", cursor: "pointer" }} onClick={toggleLogin}>here</a></Form.Text>
                                )}

                            </Form.Group>

                            <Button className="rounded-pill mt-5" variant="outline-secondary" style={{ width: "250px" }}>
                                <i className="bi bi-google"></i>  Login with Google Account
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

