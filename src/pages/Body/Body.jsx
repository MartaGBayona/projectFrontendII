import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import { Profile } from "../Profile/Profile";
import { Register } from "../Register/Register";
import { Posts } from "../Posts/Posts";
import { Users } from "../Users/Users";
import { userData } from "../../app/slices/userSlice";

export const Body = () => {
    const rdxUser = useSelector(userData);

    return (
        <Routes>
            <Route path="*" element={<Navigate to={"/"} replace />} />
            
            <Route path="/" element={
                rdxUser?.credentials?.token ? (
                    <Posts />
                ) : (
                    <Home />
                )
            } />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/usuarios" element={<Users />} />
        </Routes>
    );
};
