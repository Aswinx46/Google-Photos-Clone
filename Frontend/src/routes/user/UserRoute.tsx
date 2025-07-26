import Login from "@/features/auth/pages/LoginPage";
import Signup from "@/features/auth/pages/SignupPage";
import { Route, Routes } from "react-router-dom";

const UserRoute = () => {
    return (
        <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    )
}

export default UserRoute