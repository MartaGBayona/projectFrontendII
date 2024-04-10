import "./Posts.css";
import { PostCard } from "../../common/Card/Card";
import { Card } from "../../common/Card/Card";
import { useState, useEffect } from "react";
import { GetPosts, CreatePost } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";

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
        if (posts.length === 0) {
            const BringData = async () => {
                try {
                    const fetched = await GetPosts({ token: rdxUser.credentials.token });
                    console.log("Fetched posts:", fetched);
                    setPosts(fetched);
                } catch (error) {
                    console.log("Error fetching posts:", error);
                    return error;
                }
            };
            BringData();
        }
    }, [posts, rdxUser]);

    const clickedPosts = (post) => {
        setSelectedPost(post);
    };

    const handleInputChange = (name, value) => {
        setPostData({
            ...postData,
            [name]: value
        })
    }

    const handleSubmit = async () => {
        setIsCreating(true);

        try {
            const newPostData = {
                title: postData.title,
                description: postData.description,
                userId: rdxUser.credentials.userId
            }
            const createdPost = await CreatePost(rdxUser.credentials.token, newPostData);
            console.log("New post created:", createdPost);
            
            setPosts(prevPosts => [createdPost, ...prevPosts]);

            setPostData({
                title: "",
                description: ""
            });

            setIsCreating(false);
        } catch (error) {
            console.error("Error creating new post:", error);
            setIsCreating(false);
        }
    };

    return (
        <>
            <div className="postsDesign">
                <div className="titleDesignPost">Los temas del dia</div>

                <PostCard 
                    title={postData.title} 
                    description={postData.description} 
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                />

                {selectedPost ? (
                    <div className="selectedPost">
                        <h2>Información del Post</h2>
                        <div>Nombre del Usuario: {selectedPost.user.name}</div>
                        <div>Email: {selectedPost.user.email}</div>
                        <div>Título del Post: {selectedPost.title}</div>
                        <div>Descripción: {selectedPost.description}</div>
                        <div>Likes: {selectedPost.likes?.length || 0}</div>
                        <button onClick={() => setSelectedPost(null)}>Cerrar</button>
                    </div>
                ) : (
                    <>
                        {posts.length > 0 ? (
                            <div className="cardsRoster">
                                {posts.map((post) => {
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







