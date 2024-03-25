import { useNavigate, useParams } from "react-router-dom"
import { CarCollection } from "../component/Database";
import { useContext, useEffect } from "react";
import { AuthContext } from "../component/AuthProvider";


export default function Booking() {

    const { id } = useParams();
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    console.log(id)

    useEffect(() => {
        if (!currentUser) {
            alert("NOT SIGNED IN")
            navigate('/login')
        }
    })

    const carList = CarCollection;
    console.log(carList)
    const carBooking = carList.find((car) => car.id == id);
    console.log(carBooking)

    if (!carBooking) {
        return <h1>Car not found!</h1>
    }

    return (
        <>
            <h3>This is the booking page for car id {carBooking.id}</h3>
            <h5>{carBooking.brand}</h5>
        </>
    )
}
