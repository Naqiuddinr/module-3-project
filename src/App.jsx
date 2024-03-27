import { BrowserRouter, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import { Container, Nav, NavDropdown, Navbar, Toast, ToastContainer } from "react-bootstrap";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import AuthPage from "./pages/AuthPage";
import { getAuth } from "firebase/auth";
import Booking from "./pages/Booking";
import AuthProvider from './component/AuthProvider'
import store from "./store";
import { Provider } from "react-redux";
import { useState } from "react";


function Layout() {

  const auth = getAuth();
  const navigate = useNavigate();

  const [show, setShow] = useState(false)

  function handleLogout() {
    auth.signOut();
    console.log("signed out")
    setShow(true)
    navigate("/")
  }

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/" className="d-inline-block align-top">AutoFlex</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#">Cars</Nav.Link>
              <Nav.Link href="#">Motorcycles</Nav.Link>
              <Nav.Link href="#">Bikes</Nav.Link>
              <Nav.Link href="#">Scooter</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/dashboard">Bookings</Nav.Link>
              <NavDropdown title="Account" id="basic-nav-dropdown" align="end">
                <NavDropdown.Item href="#">Sign Up</NavDropdown.Item>
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/dashboard">Admin</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ToastContainer
        position="top-center"
        style={{ zIndex: 1, marginTop: "30px" }}
      >
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={4000}
          autohide>
          <Toast.Header>
            <strong className="me-auto">AutoFlex</strong>
          </Toast.Header>
          <Toast.Body>Signed out completed</Toast.Body>
        </Toast>
      </ToastContainer>
      <Outlet />
    </>

  )
}

export default function App() {
  return (
    <>
      <AuthProvider>
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<AuthPage />} />
                <Route path="/" element={<Layout />} >
                  <Route index element={<Home />} />
                  <Route path="/booking/:id" element={<Booking />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="*" element={<ErrorPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </LocalizationProvider>
        </Provider>
      </AuthProvider>
    </>


  )
}
