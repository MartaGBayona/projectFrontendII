import "./Register.css"
import { useState } from "react"
import { CustomInput } from "../../common/CustomInput/CustomInput"
import { CustomButton } from "../../common/CustomButton/CustomButton"
import { RegisterUser } from "../../services/apiCalls"
import { useNavigate } from "react-router-dom"
import { validate } from "../../utils/funtions"

export const Register = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstName: "",
        secondName: "",
        email: "",
        password: "",
    });

    const [userError, setUserError] = useState({
        firstNameError: "",
        secondNameError: "",
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
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        const error = validate(fieldName, fieldValue);
    
        setUserError((prevState) => ({
            ...prevState,
            [`${fieldName}Error`]: error
        }));
    };

    const registerMe = async () => {
        try {
            for (let element in user) {
                if (user[element] === "") {
                    throw new Error("Todos los campos deben ser completados")
                }
            }

            const fetched = await RegisterUser(user);
            setMsgError(fetched.message)
            setTimeout(() => {
                navigate("/")
            }, 1200);
        } catch (error) {
            setMsgError(error.message)
        }
    };

    return (
        <>
        <div className="registerDesign">
        <div className="titleDesign">
                    Regístrate
                </div>
            <CustomInput
                className={`inputDesign ${userError.firstNameError ? "inputDesignError" : ""}`}
                type={"text"}
                placeholder={"nombre"}
                name={"firstName"}
                value={user.firstName || ""}
                onChangeFunction={(e) => inputHandler(e)}
                onBlurFunction={(e) => checkError(e)}
            />
            <div className="error">{userError.firstNameError}</div>

            <CustomInput
                className={`inputDesign ${userError.secondNameError ? "inputDesignError" : ""}`}
                type={"text"}
                placeholder={"Apellido"}
                name={"secondName"}
                value={user.secondName || ""}
                onChangeFunction={(e) => inputHandler(e)}
                onBlurFunction={(e) => checkError(e)}
            />
            <div className="error">{userError.secondNameError}</div>

            <CustomInput
                className={`inputDesign ${userError.emailError ? "inputDesignError" : ""}`}
                type={"email"}
                placeholder={"email"}
                name={"email"}
                value={user.email || ""}
                onChangeFunction={(e) => inputHandler(e)}
                onBlurFunction={(e) => checkError(e)}
            />
            <div className="error">{userError.emailError}</div>

            <CustomInput
                className={`inputDesign ${userError.passwordError ? "inputDesignError" : ""}`}
                type={"password"}
                placeholder={"contraseña"}
                name={"password"}
                value={user.password || ""}
                onChangeFunction={(e) => inputHandler(e)}
                onBlurFunction={(e) => checkError(e)}
            />
            <div className="error">{userError.passwordError}</div>

            <CustomButton
                className={"buttonDesign"}
                title={"Registro"}
                functionEmit={registerMe}
            />
            <div className="error">{msgError}</div>
        </div>
    </>
    )
}