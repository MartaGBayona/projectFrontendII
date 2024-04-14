/* eslint-disable no-unused-vars */
import "./Posts.css";
import { PostCard } from "../../common/Card/Card";
import { Card } from "../../common/Card/Card";
import { useState, useEffect } from "react";
import { GetPosts, CreatePost } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { PostLikes } from "../../services/apiCalls";
import { DeletePost } from "../../services/apiCalls";

export const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [postData, setPostData] = useState({
        title: "",
        description: ""
    });
    const rdxUser = useSelector(userData);
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showError, setShowError] = useState(false);

    const fetchPosts = async () => {
        try {
            const fetched = await GetPosts({ token: rdxUser.credentials.token });
            setPosts(fetched);
        } catch (error) {
            setErrorMessage("Error fetching posts");
        }
    };
    useEffect(() => {
        fetchPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rdxUser]);

    const selectPost = (post) => {
        setSelectedPost(post);
    };

    const toggleLike = async (postId) => {
        try {
            const response = await PostLikes(rdxUser.credentials.token, postId);

            if (response.success) {
                const updatedPosts = posts.map((post) =>
                    post._id === postId ? { ...post, like: response.data.like } : post
                );
                setPosts(updatedPosts);
            } else {
                setErrorMessage("Error toggling like");
            }
        } catch (error) {
            setErrorMessage("Error toggling like");
        }
    };

    const handleInputChange = (name, value) => {
        setPostData({
            ...postData,
            [name]: value
        });
    };

    const createPost = async () => {
        setIsCreating(true);

        function countWords(text) {
            return text.split(/\s+/).filter(Boolean).length;
        }
    
        if (countWords(postData.title) > 10 || countWords(postData.description) > 50) {
            setErrorMessage("Máximo de 10 palabras en el título y 50 en la descripción");
            setIsCreating(false);
            return;
        }

        try {
            const newPostData = {
                title: postData.title,
                description: postData.description,
                userId: rdxUser.credentials.userId
            };
            const response = await CreatePost(rdxUser.credentials.token, newPostData);

            if (response.success) {
                const createdPost = {
                    ...response.data,
                    user: response.user
                };
                setPosts(prevPosts => [createdPost, ...prevPosts]);
                setPostData({
                    title: "",
                    description: ""
                });
                setIsCreating(false);
            } else {
                setErrorMessage(response.message);
                setIsCreating(false);
            }
        } catch (error) {
            setErrorMessage("Error creating new post");
            setIsCreating(false);
        }
    };

    const deletePostHandler = async (postId) => {
        setLoading(true);

        try {
            const result = await DeletePost(rdxUser.credentials.token, postId);

            if (result && result.success) {
                const updatedPosts = userPosts.filter(post => post._id !== postId);
                setUserPosts(updatedPosts);
                fetchPosts();
            } else {
                setErrorMessage(result.message || 'Error deleting post');
            }

            setLoading(false);
        } catch (error) {
            setErrorMessage("Error deleting post");
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userPosts]);

    useEffect(() => {
        if (errorMessage) {
            setShowError(true);
            const timer = setTimeout(() => {
                setShowError(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    return (
        <>
            <div className="postsDesign">
                <div className="titleDesignPost">Los temas del dia</div>

                {!selectedPost && (
                    <>
                        <PostCard
                            title={postData.title}
                            description={postData.description}
                            handleInputChange={handleInputChange}
                            handleSubmit={createPost}
                        />
                        {showError && <div className="error">{errorMessage}</div>}
                    </>
                )}
                {selectedPost ? (
                    <div className="selectedPost">
                        <div className="containerPostSelected">
                            <div>Información del Post</div>
                            <div>Nombre del Usuario: {selectedPost && selectedPost.user ? selectedPost.user.name : 'No disponible'}</div>
                            <div>Email: {selectedPost && selectedPost.user ? selectedPost.user.email : 'No disponible'}</div>
                            <div>Título del Post: {selectedPost.title}</div>
                            <div>Descripción: {selectedPost.description}</div>
                            <div>Likes: {selectedPost.like?.length || 0}</div>
                            <button className="buttonDesign" onClick={() => setSelectedPost(null)}>Cerrar</button>
                        </div>
                    </div>
                ) : (
                    <>
                        {posts.length > 0 ? (
                            <div className="cardsRoster">
                                {posts.filter(post => post.user !== null && post._id !== null).map((post) => (
                                    <Card
                                        key={post._id}
                                        userName={post.user.name}
                                        title={post.title}
                                        description={post.description}
                                        imagen={post.imagen}
                                        like={post.like}
                                        onSelect={() => selectPost(post)}
                                        onDelete={() => deletePostHandler(post._id)}
                                        onToggleLike={() => toggleLike(post._id)}
                                        buttonDeleteDesign={rdxUser?.credentials?.user?.roleName === "super_admin" ? ("button-block") : ("button-none")}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div>Los servicios están viniendo.</div>
                        )}
                    </>
                )}
            </div>
        </>
    );
};







