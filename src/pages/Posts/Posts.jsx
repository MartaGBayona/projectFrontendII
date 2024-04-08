import "./Posts.css"
import { Card } from "../../common/Card/Card";
import { useState, useEffect } from "react";
import { GetPosts } from "../../services/apiCalls"
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";

export const Posts = () => {

    const [posts, setPosts] = useState([]);
    const rdxUser = useSelector(userData);

    useEffect(() =>{
        if (posts.length === 0) {
            const BringData = async () => {
                try {
                    const fetched = await GetPosts({ token: rdxUser.credentials.token });
                    console.log("Fetched posts:", fetched);
                    setPosts(fetched)
                } catch (error) {
                    console.log("Error fetching posts:", error);
                    return error;
                }
            };
            BringData();
        }
    }, [posts])

    const clickedPosts = (post) => {
        return(post)
    }

    return (
        <>
                        <div className="postsDesign">
                <div className="titleDesign">
                </div>
                {posts.length > 0 ? (
                    <div className="cardsRoster">{
                        posts.map(
                            post => {
                                return (
                                    <Card
                                        key={post._id}
                                        userName={<span className="postNameDesign">{post.user.name}</span>}
                                        title={<span className="postTitle">{post.title}</span>}
                                        description={<span className="postDescription">{post.description}</span>}
                                        clickFunction={() => clickedPosts(post)}
                                    />
                                )
                            }
                        )
                    }</div>
                ) : (
                    <div>Los servicios están viniendo.</div>
                )}
            </div>
        </>
    )
}