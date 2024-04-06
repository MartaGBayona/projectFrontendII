import { CustomInput } from "../../common/CustomInput/CustomInput"
import { useState } from "react";
import "./Login.css"
import { LoginUser } from "../../services/apiCalls";

export const Login = () => {

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
        console.log(fetched)
    }

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