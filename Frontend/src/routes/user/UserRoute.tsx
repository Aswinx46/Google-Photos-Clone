import Signup from "@/features/auth/pages/SignupPage";
import { Route, Routes } from "react-router-dom";

const UserRoute = () => {
    return (
        <Routes>
            <Route path='/signup' element={<Signup />} />
        </Routes>
    )
}

export default UserRoute