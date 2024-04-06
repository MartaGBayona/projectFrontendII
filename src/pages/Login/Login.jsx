import { CustomInput } from "../../common/CustomInput/CustomInput"
import { useState } from "react";
import "./Login.css"
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../services/apiCalls";
import { decodeToken } from "react-jwt";

import { login } from "../../app/slices/userSlice";
import { useDispatch } from "react-redux"

export const Login = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const loginMe = async () => {

        const fetched = await LoginUser(user)

        if (fetched.token) {
            const decoded = decodeToken(fetched.token);

            const passport = {
                token: fetched.token,
                user: decoded,
            };

            dispatch(login({credentials: passport}));

            setTimeout(() => {
                navigate("/")
            }, 500)
        }
    };

    return (
        <div className="loginDesign">
            <CustomInput
                className="customInputDesign"
                type="email"
                name="email"
                value={user.email || ""}
                changeEmit={inputHandler}
            />
            <CustomInput
                className="customInputDesign"
                type="password"
                name="password"
                value={user.password || ""}
                changeEmit={inputHandler}
            />
            <button onClick={loginMe}>Login</button>
        </div>
    )
}