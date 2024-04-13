import { CustomInput } from "../../common/CustomInput/CustomInput"
import { CustomButton } from "../../common/CustomButton/CustomButton"
import { useState } from "react";
import "./Login.css"
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../services/apiCalls";
import { decodeToken } from "react-jwt";

import { login } from "../../app/slices/userSlice";
import { useDispatch } from "react-redux"
import { validate } from "../../utils/funtions";

export const Login = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [userError, setUserError] = useState({
        emailError: "",
        passwordError: "",
    });

    const [msgError, setMsgError] = useState("");

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const checkError = (e) => {
        const error = validate(e.target.name, e.target.value);

        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error
        }))
    }

    const loginMe = async () => {
        try {
            for (let elemento in user) {
                if (user[elemento] === "") {
                    throw new Error("Debes rellenar todos los campos");
                }
            }
    
            const fetched = await LoginUser(user);
    
            if (fetched.token) {
                const decoded = decodeToken(fetched.token);
    
                const passport = {
                    token: fetched.token,
                    user: decoded,
                };
    
                dispatch(login({ credentials: passport }));
    
                setMsgError(`Bienvenido de nuevo ${decoded.name}`);
    
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
        } catch (error) {
            setMsgError(error.message);
        }
    };

    return (
        <div className="loginDesign">
            <div className="contentDesignLogin">
                <div className="titleDesignRegister">
                    Acceso
                </div>
                <CustomInput
                    className={`customInputDesign ${userError.emailError !== "" ? "inputDesignError" : ""}`}
                    type="email"
                    name="email"
                    value={user.email || ""}
                    changeEmit={(e) => inputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{userError.emailError}</div>
                
                <CustomInput
                    className={`customInputDesign ${userError.passwordError !== "" ? "inputDesignError" : ""}`}
                    type="password"
                    name="password"
                    value={user.password || ""}
                    changeEmit={(e) => inputHandler(e)}
                    onBlurFunction={(e) => checkError(e)}
                />
                <div className="error">{userError.passwordError}</div>

                <CustomButton
                    className={"buttonDesign"}
                    title={"Acceso"}
                    functionEmit={loginMe}
                />
                <div className="error">{msgError}</div>
            </div>
        </div>
    );
}