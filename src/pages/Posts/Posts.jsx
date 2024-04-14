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

    const fetchPosts = async () => {
        try {
            const fetched = await GetPosts({ token: rdxUser.credentials.token });
            setPosts(fetched);
        } catch (error) {
            console.error("Error fetching posts:", error);
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
                console.error("Error toggling like:", response.message);
            }
        } catch (error) {
            console.error("Error toggling like:", error);
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

        if (postData.title.length > 25 || postData.description.length > 300) {
            console.error("Title or description is too long");
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
                console.error("Error creating new post:", response.message);
                setIsCreating(false);
            }
        } catch (error) {
            console.error("Error creating new post:", error);
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
                throw new Error(result.message || 'Error deleting post');
            }

            setLoading(false);
        } catch (error) {
            console.error('Error deleting post:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userPosts]);

    return (
        <>
            <div className="postsDesign">
                <div className="titleDesignPost">Los temas del dia</div>

                {!selectedPost && (
                    <PostCard
                        title={postData.title}
                        description={postData.description}
                        handleInputChange={handleInputChange}
                        handleSubmit={createPost}
                    />
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







