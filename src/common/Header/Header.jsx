import { CustomLink } from "../CustomLink/CustomLink"
import { CustomInputHeader } from "../CustomInput/CustomInput";
import { useState, useEffect } from "react";
import "./Header.css"

import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";
import { updateCriteria } from "../../app/slices/searchSlice";

export const Header = () => {

    const rdxUser = useSelector(userData);

    const dispatch = useDispatch();
    //const [profileName, setProfileName] = useState("")

    useEffect(() => {
        console.log(rdxUser, " credentials passport");
    }, [rdxUser]);

    const [criteria, setCriteria] = useState("");

    const searchHandler = (e) => {
        setCriteria(e.target.value);
    };

    useEffect(() => {
        const searching = setTimeout(() => {
            dispatch(updateCriteria(criteria));
        }, 375);

        return () => clearTimeout(searching);
    }, [criteria, dispatch]);

    return (
        <div className="headerDesign">
            <CustomInputHeader
                type="text"
                name="criteria"
                value={criteria || ""}
                changeEmit={searchHandler}
            />
            <CustomLink path="/" title="RetroLink" />
            {rdxUser?.credentials?.token ? (
                <div className="navigatorDesign">
                    <CustomLink path="/profile" title={rdxUser?.credentials?.user?.name} /> 
                    
                    <div
                        className="outDesign"
                        onClick={() => dispatch(logout({ credentials: "" }))}
                    >
                        Cerrar Sesión
                    </div>
                </div>
            ) : (
                <div className="navigatorDesign">
                    <CustomLink path="/login" title="Acceso" />
                    <CustomLink path="/register" title="Registro" />
                </div>
            )}
        </div>
    )
}