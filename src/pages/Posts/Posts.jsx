/* eslint-disable no-unused-vars */
import "./Posts.css";
import { PostCard } from "../../common/Card/Card";
import { Card } from "../../common/Card/Card";
import { useState, useEffect } from "react";
import { GetPosts, CreatePost } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { PostLikes } from "../../services/apiCalls";

export const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [isCreating, setIsCreating] = useState(false);
    const [postData, setPostData] = useState({
        title: "",
        description: ""
    });
    const rdxUser = useSelector(userData);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const fetched = await GetPosts({ token: rdxUser.credentials.token });
                setPosts(fetched);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, [rdxUser]);

    const clickedPosts = (post) => {
        const updatedPost = {
            ...post,
            like: post.like || []
        };
        setSelectedPost(post);
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
                        <h2>Información del Post</h2>
                        <div>Nombre del Usuario: {selectedPost && selectedPost.user ? selectedPost.user.name : 'No disponible'}</div>
                        <div>Email: {selectedPost && selectedPost.user ? selectedPost.user.email : 'No disponible'}</div>
                        <div>Título del Post: {selectedPost.title}</div>
                        <div>Descripción: {selectedPost.description}</div>
                        <div>Likes: {selectedPost.like?.length || 0}</div>
                        <button onClick={() => setSelectedPost(null)}>Cerrar</button>
                    </div>
                ) : (
                    <>
                        {posts.length > 0 ? (
                            <div className="cardsRoster">
                                {posts.map((post) => {
                                    if (!post || !post.user) {
                                        return null;
                                    }
                                    return (
                                        <Card
                                            key={post._id}
                                            userName={
                                                <div className="postNameDesign">
                                                    {post.user.name}
                                                </div>
                                            }
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
                                            imagen={post.imagen}
                                            
                                            like={post.like}
                                            clickFunction={() => clickedPosts(post)}
                                        />
                                    );
                                })}
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







