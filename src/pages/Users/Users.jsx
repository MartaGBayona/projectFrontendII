/* eslint-disable react-hooks/exhaustive-deps */
import "./Users.css";
import { useState, useEffect } from "react";
import { GetUsers, DeleteUser } from "../../services/apiCalls";
import { UserAdminCard } from "../../common/Card/Card";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom"

export const Users = () => {
    const rdxUser = useSelector(userData);
    const [users, setUsers] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        if (rdxUser.credentials.token){
            if (users.length === 0) {
                const BringData = async () => {
                    try {
                        const fetched = await GetUsers(rdxUser.credentials.token);
                        setUsers(fetched);
                    } catch (error) {
                        setErrorMsg("Error al obtener usuarios: " + error.message);
                    }
                };
                BringData();
            }
        }
        else {
            navigate("/")
        }
    }, [users, rdxUser.credentials.token]);

    const handleDelete = async (userId) => {
        try {
            const response = await DeleteUser(rdxUser.credentials.token, { id: userId });
            
            if (!response.success) {
                throw new Error(response.message || "Error al eliminar el usuario");
            }

            const updatedUsers = users.filter(user => user._id !== userId);
            setUsers(updatedUsers);
        } catch (error) {
            setErrorMsg("Error al eliminar el usuario: " + error.message);
        }
    };

    return (
        <>
            <div className="userDesign">
                <div className="titleDesign">
                    Lista de Usuarios
                </div>
                {users.length > 0 ? (
                    <div className="cardsRosterAdmin">
                        {users.map(user => (
                            <UserAdminCard
                                key={user._id}
                                name={user.name}
                                email={user.email}
                                role={user.role}
                                onDelete={() => handleDelete(user._id)}
                                isDeletable={user.role !== "super_admin"}
                            />
                        ))}
                    </div>
                ) : (
                    <div>{errorMsg || "Los usuarios están viniendo."}</div>
                )}
            </div>
        </>
    );
};
