import Login from "@/features/auth/pages/LoginPage";
import Signup from "@/features/auth/pages/SignupPage";
import Home from "@/features/gallery/pages/Home";
import { Route, Routes } from "react-router-dom";

const UserRoute = () => {
    return (
        <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />} />
        </Routes>
    )
}

export default UserRoute