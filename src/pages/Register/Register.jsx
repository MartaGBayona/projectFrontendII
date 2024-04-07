import { CustomInput } from "../../common/CustomInput/CustomInput";
import { CustomButton } from "../../common/CustomButton/CustomButton";
import { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../../services/apiCalls";
import { userData } from "../../app/slices/userSlice";
import { registerRequest, registerSuccess, registerFailure } from "../../app/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

export const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector(userData);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const registerMe = async () => {
        try {
            dispatch(registerRequest());

            for (let element in user) {
                if (user[element] === "") {
                    throw new Error("Todos los campos deben ser completados");
                }
            }

            const fetched = await RegisterUser(user);
            
            if (fetched.success) {
                dispatch(registerSuccess(fetched.data));
                setTimeout(() => {
                    navigate("/");
                }, 1200);
            } else {
                throw new Error(fetched.message || "Error registering user");
            }
        } catch (error) {
            dispatch(registerFailure(error.message));
        }
    };

    return (
        <div className="registerDesign">
            <div className="contentDesign">
                <CustomInput
                    className={`customInputDesign ${error ? "inputDesignError" : ""}`}
                    type="text"
                    name="name"
                    value={user.name || ""}
                    changeEmit={inputHandler}
                />
                <CustomInput
                    className={`customInputDesign ${error ? "inputDesignError" : ""}`}
                    type="email"
                    name="email"
                    value={user.email || ""}
                    changeEmit={inputHandler}
                />
                <CustomInput
                    className={`customInputDesign ${error ? "inputDesignError" : ""}`}
                    type="password"
                    name="password"
                    value={user.password || ""}
                    changeEmit={inputHandler}
                />
                <CustomButton
                    className={"buttonDesign"}
                    title={"Registro"}
                    functionEmit={registerMe}
                />
                {isLoading && <p>Cargando...</p>}
                {error && <div className="error">{error}</div>}
            </div>
        </div>
    );
};