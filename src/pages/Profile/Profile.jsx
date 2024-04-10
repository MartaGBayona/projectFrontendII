import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetProfile, UpdateProfile, GetOwnPosts } from "../../services/apiCalls";
import { CustomButton } from "../../common/CustomButton/CustomButton";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { UserCard } from "../../common/Card/Card";
import "./Profile.css";
import { useSelector } from "react-redux";
import { validate } from "../../utils/funtions";
import { userData } from "../../app/slices/userSlice";
import { useDispatch } from "react-redux"
import { updated } from "../../app/slices/userSlice";
import { DeletePost } from "../../services/apiCalls"

export const Profile = () => {

    // export const Profile = () => {

    //     gate const navi= useNavigate();
    //     const state = useSelector(userData);
    //     const token = state.credentials.token || ({});
    //     const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const rdxUser = useSelector(userData);
    const dispatch = useDispatch();

    const [write, setWrite] = useState("disabled");
    const [loadedData, setLoadedData] = useState();
    const [user, setUser] = useState({
        name: "",
        email: "",
    });
    const [userError, setUserError] = useState({
        nameError: "",
        emailError: "",
    });
    const [userPosts, setUserPosts] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const getUserProfile = async (credentials) => {
        try {
            const fetched = await GetProfile(credentials);
            if (!fetched.success) {
                throw new Error(fetched.message || 'Error en la respuesta del servidor');
            }
            setUser({
                name: fetched.data.name,
                email: fetched.data.email,
            });
            setLoadedData(true);
        } catch (error) {
            console.error('Error al obtener el perfil:', error);
            throw error;
        }
    };

    useEffect(() => {
        const getUserPosts = async (credentials) => {
            try {
                const fetched = await GetOwnPosts(credentials);
                setUserPosts(fetched);
            } catch (error) {
                console.error('Error al obtener los posts del usuario:', error);
                throw error;
            }
        };
        if (rdxUser.credentials.token) {
            getUserPosts({ token: rdxUser.credentials.token });
            
        }
    }, [rdxUser]);


    useEffect(() => {
        if (!rdxUser.credentials.token) {
            navigate("/");
        }
    }, [rdxUser.credentials, navigate]);

    useEffect(() => {
        if (!loadedData) {
            getUserProfile(rdxUser.credentials);
        }
    }, [rdxUser.credentials, loadedData]);

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
        }));
    };

    const updateData = async () => {
        try {
            const fetched = await UpdateProfile(rdxUser.credentials, user);
            setUser((prevState) => ({
                ...prevState,
                name: fetched.data.name || prevState.name,
                email: fetched.data.email || prevState.email,
            }));
            dispatch(updated({ credentials: { ...rdxUser.credentials, user: { ...rdxUser.credentials.user, name: user.name } } }));
            setWrite("disabled");
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
            throw error;
        }
    };

    const deletePost = async (postId) => {
        try {
            if (!postId) {
                throw new Error("El ID del post es inválido");
            }
    
            const result = await DeletePost(rdxUser.credentials.token, postId);
            console.log("Respuesta completa de DeletePost:", result);
    
            if (result && result.message) {
                throw new Error(result.message);
            }
    
            if (result.success) {
                const updatedPosts = userPosts.filter(post => post._id !== postId);
                console.log("userPosts antes de la actualización:", userPosts);
                console.log("Posts actualizados:", updatedPosts);
                setUserPosts(updatedPosts);
                setRefresh(!refresh);
            } else {
                throw new Error(result.message || 'Error deleting post');
            }

        } catch (error) {
            
            return error; 
        }
    };

    useEffect(() => {
        console.log("userPosts ha cambiado:", userPosts);
    }, [userPosts]);
    


    return (
        <>
            <div className="profileDesign">
                {loadedData ? (
                    <div className="profileDesign">
                        <div className="titleDesignProfile">Perfil de usuario</div>
                        <div className="contentDesignProfile">
                            <CustomInput
                                className={`inputDesign ${userError.nameError !== "" ? "inputDesignError" : ""}`}
                                type={"text"}
                                placeholder={""}
                                name={"name"}
                                disabled={write}
                                value={user.name || ""}
                                changeEmit={(e) => inputHandler(e)}
                                onBlurFunction={(e) => checkError(e)}
                            />
                            <CustomInput
                                className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""}`}
                                type={"email"}
                                placeholder={""}
                                name={"email"}
                                disabled={"disabled"}
                                value={user.email || ""}
                                changeEmit={(e) => inputHandler(e)}
                                onBlurFunction={(e) => checkError(e)}
                            />
                            <CustomButton
                                className={write === "" ? "buttonDesign" : "buttonDesign"}
                                title={write === "" ? "Confirmar" : "Editar"}
                                functionEmit={write === "" ? updateData : () => setWrite("")}
                            />
                        </div>

                        <div className="userPostsSection">
                            <div>Tus Posts</div>
                            {userPosts.length > 0 ? (
                                <div className="cardsRoster">
                                    {userPosts.map(post => (
                                        <UserCard
                                            key={post._id}
                                            title={
                                                <div className="postTitle">
                                                    {post.title}
                                                </div>
                                            }
                                            description={
                                                <div className="postDescription">
                                                    {post.description}
                                                </div>
                                            }
                                            isDeletable={true}
                                            onDelete={() => deletePost(post._id)}
                                        />
                                    ))}
                                    
                                </div>
                            ) : (
                                <div>No hay posts para mostrar.</div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div>CARGANDO</div>
                )}
            </div>
        </>
        
    );
};


