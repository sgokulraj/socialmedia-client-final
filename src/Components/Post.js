import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../ReduxState/index.js";
import Friends from "./Friends.js";
import "../Stylesheet/Post.css";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import { PiShareFatFill } from "react-icons/pi";

function Post({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const userIdLogged = useSelector((state) => state.user._id);
  const [isComments, setIsComments] = useState(false);
  let isLiked;
  let likesCount
  if (likes) {
     isLiked = Boolean(likes[userIdLogged]);
     likesCount = Object.keys(likes).length;
  }


  const likePostUpdate = async () => {
    const res = await fetch(`https://smoggy-lamb-waders.cyclic.cloud/posts/${postId}/likes`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userIdLogged }),
    });
    const updatedPost = await res.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <main className="postContainer">
      <hr />
      <Friends
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <p className="postDesc">{description}</p>
      {picturePath && (
        <img
          src={picturePath}
          alt="userimg"
          className="postedImg"
        />
      )}
      <div className="postImpressed" style={{ marginTop: "8px" }}>
        <div className="postImpressed" style={{ gap: "25px" }}>
          <div className="postImpressed" style={{ gap: "5px" }}>
            <p onClick={likePostUpdate}>
              {isLiked ? (
                <MdOutlineFavorite className="likes" />
              ) : (
                <MdOutlineFavoriteBorder />
              )}
            </p>
            <p>{likesCount}</p>
          </div>
          <div className="postImpressed" style={{ gap: "5px" }}>
            <p onClick={() => setIsComments(!isComments)}>
              <FaRegComment />
            </p>
            <p>{comments ? comments.length: ""}</p>
          </div>
          <div>
            <p>
              <PiShareFatFill />
            </p>
          </div>
        </div>
      </div>
      {isComments && (
        <div className="commentContainer">
          {comments.length
            ? comments.map((comment, index) => {
                <div key={index}>
                  <hr />
                  <p className="comment">{comment}</p>
                </div>;
              })
            : ""}
          <hr />
        </div>
      )}
    </main>
  );
}

export default Post;
